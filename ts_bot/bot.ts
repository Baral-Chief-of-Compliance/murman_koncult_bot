import { Bot, Context} from '@maxhub/max-bot-api';
import { setGlobalDispatcher } from 'undici';
import dotenv from 'dotenv'

import { proxyAgent } from './proxy';
import { commandsList, CONTACT_COMMAND, GoToRabotaInRussia, goVkGroup, RIR_COMMAND, SITE_COMMAND } from './commands/main';
import { startCommand, processUnclearMessage} from './commands/start';
import { START_COMMAND } from './commands/main';
import { ABOUT_PERSONAL_CENTER } from './actions/aboutPersonalCenters';
import { MAIN_PAGE_ACTION } from './actions/main';
import { PERSONNEL_SELECTION, PS_EVENTS, PS_EVENTS_JOB_FAIRS, PS_EVENTS_MASS_SELECTION, PS_EVENTS_OPEN_SELECTION, PS_EVENTS_ORG_INTERVIEWS, PS_EVENTS_RECRUTING_TOUR, PS_EVENTS_TRADE_UNIONS, PS_EVENTS_WORK_NEARBY, PS_SEARCH, PS_SEARCH_APP_SEARCH_EMPL, PS_SEARCH_TIPS_WRITING_JOB_VACANCIES, PS_SEARCH_VACANSY } from './actions/personnelSelection';

import { getAboutPersonalCenter } from './commands/aboutPersonalCenter';
import { getPersonnelSelection, getPSEvents, getPSEventsJobFairs, getPSEventsMassSelection, getPSEventsOpenSelection, getPSEventsOrgInterviews, getPSEventsRecrutingTour, getPSEventsTradeUnions, getPSEventsWorkNearby, getPSSearchAndSelectionCandidateAppSearchEmployes, getPSSearchAndSelectionCandidates, getPSSearchAndSelectionCandidateTipsWritingJobsVacancies, getPSSearchAndSelectionCandidateVacancies } from './commands/personnelSelection';


import logger from './logger';
import { HELP_ADVICE, HP_DISBLED_PEOPLE, HP_RELOCATION, HP_SPECIFIC_CATEG, HP_TEMPORARY, HP_TRAINING } from './actions/helpAdvice';
import { getHelpAdvice, getHPDisabledPeople, getHPRelocation, getHPSpecificCateg, getHPTemporary, getHPTraining } from './commands/helpAdvice';
import { REPORTING_PC, REPORTING_PC_ADMISSION, REPORTING_PC_BANKRUPTCY_PROCEDURE, REPORTING_PC_DOWNSIZING, REPORTING_PC_IDLE_MODE, REPORTING_PC_JOB_QUOTAS_DISABLED, REPORTING_PC_PART_TIME, REPORTING_PC_REMOTE_WORK } from './actions/reportingPersonalCenter';
import { reportingPCAdmission, reportingPCBankruptcyProcedure, reportingPCDownsizing, reportingPCIdleMode, reportingPCJobQuotasDisabled, reportingPCPartTime, reportingPCRemoteWork, reportingPersonalCenter } from './commands/reportingInPersonalCenter';
import { ANANLYSTIC_RESEARCH, AS_MARKET_REVIEWS, AS_OTHER_SURVEYS, AS_RESEARCH_SURVEY } from './actions/analysticResearch';
import { getAnalysticResearch, getARMarketReviews, getAROtherSurveys, getARRussuinSurvey } from './commands/analyticsResearch';
import { HC_DOCUMENTS, HC_FEEDBACK_FORM, HC_FREQUENTLY_ASKED_QUESTIONS, HC_HOTLINE, HELP_CONSULT } from './actions/supportProgram';
import { hcDocuments, hcFeedbackForm, hcFeedbackThanks, hcFrequentlyAskedQuestions, hcHotline, helpConsult } from './commands/supportProgram';

// настройка перменных виртуального окружения
dotenv.config({ path: '.env'})

//Установка глобального прокси для работы бота
if (process.env.PROXY_USE==="1"){
    setGlobalDispatcher(proxyAgent);
    logger.info('Bot use proxy')
} else {
    logger.info('Bot don`t use proxy')
}

