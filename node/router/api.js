const router = require('express').Router()

const user = require('../controllers/user');
const picture = require('../controllers/picture');

const checkUser = require('../middlewares/checkUser')
const upload = require('../middlewares/upload')

router.post('/createUser', user.createUser)
router.post('/loginUser', user.loginUser)
router.post('/upLoadImage', checkUser, upload.single('file'), picture.upLoadImage)

module.exports = router;
