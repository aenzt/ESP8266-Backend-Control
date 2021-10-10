require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const {MongoClient} = require('mongodb')

const client = new MongoClient(process.env.DATABASE_URL)
const dbName = 'MyDay'
async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('user');
  
    // the following code examples can be pasted here...
  
    return 'done.';
  }
  
  main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
app.use(express.json())

app.listen(port, () => console.log(`Server Started on ${port}`));