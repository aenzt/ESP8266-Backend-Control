require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.once('open', () => console.log('Connected to db'))

app.use(express.json())

app.listen(port, () => console.log(`Server Started on ${port}`));