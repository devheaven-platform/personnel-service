const mongoose = require( "mongoose" );
const { MongoMemoryServer } = require( "mongodb-memory-server" );
const axios = require( "axios" );
const MockAdapter = require( "axios-mock-adapter" );

const mock = new MockAdapter( axios );

const authUri = process.env.AUTH_URI;

let mongoServer;

before( ( done ) => {
    mongoServer = new MongoMemoryServer();
    mongoServer.getConnectionString()
        .then( mongoUri => mongoose.connect( mongoUri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        } )
            .then( done() )
            .catch( error => done( error ) ) );
} );

const onGetById = async ( id ) => {
    mock.onGet( `${ authUri }/users/${ id }` ).reply( 200, {
        id,
        roles: [
            {
                role: "ROLE_USER",
                createdAt: "2019-05-28T14:58:23.745283Z",
                updatedAt: "2019-05-30T23:16:21.930298Z",
            },
        ],
        emails: [
            {
                email: "user@devheaven.nl",
                createdAt: "2019-05-28T14:58:23.624241Z",
                updatedAt: "2019-05-28T14:58:23.544928Z",
            },
        ],
    } );
};

const onGetAll = async ( ids ) => {
    mock.onGet( `${ authUri }/users/` ).reply( 200, [ {
        id: ids[ 0 ],
        roles: [
            {
                role: "ROLE_USER",
                createdAt: "2019-05-28T14:58:23.745283Z",
                updatedAt: "2019-05-30T23:16:21.930298Z",
            },
        ],
        emails: [
            {
                email: "user@devheaven.nl",
                createdAt: "2019-05-28T14:58:23.624241Z",
                updatedAt: "2019-05-28T14:58:23.544928Z",
            },
        ],
    },
    {
        id: ids[ 1 ],
        roles: [
            {
                role: "ROLE_HR",
                createdAt: "2019-05-28T14:58:23.745283Z",
                updatedAt: "2019-05-30T23:16:21.930298Z",
            },
        ],
        emails: [
            {
                email: "hr@devheaven.nl",
                createdAt: "2019-05-28T14:58:23.624241Z",
                updatedAt: "2019-05-28T14:58:23.544928Z",
            },
        ],
    } ] );
};

const onPost = async ( ) => {
    mock.onPost( `${ authUri }/users/` ).reply( 201, {
        id: "0db22dd6-294b-4802-b4ab-0238ded85e30",
        roles: [
            {
                role: "ROLE_USER",
                createdAt: "2019-05-28T14:58:23.745283Z",
                updatedAt: "2019-05-30T23:16:21.930298Z",
            },
        ],
        emails: [
            {
                email: "user@devheaven.nl",
                createdAt: "2019-05-28T14:58:23.624241Z",
                updatedAt: "2019-05-28T14:58:23.544928Z",
            },
        ],
    } );
};

const onPatch = async ( id ) => {
    mock.onPatch( `${ authUri }/users/${ id }` ).reply( 200, {
        id,
        roles: [
            {
                role: "ROLE_USER",
                createdAt: "2019-05-28T14:58:23.745283Z",
                updatedAt: "2019-05-30T23:16:21.930298Z",
            },
        ],
        emails: [
            {
                email: "user@devheaven.nl",
                createdAt: "2019-05-28T14:58:23.624241Z",
                updatedAt: "2019-05-28T14:58:23.544928Z",
            },
        ],
    } );
};

const onDelete = async ( id ) => {
    mock.onDelete( `${ authUri }/users/${ id }` ).reply( 204, {

    } );
};

after( () => {
    mongoose.disconnect();
    mongoServer.stop();
} );

afterEach( async () => {
    await mongoose.connection.dropDatabase();
} );

module.exports = {
    onGetById,
    onGetAll,
    onPost,
    onPatch,
    onDelete,
};
