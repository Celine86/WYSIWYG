const express = require('express'); 
const router = express.Router();
const userCtrl = require("../controllers/user");
const pswdValid = require('../middleware/pswdcheck');

router.post("/signup", pswdValid, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;