const express = require('express');
const router = express.Router();
const vacationController = require('../../controllers/vacationController');
const { authMiddleware } = require('../../middleware/authMiddleware');

/*
This file only contains routing, the code and logic behind each query is in the controller.
*/

// Get all vacations
router.get('/getAllVacations' ,vacationController.getAllVacations);
// Get all vacations
router.get('/getVacations' ,vacationController.getVacations);
// Get a vacation by ID
router.get('/getVacationById/:id', vacationController.getVacationById);

// Add a new vacation
router.post('/addVacation', vacationController.addVacation);

// Edit an existing vacation
router.patch('/editVacation/:id', vacationController.editVacation);

// Delete an existing vacation
router.delete('/deleteVacation/:id', vacationController.deleteVacation); 

//especific routes

// Get all vacations by area
router.get('/getAllVacationsByArea/:area_id' ,vacationController.getAllVacationsByArea);

// Get all vacations by user
router.get('/getAllVacationsByUser/:id' ,vacationController.getAllVacationsByUser);

// Get all vacations between dates
router.get('/getAllVacationsBetweenDates' ,vacationController.getAllVacationsBetweenDates);

// Get all vacations by employer
router.get('/getAllVacationsByEmployerId/:id' ,vacationController.getAllVacationsByEmployerId);

module.exports = router;

//__________________ SWAGGER DOCUMENTATION ________________________________

// Get all vacations
/**
 * @swagger
 * /v1/vacation/getAllVacations:
 *   get:
 *     summary: Get all vacations
 *     tags: [Vacation]
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

// Get vacations
/**
 * @swagger
 * /v1/vacation/getVacations:
 *   get:
 *     summary: Get vacations
 *     tags: [Vacation]
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

// Get a vacation by ID
/**
 * @swagger
 * /v1/vacation/getVacationById/{id}:
 *   get:
 *     summary: Get a vacation by ID
 *     tags: [Vacation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Id of a vacation
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacation'
 */

// Get all vacations by area
/**
 * @swagger
 * /v1/vacation/getAllVacationsByArea/{area_id}:
 *   get:
 *     summary: Get all vacations by area
 *     tags: [Vacation]
 *     parameters:
 *      - in: path
 *        name: area_id
 *        schema:
 *          type: integer
 *        description: All vacations getted
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

// Get all vacations by user
/**
 * @swagger
 * /v1/vacation/getAllVacationsByUser/{id}:
 *   get:
 *     summary: Get all vacations by user
 *     tags: [Vacation]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        description: All vacations getted
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

// Get all vacations between dates
/**
 * @swagger
 * /v1/vacation/getAllVacationsBetweenDates:
 *   get:
 *     summary: Get all vacations between dates
 *     tags: [Vacation]
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

// Get all vacations by employer
/**
 * @swagger
 * /v1/vacation/getAllVacationsByEmployerId/{id}:
 *   get:
 *     summary: Get all vacations by employer id
 *     tags: [Vacation]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        description: All vacations getted
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

//Vacation component
/** 
 * @swagger
 * components:
 *  schemas:
 *    Vacation:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: ID
 *        employee:
 *          type: integer
 *          description: Employee
 *        start_date:
 *          type: datetime
 *          description: Start date
 *        end_date:
 *          type: datetime
 *          description: End date
 *        status:
 *          type: enum
 *          description: Status
 *        note:
 *          type: string
 *          description: Note
 *        date_asked:
 *          type: datetime
 *          description: Date asked
 *        area_manager_authorization:
 *          type: tinyint
 *          description: Area manager authorization
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
 *        - employee
 *        - start_date
 *        - end_date
 *        - status
 *        - note
 *        - date_asked
 *        - area_manager_authorization
 *      example:
 *        employee: 2
 *        start_date: 2023-08-29
 *        end_date: 2023-08-31
 *        status: null
 *        note: 
 *        date_asked: 2023-08-25
 *        area_manager_authorization: 0
 */

//Add a new vacation
/**
 * @swagger
 * /v1/vacation/addVacation:
 *  post:
 *    summary: Add vacation
 *    tags: [Vacation]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Vacation'
 *    responses:
 *      200:
 *        description: The vacation has been added!
 *      409:
 *        description: Conflict
 *      400: 
 *        description: Bad request
 */

// Edit an existing vacation
/**
 * @swagger
 * /v1/vacation/editVacation:
 *  patch:
 *    summary: Edit vacation
 *    tags: [Vacation]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        description: Vacation edited
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Vacation'
 *    responses:
 *      204:
 *        description: The vacation has been edited!
 *      409:
 *        description: Conflict
 *      400: 
 *        description: Bad request
 */

// Delete an existing vacation
/**
 * @swagger
 * /v1/vacation/deleteVacation/{id}:
 *  delete:
 *    summary: Delete vacation
 *    tags: [Vacation]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        description: vacation deleted
 *    responses:
 *      204:
 *        description: The vacation has been deleted!
 *      409:
 *        description: Conflict
 *      400: 
 *        description: Bad request
 */