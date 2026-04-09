import { Keyboard } from "@maxhub/max-bot-api";

import { MAIN_PAGE_ACTION } from "../actions/main";
import { ABOUT_PERSONAL_CENTER } from "../actions/aboutPersonalCenters";
import { PERSONNEL_SELECTION } from "../actions/personnelSelection";
import { HELP_ADVICE } from "../actions/helpAdvice";
import { REPORTING_PC } from "../actions/reportingPersonalCenter";
import { ANANLYSTIC_RESEARCH } from "../actions/analysticResearch";
import { HELP_CONSULT } from "../actions/supportProgram";
import { RABOTA_IN_RUSSIA_LINK } from "../links/personnelSelection";
import { MAIN_SITE_LINK, VK_LINK } from "../links/main";
import { SOISKATELYAM, SVO, EMPLOYERS } from "../actions/list";

export const goMainPageKeyboard = [Keyboard.button.callback('🏠 На главную', MAIN_PAGE_ACTION, {intent: 'default'})]

// export const mainKeyboard = Keyboard.inlineKeyboard(
//     [
//         [Keyboard.button.callback('О кадровом центре', ABOUT_PERSONAL_CENTER, {intent: 'default'})],
//         [Keyboard.button.callback('Подбор персонала', PERSONNEL_SELECTION, {intent: 'default'})],
//         [Keyboard.button.callback('Программы поддержки', HELP_ADVICE, {intent: 'default'})],
//         [Keyboard.button.callback('Отчетность в ЦЗН', REPORTING_PC, {intent: 'default'})],
//         [Keyboard.button.callback('Аналитика и исследования', ANANLYSTIC_RESEARCH, {intent: 'default'})],
//         [Keyboard.button.callback('Помощь и консультации', HELP_CONSULT, {intent: 'default'})],
//     ]
// )

export const mainKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.callback('О кадровом центре', ABOUT_PERSONAL_CENTER, {intent: 'default'})],
        [Keyboard.button.callback('Соискателям', SOISKATELYAM, {intent: 'default'})],
        [Keyboard.button.callback('Участникам СВО', SVO, {intent: 'default'})],
        [Keyboard.button.callback('Работодателям', EMPLOYERS, {intent: 'default'})],
    ]
)

export const rabotaInRussiaKeyboard = Keyboard.inlineKeyboard([
    [Keyboard.button.link('Портал «Работа России»', RABOTA_IN_RUSSIA_LINK)],
    goMainPageKeyboard
])

export const vkLinkKeyboard = Keyboard.inlineKeyboard([
    [Keyboard.button.link('Группа ЦЗН ВКонтакте', VK_LINK)],
    goMainPageKeyboard
])

export const mainCznSiteKeyboard = Keyboard.inlineKeyboard([
    [Keyboard.button.link('Официальный сайт', MAIN_SITE_LINK)],
    goMainPageKeyboard
])