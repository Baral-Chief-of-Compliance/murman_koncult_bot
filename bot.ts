import { Bot, Context} from '@maxhub/max-bot-api';
import { setGlobalDispatcher } from 'undici';
import dotenv from 'dotenv'

import { proxyAgent } from './proxy';
import { commandsList } from './commands/main';
import { startCommand, processUnclearMessage} from './commands/start';
import { START_COMMAND } from './commands/main';
import { ABOUT_PERSONAL_CENTER } from './actions/aboutPersonalCenters';
import { MAIN_PAGE_ACTION } from './actions/main';
import { PERSONNEL_SELECTION, PS_SEARCH, PS_SEARCH_APP_SEARCH_EMPL, PS_SEARCH_TIPS_WRITING_JOB_VACANCIES, PS_SEARCH_VACANSY } from './actions/personnelSelection';

import { getAboutPersonalCenter } from './commands/aboutPersonalCenter';
import { getPersonnelSelection, getPSSearchAndSelectionCandidateAppSearchEmployes, getPSSearchAndSelectionCandidates, getPSSearchAndSelectionCandidateTipsWritingJobsVacancies, getPSSearchAndSelectionCandidateVacancies } from './commands/personnelSelection';


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

//О кадровом центре
bot.action(ABOUT_PERSONAL_CENTER, async (ctx) => {
    await getAboutPersonalCenter(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __О кадровом центре__ timestamp: ${ctx.update.timestamp}`)
})

//Подбор персонала
bot.action(PERSONNEL_SELECTION, async (ctx) => {
    await getPersonnelSelection(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Подбор персонала__ timestamp: ${ctx.update.timestamp}`)
})

//Подбор персонала -> Поиск и подбор кандидатов
bot.action(PS_SEARCH, async (ctx) => {
    await getPSSearchAndSelectionCandidates(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Подбор персонала -> Поиск и подбор кандидатов__ timestamp: ${ctx.update.timestamp}`)
})

//Подбор персонала -> Поиск и подбор кандидатов -> Размещение вакансий
bot.action(PS_SEARCH_VACANSY, async(ctx) => {
    await getPSSearchAndSelectionCandidateVacancies(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Подбор персонала -> Поиск и подбор кандидатов -> Размещение вакансий__ timestamp: ${ctx.update.timestamp}`)
})

// Подбор персонала -> Поиск и подбор кандидатов -> Подача заявления на поиск работников
bot.action(PS_SEARCH_APP_SEARCH_EMPL, async(ctx) => {
    await getPSSearchAndSelectionCandidateAppSearchEmployes(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Подбор персонала -> Поиск и подбор кандидатов -> Подача заявления на поиск работников__ timestamp: ${ctx.update.timestamp}`)
})

// Подбор персонала -> Поиск и подбор кандидатов -> Советы по составлению вакансий
bot.action(PS_SEARCH_TIPS_WRITING_JOB_VACANCIES, async(ctx) =>{
    await getPSSearchAndSelectionCandidateTipsWritingJobsVacancies(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Подбор персонала -> Поиск и подбор кандидатов -> Советы по составлению вакансий__ timestamp: ${ctx.update.timestamp}`)
})

bot.catch(() => {
    logger.error('Bot is down')
})

bot.start();