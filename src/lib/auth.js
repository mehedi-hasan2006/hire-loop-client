import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.DB_URI);
const db = client.db("hire-loop");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoLogin: false,
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
