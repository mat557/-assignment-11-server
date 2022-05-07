const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
            const services = await cursor.toArray();
            res.send(services);
        });


        app.get('/services/:id',async (req,res)=>{
            const id = req.params.id;
            // console.log(id);
            const query = {_id : ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })

        app.delete('/services/:id',async (req,res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const result = await serviceCollection.deleteOne(query);
            res.send(result);
        })

        // app.put('/services/:id',async(req,res)=>{
        //     const id = req.params.id;
        //     const updateQuantity = req.body;
        //     const filter = { _id: ObjectId(id) };
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: {
                  
        //         },
        //       };
        //     const result = await serviceCollection.updateOne(filter, updateDoc, options);
        //     res.send(result);
        // })


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