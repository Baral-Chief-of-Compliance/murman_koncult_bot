import { Keyboard } from "@maxhub/max-bot-api";

import { goMainPageKeyboard } from "./main";
import { HP_DISBLED_PEOPLE, HP_SPECIFIC_CATEG,
    HP_RELOCATION, HP_TRAINING,
    HP_TEMPORARY, HELP_ADVICE
 } from "../actions/helpAdvice";
import { BACK_BTN_NAME } from "./btnNames";
import { HP_TRAINING_LINK } from "../links/helpAdvice";


const goHelpAdviceBackKeyboard = [Keyboard.button.callback(BACK_BTN_NAME, HELP_ADVICE, {intent: 'default'})]

export const helpAdviceKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.callback('Трудоустройство инвалидов', HP_DISBLED_PEOPLE)],
        [Keyboard.button.callback('Найм отдельных категорий', HP_SPECIFIC_CATEG)],
        [Keyboard.button.callback('Переезд работников из другой местности', HP_RELOCATION)],
        [Keyboard.button.callback('Обучение и переквалификация сотрудников', HP_TRAINING)],
        [Keyboard.button.callback('Организация временной занятости', HP_TEMPORARY)],
        goMainPageKeyboard
    ]
)

export const helpAdviceChildrenKeyboard = Keyboard.inlineKeyboard(
    [
        goHelpAdviceBackKeyboard,
        goMainPageKeyboard
    ]
)

export const helpAdviceTrainingKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.link('Доступные программ обучения ', HP_TRAINING_LINK)],
        goHelpAdviceBackKeyboard,
        goMainPageKeyboard
    ]
)