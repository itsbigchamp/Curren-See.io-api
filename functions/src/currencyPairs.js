import dbConnect from "./dbConnect.js";

export async function getCurrencyPairs(req, res) {
  const db = dbConnect();

  const collection = await db.collection("currencyPairs").get();
  console.log(collection);

  const currencyPairs = collection.docs.map((doc) => {
    let currencyPair = doc.data();
    currencyPair.id = doc.id;
    return currencyPair;
  });
  res.json(currencyPairs);
}

export async function createUserStrategy(req, res) {
  const userStrategy = req.body;
  if (!userStrategy) {
    res
      .status(400)
      .send({ success: false, message: "Currency pair not selected" });
    return;
  }
  const db = dbConnect();
  await db
    .collection("userStrategies")
    .add(userStrategy)
    .then((doc) => res.status(201).send({ id: doc.id }))
    .catch((err) => res.status(500).send(err));
}

export async function collectUserStrategy(req, res) {
  const db = dbConnect();
  const collection = await db.collection("userStrategies").get();

  const userStrategies = collection.docs.map((doc) => {
    let userStrategy = doc.data();
    userStrategy.id = doc.id;
    return userStrategy;
  });
  res.send(userStrategies);
}
