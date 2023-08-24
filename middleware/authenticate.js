const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try
    {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'yourMom')

        req.user = decode
        next()
    } catch
    {
        res.json({message: 'Authentication error'})
    }
}

module.exports = authenticate