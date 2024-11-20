const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { checkLogin } = require('../middleware/auth');
const { isAdmin } = require('../middleware/isAdmin');


router.post('/update', checkLogin, isAdmin, orderController.updateStatus);
router.get('/', checkLogin, isAdmin, orderController.getAllOrders);
router.get('/get-by-userid', checkLogin, orderController.getOrdersByUserId);
router.post('/delete', checkLogin, isAdmin, orderController.deleteOrder);
router.post('/', checkLogin, orderController.createOrder);

module.exports = router;

