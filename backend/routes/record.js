const checkToken = require('../middleware/Auth');
const { find, insert, del, modify,reset } = require('../controller/recordcontroller');
const router = require('express').Router();

router.get('/get', checkToken, find);
router.post('/add', checkToken, insert);
router.put('/update', checkToken, modify);
router.delete('/remove', checkToken, del);
router.patch('/reset',checkToken,reset);

module.exports = router;