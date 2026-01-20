import { ProxyAgent } from "undici";
import dotenv from 'dotenv'


// настройка перменных виртуального окружения
dotenv.config({ path: '.env'})

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