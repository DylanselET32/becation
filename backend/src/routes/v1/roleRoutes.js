const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/roleController');

/*
This file only contains routing, the code and logic behind each query is in the controller.
*/

// Get all roles
router.get('/getAllRoles' , roleController.getAllRoles);

// Get an role by ID
router.get('/getRoleById/:id', roleController.getRoleById);

// Get an role by a Column
router.get('/getRoleByName/:name', roleController.getRoleByName);

// Add a new role
router.post('/addRole', roleController.addRole);

// Edit an existing role
router.patch('/editRole', roleController.editRole);

// Delete an existing role
router.delete('/deleteRole', roleController.deleteRole); 