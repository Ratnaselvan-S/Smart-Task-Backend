require("dotenv").config();
const app = require("./app");

const { connectToDatabase, getDatabase } = require("./data/database");
const port = process.env.PORT;

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log("Port successfully started");
    });
  } catch (error) {
    console.log("Could not start the server");
  }
}
startServer();
