const express = require('express')
const db = require('../database')
const router = express.Router()

// Create an Express server with routes for the users on:
// GET  /  : To get all the users - ✅
// GET  /:id :  To get one user (with the id) - ✅
// POST / -> To create a new user - ✅
// PUT /:id  :  To edit one user (with the id) - ✅
// DELETE  /:id : To delete one user (with the id) - ✅

router.get('/', (req, res) => {
    db.query('SELECT * FROM users LIMIT 100')
        .then(data => res.json(data.rows))
        .catch(err => console.error(err))
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    db.query('SELECT * FROM users WHERE id=$1', [id])
        .then(data => {
            if (!data.rows.length) res.status(404).send('There is no user with that ID')
            res.status(200).json(data.rows)
        })
        .catch(err => console.error(err))
})

router.post('/', (req, res) => {
    const { first_name, last_name, age } = req.body
    db.query('INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *', [first_name, last_name, age])
        .then(data => res.json(data.rows))
        .catch(err => console.error(err))
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { first_name, last_name, age } = req.body
    db.query('UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING *', [first_name, last_name, age, id])
        .then(data => res.json(data.rows))
        .catch(err => console.error(err))
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    db.query('DELETE FROM users WHERE id=$1 RETURNING *', [ id ])
        .then(data => res.json(data.rows))
        .catch(err => console.error(err))
})

module.exports = router