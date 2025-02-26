const { signup, login, forget, sendEmail } = require('../controller/authcontroller');

const router = require('express').Router();

router.post('/login',login);
router.post('/signup',signup);
router.patch('/forget',forget);
router.post('/email',sendEmail);


module.exports = router;