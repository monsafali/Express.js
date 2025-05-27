const express = require("express");
const router = express.Router();
const localFileUpload = require("../controllers/Fileupload.controller");

router.post("/localFileUpload", localFileUpload);

module.exports = router;
