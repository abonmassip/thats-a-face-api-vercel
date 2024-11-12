import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import knex from "knex";

import { handleRegister } from "./controllers/register.js";
import { handleSignin } from "./controllers/signin.js";
import { handleProfileGet } from "./controllers/profile.js";
import { handleImage, handleApiCall } from "./controllers/image.js";

const db = knex({
  client: "pg",
  connection: {
    host: "aws-0-eu-west-3.pooler.supabase.com",
    port: 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "postgres",
  },
});

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/", (req, res) => res.json("success"));
app.post("/signin", handleSignin(db, bcrypt));
app.post("/register", handleRegister(db, bcrypt));
app.get("/profile/:id", handleProfileGet(db));
app.put("/image", handleImage(db));
app.post("/imageurl", handleApiCall);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
