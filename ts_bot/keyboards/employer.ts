import { Keyboard } from "@maxhub/max-bot-api";

import { goMainPageKeyboard } from "./main";


export const EmployerMainKeyboard = Keyboard.inlineKeyboard(
     [
         [Keyboard.button.callback('Подбор персонала', PERSONNEL_SELECTION, {intent: 'default'})],
         [Keyboard.button.callback('Программы поддержки', HELP_ADVICE, {intent: 'default'})],
         [Keyboard.button.callback('Отчетность в ЦЗН', REPORTING_PC, {intent: 'default'})],
         [Keyboard.button.callback('Аналитика и исследования', ANANLYSTIC_RESEARCH, {intent: 'default'})],
         [Keyboard.button.callback('Помощь и консультации', HELP_CONSULT, {intent: 'default'})],
	goMainPageKeyboard
     ]
 )