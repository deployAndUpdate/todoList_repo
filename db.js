const { MongoClient } = require('mongodb');

// URL подключения (локально или на MongoDB Atlas)
const atlasUrl = "mongodb+srv://ivankaluh929:septicflesh10569@cluster0.1hang.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const localUrl = "mongodb://localhost:27017";
const atlasDbName = 'sample_mflix';
const localDbName = 'local_db';
let atlasDb;
let localDb;
let atlasClient;
let localClient;

// Функция для подключения к базе данных
const connectToAtlasDb = async () => {
  try {
    atlasClient = new MongoClient(atlasUrl);
    await atlasClient.connect();
    console.log('Connected successfully to MongoDB Atlas!');
    
    atlasDb = atlasClient.db(atlasDbName);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};

const connectToLocalDb = async () => {
  try {
    localClient = new MongoClient(localUrl);
    await localClient.connect();
    console.log('Connected successfully to MongoDB Local!');
    
    localDb = localClient.db(localDbName);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};
  
async function listAtlasDatabases() {
  try {
    const databasesList = await atlasClient.db().admin().listDatabases();
    console.log(databasesList);
    return databasesList;
  } catch (err) {
    console.error('Error listing databases:', err);
    throw err;
  }
}

async function listLocalDatabases() {
  try {
    const databasesList = await localClient.db().admin().listDatabases();
    console.log(databasesList);
    return databasesList;
  } catch (err) {
    console.error('Error listing databases:', err);
    throw err;
  }
}
  
// Возвращаем функцию подключения и саму базу
module.exports = {
  connectToAtlasDb,
  connectToLocalDb, 
  getAtlasDb: () => atlasDb,
  getLocalDb: () => localDb,
  listAtlasDatabases,
  listLocalDatabases
};