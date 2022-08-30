import dbConnect from "./dbConnect.js";

export async function getCurrencyPairs(req,res) {
    const db = dbConnect();

    const collection = await db.collection('currency pairs').get()
    console.log(collection)

    const currencyPairs = collection.docs.map(doc => {
        let currencyPair = doc.data()
        currencyPair.id = doc.id
        return currencyPair
    })
    res.json(currencyPairs)
}

export async function createCurrencyPairStrategy(req,res) {
    const db = dbConnect()
}

export async function collectCurrencyPairStrategy(req,res) {
    const db = dbConnect();
}
