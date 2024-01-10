const { register, login, setAvatar, getAllUsers, firebaseLogin } = require("../controllers/UserController");

const router = require('express').Router();

router.post('/register', register);
router.post('/firebaseRoute', firebaseLogin);
router.post('/login', login);
router.post('/setAvatar/:id', setAvatar);
router.get('/allUsers/:id', getAllUsers);

module.exports = router;