require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const AccessRoute = require('./routes/access')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology:true})
const db = mongoose.connection
db.once('open', () => console.log('Connected to db'))

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));