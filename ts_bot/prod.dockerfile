FROM max_bot_czn:v1.0

COPY . .

# Создаем директорию для логов
RUN mkdir -p logs && chmod 777 logs

RUN npm run build

# Используем pm2-runtime для Docker
CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]