const Document = require("../models/Document");

exports.addDocument = async (req, res) => {
  try {
    const { title = "Untitled Document", fields } = req.body;
    const doc = new Document({
      title,
      contentBlocks: fields,
    });
    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

