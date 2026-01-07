const { MongoClient } = require("mongodb");

let database;

async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  database = client.db();
  console.log("Database connected");
}

function getDatabase() {
  if (!database) {
    throw new Error("Database not conected");
  }
  return database;
}

module.exports = { connectToDatabase, getDatabase };
