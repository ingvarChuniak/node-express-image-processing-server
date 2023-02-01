const { Router } = require("express");
const multer = require("multer");
const router = Router();

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

router.post("/upload", upload.single("photo"), (req, res) =>
  req.fileValidatorError
    ? res.status(400).json({ error: req.fileValidatorError })
    : res.status(201).json({ success: true })
);

module.exports = router;
