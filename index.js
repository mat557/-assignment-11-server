const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const res = require('express/lib/response');
const port = process.env.PORT || 5000;
const app = express();


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aivlx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const serviceCollection = client.db('assignment-task').collection('service-collection');
        
        app.get('/services',async (req,res)=>{
            const query = {};
            const cursor = serviceCollection.find(query);
            const service = await cursor.toArray();
            res.send(service);
        });



    }
    finally{}
}

run().catch(console.dir());





app.get('/',(req,res)=>{
    res.send('running assignment server');
});

app.listen(port,()=>{
    console.log('listenning to assingment port:',port);
});