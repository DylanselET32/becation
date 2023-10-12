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

//__________________ SWAGGER DOCUMENTATION ________________________________

// Get all areas
/**
 * @swagger
 * /v1/area/getAllAreas:
 *   get:
 *     summary: Get all areas
 *     tags: [Area]
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

// Get an area by ID
/**
 * @swagger
 * /v1/area/getAreaById/{id}:
 *   get:
 *     summary: Get area by ID
 *     tags: [Area]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        description: Area getted
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

// Get an area by a Column
/**
 * @swagger
 * /v1/area/getAreaByColumn/{name}:
 *   get:
 *     summary: Get area by column
 *     tags: [Area]
 *     parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *        description: Area getted
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

// Area component
/** 
 * @swagger
 * components:
 *  schemas:
 *    Area:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: ID
 *        area:
 *          type: string
 *          description: Area
 *        area_manager:
 *          type: integer
 *          description: Area manager
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
 *        - area
 *        - area_manager
 *      example:
 *        area: Administration area
 *        area_manager: 2
 */

// Add a new area
/**
 * @swagger
 * /v1/area/addArea:
 *  post:
 *    summary: Add area
 *    tags: [Area]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Area'
 *    responses:
 *      200:
 *        description: The area has been created!
 *      409:
 *        description: Conflict
 *      400: 
 *        description: Bad request
 */

// Edit an existing area
/**
 * @swagger
 * /v1/area/editArea/{id}:
 *  patch:
 *    summary: Edit area
 *    tags: [Area]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        description: Area edited
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Area'
 *    responses:
 *      204:
 *        description: The area has been edited!
 *      409:
 *        description: Conflict
 *      400: 
 *        description: Bad request
 */

// Delete an existing area
/**
 * @swagger
 * /v1/area/deleteArea/{id}:
 *  delete:
 *    summary: Delete area
 *    tags: [Area]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        description: Area deleted
 *    responses:
 *      204:
 *        description: The area has been deleted!
 *      409:
 *        description: Conflict
 *      400: 
 *        description: Bad request
 */