import {checkTicket} from "./techchill";
import {TECHCHIL_DUMMY_TICKET} from "../config/config";

test('can check ticket', async () => {
    const isTicketValid = await checkTicket(TECHCHIL_DUMMY_TICKET)
    expect(isTicketValid).toBeTruthy();
});

test('can check invalid ticket', async () => {
    const isTicketValid = await checkTicket("XXX")
    expect(isTicketValid).toBeFalsy();
});
