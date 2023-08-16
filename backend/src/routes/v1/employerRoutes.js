const express = require('express');
const router = express.Router();
const employerController = require('../../controllers/employerController');
const { authMiddleware } = require('../../middleware/authMiddleware');

/*
This file only contains routing, the code and logic behind each query is in the controller.
*/

// Get all employers
router.get('/getAllEmployers',authMiddleware ,employerController.getAllEmployers);

// Get all employers by area
router.get('/getAllEmployersByArea/:id',authMiddleware ,employerController.getAllEmployersByArea);

// Get all areas
router.get('/getAllAreas',authMiddleware ,employerController.getAllAreas);

// Get a employer by ID
router.get('/getEmployerById/:id',authMiddleware, employerController.getEmployerById);

// Get a current employer
router.get('/getEmployer',authMiddleware, employerController.getEmployer);

// Add a new employer
router.post('/addEmployer',authMiddleware, employerController.addEmployer);

// Edit an existing employer
router.patch('/editEmployer',authMiddleware, employerController.editEmployer);
router.patch('/editEmployerById/:id',authMiddleware, employerController.editEmployerById);

// Delete an existing employer
router.patch('/disableEmployer',authMiddleware, employerController.disableEmployer); //Este se utiliza para "eliminar" usuarios, los desabilita permanentemente
router.delete('/deleteEmployer',authMiddleware, employerController.deleteEmployer); //Esta para un futuro, pero no deberia ser utilizado por logica empresarial, en su lugar desabilitar usuarios

//especific routes

module.exports = router;