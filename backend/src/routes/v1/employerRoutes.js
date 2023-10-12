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
router.delete('/deleteEmployer',authMiddleware, employerController.deleteEmployerById); //Esta para un futuro, pero no deberia ser utilizado por logica empresarial, en su lugar desabilitar usuarios

//especific routes

module.exports = router;

//__________________ SWAGGER DOCUMENTATION ________________________________

// Get all employers
/**
 * @swagger
 * /v1/employer/getAllEmployers:
 *   get:
 *     summary: Get all employers
 *     tags: [Employer]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

// Get all employers by area
/**
 * @swagger
 * /v1/employer/getAllEmployersByArea/{id}:
 *   get:
 *     summary: Get all employers by area
 *     tags: [Employer]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        description: All employers getted
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

// Get a employer by ID
/**
 * @swagger
 * /v1/employer/getEmployerById/{id}:
 *   get:
 *     summary: Get all employers by id
 *     tags: [Employer]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        description: Employer getted
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

// Get a current employer
/**
 * @swagger
 * /v1/employer/getEmployer:
 *   get:
 *     summary: Get employer
 *     tags: [Employer]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

//Employer component
/** 
 * @swagger
 * components:
 *  schemas:
 *    Employer:
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
 *        privileges:
 *          type: integer
 *          description: Privileges
 *        user_id:
 *          type: integer
 *          description: User ID
 *        available_days:
 *          type: integer
 *          description: Available days
 *        total_days:
 *          type: integer
 *          description: Total days
 *        is_cumulative:
 *          type: integer
 *          description: Is cumulative
 *        sign_up_date:
 *          type: datetime
 *          description: Sign up date
 *        area_id:
 *          type: integer
 *          description: Area ID
 *        role_id:
 *          type: integer
 *          description: Role ID
 *        to_create:
 *          type: timestamp
 *          description: To create
 *        to_update:
 *          type: integer
 *          description: To update
 *        to_update_date:
 *          type: datetime 
 *          description: To update date
 *      required:
 *        - name
 *        - surname
 *        - email
 *        - password
 *        - dni
 *        - privileges
 *        - role_id
 *        - area_id
 *        - available_days
 *        - total_days
 *        - is_comulative
 *        - sign_up_date
 *      example:
 *        name: Maria
 *        surname: Castillo
 *        email: mariac@streambe.com
 *        password: mariac123
 *        dni: 12345678
 *        privileges: 2
 *        role_id: 1
 *        area_id: 1
 *        available_days: 5
 *        total_days: 7
 *        is_cumulative: 1
 *        sign_up_date: 2023-08-20
 */

// Add a new employer
/**
 * @swagger
 * /v1/employer/addEmployer:
 *  post:
 *    summary: Add employer
 *    tags: [Employer]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Employer'
 *    responses:
 *      200:
 *        description: The employer has been created!
 *      409:
 *        description: Conflict
 *      400: 
 *        description: Bad request
 */

// Edit an existing employer
/**
 * @swagger
 * /v1/employer/editEmployer:
 *  patch:
 *    summary: Edit employer
 *    tags: [Employer]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        description: Employer edited
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Employer'
 *    responses:
 *      204:
 *        description: The employer has been edited!
 *      409:
 *        description: Conflict
 *      400: 
 *        description: Bad request
 */

// Edit an existing employer by id
/**
 * @swagger
 * /v1/employer/editEmployerById/{id}:
 *  patch:
 *    summary: Edit employer by id
 *    tags: [Employer]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        description: Employer edited
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Employer'
 *    responses:
 *      204:
 *        description: The employer has been edited!
 *      409:
 *        description: Conflict
 *      400: 
 *        description: Bad request
 */

// Delete an existing employer
/**
 * @swagger
 * /v1/employer/deleteEmployer:
 *  delete:
 *    summary: Delete employer
 *    tags: [Employer]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        description: Employer deleted
 *    responses:
 *      204:
 *        description: The employer has been deleted!
 *      409:
 *        description: Conflict
 *      400: 
 *        description: Bad request
 */