const DockerImage = require("../models/DockerImage");

exports.addImage = async (req, res) => {
  const image = new DockerImage(req.body);
  await image.save();
  res.json(image);
};

exports.getImages = async (req, res) => {
  const images = await DockerImage.find();
  res.json(images);
};

exports.getBySemester = async (req, res) => {
  const { semester } = req.params;
  const images = await DockerImage.find({ semester });
  res.json(images);
};

exports.deleteImage = async (req, res) => {
  const { id } = req.params;
  await DockerImage.findByIdAndDelete(id);
  res.json({ message: "Deleted successfully" });
};
