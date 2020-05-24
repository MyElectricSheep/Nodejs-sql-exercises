const express = require('express')
const db = require('../database')
const router = express.Router()

// Create an Express server with routes for the users on:
// GET  /  : To get all the users - ✅
// GET  /:id :  To get one user (with the id) - ✅
// POST / -> To create a new user - ✅
// PUT /:id  :  To edit one user (with the id) - ✅
// DELETE  /:id : To delete one user (with the id) - ✅

// EXTRA: /:id/orders : To get all orders linked to a specific user - ✅
// EXTRA: /:id/check-inactive : If a user has never ordered, he should be set as inactive - ✅

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

router.get('/:id/orders', (req, res) => {
    const { id } = req.params;
    db.query(`
    SELECT u.first_name, u.last_name, o.price, o.date
    FROM users u
    JOIN orders o
    ON u.id = o.user_id
    WHERE u.id = $1
    `, [id])
    .then(data => res.json(data.rows))
    .catch(err => console.error(err))
})

router.get('/:id/orders', (req, res) => {
    const { id } = req.params;
    db.query(`
    SELECT u.first_name, u.last_name, o.price, o.date
    FROM users u
    JOIN orders o
    ON u.id = o.user_id
    WHERE u.id = $1
    `, [id])
    .then(data => res.json(data.rows))
    .catch(err => console.error(err))
})

router.put('/:id/check-inactive', (req, res) => {
    const { id } = req.params;
    db.query(`
    SELECT u.first_name, u.last_name, COUNT(o.date) AS order_count
    FROM users u
    LEFT JOIN orders o
    ON u.id = o.user_id
    WHERE u.id = $1
    GROUP BY u.first_name, u.last_name
    `, [id])
    .then(data => {
        const [user] = data.rows
        if (!user) res.status(404).send('No user matching that id')
        if (parseInt(user.order_count, 10) < 1) {
            return db.query(`UPDATE users SET active=false WHERE id=$1 RETURNING *`, [id])
        }
        else res.send('This user has already place some orders before')
    })
    .then(data => {
        res.json(data.rows)
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