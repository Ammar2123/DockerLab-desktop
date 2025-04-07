const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  addImage, getImages, getBySemester, deleteImage
} = require("../controllers/dockerImageController");

router.post("/", auth, addImage);
router.get("/", getImages);
router.get("/semester/:semester", getBySemester);
router.delete("/:id", auth, deleteImage);

module.exports = router;
