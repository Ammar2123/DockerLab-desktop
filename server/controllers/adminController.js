const jwt = require("jsonwebtoken");

exports.loginAdmin = (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "docker123") {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
