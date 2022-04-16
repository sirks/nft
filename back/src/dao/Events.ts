import Dao from "./base";
import {EventEntity} from "../types";

export default class Events extends Dao<EventEntity> {
    public name = 'events';

    public async findName(name: string): Promise<EventEntity | null> {
        const col = await this.getCollection();
        return await col.findOne({name});
    }
}
