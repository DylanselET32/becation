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
router.patch('/editRole/:id', roleController.editRole);

// Delete an existing role
router.delete('/deleteRole/:id', roleController.deleteRole); 

module.exports = router;

//__________________ SWAGGER DOCUMENTATION ________________________________

// Get all roles
/**
 * @swagger
 * /v1/role/getAllRoles:
 *   get:
 *     summary: Get all roles
 *     tags: [Role]
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

// Get a role by ID
/**
 * @swagger
 * /v1/role/getRoleById/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Id of a role
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 */

// Get an role by name
/**
 * @swagger
 * /v1/role/getRoleByName/{name}:
 *   get:
 *     summary: Get role by name
 *     tags: [Role]
 *     parameters:
 *      - in: path
 *        name: name
 *        schema:
 *          type: string
 *        description: Role getted
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

//Role component
/** 
 * @swagger
 * components:
 *  schemas:
 *    Role:
 *      type: object
 *      properties:
 *        role_name:
 *          type: string
 *          description: Role name
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
 *        - role_name
 *      example:
 *        role_name: Boss
 */

// Add a new Role
/**
 * @swagger
 * /v1/role/addRole:
 *  post:
 *    summary: Add role
 *    tags: [Role]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Role'
 *    responses:
 *      200:
 *        description: The role has been created!
 *      409:
 *        description: Conflict
 *      400: 
 *        description: Bad request
 */

// Edit an existing role
/**
 * @swagger
 * /v1/role/editRole/{id}:
 *  patch:
 *    summary: Edit role
 *    tags: [Role]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        description: Role edited
 *    responses:
 *      204:
 *        description: The role has been edited!
 *      409:
 *        description: Conflict
 *      400: 
 *        description: Bad request
 */

// Delete an existing role
/**
 * @swagger
 * /v1/role/deleteRole:
 *  delete:
 *    summary: Delete role
 *    tags: [Role]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        description: Role deleted
 *    responses:
 *      204:
 *        description: The role has been deleted!
 *      409:
 *        description: Conflict
 *      400: 
 *        description: Bad request
 */