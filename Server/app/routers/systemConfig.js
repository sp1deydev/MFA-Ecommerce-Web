const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middleware/auth');
const { isAdmin, isSystemAdmin } = require('../middleware/isAdmin');
const systemController = require('../controllers/systemController');


router.post('/config', checkLogin, isSystemAdmin, systemController.createSystemConfig);
router.post('/update', checkLogin, isSystemAdmin, systemController.updateSystemConfig);
router.get('/', systemController.getSystemConfig);
router.post('/upload', systemController.uploadGeneralImage);
router.get('/random-system-image', systemController.getRandomSystemImage);

module.exports = router;

