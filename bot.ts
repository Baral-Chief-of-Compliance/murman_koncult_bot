import { Bot} from '@maxhub/max-bot-api';
import { setGlobalDispatcher } from 'undici';
import dotenv from 'dotenv'

import { proxyAgent } from './proxy';
import { commandsList } from './commands/main';
import { startCommand, processUnclearMessage, MAIN_PAGE_ACTION } from './commands/start';
import { START_COMMAND } from './commands/main';
import { ABOUT_PERSONAL_CENTER, getAboutPersonalCenter } from './commands/aboutPersonalCenter';



import logger from './logger';

// настройка перменных виртуального окружения
dotenv.config({ path: '.env'})

//Установка глобального прокси для работы бота
// setGlobalDispatcher(proxyAgent);

if (!process.env.BOT_TOKEN){
    logger.error('Token not provided')
    throw new Error('Token not provided')
} ;

const bot = new Bot(process.env.BOT_TOKEN);
logger.info('Bot is start up')

//Установка списка команд в бота
bot.api.setMyCommands(commandsList);

//Обработка не команд
bot.hears(/^(?!\/[a-z]+$).*$/, async(ctx) =>{
    const message = ctx.message; // Полученное сообщение
    await processUnclearMessage(ctx)
    logger.info(`User with id ${message.sender?.user_id} write to bot "${message.body.text}" timestamp: ${ctx.message.timestamp}`)
})

//Обработка команд, которых нет в списке
bot.hears(/^\/\b(?!(?:start)\b)[a-z]+\b$/, async(ctx) => {
    const message = ctx.message; // Полученное сообщение
    await processUnclearMessage(ctx)
    logger.info(`User with id ${message.sender?.user_id} try to use command "${message.body.text}" timestamp: ${ctx.message.timestamp}`)
})


//Обработчки начала диалога с ботом
bot.on('bot_started', async(ctx) => {
    await startCommand(ctx)
    logger.info(`User with id ${ctx.user?.user_id} start bot timestamp: ${ctx.update.timestamp}`)
});

//обработка команды /start
bot.command(START_COMMAND, async(ctx) => {
    await startCommand(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use command ${START_COMMAND}  timestamp: ${ctx.message.timestamp}`)
});

//Действие уходна на главную страницу (Приветствие бота)
bot.action(MAIN_PAGE_ACTION, async(ctx) => {
    await startCommand(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __На главную__ timestamp: ${ctx.update.timestamp}`)
})

//Дейсвтие при нажатии на кнопку О кадровом центре
bot.action(ABOUT_PERSONAL_CENTER, async (ctx) => {
    await getAboutPersonalCenter(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __О кадровом центре__ timestamp: ${ctx.update.timestamp}`)
})

// bot.catch(() => {
//     logger.error('Bot is down')
// })

bot.start();