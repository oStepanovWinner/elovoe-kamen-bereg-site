
require('dotenv').config();
const fs = require('fs');

const SPREADSHEET_ID = '1du_Awg8Iigq_MAI-3dpqhMgI2l10zCii_-pdn69iLJ8'; // твой ID
const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  console.error('ERROR: GOOGLE_API_KEY is not set!');
  process.exit(1);
}

const sheets = [
  { name: 'Gallery', file: 'gallery.json' },
  { name: 'Rooms', file: 'rooms.json' },
  { name: 'Services', file: 'services.json' },
  { name: 'Reviews', file: 'reviews.json' },
  { name: 'Contacts', file: 'contacts.json' },
  { name: 'FAQ', file: 'faq.json' },
  { name: 'Hero', file: 'hero.json' },
  { name: 'About', file: 'about.json' },
  { file: 'news.json', url: 'https://telegram-widget-backend.onrender.com/api/telegram' },
];

async function fetchSheet(sheetName) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetName}?alt=json&key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${sheetName}`);
  const data = await res.json();
  if (!data.values || data.values.length < 2) return [];
  const [header, ...rows] = data.values;
  return rows.map(row =>
    Object.fromEntries(header.map((key, i) => [key, row[i] || ""]))
  );
}

async function main() {
  for (const sheet of sheets) {
    try {
      let data;
      if (sheet.url) {
        const res = await fetch(sheet.url);
        data = await res.json();
      } else {
        data = await fetchSheet(sheet.name);
      }
      fs.writeFileSync(`public/${sheet.file}`, JSON.stringify(data, null, 2));
      console.log(`${sheet.file} updated!`);
    } catch (e) {
      console.error(`Error updating ${sheet.name || sheet.file}:`, e.message);
    }
  }
}

main(); 