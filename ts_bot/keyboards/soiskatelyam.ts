import { Keyboard } from "@maxhub/max-bot-api";

import { S_HOW_REGISTER, S_UNEPLOYMENT_BENEFITS,
    S_SEARCH_WORK, S_FREE_EDUCATION, S_CAREER_DEVELOPMENT,
    S_SERVICES_FOR_YOUTH, S_ENTREPRENEURSHIP, S_HELP,
    S_HOW_REGISTER_ORDER, S_HOW_REGISTER_WHO,
    S_UNEPLOYMENT_BENEFITS_MAX, S_UNEPLOYMENT_BENEFITS_MIN,
    S_UNEPLOYMENT_BENEFITS_OLD, S_UNEPLOYMENT_BENEFITS_ORPHANS,
    S_SEARCH_WORK_JOB_SELECTION,
    S_SEARCH_WORK_MY_RESUME,
    S_SEARCH_WORK_MY_INTERVIEW,
    S_SEARCH_WORK_TEMPORARY_EMPLOYMENT,
    S_SEARCH_WORK_JOB_FAIRS, S_FREE_EDUCATION_NON_WORKER,
    S_FREE_EDUCATION_PROJECT_PERSONNEL,
    S_CAREER_DEVELOPMENT_CAREER_GUIDANCE,
    S_CAREER_DEVELOPMENT_ADAPTATION,
    S_CAREER_DEVELOPMENT_PSY_SUPPORT,
    S_HELP_QUESTIONS_ANSWERS,
    S_HELP_HOTLINE,
    S_HELP_FEEDBACK
} from "../actions/soiskatelyam";
import { goMainPageKeyboard } from "./main";
import { BACK_BTN_NAME } from "./btnNames";
import { SOISKATELYAM } from "../actions/list";
import { NEAREST_JOB_FAIR_LINK } from "../links/personnelSelection";
import { EDUCATION_PROGRAMMS_LINK, EDUCATION_CATEGORIES_LINK, YOUTH_SERVICES_LINK } from "../links/soiskatelyam";


const BTN_BACK = [Keyboard.button.callback(BACK_BTN_NAME, SOISKATELYAM)] 


//Главная клавиатура в пункте соискателям
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

// Клавиатура 2.1. Как встать на учет??
export const SosikatelyamHowRegisterKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.callback('Порядок признания безработным', S_HOW_REGISTER_ORDER)],
        [Keyboard.button.callback('Кто не может быть признан безработным?', S_HOW_REGISTER_WHO)],
        BTN_BACK,
        goMainPageKeyboard
    ]
)

// Клавиатура для детей пункта 2.1
export const SosikatelyamHowRegisterChildrenKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.callback(BACK_BTN_NAME, S_HOW_REGISTER)],
        goMainPageKeyboard
    ]
)

//Клавиатура 2.2 Пособие по безработице
export const SosikatelyamUneploymentBenefitsKeyboard = Keyboard.inlineKeyboard(
    [   

        [Keyboard.button.callback('Максимальное пособие', S_UNEPLOYMENT_BENEFITS_MAX)],
        [Keyboard.button.callback('Минимальное пособие', S_UNEPLOYMENT_BENEFITS_MIN)],
        [Keyboard.button.callback('Пособие предпенсионерам', S_UNEPLOYMENT_BENEFITS_OLD)],
        [Keyboard.button.callback('Выплаты детям-сиротам', S_UNEPLOYMENT_BENEFITS_ORPHANS)],
        BTN_BACK,
        goMainPageKeyboard
    ]
)

//Клавиатура для детей пункта 2.2
export const SosikatelyamUneploymentBenefitsChildrenKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.callback(BACK_BTN_NAME, S_UNEPLOYMENT_BENEFITS)],
        goMainPageKeyboard
    ]
)



