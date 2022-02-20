import {Collection, Db, FilterQuery, MongoClient, ObjectId} from 'mongodb';
import {BaseEntity} from '../types';
import {DB_NAME, DB_HOST, DB_PASS, DB_USER} from '../../config';

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

let db: Db | undefined = undefined;

async function mongoClient(): Promise<Db> {
  if (!db) {
    const client = await MongoClient.connect(uri, {useNewUrlParser: true});
    db = client.db()
  }
  return db;
}

async function loadCollection(name: string): Promise<Collection> {
  const db = await mongoClient();
  return db.collection(name);
}

export default abstract class Dao<T extends BaseEntity> {
  public name: string = 'base';
  private collection: Collection | undefined = undefined;

  public async getCollection(): Promise<Collection> {
    if (!this.collection) {
      this.collection = await loadCollection(this.name);
    }
    return this.collection;
  }

  public async findOne(filter: FilterQuery<T>): Promise<T | null> {
    const col = await this.getCollection();
    return await col.findOne(filter);
  }

  public async findOneById(id: string): Promise<T | null> {
    const col = await this.getCollection();
    return await col.findOne({id});
  }

  public async findOneBy_id(_id: string): Promise<T | null> {
    const col = await this.getCollection();
    return await col.findOne(new ObjectId(_id));
  }

  public async delete(id: string): Promise<void> {
    const col = await this.getCollection();
    await col.deleteOne({id});
  }

  public async findAll(): Promise<T[]> {
    const col = await this.getCollection();
    const res = await col.find().sort({ts: -1}).toArray();
    return <T[]>res;
  }

  public async create(entity: T): Promise<void> {
    const col = await this.getCollection();
    entity.ts = new Date().getTime();
    await col.insertOne(entity)
  }

  public async update(id: string, entity: T): Promise<void> {
    const col = await this.getCollection();
    entity.ts = new Date().getTime();
    await col.updateOne({id}, {$set: entity}, {upsert: false})
  }
}

