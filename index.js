const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')


// Routes imports
const users = require('./routes/users')
const orders = require('./routes/orders')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/users', users)
app.use('/api/orders', orders)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`🐑⚡ Server listening on port ${port}`)
})