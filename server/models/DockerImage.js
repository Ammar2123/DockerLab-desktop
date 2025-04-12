const mongoose = require('mongoose');

const dockerImageSchema = new mongoose.Schema({
  semester: String,
  subject: String,
  ubuntuPullCommand: String,
  ubuntuRunCommand: String,
  windowsPullCommand: String,
  windowsRunCommand: String,
  ubuntuInstructions: String,
  windowsInstructions: String,
  notes: String
});

module.exports = mongoose.model('DockerImage', dockerImageSchema);
