import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { getCurrencyPairs, createCurrencyPairStrategy } from "./src/currencyPairs.js";


const app = express();
app.use(cors());
app.use(express.json());

app.get('/currencyPairs', getCurrencyPairs)
app.post('/currencyPairs', createCurrencyPairStrategy)
app.get('/currency')

export const api = functions.https.onRequest(app)
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
