const swaggerJsdoc = require( "swagger-jsdoc" );

const options = {
    swaggerDefinition: {
        info: {
            title: "Personnel",
            version: "1.0.0",
            description: "Personnel API for the DevHeaven platform",
            contact: {
                name: "DevHeaven",
                url: "http://devheaven.nl",
                email: "devheavenplatform@gmail.com",
            },
        },
        openapi: "3.0.0",
    },
    apis: [
        "./src/routes/*.js",
        "./src/models/*.js",
    ],
};

module.exports = swaggerJsdoc( options );
