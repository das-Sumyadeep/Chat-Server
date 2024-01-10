const {addMssg, getAllMssg} = require("../controllers/MessageController");

const router = require('express').Router();

router.post('/addMessage', addMssg);
router.post('/getMessage', getAllMssg);

module.exports = router;