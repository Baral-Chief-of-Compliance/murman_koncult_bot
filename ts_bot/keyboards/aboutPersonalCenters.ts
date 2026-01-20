import { Keyboard } from "@maxhub/max-bot-api";

import { KIROVSK_LINK, MONCHEGORSK_LINK, KANDALAKSHA_LINK,
    SEVEROMORSK_LINK, KOLA_LINK, PECHENGA_LINK,
    KOVDOR_LINK, ALEXANDR_LINK, MURMANSK_LINK,
    APATIT_LINK, OLENEGORSK_LINK, LOVOSERO_LINK,
    POLARZORI_LINK, TERSKY_LINK
 } from "../links/personalCenters";
import { goMainPageKeyboard } from "./main";

export const personalAddressKeyboard = Keyboard.inlineKeyboard([
    [Keyboard.button.link('Кировский кадровый центр', KIROVSK_LINK)],
    [Keyboard.button.link('Мончегорский кадровый центр', MONCHEGORSK_LINK)],
    [Keyboard.button.link('Кандалакшский кадровый центр', KANDALAKSHA_LINK)],
    [Keyboard.button.link('Североморский кадровый центр', SEVEROMORSK_LINK)],
    [Keyboard.button.link('Кольский кадровый центр', KOLA_LINK)],
    [Keyboard.button.link('Печенгский кадровый центр', PECHENGA_LINK)],
    [Keyboard.button.link('Ковдорский кадровый центр', KOVDOR_LINK)],
    [Keyboard.button.link('Александровский кадровый центр', ALEXANDR_LINK)],
    [Keyboard.button.link('Мурманский кадровый центр', MURMANSK_LINK)],
    [Keyboard.button.link('Апатитcкий кадровый центр', APATIT_LINK)],
    [Keyboard.button.link('Оленегорский кадровый центр', OLENEGORSK_LINK)],
    [Keyboard.button.link('Ловозерский кадровый центр', LOVOSERO_LINK)],
    [Keyboard.button.link('Полярнозоринский кадровый центр', POLARZORI_LINK)],
    [Keyboard.button.link('Терский кадровый центр', TERSKY_LINK)],
    goMainPageKeyboard
])