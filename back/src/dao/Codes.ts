import Dao from "./base";
import {CodeEntity} from "../types";

export default class Codes extends Dao<CodeEntity> {
    public name = 'codes';

    public async findCode(code: string): Promise<CodeEntity | null> {
        const col = await this.getCollection();
        return await col.findOne({code});
    }
}
