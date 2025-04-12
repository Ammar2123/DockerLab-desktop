const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  title: String,
  contentBlocks: [
    {
      type: { type: String }, // heading, content, command, image
      value: String,
    }
  ],
});

module.exports = mongoose.model("Document", DocumentSchema);
