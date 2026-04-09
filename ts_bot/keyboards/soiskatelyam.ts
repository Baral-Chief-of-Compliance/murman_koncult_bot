import { Keyboard } from "@maxhub/max-bot-api";

import { S_HOW_REGISTER, S_UNEPLOYMENT_BENEFITS,
    S_SEARCH_WORK, S_FREE_EDUCATION, S_CAREER_DEVELOPMENT,
    S_SERVICES_FOR_YOUTH, S_ENTREPRENEURSHIP, S_HELP
} from "../actions/soiskatelyam";
import { goMainPageKeyboard } from "./main";


export const SoiskatelyamMainKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.callback('Как встать на учет?', S_HOW_REGISTER)],
        [Keyboard.button.callback('Пособие по безработице', S_UNEPLOYMENT_BENEFITS)],
        [Keyboard.button.callback('Поиск работы	', S_SEARCH_WORK)],
        [Keyboard.button.callback('Бесплатное обучение', S_FREE_EDUCATION)],
        [Keyboard.button.callback('Карьерное развитие', S_CAREER_DEVELOPMENT)],
        [Keyboard.button.callback('Сервисы для молодежи', S_SERVICES_FOR_YOUTH)],
        [Keyboard.button.callback('Предпринимательство', S_ENTREPRENEURSHIP)],
        [Keyboard.button.callback('Помощь и консультации', S_HELP)],
        goMainPageKeyboard
    ]
)