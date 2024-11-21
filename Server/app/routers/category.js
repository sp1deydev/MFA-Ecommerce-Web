const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { checkLogin } = require('../middleware/auth');
const { isAdmin }= require('../middleware/isAdmin');


router.get('/', categoryController.getAllCategories);
router.get('/count', categoryController.getCategoryCount);
router.post('/', checkLogin, isAdmin, categoryController.createCategory);
router.post('/delete', checkLogin, isAdmin, categoryController.deleteCategory);
router.put('/', checkLogin, isAdmin, categoryController.updateCategory);

module.exports = router;