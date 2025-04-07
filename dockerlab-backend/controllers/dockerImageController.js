const DockerImage = require("../models/DockerImage");

// Create a new image
exports.addImage = async (req, res) => {
  try {
    const image = new DockerImage(req.body);
    await image.save();
    res.status(201).json(image);
  } catch (error) {
    console.error("Error saving image:", error);
    res.status(500).json({ message: "Failed to save image" });
  }
};

// Get all images
exports.getImages = async (req, res) => {
  try {
    const images = await DockerImage.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images" });
  }
};

// Get images by semester
exports.getBySemester = async (req, res) => {
  try {
    const { semester } = req.params;
    const images = await DockerImage.find({ semester });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images by semester" });
  }
};
exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedImage = await DockerImage.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedImage) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.json(updatedImage);
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({ message: "Failed to update image" });
  }
};
// Delete image
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    await DockerImage.findByIdAndDelete(id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete image" });
  }
};
