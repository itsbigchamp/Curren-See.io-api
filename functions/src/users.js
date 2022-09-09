import jwt from "jsonwebtoken";
import dbConnect from "./dbConnect.js";
import { secretKey } from "../credentials.js";
import crypto from "crypto";

export async function createUser(req, res) {
  let { email, password } = req.body;
  email = email.toLowerCase();
  let encryptedPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");
  const db = dbConnect();
  const collection = await db
    .collection("users")
    .where("email", "==", email)
    .get()
    .then(async (snapshot) => {
      if (snapshot.docs.length == 0) {
        const user = await db
          .collection("users")
          .add({ email, password: encryptedPassword });
        res.send({ success: true });
        // const token = jwt.sign({ email, id: user.id }, secretKey);
        // res.send({ token });
      } else {
        res
          .status(400)
          .send({ success: false, reason: "Email already in use." });
      }
    })
    .catch((err) => res.status(500).send(err));
}

export async function loginUser(req, res) {
  let { email, password } = req.body;
  email = email.toLowerCase();
  let encryptedPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");
  const db = dbConnect();
  await db
    .collection("users")
    .where("email", "==", email)
    .where("password", "==", encryptedPassword)
    .get().then((snapshot) => {
        if (snapshot.docs.length > 0) {
            res.send({success: true, message: `You're logged in as ${email}`})
        } else {
            res.status(400).send({success: false, message: `Failed to log in as ${email}`})
        }
    })
    .catch((err) => res.status(500).send(err));
}
