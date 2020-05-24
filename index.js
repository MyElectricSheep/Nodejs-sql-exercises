const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const db = require('./database')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    db.query('SELECT * FROM users LIMIT 100')
        .then(data => res.json(data.rows))
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`🐑⚡ Server listening on port ${port}`)
})