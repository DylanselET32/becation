const express = require('express');
const { authMiddleware } = require('../../middleware/authMiddleware');
const router = express.Router();

router.use('/user', require('./userRoutes'));
router.use('/employer', require('./employerRoutes'));
router.use('/vacation',authMiddleware, require('./vacationRoutes'));
router.use('/area',authMiddleware, require('./areaRoutes'));
router.use('/role',authMiddleware, require('./roleRoutes'));

module.exports = router;