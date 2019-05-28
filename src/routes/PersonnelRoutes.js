const express = require( "express" );

const asyncMiddleware = require( "../config/middleware/Async" );
const controller = require( "../controllers/PersonnelController" );

/**
 * @swagger
 * tags:
 *  - name: Personnel
 *    description: All personnel related routes
 */
const router = express.Router();

/**
 * @swagger
 * tags:
 * /personnel/:
 *  get:
 *      operationId: GetAllEmployees
 *      summary: Returns a list containing all employees
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Employee'
 *          '401':
 *              $ref: '#/components/responses/Unauthorized'
 *          '500':
 *              $ref: '#/components/responses/InternalServerError'
 *      tags:
 *          - Employee
 */
router.get( "/", asyncMiddleware( controller.getAllEmployees ) );

/**
 * @swagger
 * tags:
 * /personnel/{id}:
 *  get:
 *      operationId: GetEmployeeById
 *      summary: Returns a single employee
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Id of the employee
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Employee
 *          '400':
 *              $ref: '#/components/responses/BadRequest'
 *          '401':
 *              $ref: '#/components/responses/Unauthorized'
 *          '404':
 *              $ref: '#/components/responses/NotFound'
 *          '500':
 *              $ref: '#/components/responses/InternalServerError'
 *      tags:
 *          - Employee
 */
router.get( "/:id", asyncMiddleware( controller.getEmployeeById ) );

/**
 * @swagger
 * tags:
 * /personnel/:
 *  post:
 *      operationId: CreateEmployee
 *      summary: Create a employee
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          firstname:
 *                              type: string
 *                              description: the firstname of the employee
 *                              example: John
 *                          lastname:
 *                              type: string
 *                              description: the lastname of the employee
 *                              example: Doe
 *                          password:
 *                              type: string
 *                              description: the password of the employee
 *                              example: SecretPass123
 *                          salary:
 *                              type: number
 *                              description: the salary of the employee
 *                              example: 2000
 *                          address:
 *                              type: string
 *                              description: the address of the employee
 *                              example: Street 1 City
 *                          number:
 *                              type: string
 *                              description: The phone number of the employee
 *                              example: 0643724597
 *                          emails:
 *                              type: array
 *                              items:
 *                                  type: string
 *                                  description: A email of the employee
 *                                  example: JohnDoe@mail.com
 *                          roles:
 *                              type: array
 *                              items:
 *                                  type: string
 *                                  description: A role of the employee
 *                                  example: ROLE_USER
 *                      required:
 *                          - firstname
 *                          - lastname
 *                          - number
 *      responses:
 *          '204':
 *              description: Created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Employee'
 *          '400':
 *              $ref: '#/components/responses/BadRequest'
 *          '401':
 *              $ref: '#/components/responses/Unauthorized'
 *          '500':
 *              $ref: '#/components/responses/InternalServerError'
 *      tags:
 *          - Employee
 */
router.post( "/", asyncMiddleware( controller.createEmployee ) );

/**
 * @swagger
 * tags:
 * /personnel/{id}:
 *  patch:
 *      operationId: UpdateEmployee
 *      summary: Update a existing employee
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Id of the employee to update
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          firstname:
 *                              type: string
 *                              description: the firstname of the employee
 *                              example: John
 *                          lastname:
 *                              type: string
 *                              description: the lastname of the employee
 *                              example: Doe
 *                          password:
 *                              type: string
 *                              description: the password of the employee
 *                              example: SecretPass123
 *                          salary:
 *                              type: number
 *                              description: the salary of the employee
 *                              example: 2000
 *                          address:
 *                              type: string
 *                              description: the address of the employee
 *                              example: Street 1 City
 *                          emails:
 *                              type: array
 *                              items:
 *                                  type: string
 *                                  description: A email of the employee
 *                                  example: JohnDoe@mail.com
 *                          roles:
 *                              type: array
 *                              items:
 *                                  type: string
 *                                  description: A role of the employee
 *                                  example: ROLE_USER
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Employee'
 *          '400':
 *              $ref: '#/components/responses/BadRequest'
 *          '401':
 *              $ref: '#/components/responses/Unauthorized'
 *          '404':
 *              $ref: '#/components/responses/NotFound'
 *          '500':
 *              $ref: '#/components/responses/InternalServerError'
 *      tags:
 *          - Employee
 */
router.patch( "/:id", asyncMiddleware( controller.updateEmployee ) );

/**
 * @swagger
 * tags:
 * /personnel/{id}:
 *  delete:
 *      operationId: DeleteEmployee
 *      summary: Delete a existing employee
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: Id of the employee to update
 *      responses:
 *          '204':
 *              description: No Content
 *          '401':
 *              $ref: '#/components/responses/Unauthorized'
 *          '404':
 *              $ref: '#/components/responses/NotFound'
 *          '500':
 *              $ref: '#/components/responses/InternalServerError'
 *      tags:
 *          - Employee
 */
router.delete( "/:id", asyncMiddleware( controller.deleteEmployee ) );

module.exports = router;
