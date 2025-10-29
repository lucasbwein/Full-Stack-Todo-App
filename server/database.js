require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const options = {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
};

let client;
const connectToMongoDB = async () => {
  if (!client) {
    // Let this throw if it fails so startup shows the real problem
    client = await MongoClient.connect(uri, options);
    console.log("✅ Connected to MongoDB");
  }
  return client;
};

const getConnectedClient = () => {
  if (!client) throw new Error("Mongo client not connected");
  return client;
};

module.exports = { connectToMongoDB, getConnectedClient };
