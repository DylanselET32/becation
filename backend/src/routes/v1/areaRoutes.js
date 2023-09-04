const express = require('express');
const router = express.Router();
const areaController = require('../../controllers/areaController');

/*
This file only contains routing, the code and logic behind each query is in the controller.
*/

// Get all areas
router.get('/getAllAreas' , areaController.getAllAreas);

// Get an area by ID
router.get('/getAreaById/:id', areaController.getAreaById);

// Get an area by a Column
router.get('/getAreaByColumn/:name', areaController.getAreaByColumn);

// Add a new area
router.post('/addArea', areaController.addArea);

// Edit an existing area
router.patch('/editArea/:id', areaController.editArea);

// Delete an existing area
router.delete('/deleteArea/:id', areaController.deleteArea); 

module.exports = router;