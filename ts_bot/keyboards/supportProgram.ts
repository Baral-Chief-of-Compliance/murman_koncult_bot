import { Keyboard } from "@maxhub/max-bot-api";

import { goMainPageKeyboard } from "./main";
import { BACK_BTN_NAME } from "./btnNames";
import { HC_DOCUMENTS, HC_FEEDBACK_FORM, HC_FREQUENTLY_ASKED_QUESTIONS, HC_HOTLINE, HELP_CONSULT } from "../actions/supportProgram";
import { HELP_CONSULT_DOCUMENTS_LINK, HELP_CONSULT_FEEDBACK_FORM } from "../links/supportProgram";

const backHelpConsultKeyboard = [Keyboard.button.callback(BACK_BTN_NAME, HELP_CONSULT)]

export const helpConsultKeyboard = Keyboard.inlineKeyboard([
    [Keyboard.button.callback('Часто задаваемые вопросы', HC_FREQUENTLY_ASKED_QUESTIONS)],
    [Keyboard.button.callback('Горячая линия', HC_HOTLINE)],
    [Keyboard.button.callback('Документы и бланки', HC_DOCUMENTS)],
    [Keyboard.button.callback('Форма обратной связи', HC_FEEDBACK_FORM)],
    backHelpConsultKeyboard,
    goMainPageKeyboard
])

export const helpConsultChildKeyboard = Keyboard.inlineKeyboard([
    backHelpConsultKeyboard,
    goMainPageKeyboard
])

export const helpConsultDocumentsKeyboard = Keyboard.inlineKeyboard([
    [Keyboard.button.link('Формы и шаблоны для работы', HELP_CONSULT_DOCUMENTS_LINK)],
    backHelpConsultKeyboard,
    goMainPageKeyboard
])

export const helpConsultFeedbackKeyboard = Keyboard.inlineKeyboard([
    [Keyboard.button.link('Форма обратной связи', HELP_CONSULT_FEEDBACK_FORM)],
    backHelpConsultKeyboard,
    goMainPageKeyboard
])