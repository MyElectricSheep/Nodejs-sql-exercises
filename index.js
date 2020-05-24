const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const db = require('./database')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// Create an Express server with routes for the users on:
// GET  /  : To get all the users - ✅
// GET  /:id :  To get one user (with the id) - ✅
// POST / -> To create a new user - ✅
// PUT /:id  :  To edit one user (with the id) - ✅
// DELETE  /:id : To delete one user (with the id) - ✅

app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users LIMIT 100')
        .then(data => res.json(data.rows))
        .catch(err => console.error(err))
})

app.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    db.query('SELECT * FROM users WHERE id=$1', [id])
        .then(data => {
            if (!data.rows.length) res.status(404).send('There is no user with that ID')
            res.status(200).json(data.rows)
        })
        .catch(err => console.error(err))
})

app.post('/api/users', (req, res) => {
    const { first_name, last_name, age } = req.body
    db.query('INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *', [first_name, last_name, age])
        .then(data => res.json(data.rows))
        .catch(err => console.error(err))
})

app.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const { first_name, last_name, age } = req.body
    db.query('UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING *', [first_name, last_name, age, id])
        .then(data => res.json(data.rows))
        .catch(err => console.error(err))
})

app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    db.query('DELETE FROM users WHERE id=$1 RETURNING *', [ id ])
        .then(data => res.json(data.rows))
        .catch(err => console.error(err))
})


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`🐑⚡ Server listening on port ${port}`)
})