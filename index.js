const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app =express()
const port =process.env.PORT ||5000;

// middlewere

app.use(express())
app.use(cors())





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.REACT_USERNAME}:${process.env.REACT_PASSWORD}@cluster0.3kcnoe6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const usersCollection =client.db("user_application").collection("userCollection");
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    
    await client.connect();

    app.get('/user',async(req,res)=>{
            const result =await usersCollection.find().toArray();
            res.send(result)
    })
    app.put('/users',async(req,res)=>{
            const file =await req.body
            console.log(file)
            
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);









app.get('/', (req, res) => {
    res.send('User is running....')
  })
  
  app.listen(port, () => {
    console.log(`user-app listening on port ${port}`)
  })