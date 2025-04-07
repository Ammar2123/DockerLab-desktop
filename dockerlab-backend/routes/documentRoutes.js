const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  addDocument, getDocuments, getDocumentById, deleteDocument, updateDocument,
} = require("../controllers/documentController");

router.post("/", auth, addDocument);
router.get("/", getDocuments);
router.get("/:id", getDocumentById);
router.delete("/:id", auth, deleteDocument);
router.put("/:id", auth, updateDocument);

module.exports = router;