if (!process.env.BOT_TOKEN){
    logger.error('Token not provided')
    throw new Error('Token not provided')
};

let CIVILIAN_REQUEST_API_PATH = ''
let CIVILIAN_REQUEST_API_KEY = ''

if (!process.env.API_PATH){
    logger.error('API_PATH to civilian request not provided')
    throw new Error('API_PATH to civilian request not provided')
}else{
    CIVILIAN_REQUEST_API_PATH = process.env.API_PATH
}

if (!process.env.API_KEY){
    logger.error('API_KEY to civilian request not provided')
    throw new Error('API_KEY to civilian request not provided')
}else{
    CIVILIAN_REQUEST_API_KEY = process.env.API_KEY
}

// Объект, который хранит id пользователей, которые заполняют
// форму обртаной связи
let usersInFillingFeedbackForm = new Set<number>();

const bot = new Bot(process.env.BOT_TOKEN);
logger.info('Bot is start up')

//Установка списка команд в бота
bot.api.setMyCommands(commandsList);

//Обработка не команд
bot.hears(/^(?!\/[a-z]+$).*$/, async(ctx) =>{
    const message = ctx.message; // Полученное сообщение
    const userId = message.sender?.user_id as number
    if (usersInFillingFeedbackForm.has(userId)){
        // Здесь необходимо реализовать скрипт
        // http://localhost:8000/api/v1.0/civilian_requests/
        // отправки на api сообщения 
        let data = {
            user_id: userId.toString(),
            msg: message.body.text
        }
        
        try{
            let response = await axios.post(
                CIVILIAN_REQUEST_API_PATH, data, {
                    headers: {
                        'Api-token': CIVILIAN_REQUEST_API_KEY,
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                }
            );
            if (response.status !== 201){
                logger.info(`User with id ${message.sender?.user_id} error while sending to api: ${response.status} error: ${response.statusText}`)
            }
            logger.info(`User with id ${message.sender?.user_id} write to bot "${message.body.text}" timestamp: ${ctx.message.timestamp} result status: ${response.status} http: ${response}`)
        } catch(error){
            logger.error(`User with id ${message.sender?.user_id} write to bot "${message.body.text}" timestamp: ${ctx.message.timestamp} error: ${error}`)
        }

        usersInFillingFeedbackForm.delete(userId);
        await hcFeedbackThanks(ctx)

    } else {
        await processUnclearMessage(ctx)
        logger.info(`User with id ${message.sender?.user_id} write to bot "${message.body.text}" timestamp: ${ctx.message.timestamp}`)
    }
})

//Обработка команд, которых нет в списке
bot.hears(/^\/\b(?!(?:start|rir|contacts|site)\b)[a-z]+\b$/, async(ctx) => {
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

//Обработка команды /pip
bot.command(RIR_COMMAND, async(ctx) => {
    await GoToRabotaInRussia(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use command ${RIR_COMMAND}  timestamp: ${ctx.message.timestamp}`)
})

//Обработка команды /contacts
bot.command(CONTACT_COMMAND, async(ctx) => {
    await goVkGroup(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use command ${CONTACT_COMMAND}  timestamp: ${ctx.message.timestamp}`)
})

//Обработка команды /site
bot.command(SITE_COMMAND, async(ctx) => {
    await goVkGroup(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use command ${SITE_COMMAND}  timestamp: ${ctx.message.timestamp}`)
})

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

//Подбор персонала -> Мероприятия по подбору
bot.action(PS_EVENTS, async(ctx) => {
    await getPSEvents(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Подбор персонала -> Мероприятия по подбору__ timestamp: ${ctx.update.timestamp}`)
})

//Подбор персонала -> Мероприятия по подбору -> Ярмарки вакансий 
bot.action(PS_EVENTS_JOB_FAIRS, async(ctx) => {
    await getPSEventsJobFairs(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Подбор персонала -> Мероприятия по подбору -> Ярмарки вакансий__ timestamp: ${ctx.update.timestamp}`)
})

//Подбор персонала -> Мероприятия по подбору -> Открытый отбор
bot.action(PS_EVENTS_OPEN_SELECTION, async(ctx) => {
    await getPSEventsOpenSelection(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Подбор персонала -> Мероприятия по подбору -> Открытый отбор__ timestamp: ${ctx.update.timestamp}`)
})

//Подбор персонала -> Мероприятия по подбору -> Массовый подбор
bot.action(PS_EVENTS_MASS_SELECTION, async(ctx) => {
    await getPSEventsMassSelection(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Подбор персонала -> Мероприятия по подбору -> Массовый подбор__ timestamp: ${ctx.update.timestamp}`)
})

//Подбор персонала -> Мероприятия по подбору -> Организация собеседований
bot.action(PS_EVENTS_ORG_INTERVIEWS, async(ctx) => {
    await getPSEventsOrgInterviews(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Подбор персонала -> Мероприятия по подбору -> Организация собеседований__ timestamp: ${ctx.update.timestamp}`)
})

//Подбор персонала -> Мероприятия по подбору -> Профтуры 
bot.action(PS_EVENTS_TRADE_UNIONS, async(ctx) => {
    await getPSEventsTradeUnions(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Подбор персонала -> Мероприятия по подбору -> Профтуры__ timestamp: ${ctx.update.timestamp}`)
})

//Подбор персонала -> Мероприятия по подбору -> Рекрутинговый тур
bot.action(PS_EVENTS_RECRUTING_TOUR, async(ctx) => {
    await getPSEventsRecrutingTour(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Подбор персонала -> Мероприятия по подбору -> Рекрутинговый тур__ timestamp: ${ctx.update.timestamp}`)
})

//Подбор персонала -> Мероприятия по подбору -> «Работа рядом»
bot.action(PS_EVENTS_WORK_NEARBY, async(ctx) => {
    await getPSEventsWorkNearby(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Подбор персонала -> Мероприятия по подбору -> «Работа рядом»__ timestamp: ${ctx.update.timestamp}`)
})

//Программы поддержки
bot.action(HELP_ADVICE, async(ctx) => {
    await getHelpAdvice(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Программы поддержки__ timestamp: ${ctx.update.timestamp}`)
})

//Программы поддержки -> Трудоустройство инвалидов
bot.action(HP_DISBLED_PEOPLE, async(ctx) => {
    await getHPDisabledPeople(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Программы поддержки -> Трудоустройство инвалидов__ timestamp: ${ctx.update.timestamp}`)
})

//Программы поддержки -> Найм отдельных категорий
bot.action(HP_SPECIFIC_CATEG, async(ctx) => {
    await getHPSpecificCateg(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Программы поддержк -> Найм отдельных категорий__ timestamp: ${ctx.update.timestamp}`)
})

// Переезд работников из другой местности 
bot.action(HP_RELOCATION, async(ctx) => {
    await getHPRelocation(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Программы поддержк -> Переезд работников из другой местности __ timestamp: ${ctx.update.timestamp}`)
})

// Обучение и переквалификация сотрудников 
bot.action(HP_TRAINING, async(ctx) => {
    await getHPTraining(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Программы поддержк -> Обучение и переквалификация сотрудников__ timestamp: ${ctx.update.timestamp}`)
})

// Организация временной занятости
bot.action(HP_TEMPORARY, async(ctx) => {
    await getHPTemporary(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Программы поддержк -> Организация временной занятости__ timestamp: ${ctx.update.timestamp}`)
})

//Отчетность в ЦЗН
bot.action(REPORTING_PC, async(ctx) =>{
    await reportingPersonalCenter(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Отчетность в ЦЗН__ timestamp: ${ctx.update.timestamp}`)
})

//Режим простоя
bot.action(REPORTING_PC_IDLE_MODE, async(ctx) => {
    await reportingPCIdleMode(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Отчетность в ЦЗН -> Режим простоя__ timestamp: ${ctx.update.timestamp}`)
})

//Процедура банкротства
bot.action(REPORTING_PC_BANKRUPTCY_PROCEDURE, async(ctx) => {
    await reportingPCBankruptcyProcedure(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Отчетность в ЦЗН -> Процедура банкротства__ timestamp: ${ctx.update.timestamp}`)
})

//Сокращение численности/ликвидация
bot.action(REPORTING_PC_DOWNSIZING, async(ctx) => {
    await reportingPCDownsizing(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Отчетность в ЦЗН -> Сокращение численности/ликвидация__ timestamp: ${ctx.update.timestamp}`)
})

// Неполный рабочий день/сокращенный рабочий день
bot.action(REPORTING_PC_PART_TIME, async(ctx) => {
    await reportingPCPartTime(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Отчетность в ЦЗН -> Неполный рабочий день/сокращенный рабочий день__ timestamp: ${ctx.update.timestamp}`)
})

//Квотирование рабочих мест для инвалидов
bot.action(REPORTING_PC_JOB_QUOTAS_DISABLED, async(ctx) => {
    await reportingPCJobQuotasDisabled(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Отчетность в ЦЗН -> Квотирование рабочих мест для инвалидов__ timestamp: ${ctx.update.timestamp}`)
})

//Дистанционная работа
bot.action(REPORTING_PC_REMOTE_WORK, async(ctx) => {
    await reportingPCRemoteWork(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Отчетность в ЦЗН -> Дистанционная работа__ timestamp: ${ctx.update.timestamp}`)
})

//Приём по направлению ЦЗН или отказ в трудоустройстве
bot.action(REPORTING_PC_ADMISSION, async(ctx) => {
    await reportingPCAdmission(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Отчетность в ЦЗН -> Приём по направлению ЦЗН или отказ в трудоустройстве__ timestamp: ${ctx.update.timestamp}`)
})

// Опросы и исследования
bot.action(ANANLYSTIC_RESEARCH, async(ctx) => {
    await getAnalysticResearch(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Опросы и исследования__ timestamp: ${ctx.update.timestamp}`)
})

// Всероссийский опрос работодателей
bot.action(AS_RESEARCH_SURVEY, async(ctx) => {
    await getARRussuinSurvey(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Опросы и исследования -> Всероссийский опрос работодателей__ timestamp: ${ctx.update.timestamp}`)
})

// Обзоры рынка труда
bot.action(AS_MARKET_REVIEWS, async(ctx) => {
    await getARMarketReviews(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Опросы и исследования -> Обзоры рынка труда__ timestamp: ${ctx.update.timestamp}`)
})

//Другие опросы и исследования
bot.action(AS_OTHER_SURVEYS, async(ctx) => {
    await getAROtherSurveys(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Опросы и исследования -> Другие опросы и исследования__ timestamp: ${ctx.update.timestamp}`)
})

// Помощь и консультации
bot.action(HELP_CONSULT, async(ctx) => {
    await helpConsult(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Помощь и консультации__ timestamp: ${ctx.update.timestamp}`)
})

// Часто задаваемые вопросы
bot.action(HC_FREQUENTLY_ASKED_QUESTIONS, async(ctx) => {
    await hcFrequentlyAskedQuestions(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Помощь и консультации -> Часто задаваемые вопросы__ timestamp: ${ctx.update.timestamp}`)
})

// Горячая линия
bot.action(HC_HOTLINE, async(ctx) => {
    await hcHotline(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Помощь и консультации -> Горячая линия__ timestamp: ${ctx.update.timestamp}`)
})

//Документы и бланки
bot.action(HC_DOCUMENTS, async(ctx) => {
    await hcDocuments(ctx)
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Помощь и консультации -> Документы и бланки__ timestamp: ${ctx.update.timestamp}`)
})

//Форма обратной связи
bot.action(HC_FEEDBACK_FORM, async(ctx) => {
    await hcFeedbackForm(ctx)
    if (ctx.user && 'user_id' in ctx.user) {
        const userId = ctx.user.user_id;
        usersInFillingFeedbackForm.add(userId);
    }
    logger.info(`User with id ${(ctx.user as any)?.user_id} use btn __Помощь и консультации -> Форма обратной связи__ timestamp: ${ctx.update.timestamp}`)
})

bot.catch(() => {
    logger.error('Bot is down')
})

bot.start();
