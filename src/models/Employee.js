/* eslint-disable no-underscore-dangle, no-param-reassign */
const mongoose = require( "mongoose" );
const uuid = require( "uuid" );

/**
 * @swagger
 * components:
 *  schemas:
 *      Employee:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: The id of the employee
 *                  example: d40a6ad2-8518-4bd5-af9a-1edf073544ec
 *              firstname:
 *                  type: string
 *                  description: The firstname of the employee
 *                  example: John
 *              lastname:
 *                  type: string
 *                  description: The lastname of the employee
 *                  example: Doe
 *              salary:
 *                  type: number
 *                  description: The salary of the employee
 *                  example: 2000
 *              address:
 *                  type: string
 *                  description: The address of the employee
 *                  example: FirstStreet 1 City
 *              number:
 *                  type: string
 *                  description: The phone number of the employee
 *                  example: 0643724597
 *          required:
 *              - firstname
 *              - lastname
 *              - number
 */

const Employee = new mongoose.Schema( {
    _id: {
        type: String,
        default: uuid.v4,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        default: 0,
    },
    address: {
        type: String,
        default: "",
    },
    number: {
        type: String,
        required: true,
    },
}, { timestamps: true } );

Employee.set( "toJSON", {
    virtuals: true,
    versionKey: false,
    transform: ( doc, ret ) => { delete ret._id; delete ret._v; },
} );

module.exports = mongoose.model( "Employee", Employee );
/* eslint-enable no-underscore-dangle, no-param-reassign */
