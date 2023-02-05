import { connect, set} from "mongoose";
import { MongoClient, ServerApiVersion } from 'mongodb'

import config from "./config";

set("strictQuery", false);

(async () => {
  try {
    const uri = config.MONGO_HOST;
    const db = await connect(uri);
    console.log(`Database is connected to ${db.connection.name}`);
  } catch (e) {
    console.log(e);
  }
})();


