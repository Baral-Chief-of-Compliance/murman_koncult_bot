//Стартовое приветствие бота

import { Keyboard, Context } from "@maxhub/max-bot-api";

import { ABOUT_PERSONAL_CENTER } from "./aboutPersonalCenter";


export const MAIN_PAGE_ACTION : string = 'main'

export const GO_MAIN_PAGE_BTN = [Keyboard.button.callback('На главную', MAIN_PAGE_ACTION, {intent: 'default'})]


const mainKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.callback('О кадровом центре', ABOUT_PERSONAL_CENTER, {intent: 'default'})],
        // [Keyboard.button.callback('Подбор персонала', ABOUT_PERSONAL_CENTER, {intent: 'default'})],
        // [Keyboard.button.callback('Программы поддержки', ABOUT_PERSONAL_CENTER, {intent: 'default'})],
        // [Keyboard.button.callback('Отчетность в ЦЗН', ABOUT_PERSONAL_CENTER, {intent: 'default'})],
        // [Keyboard.button.callback('Аналитика и исследования', ABOUT_PERSONAL_CENTER, {intent: 'default'})],
        // [Keyboard.button.callback('Помощь и консультации', ABOUT_PERSONAL_CENTER, {intent: 'default'})],
    ]
)

export async function startCommand(ctx : Context){
    await ctx.reply(`✨ Привет, работодатель Мурманской области!

Я – ваш цифровой помощник <b>«Кадровый навигатор51»</b> от кадрового центра Мурманской области. 

Помогу разобраться в мерах господдержки для бизнеса  
<ul>
    <li>Расскажу, как разместить вакансии на портале «Работа России»</li>
    <li>Подскажу, на какие субсидии и гранты для найма персонала вы можете рассчитывать</li>
</ul>
Быстрый доступ: 
<i>/Start</i> – начать заново  
<i>/РвР</i> – перейти на портал «Работа России»  
<i>/Контакт</i> – группа ЦЗН ВКонтакте  
<i>/Сайт</i> – официальный сайт

Выберите вопрос – и я быстро подберу актуальную информацию! Чем могу помочь?
`, { attachments: [mainKeyboard], format: 'html' });
}

//Обработка любого текста пользователя, так как бот подразумевается должен работать с обработкой команд клавиатуры
export async function processUnclearMessage(ctx: Context){
    await ctx.reply(`&#129300; Извините, не смог распознать Вашу команду. Выберите интересующую Вас услугу:`, { attachments: [mainKeyboard], format: 'html'})
}