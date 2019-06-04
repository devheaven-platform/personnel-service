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
const createEmployee = async newEmployee => new Employee( newEmployee ).save();

/**
 * Updates a existing employee with the given values
 *
 * @param {*} id the id of the employee that will be updated
 * @param {Object} employee the employee with the updated values
 * @returns the updated employee
 */
const updateEmployee = async ( id, employee ) => Employee.findOneAndUpdate( { _id: id }, employee, { new: true } ).exec();

/**
 * Removes a employee from the database
 *
 * @param {*} id the id of the employee that will be removed
 * @returns the removed employee
 */
const deleteEmployee = async id => Employee.findByIdAndRemove( id );

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
