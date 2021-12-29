const {MongoClient} = require('mongodb');

const MONGO_DB_URL = 'LINK_DO_SEU_BANCO';
const DB_NAME = 'NOME_DO_SEU_BANCO';

const connection = () => MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((conn) => conn.db(DB_NAME)).catch((err) => {
    console.error(err);
    process.exit(1);
});

module.exports = connection;