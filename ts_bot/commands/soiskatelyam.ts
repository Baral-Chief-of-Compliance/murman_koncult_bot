import { Context } from "@maxhub/max-bot-api";

import { SoiskatelyamMainKeyboard } from "../keyboards/soiskatelyam";

/**
 * Соискателям
 * @param ctx 
 */
export async function soiskatelyamMain(ctx:Context){
    await ctx.reply(
`🧑‍💻 <b>Соискателям</b>

👇 Выберите интересующий раздел, чтобы узнать подробности.`,
    {
        attachments: [SoiskatelyamMainKeyboard],
        format: 'html'
    }
    )
}

// Как встать на учет