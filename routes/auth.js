// MIDDLEWARES: /:id/create-token : to create a token for a user - ✅
// MIDDLEWARES: /:id/verify/:token : to validate the token of a user - ✅

const express = require('express')
const db = require('../database')
const { v4: uuidv4 } = require('uuid');

const router = express.Router()

const checkUserExistence = (userId) => {
    if (!userId) return res.status(400).send('Missing data to complete the request')
    return db.query('SELECT * FROM users WHERE id=$1', [ userId ])
        .then(data => {
            const [user] = data.rows
            if (!user) return res.status(404).send('No user matches that id')
            return user
        })
}

router.post('/:id/create-token', (req, res) => {
    const { id: userId } = req.params
    checkUserExistence(userId)
        .then(user => {
            if (user.token_id) return res.status(403).send('User already has a token')
            const token = uuidv4() // uuids look like this: 123e4567-e89b-12d3-a456-426614174000
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
        .catch(err => console.log(err))
})

router.get('/:id/verify/:token?', (req, res) => {
    const { id: userId, token } = req.params
    if (!token) return res.status(400).send('Missing data to complete the request')
    const result = { id: userId, first_name: null, last_name: null, status: null, accessGranted: false }
    checkUserExistence(userId)
        .then(user => {
            const { token_id, first_name, last_name } = user
            result.first_name = first_name; result.last_name = last_name;
            return db.query('SELECT value FROM token WHERE id=$1', [ token_id ])
        })
        .then(data => {
            const [{ value }] = data.rows
            if (value === token) {
                result.status = "Valid token"
                result.accessGranted = true
                res.status(200).json(result)
            } else {
                result.status = 'Invalid token'
                res.status(401).json(result)
            }
        })
        .catch(err => console.error(err))
})

module.exports = router