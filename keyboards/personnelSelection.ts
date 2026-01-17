import { Keyboard } from "@maxhub/max-bot-api";

import { PS_SEARCH, PS_EVENTS, PERSONNEL_SELECTION,
    PS_SEARCH_APP_SEARCH_EMPL, PS_SEARCH_VACANSY, PS_SEARCH_TIPS_WRITING_JOB_VACANCIES
 } from "../actions/personnelSelection";
import { goMainPageKeyboard } from "./main";
import { BACK_BTN_NAME } from "./btnNames";
import { RABOTA_IN_RUSSIA_LINK } from "../links/personnelSelection";


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