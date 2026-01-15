FROM node:24-alpine

ENV http_proxy http://proxy.amo.murman.ru:8080/
ENV https_proxy http://proxy.amo.murman.ru:8080/
ENV no_proxy 127.0.0.1,172.21.0.0,localhost,.local,.gov-murman.ru,.amo.murman.ru,172.21.251.157,/var/run/docker.sock
ENV HTTP_PROXY http://proxy.amo.murman.ru:8080/
ENV HTTPS_PROXY http://proxy.amo.murman.ru:8080/
ENV NO_PROXY 127.0.0.1,172.21.0.0,localhost,.local,.gov-murman.ru,.amo.murman.ru,172.21.251.157,/var/run/docker.sock


RUN mkdir -p /home/max_bot_ministry_of_justice

WORKDIR /home/max_bot_ministry_of_justice

COPY . .

# Создаем директорию для логов
RUN mkdir -p logs && chmod 777 logs

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]