// Клавиатура для 2.3. Поиск работы
export const SosikatelyamSearchWorkKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.callback('Подбор работы', S_SEARCH_WORK_JOB_SELECTION)],
        [Keyboard.button.callback('Мое резюме', S_SEARCH_WORK_MY_RESUME)],
        [Keyboard.button.callback('Мое собеседование', S_SEARCH_WORK_MY_INTERVIEW)],
        [Keyboard.button.callback('Временная занятость', S_SEARCH_WORK_TEMPORARY_EMPLOYMENT)],
        [Keyboard.button.callback('Ярмарки вакансий', S_SEARCH_WORK_JOB_FAIRS)],
        BTN_BACK,
        goMainPageKeyboard
    ]
)

// Клавиатура для детей 2.3. Поиск работы
export const SosikatelyamSearchWorkChildKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.callback(BACK_BTN_NAME, S_SEARCH_WORK)],
        goMainPageKeyboard
    ]
)

// Клавиатура для 2.3.5. Ярмарки вакансий
export const SosikatelyamSearchWorkChildJobFairKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.link('Ярмарки вакансий', NEAREST_JOB_FAIR_LINK)],
        [Keyboard.button.callback(BACK_BTN_NAME, S_SEARCH_WORK)],
        goMainPageKeyboard
    ]
)

// Клавиатура 2.4. Бесплатное обучение
export const SosikatelyamFreeEducationKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.callback('Обучение безработных граждан', S_FREE_EDUCATION_NON_WORKER)],
        [Keyboard.button.callback('Обучение по нацпроекту «Кадры»', S_FREE_EDUCATION_PROJECT_PERSONNEL)],
        BTN_BACK,
        goMainPageKeyboard
    ]
)


// Клавиатура 2.4.1. Обучение безработных граждан
export const SosikatelyamFreeEducationNonWorkerKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.link('Доступные программы', EDUCATION_PROGRAMMS_LINK)],
        [Keyboard.button.callback(BACK_BTN_NAME, S_FREE_EDUCATION)],
        goMainPageKeyboard
    ]
)

// Клавиатура 2.4.2. Обучение по нацпроекту «Кадры»
export const SosikatelyamFreeEducationProjectPersonnel = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.link('Перечень категорий', EDUCATION_CATEGORIES_LINK)],
        [Keyboard.button.callback(BACK_BTN_NAME, S_FREE_EDUCATION)],
        goMainPageKeyboard
    ]
)

//Клавиатура 2.5. Карьерное развитие
export const SosikatelyamCareerDevelopmentKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.callback('Профориентация', S_CAREER_DEVELOPMENT_CAREER_GUIDANCE)],
        [Keyboard.button.callback('Адаптация на рынке труда', S_CAREER_DEVELOPMENT_ADAPTATION)],
        [Keyboard.button.callback('Психологическая поддержка', S_CAREER_DEVELOPMENT_PSY_SUPPORT)],
        BTN_BACK,
        goMainPageKeyboard
    ]
)

//Клавиатура для детей 2.5. Карьерное развитие
export const SosikatelyamCareerDevelopmentChildKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.callback(BACK_BTN_NAME, S_CAREER_DEVELOPMENT)],
        goMainPageKeyboard
    ]
)

// Клавиатура для 2.6. Сервисы для молодежи 
export const SoiskatelyamServicesForYouthKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.link('Узнать подробнее', YOUTH_SERVICES_LINK)], 
        BTN_BACK,
        goMainPageKeyboard
    ]
)

// Клавиатура для 2.7.  Предпринимательство
export const SoiskatelyamEntrepreneurShipKeyboard = Keyboard.inlineKeyboard(
    [
        BTN_BACK,
        goMainPageKeyboard
    ]
)

// Клавиатура для 2.8. Помощь и консультации
export const SoiskatelyamHelpKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.callback('Часто задаваемые вопросы',S_HELP_QUESTIONS_ANSWERS)],
        [Keyboard.button.callback('Горячая линия',S_HELP_HOTLINE)],
        [Keyboard.button.callback('Форма обратной связи',S_HELP_FEEDBACK)],
        BTN_BACK,
        goMainPageKeyboard
    ]
)

// Клавиатура для детей 2.8. Помощь и консультации
export const SoiskatelyamHelpChildKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.callback(BACK_BTN_NAME, S_HELP)],
        goMainPageKeyboard
    ]
)