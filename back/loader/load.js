const {MongoClient} = require('mongodb');

const DB_USER = 'xxx';
const DB_PASS = 'xxx';
const DB_HOST = 'sandbox.apile.mongodb.net';
const DB_NAME = 'xxx';
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {useNewUrlParser: true});

const collectionName = 'access';
const event = "t2022";
const count = 7;
const hashLength = 32;
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
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

load()