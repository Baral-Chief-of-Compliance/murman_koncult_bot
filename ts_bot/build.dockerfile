#Данный dockerfile создан для сборки на сервере без доступа к npm
FROM node:24-alpine

# Устанавливаем pm2 глобально
RUN npm install -g pm2

RUN mkdir -p /home/murman_konsult_bot

WORKDIR /home/murman_konsult_bot

COPY package*.json ./
RUN npm ci --only=production

CMD ["RUN", "node", "--version"]

# COPY . .

# # Создаем директорию для логов
# RUN mkdir -p logs && chmod 777 logs

# RUN npm run build

# # Используем pm2-runtime для Docker
# CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]