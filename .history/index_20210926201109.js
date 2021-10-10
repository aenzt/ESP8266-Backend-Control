const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://aenzt:ghazial06@cluster0.gichf.mongodb.net/MyDay?retryWrites=true&w=majority')

app.use(express.json())

app.listen(port, () => console.log(`Server Started on ${port}`));