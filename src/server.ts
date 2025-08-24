import { connect } from "mongoose";
import config from "./app/config";
import app from "./app";

const port = config.port || 8080;

(async function main() {
  try {
    await connect(config.mongodbUri as string);
    console.log("✅ Database Connected to MongoDB.");
    app.listen(port, () => {
      console.log(`✅ Server is running on port: ${port}.`);
    });
  } catch (error) {
    console.log(error);
  }
})();
