const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const router = Router();

const imageProcessor = require("./imageProcessor");

const filename = (request, file, cb) => cb(null, file.originalname);

const storage = multer.diskStorage({
  destination: "api/uploads/",
  filename,
});

const fileFilter = (request, file, cb) => {
  if (file.mimetype !== "image/png") {
    request.fileValidatorError = "Wrong file type";
    cb(null, false, new Error("Wrong file type"));
  } else {
    cb(null, true);
  }
};

const upload = multer({
  fileFilter,
  storage,
});

router.post("/upload", upload.single("photo"), async (req, res) => {
  if (req.fileValidatorError) {
    res.status(400).json({ error: req.fileValidatorError });
  } else {
    try {
      await imageProcessor(req.file.filename);
    } catch (error) {}
    res.status(201).json({ success: true });
  }
});

const photoPath = path.resolve(__dirname, "../../client/photo-viewer.html");
router.get("/photo-viewer", (req, res) => res.sendFile(photoPath));

module.exports = router;
