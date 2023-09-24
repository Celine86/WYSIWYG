const express = require('express');
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require('../middleware/auth');

router.post("/create", auth.signin, postCtrl.createPost);
router.get("/:id", auth.signin, postCtrl.getOnePost);

module.exports = router;