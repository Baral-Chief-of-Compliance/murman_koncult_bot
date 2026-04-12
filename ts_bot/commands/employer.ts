import { Context } from "@maxhub/max-bot-api";


import { EmployerMainKeyboard } from "../keyboards/employer";


export async function EmployerMain(ctx:Context){
    await ctx.reply(
`<b>Работодателям</b>`,
    {
        attachments: [EmployerMainKeyboard],
        format: 'html'
    }
    )
}