import {TECHCHILL_API_HOST, TECHCHILL_API_KEY} from "../config/config";
import axios from "axios";

const DELAY = 99;
const HEADERS = {
    headers: {Authorization: `Bearer ${TECHCHILL_API_KEY}`}
};
let lastCheckTime = new Date().getTime();

export async function checkTicket(code: string): Promise<boolean> {
    try {
        //naive ddos protection
        let now = new Date().getTime();
        while (now - lastCheckTime < DELAY) {
            console.log("delay", now - lastCheckTime)
            await sleep(DELAY)
            now = new Date().getTime();
        }
        lastCheckTime = now;
        const ticketData = await axios.get(`${TECHCHILL_API_HOST}/tickets/${code}`, HEADERS);
        return ticketData.data.success.code === 200;
    } catch (err) {
        return false;
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}