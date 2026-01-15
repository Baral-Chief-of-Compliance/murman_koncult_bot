import pino from 'pino';


const fileTransport = pino.transport({
  targets:[
    {
        target: 'pino/file',
        options: { destination: './logs/bot.log' }
    },
    {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard'
        },
        level: 'info'
    }
  ]});

const logger = pino({}, fileTransport);

export default logger;