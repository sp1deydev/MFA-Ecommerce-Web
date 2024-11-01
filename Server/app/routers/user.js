const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkLogin } = require('../middleware/auth');


router.get('/', checkLogin, userController.getAllUsers);
router.put('/change-password', checkLogin, userController.changePassword);
router.put('/update', checkLogin, userController.updateUser);
router.delete('/delete', checkLogin, userController.deleteUser);
router.post('/config', checkLogin, userController.configUserMfaConfiguration);
router.get('/config', checkLogin, userController.getUserMfaConfiguration);
router.get('/:id', checkLogin, userController.getUserById);

module.exports = router;