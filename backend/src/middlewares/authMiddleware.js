const jwt = require('jsonwebtoken');

const authenticationToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token) return res.status(403).json({error: 'Unauthorized'});

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403);

        req.user = user;
        next();
    });
};

module.exports = authenticationToken;