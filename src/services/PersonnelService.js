const axios = require( "axios" );
const Employee = require( "../models/Employee" );
const { find } = require( "lodash" );

const authUri = process.env.AUTH_URI;

/**
 * Returns all employees from the database
 *
 * @returns a list of employees
 */
const getAllEmployees = async ( token ) => {
    const { data: authEmployees } = await axios.get( `${ authUri }/users/`, { headers: { Authorization: token } } );
    const employees = await Employee.find().exec();

    if ( authEmployees ) {
        return authEmployees.map( ( authEmployee ) => {
            const value = authEmployee;
            const emp = find( employees, e => e.id === authEmployee.id );

            if ( emp ) {
                value.firstname = emp.firstname;
                value.lastname = emp.lastname;
                value.phoneNumber = emp.phoneNumber;
                value.address = emp.address;
                value.salary = emp.salary;
            }
            return value;
        } );
    }
    return null;
};

/**
 * Returns a single employee from the database with the given id
 *
 * @param {*} id the id of the employee that will be retrieved
 * @returns the employee with the given id
 */
const getEmployeeById = async ( id, token ) => {
    const { data: authEmployee } = await axios.get( `${ authUri }/users/${ id }`, { headers: { Authorization: token } } ).catch( () => ( {
        data: null,
    } ) );

    if ( !authEmployee ) {
        return null;
    }

    const employee = await Employee.findById( id ).exec();

    authEmployee.firstname = employee.firstname;
    authEmployee.lastname = employee.lastname;
    authEmployee.phoneNumber = employee.phoneNumber;
    authEmployee.address = employee.address;
    authEmployee.salary = employee.salary;

    return authEmployee;
};

/**
 * Creates a new Employee
 *
 * @param {Object} newEmployee the employee that will be created
 * @returns the created employee
 */
const createEmployee = async ( newEmployee ) => {
    const employee = await new Employee( newEmployee ).save();

    return employee;
};

/**
 * Updates a existing employee with the given values
 *
 * @param {*} id the id of the employee that will be updated
 * @param {Object} data the data with the updated values
 * @returns the updated employee
 */
const updateEmployee = async ( id, data ) => {
    const employee = await Employee.findOneAndUpdate( { _id: id }, data, { new: true } ).exec();

    return employee;
};

/**
 * Removes a employee from the database
 *
 * @param {*} id the id of the employee that will be removed
 * @returns the removed employee
 */
const deleteEmployee = async ( id ) => {
    const employee = await Employee.findByIdAndRemove( id );

    if ( !employee ) {
        return null;
    }

    return employee;
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
