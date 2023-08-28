const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const { authMiddleware } = require('../../middleware/authMiddleware');

/*
This file only contains routing, the code and logic behind each query is in the controller.
*/

// Get all users
// router.get('/getAllUsers',authMiddleware ,userController.getAllUsers);

// Get all users by area
// router.get('/getAllUsersByArea/:area_id',authMiddleware ,userController.getAllUsersByArea);

// Get all areas
// router.get('/getAllAreas',authMiddleware ,userController.getAllAreas);

// Get a user by ID
// router.get('/getUserById/:id',authMiddleware, userController.getUserById);

// Get a current user
// router.get('/getUser',authMiddleware, userController.getUser);

// Add a new user
// router.post('/addUser',authMiddleware, userController.addUser);

// Edit an existing user
// router.patch('/editUser',authMiddleware, userController.editUser);
// router.patch('/editUserById/:id',authMiddleware, userController.editUserById);

// Delete an existing user
router.patch('/disableUser',authMiddleware, userController.disableUser); //Este se utiliza para "eliminar" usuarios, los desabilita permanentemente
router.patch('/disableUserByEmployerId/:id',authMiddleware, userController.disableUserByEmployerId); //Este se utiliza para "eliminar" usuarios, los desabilita permanentemente

// router.delete('/deleteUser',authMiddleware, userController.deleteUser); //Esta para un futuro, pero no deberia ser utilizado por logica empresarial, en su lugar desabilitar usuarios

//especific routes

//Login
router.post('/login', userController.login); //no necesita estar logueado 

router.patch('/resetPassword', userController.resetPassword); 


module.exports = router;