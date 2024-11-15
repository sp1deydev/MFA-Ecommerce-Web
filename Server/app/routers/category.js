const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { checkLogin } = require('../middleware/auth');
const { isAdmin }= require('../middleware/isAdmin');


router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
router.delete('/:id', categoryController.deleteCategory);
router.put('/', categoryController.updateCategory);

module.exports = router;