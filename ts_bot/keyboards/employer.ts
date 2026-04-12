import { Keyboard } from "@maxhub/max-bot-api";

import { goMainPageKeyboard } from "./main";

import { PERSONNEL_SELECTION } from "../actions/personnelSelection";
import { HELP_ADVICE } from "../actions/helpAdvice";
import { REPORTING_PC } from "../actions/reportingPersonalCenter";
import { ANANLYSTIC_RESEARCH } from "../actions/analysticResearch";
import { HELP_CONSULT } from "../actions/supportProgram";

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