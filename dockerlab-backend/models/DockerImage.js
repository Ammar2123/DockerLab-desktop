const mongoose = require("mongoose");

const DockerImageSchema = new mongoose.Schema({
  semester: String,
  subject: String,
  pullCommand: String,
  runCommand: String,
  instructions: String,
  notes: String,
});

module.exports = mongoose.model("DockerImage", DockerImageSchema);
