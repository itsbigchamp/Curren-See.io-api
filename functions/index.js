import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import {
  getCurrencyPairs,
  createUserStrategy,
  collectUserStrategy,
} from "./src/currencyPairs.js";
import { createUser, loginUser } from "./src/users.js";

const app = express();
app.use(cors());
app.use(express.json());

// app.get("/test", (req, res) => res.send({ success: true, message: "success" }));

app.get("/currencyPairs", getCurrencyPairs); // WORKS

app.post("/userStrategies", createUserStrategy);
app.get("/userStrategies", collectUserStrategy);

app.post("/users", createUser);
app.post("/users/login", loginUser);

export const api = functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
