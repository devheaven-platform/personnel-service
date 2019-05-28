/* eslint complexity: 0 */
const validator = require( "validator" );

const GenericValidator = require( "./GenericValidator" );

const matchRegex = ( value, regex ) => new RegExp( regex ).test( value );

/**
 * Validates the create employee request
 *
 * @param {*} body the body containing the employee values
 * @returns a error object containing the field errors
 */
const create = ( body ) => {
    const errors = {};

    if ( !body.firstname ) {
        errors.firstname = "Firstname is required";
    } else if ( !GenericValidator.isString( body.firstname ) ) {
        errors.firstname = "Firstname must be a string";
    } else if ( body.firstname.trim() === "" ) {
        errors.firstname = "Firstname cannot be a empty string";
    } else if ( !validator.isLength( body.firstname, { min: 2, max: 20 } ) ) {
        errors.firstname = "Firstname must be between 2 and 20 characters";
    }

    if ( !body.lastname ) {
        errors.lastname = "Lastname is required";
    } else if ( !GenericValidator.isString( body.lastname ) ) {
        errors.lastname = "Lastname must be a string";
    } else if ( body.lastname.trim() === "" ) {
        errors.lastname = "Lastname cannot be a empty string";
    } else if ( !validator.isLength( body.lastname, { min: 2, max: 20 } ) ) {
        errors.lastname = "Lastname must be between 2 and 20 characters";
    }

    if ( !body.password ) {
        errors.password = "Password is required";
    } else if ( !GenericValidator.isString( body.password ) ) {
        errors.password = "Password must be a string";
    } else if ( body.password.trim() === "" ) {
        errors.password = "Password cannot be a empty string";
    } else if ( !validator.isLength( body.password, { min: 6, max: 40 } ) ) {
        errors.password = "Password must be between 6 and 40 characters";
    } else if ( !matchRegex( body.password, "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$" ) ) {
        errors.password = "Password must contain atleast a capital letter, a number and a lower case letter";
    }

    if ( body.salary && !GenericValidator.isNumber( body.salary ) ) {
        errors.salary = "Salary must be of type number";
    }

    if ( body.address && body.address.trim() !== "" && !GenericValidator.isString( body.address ) ) {
        errors.address = "Address must be of type string";
    }

    if ( !body.number ) {
        errors.number = "Number is required";
    } else if ( !GenericValidator.isString( body.number ) ) {
        errors.number = "Number must be a string";
    } else if ( body.number.trim() === "" ) {
        errors.number = "Number cannot be a empty string";
    } else if ( !validator.isMobilePhone( body.number ) ) {
        errors.number = "Number must be a valid phone number";
    }

    if ( !body.emails || !body.emails.length > 0 ) {
        errors.emails = "Atleast 1 email is required";
    } else {
        body.emails.forEach( ( email ) => {
            if ( !validator.isEmail( email ) ) {
                errors.emails = "All emails must be of type email";
            }
        } );
    }

    if ( !body.roles || !body.roles.length > 0 ) {
        errors.roles = "Atleast 1 role is required";
    } else {
        body.roles.forEach( ( role ) => {
            if ( role !== "ROLE_USER" && role !== "ROLE_DEVELOPER" && role !== "ROLE_HR" && role !== "ROLE_MANAGER" ) {
                errors.roles = "One or more roles are incorrect";
            }
        } );
    }

    return errors;
};

/**
 * Validates the update employee request
 *
 * @param {*} body the body containing the employee values
 * @returns a error object containing the field errors
 */
const update = ( body ) => {
    const errors = {};

    if ( body.firstname ) {
        if ( !GenericValidator.isString( body.firstname ) ) {
            errors.firstname = "Firstname must be a string";
        } else if ( body.firstname.trim() === "" ) {
            errors.firstname = "Firstname cannot be a empty string";
        } else if ( !validator.isLength( body.firstname, { min: 2, max: 20 } ) ) {
            errors.firstname = "Firstname must be between 2 and 20 characters";
        }
    }

    if ( body.lastname ) {
        if ( !GenericValidator.isString( body.lastname ) ) {
            errors.lastname = "Lastname must be a string";
        } else if ( body.lastname.trim() === "" ) {
            errors.lastname = "Lastname cannot be a empty string";
        } else if ( !validator.isLength( body.lastname, { min: 2, max: 20 } ) ) {
            errors.lastname = "Lastname must be between 2 and 20 characters";
        }
    }

    if ( body.password ) {
        if ( !GenericValidator.isString( body.password ) ) {
            errors.password = "Password must be a string";
        } else if ( body.password.trim() === "" ) {
            errors.password = "Password cannot be a empty string";
        } else if ( !validator.isLength( body.password, { min: 6, max: 40 } ) ) {
            errors.password = "Password must be between 2 and 20 characters";
        } else if ( !matchRegex( body.password, "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$" ) ) {
            errors.password = "Password must contain atleast a capital letter, a number and a lower case letter";
        }
    }

    if ( body.salary && !GenericValidator.isNumber( body.salary ) ) {
        errors.salary = "Salary must be of type number";
    }

    if ( body.address && body.address.trim() !== "" && !GenericValidator.isString( body.address ) ) {
        errors.address = "Address must be of type string";
    }

    if ( body.emails && body.emails.length > 0 ) {
        body.emails.forEach( ( email ) => {
            if ( !validator.isEmail( email ) ) {
                errors.emails = "All emails must be of type email";
            }
        } );
    }

    if ( body.roles && body.roles.length > 0 ) {
        body.roles.forEach( ( role ) => {
            if ( role !== "ROLE_USER" && role !== "ROLE_DEVELOPER" && role !== "ROLE_HR" && role !== "ROLE_MANAGER" ) {
                errors.roles = "One or more roles are incorrect";
            }
        } );
    }

    return errors;
};

module.exports = {
    id: GenericValidator.id,
    create,
    update,
};
/* eslint complexity: 0 */
