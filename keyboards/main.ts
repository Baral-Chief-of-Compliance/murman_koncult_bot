import { Keyboard } from "@maxhub/max-bot-api";

import { MAIN_PAGE_ACTION } from "../actions/main";
import { ABOUT_PERSONAL_CENTER } from "../actions/aboutPersonalCenters";
import { PERSONNEL_SELECTION } from "../actions/personnelSelection";
import { HELP_ADVICE } from "../actions/helpAdvice";

export const goMainPageKeyboard = [Keyboard.button.callback('🏠 На главную', MAIN_PAGE_ACTION, {intent: 'default'})]

export const mainKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.callback('О кадровом центре', ABOUT_PERSONAL_CENTER, {intent: 'default'})],
        [Keyboard.button.callback('Подбор персонала', PERSONNEL_SELECTION, {intent: 'default'})],
        [Keyboard.button.callback('Программы поддержки', HELP_ADVICE, {intent: 'default'})],
        [Keyboard.button.callback('Отчетность в ЦЗН', ABOUT_PERSONAL_CENTER, {intent: 'default'})],
        [Keyboard.button.callback('Аналитика и исследования', ABOUT_PERSONAL_CENTER, {intent: 'default'})],
        [Keyboard.button.callback('Помощь и консультации', ABOUT_PERSONAL_CENTER, {intent: 'default'})],
    ]
)