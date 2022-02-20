import Dao from "./base";
import {AccessEntity} from "../types";

export default class Access extends Dao<AccessEntity> {
    public name = 'access';

    public async findToken(event: string, token: string): Promise<AccessEntity | null> {
        const col = await this.getCollection();
        return await col.findOne({event, token});
    }
}
