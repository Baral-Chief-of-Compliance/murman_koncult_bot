import { ProxyAgent } from "undici";
import dotenv from 'dotenv'


// настройка перменных виртуального окружения
dotenv.config({ path: '.env'})

interface ProxyInfo {
    uri: string;
    requestTls: {
        rejectUnauthorized: boolean;
    };
    token?: string; // Необязательное свойство
}

let proxyInfo : ProxyInfo = {   
        uri: `${process.env.PROXY_PATH}`,
        requestTls: {
            rejectUnauthorized: false,
        },
};

if (process.env.PROXY_AUTH==='1'){
    proxyInfo.token = `Basic ${Buffer.from(`${process.env.PROXY_LOGIN}:${process.env.PROXY_PASSWORD}`).toString('base64')}`
}
//Настройка прокси
export const proxyAgent = new ProxyAgent(
    {   
        uri: `${process.env.PROXY_PATH}`,
        token: `Basic ${Buffer.from(`${process.env.PROXY_LOGIN}:${process.env.PROXY_PASSWORD}`).toString('base64')}`,
        requestTls: {
            rejectUnauthorized: false,
        }
    }
);