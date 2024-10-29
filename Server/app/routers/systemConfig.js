const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middleware/auth');
const { isAdmin } = require('../middleware/isAdmin');
const systemController = require('../controllers/systemController');


router.post('/config', systemController.createSystemConfig);
router.post('/update', systemController.updateSystemConfig);
router.get('/', systemController.getSystemConfig);

module.exports = router;

