const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { checkLogin } = require('../middleware/auth');
const { isAdmin } = require('../middleware/isAdmin');


router.post('/update', checkLogin, cartController.updateCart);
router.get('/', checkLogin, cartController.getCartByUserId);
router.post('/delete', checkLogin, cartController.deleteProduct);
router.post('/add', checkLogin, cartController.addToCart);

module.exports = router;

