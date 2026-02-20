# MAX Бот Консультант Мурманского Кадрового центра

Бот для мессенджера MAX
https://max.ru/murman_koncult_bot

## 📦 Установка
 - в директории проекта создать файлик .env
 - добавить в него следующие переменные виртуального окружения
   - BOT_TOKEN - токен для работы бота
   - PROXY_PATH - полный url прокси (без авторизационных данных)
   - PROXY_LOGIN - логин для прокси
   - PROXY_PASSWORD - пароль для прокси
   - PROXY_AUTH - (1 - использовать прокси, 0 не использовать прокси)


## 🛠️ Запуск (DEV)
```bash
npm install
npm run build
npm run start
```
## ⛔ остановка (DEV)
```bash
npm run delete
```

## 🔍 Просмотр логов (DEV)
```bash
npm run logs
```


## 🚀 Запуск (PROD) Docker Compose v2.34.0
```bash
docker compose up --build -d
```

## ⛔ Остановить (PROD) Docker Compose v2.34.0
```bash
docker compose down
```
