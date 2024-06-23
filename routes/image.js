const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const imageCtrl = require("../controllers/image");


router.post("/create", auth.signin, multer.fileUpload, imageCtrl.addImage);
router.get("/allimages", auth.signin, imageCtrl.getAllImages);
router.get("/:id", auth.signin, imageCtrl.getOneImage)

module.exports = router;