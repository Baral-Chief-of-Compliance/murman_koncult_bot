FROM node:24-alpine


RUN mkdir -p /home/max_bot_ministry_of_justice

WORKDIR /home/max_bot_ministry_of_justice

COPY . .

# Создаем директорию для логов
RUN mkdir -p logs && chmod 777 logs

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]