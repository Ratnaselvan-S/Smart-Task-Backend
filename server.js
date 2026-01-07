require("dotenv").config();
const app = require("./app");

const { connectToDatabase, getDatabase } = require("./data/database");
const port = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log("Port successfully started");
    });
  } catch (error) {
    console.log("Database is not connected");
  }
}
startServer();
