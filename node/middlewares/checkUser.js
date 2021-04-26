const jwt = require('jsonwebtoken')
const User = require('../modals/user')

  const checkUser = async (req, res, next) => {
    let token = req.headers.authorization;
    let user = jwt.verify(token, process.env.SECERT)
    try {
        let finduser = await User.findOne({
            password: user.password,
            eamil: user.eamil
        })
        if (!finduser)
            res.status(500).json("you dont connection");
        req.userId = finduser._id
        return next()
    }

    catch (err) {
        res.status(500).json({ err: err });
    }
}
module.exports = checkUser; 