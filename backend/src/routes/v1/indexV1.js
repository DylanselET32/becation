const express = require('express');
const { authMiddleware } = require('../../middleware/authMiddleware');
const router = express.Router();

router.use('/user', require('./userRoutes'));
router.use('/vacation',authMiddleware, require('./vacationRoutes'));

module.exports = router;