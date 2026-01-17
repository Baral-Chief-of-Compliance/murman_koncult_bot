import { Keyboard } from "@maxhub/max-bot-api";

import { PS_SEARCH, PS_EVENTS, PERSONNEL_SELECTION,
    PS_SEARCH_APP_SEARCH_EMPL, PS_SEARCH_VACANSY,
    PS_SEARCH_TIPS_WRITING_JOB_VACANCIES,
    PS_EVENTS_JOB_FAIRS,
    PS_EVENTS_OPEN_SELECTION,
    PS_EVENTS_MASS_SELECTION,
    PS_EVENTS_ORG_INTERVIEWS,
    PS_EVENTS_TRADE_UNIONS,
    PS_EVENTS_RECRUTING_TOUR,
    PS_EVENTS_WORK_NEARBY
 } from "../actions/personnelSelection";
import { goMainPageKeyboard } from "./main";
import { BACK_BTN_NAME } from "./btnNames";
import { NEAREST_JOB_FAIR_LINK, RABOTA_IN_RUSSIA_LINK } from "../links/personnelSelection";


const backToPersonnelSelectionKeyboard = [Keyboard.button.callback(BACK_BTN_NAME, PERSONNEL_SELECTION, {intent: 'default'})]

export const personnelSelectionMainKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.callback('Поиск и подбор кандидатов', PS_SEARCH)],
        [Keyboard.button.callback('Мероприятия по подбору', PS_EVENTS)],
        goMainPageKeyboard
    ]
)

export const psSearchAndSelectionKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.callback('Размещение вакансий', PS_SEARCH_VACANSY)],
        [Keyboard.button.callback('Подача заявления на поиск работников', PS_SEARCH_APP_SEARCH_EMPL)],
        [Keyboard.button.callback('Советы по составлению вакансий', PS_SEARCH_TIPS_WRITING_JOB_VACANCIES)],
        backToPersonnelSelectionKeyboard,
        goMainPageKeyboard
    ]
)

const backpsSearchAndSelectionKeyboard = [Keyboard.button.callback(BACK_BTN_NAME, PS_SEARCH)]

export const psSearchAndSelectionVacanciesKeyboard = Keyboard.inlineKeyboard(
    [   
        [Keyboard.button.link('«Работа России»', RABOTA_IN_RUSSIA_LINK)],
        backpsSearchAndSelectionKeyboard,
        goMainPageKeyboard
    ]
)

export const psSearchAndSelectionTipsKeyboard = Keyboard.inlineKeyboard(
    [   
        backpsSearchAndSelectionKeyboard,
        goMainPageKeyboard
    ]
)

export const psEventsKeyboard = Keyboard.inlineKeyboard([
    [Keyboard.button.callback('Ярмарки вакансий ', PS_EVENTS_JOB_FAIRS)],
    [Keyboard.button.callback('Открытый отбор', PS_EVENTS_OPEN_SELECTION)],
    [Keyboard.button.callback('Массовый подбор', PS_EVENTS_MASS_SELECTION)],
    [Keyboard.button.callback('Организация собеседований ', PS_EVENTS_ORG_INTERVIEWS)],
    [Keyboard.button.callback('Профтуры', PS_EVENTS_TRADE_UNIONS)],
    [Keyboard.button.callback('Рекрутинговый тур', PS_EVENTS_RECRUTING_TOUR)],
    [Keyboard.button.callback('Проект «Работа рядом»', PS_EVENTS_WORK_NEARBY)],
    // [Keyboard.button.callback('Иные мероприятия', PS_EVENTS_OTHER)],
    backToPersonnelSelectionKeyboard,
    goMainPageKeyboard
])

export const psEventsJobFairsKeyboard = Keyboard.inlineKeyboard([
    [Keyboard.button.link('Ближайшая ярмарка вакансий', NEAREST_JOB_FAIR_LINK)],
    [Keyboard.button.callback(BACK_BTN_NAME, PS_EVENTS, {intent: 'default'})],
    goMainPageKeyboard
])

export const psEventsChildrenKeyboard = Keyboard.inlineKeyboard([
    [Keyboard.button.callback(BACK_BTN_NAME, PS_EVENTS, {intent: 'default'})],
    goMainPageKeyboard
])
