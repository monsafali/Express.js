const express = require("express");
const router = express.Router();
const {
  localFileUpload,
  imageuploader,
  videoUpload,
  imageSizeReducer,
} = require("../controllers/Fileupload.controller");

router.post("/localFileUpload", localFileUpload);
router.post("/imageuploader", imageuploader);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducer);

module.exports = router;
