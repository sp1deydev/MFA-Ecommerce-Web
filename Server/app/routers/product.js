const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const {checkLogin} = require('../middleware/auth');

// create storage to store images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products/"); // Thư mục để lưu trữ ảnh
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Đổi tên file để tránh bị trùng lặp
  },
});

// Tạo middleware upload để xử lý yêu cầu upload ảnh
const upload = multer({ storage: storage });

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProdutById);
router.post('/', upload.single('image'), productController.createProduct);
router.post('/upload-image', upload.single('image'), (req, res) => {
  try {
    console.log('Uplo',req.file)
      const imageUrl = `${req.file.path}`;

      // Trả về đường dẫn ảnh (image_url) sau khi upload thành công
      res.status(200).json({ image_url: imageUrl, success: true });
    } catch (error) {
      res.status(500).send(error.message);
    }
},);
router.delete('/', productController.deleteProduct);
router.put('/', productController.updateProduct);

module.exports = router;