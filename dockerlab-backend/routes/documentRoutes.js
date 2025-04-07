const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  addDocument, getDocuments, getDocumentById, deleteDocument
} = require("../controllers/documentController");

router.post("/", auth, addDocument);
router.get("/", getDocuments);
router.get("/:id", getDocumentById);
router.delete("/:id", auth, deleteDocument);

module.exports = router;
