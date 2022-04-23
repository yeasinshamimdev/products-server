const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb link
const uri = "mongodb+srv://productsdb:GZ9l5o19BcUTSowz@cluster0.7qpfm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const notesCollection = client.db("notesList").collection("notes");

        // get many
        app.get("/notes", async (req, res) => {
            const query = req.body;
            const cursor = notesCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        // post
        app.post("/note", async (req, res) => {
            const data = req.body;
            console.log(data);
            const result = await notesCollection.insertOne(data);
            res.send(result);
        });
    }
    finally {

    }
};
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('notes server connected');
});

app.listen(port, () => {
    console.log('Listening port,', port);
});