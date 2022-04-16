import {check} from "./techchill";
import {TECHCHIL_DUMMY_TICKET} from "../config/config";

test('can check ticket', async () => {
    const isTicketValid = await check(TECHCHIL_DUMMY_TICKET)
    expect(isTicketValid).toBeTruthy();
});

test('can check invalid ticket', async () => {
    const isTicketValid = await check("XXX")
    expect(isTicketValid).toBeFalsy();
});
