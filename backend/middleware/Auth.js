const jwt = require('jsonwebtoken');



const checkToken = (req, res, next) => {
    const token = req.headers['token'];
    if (!token) {
        return res.status(404)
            .json({ message: 'JWT token is required' });
    }
    try {
        const verify = jwt.verify(token, process.env.JWT_KEY);
        console.log("JWT ",token,verify);
        next();
    } catch (err) {
        console.log(err);
        return res.status(403)
            .json({ message: 'JWT token is wrong or expired' });
    }
}



module.exports = checkToken;