const express = require('express');
const router = express.Router();
const multer = require('multer');

// create storage to store images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Thư mục để lưu trữ ảnh
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Đổi tên file để tránh bị trùng lặp
  },
});

// Tạo middleware upload để xử lý yêu cầu upload ảnh
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res) => {
    console.log(res);
    res
      .status(200)
      .json({
        message: "Image successfully uploaded",
        success: true,
        status: "done",
        filePath: req.file.path,
        fileName: req.file.filename
      });
});


module.exports = router;