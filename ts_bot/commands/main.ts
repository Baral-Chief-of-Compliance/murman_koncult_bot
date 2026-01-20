//Список команд

import { Context } from "@maxhub/max-bot-api"
import { mainCznSiteKeyboard, rabotaInRussiaKeyboard, vkLinkKeyboard } from "../keyboards/main"

export const START_COMMAND = 'start'
export const RIR_COMMAND = 'rir'
export const CONTACT_COMMAND = 'contacts'
export const SITE_COMMAND = 'site'

export const commandsList = [
  { name: START_COMMAND, description: 'Начало работы с ботом'},
  { name: RIR_COMMAND, description: 'Перейти на портал «Работа России»  '},
  { name: CONTACT_COMMAND, description: 'Группа ЦЗН ВКонтакте  '},
  { name: SITE_COMMAND, description: 'Официальный сайт'},
]

// перейти на портал «Работа России»  
export async function GoToRabotaInRussia(ctx: Context){
  await ctx.reply(
`🌐 <b>Перейти на портал «Работа России»</b>`,
{
  attachments: [rabotaInRussiaKeyboard],
  format: 'html'
}
  )
}

//Перейти на на группу в вк
export async function goVkGroup(ctx:Context){
  await ctx.reply(
`🌐 <b>Группа ЦЗН ВКонтакте</b>`,
{
  attachments: [vkLinkKeyboard],
  format: 'html'
}
  )
}


//Перейти на официальный сайт
export async function goOfficialSite(ctx:Context){
  await ctx.reply(
`🌐 <b>Официальный сайт ЦЗН</b>`,
{
  attachments: [mainCznSiteKeyboard],
  format: 'html'
}
  )
}
