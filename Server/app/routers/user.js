const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkLogin } = require('../middleware/auth');


router.get('/', checkLogin, userController.getAllUsers);
router.put('/change-password', checkLogin, userController.changePassword);
router.post('/check-password', checkLogin, userController.checkPassword);
router.post('/check-username', userController.checkUsername);
router.post('/forgot-password', userController.forgotPassword);
router.put('/update', checkLogin, userController.updateUser);
router.delete('/delete', checkLogin, userController.deleteUser);
router.post('/config', checkLogin, userController.configUserMfaConfiguration);
router.get('/config', checkLogin, userController.getUserMfaConfiguration);
router.get('/random-user-images', checkLogin, userController.getRandomUserImages);
router.get('/random-user-relation-type', checkLogin, userController.getRandomUserRelationType);
router.get('/:id', checkLogin, userController.getUserById);

module.exports = router;