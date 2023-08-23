const express = require('express');
const router = express.Router();
const vacationController = require('../../controllers/vacationController');
const { authMiddleware } = require('../../middleware/authMiddleware');

/*
This file only contains routing, the code and logic behind each query is in the controller.
*/

// Get all vacations
router.get('/getAllVacations' ,vacationController.getAllVacations);

// Get a vacation by ID
router.get('/getVacationById/:id', vacationController.getVacationById);

// Add a new vacation
router.post('/addVacation', vacationController.addVacation);

// Edit an existing vacation
router.patch('/editVacation', vacationController.editVacation);

// Delete an existing vacation
router.delete('/deleteVacation/:id', vacationController.deleteVacation); 

//especific routes

// Get all vacations by area
router.get('/getAllVacationsByArea/:area_id' ,vacationController.getAllVacationsByArea);

// Get all vacations by user
router.get('/getAllVacationsByUser/:id' ,vacationController.getAllVacationsByUser);

// Get all vacations between dates
router.get('/getAllVacationsBetweenDates' ,vacationController.getAllVacationsBetweenDates);

module.exports = router;