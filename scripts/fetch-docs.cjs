const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const KEY_FILE = path.join(__dirname, 'service-account.json');
const DOC_ID = '1WIPlfaTqv84mahEFRqr9KOtQi4aDMYSvG2kyU6dDkMc';

const SECTION_MAP = {
  'Договор оферты': 'offer',
  'Политика конфиденциальности': 'privacy',
  'Правила проживания': 'rules',
};

async function fetchDoc(docId, auth) {
  const docs = google.docs({ version: 'v1', auth });
  const res = await docs.documents.get({ documentId: docId });
  return res.data;
}

function getListTag(list, lists) {
  if (!list) return 'ul';
  const glyphType = lists[list.listId]?.listProperties?.nestingLevels?.[list.nestingLevel]?.glyphType;
  return glyphType ? 'ol' : 'ul';
}

function googleDocToSections(doc) {
  let current = null;
  const sections = { offer: '', privacy: '', rules: '' };
  const lists = doc.lists || {};
  const listStack = [];
  let prevNesting = 0;

  for (const block of doc.body.content) {
    if (!block.paragraph) continue;
    const text = block.paragraph.elements
      .map(el => el.textRun ? el.textRun.content : '')
      .join('').trim();
    const style = block.paragraph.paragraphStyle?.namedStyleType;
    const bullet = block.paragraph.bullet;

    // Начало нового раздела
    if (style === 'HEADING_1' && SECTION_MAP[text]) {
      // Закрываем все открытые списки
      while (listStack.length && current) {
        sections[current] += `</${listStack.pop()}>`;
      }
      current = SECTION_MAP[text];
      // НЕ добавляем заголовок раздела
      continue;
    }

    if (!current) continue;

    // Списки с поддержкой вложенности и типа
    if (bullet) {
      const nesting = bullet.nestingLevel || 0;
      const tag = getListTag(bullet, lists);

      // Открываем новые уровни
      while (listStack.length < nesting + 1) {
        sections[current] += `<${tag}>`;
        listStack.push(tag);
      }
      // Закрываем уровни, если нужно
      while (listStack.length > nesting + 1) {
        sections[current] += `</${listStack.pop()}>`;
      }
      sections[current] += `<li>${text}</li>`;
      prevNesting = nesting;
      continue;
    } else {
      // Закрываем все открытые списки перед обычным текстом
      while (listStack.length && current) {
        sections[current] += `</${listStack.pop()}>`;
      }
    }

    if (style === 'HEADING_2') {
      sections[current] += `<h3>${text}</h3>`;
    } else if (text) {
      sections[current] += `<p>${text}</p>`;
    }
  }
  // Закрываем все открытые списки в конце раздела
  for (const key of Object.keys(sections)) {
    while (listStack.length) {
      sections[key] += `</${listStack.pop()}>`;
    }
  }
  return sections;
}

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/documents.readonly'],
  });
  const doc = await fetchDoc(DOC_ID, await auth.getClient());
  const sections = googleDocToSections(doc);
  for (const [key, html] of Object.entries(sections)) {
    fs.writeFileSync(
      path.join(__dirname, `../public/${key}.html`),
      html,
      'utf8'
    );
    console.log(`Saved ${key}.html`);
  }
}

main().catch(console.error); 