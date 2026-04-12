import { Keyboard } from "@maxhub/max-bot-api";

import { goMainPageKeyboard } from "./main";
import { BACK_BTN_NAME } from "./btnNames";
import { SVO } from "../actions/list";


import { SVO_HERO_PAYMENT } from "../links/svo";


//Клавиатура для пункта про сво
export const SvoKeyboard = Keyboard.inlineKeyboard(
	[
		[Keyboard.button.link("Зарплата Героев", SVO_HERO_PAYMENT)]
		goMainPageKeyboard
	]
)