const checkToken = require('../middleware/Auth');
const {find, insert, del, update, reset} = require('../controller/recordcontroller');
const router = require('express').Router();

router.get("/get", checkToken, find);
router.post("/add", checkToken, insert);
router.put("/update", checkToken, update);
router.delete("/del", checkToken, del);
router.patch("/reset", checkToken, reset);

module.exports = router;