import { Keyboard } from "@maxhub/max-bot-api";

import { goMainPageKeyboard } from "./main";
import { BACK_BTN_NAME } from "./btnNames";
import { REPORTING_PC, REPORTING_PC_IDLE_MODE,
    REPORTING_PC_BANKRUPTCY_PROCEDURE, REPORTING_PC_DOWNSIZING,
    REPORTING_PC_PART_TIME, REPORTING_PC_JOB_QUOTAS_DISABLED,
    REPORTING_PC_REMOTE_WORK, REPORTING_PC_ADMISSION
 } from "../actions/reportingPersonalCenter";


const backPersonalCenterKeyboard = [Keyboard.button.callback(BACK_BTN_NAME, REPORTING_PC)]


export const reportingPersonalCenterKeyboard = Keyboard.inlineKeyboard(
    [
        [Keyboard.button.callback('Режим простоя', REPORTING_PC_IDLE_MODE)],
        [Keyboard.button.callback('Процедура банкротства', REPORTING_PC_BANKRUPTCY_PROCEDURE)],
        [Keyboard.button.callback('Сокращение численности/ликвидация', REPORTING_PC_DOWNSIZING)],
        [Keyboard.button.callback('Неполный/сокращенный рабочий день', REPORTING_PC_PART_TIME)],
        [Keyboard.button.callback('Квотирование рабочих мест для инвалидов', REPORTING_PC_JOB_QUOTAS_DISABLED)],
        [Keyboard.button.callback('Дистанционная работа', REPORTING_PC_REMOTE_WORK)],
        [Keyboard.button.callback('Приём по направлению ЦЗН или отказ в трудоустройстве', REPORTING_PC_ADMISSION)],
        goMainPageKeyboard
    ]
)


export const reportingPersonalCenterBackKeyboard = Keyboard.inlineKeyboard(
    [
        backPersonalCenterKeyboard,
        goMainPageKeyboard
    ]
)