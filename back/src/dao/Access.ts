import Dao from "./base";
import {AccessEntity} from "../types";

export default class Access extends Dao<AccessEntity> {
    public name = 'access';

    public async findEventToken(event: string, token: string): Promise<AccessEntity | null> {
        const col = await this.getCollection();
        if (event === '')
            return await col.findOne({token});
        return await col.findOne({event, token});
    }

    public async findToken(ticketId: string): Promise<AccessEntity | null> {
        const col = await this.getCollection();
        return await col.findOne({ticketId});
    }
}
