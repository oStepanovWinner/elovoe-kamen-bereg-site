# Скрипты и переменные окружения

Для работы скриптов требуется файл `.env` в этой папке со следующим содержимым:

```
GOOGLE_API_KEY=ваш_ключ_сюда
```

Файл `.env` должен быть добавлен в `.gitignore` и не попадать в репозиторий!

Для запуска скрипта с переменными окружения используйте:

- PowerShell/Windows:
  ```powershell
  $env:GOOGLE_API_KEY="ваш_ключ"; node fetch-sheets.cjs
  ```
- CMD:
  ```cmd
  set GOOGLE_API_KEY=ваш_ключ && node fetch-sheets.cjs
  ```
- Bash:
  ```bash
  GOOGLE_API_KEY=ваш_ключ node fetch-sheets.cjs
  ```

Или используйте пакет [dotenv](https://www.npmjs.com/package/dotenv) для автоматической загрузки переменных из файла `.env`. 