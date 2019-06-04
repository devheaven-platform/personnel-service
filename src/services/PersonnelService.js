const Employee = require( "../models/Employee" );

/**
 * Returns all employees from the database
 *
 * @returns a list of employees
 */
const getAllEmployees = async () => Employee.find().exec();

/**
 * Returns a single employee from the database with the given id
 *
 * @param {*} id the id of the employee that will be retrieved
 * @returns the employee with the given id
 */
const getEmployeeById = async id => Employee.findById( id ).exec();

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
