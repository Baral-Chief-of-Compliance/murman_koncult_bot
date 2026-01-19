import { Keyboard } from "@maxhub/max-bot-api";

import { goMainPageKeyboard } from "./main";
import { BACK_BTN_NAME } from "./btnNames";
import { ANANLYSTIC_RESEARCH, AS_MARKET_REVIEWS, AS_OTHER_SURVEYS, AS_RESEARCH_SURVEY } from "../actions/analysticResearch";
import { AR_ALL_RUSSIA_SURVEY, AR_MARKET_REVIEWS_LINK } from "../links/analysticResearch";


const backToAnalysticResearchKeyboard = [Keyboard.button.callback(BACK_BTN_NAME, ANANLYSTIC_RESEARCH)]

export const toAnalysticResearchKeyboard = Keyboard.inlineKeyboard([
    [Keyboard.button.callback('Всероссийский опрос работодателей', AS_RESEARCH_SURVEY)],
    [Keyboard.button.callback('Обзоры рынка труда', AS_MARKET_REVIEWS)],
    [Keyboard.button.callback('Другие опросы и исследования', AS_OTHER_SURVEYS)],
    goMainPageKeyboard
])

export const ARResearchSurveyKeyboard = Keyboard.inlineKeyboard([
    [Keyboard.button.link('Участвовать сейчас', AR_ALL_RUSSIA_SURVEY)],
    backToAnalysticResearchKeyboard,
    goMainPageKeyboard
])

export const ARMarketReviewsKeyboard = Keyboard.inlineKeyboard([
    [Keyboard.button.link('Открыть обзоры ', AR_MARKET_REVIEWS_LINK)],
    backToAnalysticResearchKeyboard,
    goMainPageKeyboard
])

export const toAnalysticResearchChildKeyboard = Keyboard.inlineKeyboard([
    backToAnalysticResearchKeyboard,
    goMainPageKeyboard
])