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

router.post('/resetPassword/:id', userController.resetPassword); 
router.post('/confirmEmailResetPassword/:token', userController.confirmEmailResetPassword); 


module.exports = router;

//__________________ SWAGGER DOCUMENTATION ________________________________
//user component
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: ID
 *        name:
 *          type: string
 *          description: Name
 *        surname:
 *          type: string
 *          description: Surname
 *        email:
 *          type: string
 *          description: Email
 *        password:
 *          type: string
 *          description: Password
 *        dni:
 *          type: bigint
 *          description: DNI
 *        is_able:
 *          type: tinyint
 *          description: Is Able
 *        privileges:
 *          type: string
 *          description: Privileges
 *        to_create:
 *          type: timestamp
 *          description: To Create
 *        sign_up_date:
 *          type: datetime
 *          description: Sign Up Date
 *        to_update:
 *          type: integer
 *          description: To Update
 *        to_update_date:
 *          type: datetime
 *          description: To Update Date
 *      required:
 *        - name
 *        - surname
 *        - email
 *        - password
 *        - dni
 *      example:
 *        name: Ad
 *        surname: Min
 *        email: admin@streambe.com
 *        password: admin
 *        dni: 1111111111
 */

// Delete an existing user
/**
 * @swagger
 * /v1/user/disableUser:
 *  patch:
 *    summary: Disable user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        description: User was disable
 *    responses:
 *      204:
 *        description: The user has been disable!
 *      409:
 *        description: Conflict
 *      400: 
 *        description: Bad request
 */

// Delete an existing user by employer id
/**
 * @swagger
 * /v1/user/disableUserByEmployerId/{id}:
 *  patch:
 *    summary: Disable user by employer id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        description: User was disable
 *    responses:
 *      204:
 *        description: The user has been disable!
 *      409:
 *        description: Conflict
 *      400: 
 *        description: Bad request
 */

//Login component
/**
 * @swagger
 * components:
 *  schemas:
 *    Login:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: Email
 *        password:
 *          type: string
 *          description: Password
 *      required:
 *        - email
 *        - password
 *      example:
 *        email: admin@streambe.com
 *        password: admin
 */

//Login
/**
 * @swagger
 * /v1/user/login:
 *  post:
 *    summary: Login
 *    tags: [Login]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *        description: You are login!
 *      409:
 *        description: Conflict
 *      400: 
 *        description: Bad request
 */

//Reset Password component
/**
 * @swagger
 * components:
 *  schemas:
 *    ResetPassword:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: Email
 *        password:
 *          type: string
 *          description: Password
 *      required:
 *        - email
 *        - password
 *      example:
 *        email: admin@streambe.com
 *        password: admin
 */

//Reset Password
/**
 * @swagger
 * /v1/user/resetPassword/{id}:
 *  post:
 *    summary: Reset Password
 *    tags: [Reset Password]
 *    parameters:
 *      - in: path
 *        name: id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/ResetPassword'
 *    responses:
 *      200:
 *        description: Now confirm the Email!
 *      409:
 *        description: Conflict
 *      400: 
 *        description: Bad request
 */

//Confirm Email component
/**
 * @swagger
 * components:
 *  schemas:
 *    ConfirmEmail:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: Email
 *        password:
 *          type: string
 *          description: Password
 *      required:
 *        - email
 *        - password
 *      example:
 *        email: admin@streambe.com
 *        password: admin
 */

//Reset Password
/**
 * @swagger
 * /v1/user/confirmEmailResetPassword/{token}:
 *  post:
 *    summary: Confirm Email to reset password
 *    tags: [Reset Password]
 *    parameters:
 *      - in: path
 *        name: token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/ConfirmEmail'
 *    responses:
 *      200:
 *        description: The password has been reset!
 *      409:
 *        description: Conflict
 *      400: 
 *        description: Bad request
 */