const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
// const { tokenChecker } = require('./middlewares/security')

// Routes imports
const users = require('./routes/users')
const orders = require('./routes/orders')
const upload = require('./routes/upload')
const auth = require('./routes/auth')

const app = express()
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// app.use(tokenChecker)

app.use('/api/users', users)
app.use('/api/orders', orders)
app.use('/api/auth', auth)
app.use('/upload', upload)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`🐑⚡ Server listening on port ${port}`)
})