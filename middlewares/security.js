const tokenChecker = (req, res, next) => {
    const { token } = req.query
    if (!token) return res.status(401).send('Unauthorized access')
    next()
}

module.exports = { tokenChecker }