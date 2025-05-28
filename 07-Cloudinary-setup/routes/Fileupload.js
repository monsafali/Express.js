const express = require("express");
const router = express.Router();
const {
  localFileUpload,
  imageuploader,
} = require("../controllers/Fileupload.controller");

router.post("/localFileUpload", localFileUpload);
router.post("/imageuploader", imageuploader);

module.exports = router;
