//О кадровом центре
import { Context } from "@maxhub/max-bot-api";

import { personalAddressKeyboard } from "../keyboards/aboutPersonalCenters";


export async function getAboutPersonalCenter(ctx:Context){
    await ctx.reply(`
🔍 <b>О кадровом центре</b>

Кадровый центр <b>Мурманской области</b> – ваш надежный партнер в решении кадровых вопросов!

📍 Юридический адрес: <b>г. Мурманск, ул. Академика Книповича, д. 48</b>

☎️ Телефон:  <b>8 (8152) 56-67-07 (единый контакт-центр)</b>

📧 Email: <b>murmansk@murman-zan.ru</b>

🌍 Структура: 14 территориальных подразделений:`, { attachments: [personalAddressKeyboard], format: 'html'})
}