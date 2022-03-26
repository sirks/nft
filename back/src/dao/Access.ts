import Dao from "./base";
import {AccessEntity} from "../types";

export default class Access extends Dao<AccessEntity> {
    public name = 'access';

    public async findToken(event: string, token: string): Promise<AccessEntity | null> {
        const col = await this.getCollection();
        if (event === '')
            return await col.findOne({token});
        return await col.findOne({event, token});
    }
}
