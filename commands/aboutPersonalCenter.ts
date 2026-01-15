//О кадровом центре
import { Keyboard, Context } from "@maxhub/max-bot-api";

import { GO_MAIN_PAGE_BTN } from "./start";
import { KIROVSK_LINK, MONCHEGORSK_LINK, KANDALAKSHA_LINK,
    SEVEROMORSK_LINK, KOLA_LINK, PECHENGA_LINK,
    KOVDOR_LINK, ALEXANDR_LINK, MURMANSK_LINK,
    APATIT_LINK, OLENEGORSK_LINK, LOVOSERO_LINK,
    POLARZORI_LINK, TERSKY_LINK
 } from "../links/personalCenters"; 


export const ABOUT_PERSONAL_CENTER = 'about_pс'


const callBackKeyboard = Keyboard.inlineKeyboard([
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
    GO_MAIN_PAGE_BTN,
])

export async function getAboutPersonalCenter(ctx:Context){
    await ctx.reply(`
🔍 <b>О кадровом центре</b>

Кадровый центр Мурманской области – ваш надежный партнер в решении кадровых вопросов!

<ul>
    <li>Юридический адрес: г. Мурманск, ул. Академика Книповича, д. 48</li>
    <li>Телефон:  8 (8152) 56-67-07 (единый контакт-центр)</li>
    <li>Email: murmansk@murman-zan.ru</li>
</ul>
Структура: 14 территориальных подразделений:`, {attachments: [callBackKeyboard], format: 'html'})
}