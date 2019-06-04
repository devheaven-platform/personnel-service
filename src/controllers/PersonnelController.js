const EmployeeService = require( "../services/PersonnelService" );
const ApiError = require( "../models/Error" );
const validate = require( "../validators/PersonnelValidator" );

/**
 * Returns all employees from the database
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const getAllEmployees = async ( req, res ) => {
    const employees = await EmployeeService.getAllEmployees( req.headers.authorization );
    return res.json( employees );
};

/**
 * Returns a single employee by its id
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const getEmployeeById = async ( req, res ) => {
    if ( !validate.id( req.params.id ) ) {
        return res.status( 400 ).json( new ApiError( "Id is invalid" ) );
    }

    const employee = await EmployeeService.getEmployeeById( req.params.id, req.headers.authorization );

    if ( !employee ) {
        return res.status( 404 ).json( new ApiError( "Employee not found" ) );
    }

    return res.json( employee );
};

/**
 * Create a new employee
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const createEmployee = async ( req, res ) => {
    const errors = validate.create( req.body );

    if ( Object.keys( errors ).length > 0 ) {
        return res.status( 400 ).json( new ApiError( "One or more values are invalid", errors ) );
    }

    const employee = await EmployeeService.createEmployee( req.body );

    return res.status( 201 ).json( employee );
};

/**
 * Updates a existing employee
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const updateEmployee = async ( req, res ) => {
    if ( !validate.id( req.params.id ) ) {
        return res.status( 400 ).json( new ApiError( "Id is invalid" ) );
    }

    if ( Object.keys( req.body ).length === 0 ) {
        return res.status( 400 ).json( new ApiError( "One or more values are required" ) );
    }

    const errors = validate.update( req.body );
    if ( Object.keys( errors ).length > 0 ) {
        return res.status( 400 ).json( new ApiError( "One or more values are invalid", errors ) );
    }

    const employee = await EmployeeService.updateEmployee( req.params.id, req.body );

    return res.status( 200 ).json( employee );
};

/**
 * Deletes a employee
 *
 * @param {HttpRequest} req the request object
 * @param {HttpResponse} res the response object
 */
const deleteEmployee = async ( req, res ) => {
    if ( !validate.id( req.params.id ) ) {
        return res.status( 400 ).json( new ApiError( "Id is invalid" ) );
    }

    const employee = await EmployeeService.deleteEmployee( req.params.id );

    if ( !employee ) {
        return res.status( 404 ).json( new ApiError( "Employee not found" ) );
    }

    return res.status( 204 ).send();
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
