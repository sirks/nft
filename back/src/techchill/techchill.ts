import {TECHCHILL_API_HOST, TECHCHILL_API_KEY} from "../config/config";
import axios from "axios";

const HEADERS = {
    headers: {Authorization: `Bearer ${TECHCHILL_API_KEY}`}
};

export async function check(ticket: string): Promise<boolean> {
    try {
        const ticketData = await axios.get(`${TECHCHILL_API_HOST}/tickets/${ticket}`, HEADERS);
        return ticketData.data.success.code === 200;
    } catch (err) {
        return false;
    }
}