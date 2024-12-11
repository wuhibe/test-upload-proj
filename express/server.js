const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

app.post(
  "/upload",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  (req, res) => {
    console.log("Body:", req.body);
    console.log("Image file:", req.files.image?.[0]);
    console.log("Resume file:", req.files.resume?.[0]);
    res.json({
      message: "Files uploaded and data logged.",
      files: {
        image: req.files.image?.[0],
        resume: req.files.resume?.[0],
      },
    });
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
