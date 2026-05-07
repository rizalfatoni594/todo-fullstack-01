import { MongoClient } from 'mongodb';

const url = process.env.MONGO_URI;
const client = new MongoClient(url);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('todo');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getDB() {
  return db;
}

export { connectDB, getDB };
