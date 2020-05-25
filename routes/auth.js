// MIDDLEWARES: /:id/create-token : to create a token for a user - ✅
// MIDDLEWARES: /:id/verify/:token : to validate the token of a user

const express = require('express')
const db = require('../database')
const { v4: uuidv4 } = require('uuid');

const router = express.Router()

router.get('/:id/create-token', (req, res) => {
    const { id: userId } = req.params
    db.query('SELECT * FROM users WHERE id=$1', [ userId ])
        .then(data => {
            const [user] = data.rows
            if (!user) return res.status(404).send('No user matches that id')
            if (user.token_id) return res.status(403).send('User already has a token')
            const token = uuidv4()
            return db.query('INSERT INTO token(value) VALUES($1) RETURNING *', [token])
        })
        .then(data => {
            const [{ id: tokenId }] = data.rows
            if (!tokenId) return res.status(418).send('Token could not be inserted')
            return db.query('UPDATE users SET token_id=$1 WHERE id=$2 RETURNING *', [tokenId, userId])
        })
        .then(data => {
            const [ updatedUser ] = data.rows
            if (!updatedUser) return res.status(403).send('User could not be updated')
            res.json(updatedUser)
        })
        .catch(err => console.error(err))
})

module.exports = router