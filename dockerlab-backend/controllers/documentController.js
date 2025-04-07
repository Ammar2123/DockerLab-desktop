const Document = require("../models/Document");

exports.addDocument = async (req, res) => {
  const doc = new Document(req.body);
  await doc.save();
  res.json(doc);
};

exports.getDocuments = async (req, res) => {
  const docs = await Document.find();
  res.json(docs);
};

exports.getDocumentById = async (req, res) => {
  const doc = await Document.findById(req.params.id);
  res.json(doc);
};

exports.deleteDocument = async (req, res) => {
  await Document.findByIdAndDelete(req.params.id);
  res.json({ message: "Document deleted" });
};
