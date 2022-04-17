const {MongoClient} = require('mongodb');
import {DB_USER, DB_PASS, DB_HOST, DB_NAME} from "../src/config/config";

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {useNewUrlParser: true});

const collectionName = 'access';
const event = "t2022";
const count = 7;
const hashLength = 32;
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const ts = new Date().getTime();

async function load() {
    try {
        await client.connect();
        const db = await client.db();
        const colection = db.collection(collectionName);
        let bulk = colection.initializeUnorderedBulkOp();
        for (let i = 0; i < count; i++) {
            let token = makeid(hashLength);
            bulk.insert({event, token, ts});
            console.log(token);
        }
        await bulk.execute();
        await client.close()
    } catch (e) {
        console.error(e);
    }
}

function makeid(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function updateAll() {
    try {
        await client.connect();
        const db = await client.db();
        const colection = db.collection(collectionName);
        const all = await colection.find().toArray();
        for (const event of all){
            if(event.token){
                event.ticketId = event.token;
            }
            await colection.updateOne({_id:event._id}, {$set: event}, {upsert: false})
        }
        await client.close()
    } catch (e) {
        console.error(e);
    }
}

// load();
updateAll();
