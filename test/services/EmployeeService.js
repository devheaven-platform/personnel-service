const { expect, should } = require( "chai" );

const Employee = require( "../../src/models/Employee" );
const EmployeeService = require( "../../src/services/PersonnelService" );
const Setup = require( "../setup" );

describe( "EmployeeService", () => {
    describe( "getAllEmployees", () => {
        before( async () => {
            const testEmployee1 = {
                firstname: "John",
                lastname: "Doe",
                salary: 2000,
                address: "Street 1 City",
                phoneNumber: "0643724597",
            };
            const testEmployee2 = {
                firstname: "Pete",
                lastname: "Baker",
                salary: 1500,
                address: "Street 2 City",
                phoneNumber: "0643724597",
            };

            const ids = [];
            const { id: id1 } = await new Employee( testEmployee1 ).save();
            const { id: id2 } = await new Employee( testEmployee2 ).save();
            ids.push( id1 );
            ids.push( id2 );
            await Setup.onGetAll( ids );
        } );

        it( "Should retrieve all of the employees described above", async () => {
            const employees = await EmployeeService.getAllEmployees();

            expect( employees.length ).to.equal( 2 );
            expect( employees[ 0 ].firstname ).to.equal( "John" );
            expect( employees[ 0 ].salary ).to.equal( 2000 );
            expect( employees[ 1 ].firstname ).to.equal( "Pete" );
            expect( employees[ 1 ].salary ).to.equal( 1500 );
        } );
    } );

    describe( "getEmployeeById", () => {
        it( "Should return a single employee", async () => {
            const testEmployee1 = {
                firstname: "John",
                lastname: "Doe",
                salary: 2000,
                address: "Street 1 City",
                phoneNumber: "0643724597",
            };

            const { id } = await new Employee( testEmployee1 ).save();

            await Setup.onGetById( id );

            const employee = await EmployeeService.getEmployeeById( id );

            expect( employee.firstname ).to.equal( testEmployee1.firstname );
            expect( employee.lastname ).to.equal( testEmployee1.lastname );
            expect( employee.salary ).to.equal( testEmployee1.salary );
            expect( employee.address ).to.equal( testEmployee1.address );
        } );

        it( "Should return null if no employee is found", async () => {
            const employee = await EmployeeService.getEmployeeById( "55417624-c159-4eab-9260-d4679a2e9b31" );

            should().not.exist( employee );
        } );
    } );

    describe( "createEmployee", () => {
        it( "Should create a new employee", async () => {
            const testEmployee1 = {
                firstname: "John",
                lastname: "Doe",
                salary: 2000,
                address: "Street 1 City",
                phoneNumber: "0643724597",
            };

            const employee = await EmployeeService.createEmployee( testEmployee1 );

            expect( employee.firstname ).to.equal( testEmployee1.firstname );
            expect( employee.lastname ).to.equal( testEmployee1.lastname );
            expect( employee.salary ).to.equal( testEmployee1.salary );
            expect( employee.address ).to.equal( testEmployee1.address );
            should().exist( employee.id );
        } );
    } );

    describe( "updateEmployee", () => {
        it( "Should update a employee", async () => {
            const testEmployee1 = {
                firstname: "John",
                lastname: "Doe",
                salary: 2000,
                address: "Street 1 City",
                phoneNumber: "0643724597",
            };

            const { id } = await new Employee( testEmployee1 ).save();

            const employee = await EmployeeService.updateEmployee( id, {
                firstname: "Jo",
                salary: 1500,
            } );

            expect( employee.firstname ).to.equal( "Jo" );
            expect( employee.salary ).to.equal( 1500 );
            expect( employee.lastname ).to.equal( testEmployee1.lastname );
            expect( employee.address ).to.equal( testEmployee1.address );
        } );
    } );

    describe( "deleteEmployee", () => {
        it( "Should delete a employee", async () => {
            const testEmployee1 = {
                firstname: "John",
                lastname: "Doe",
                salary: 2000,
                address: "Street 1 City",
                phoneNumber: "0643724597",
            };

            const { id } = await new Employee( testEmployee1 ).save();

            await EmployeeService.deleteEmployee( id );

            should().not.exist( await Employee.findById( id ) );
        } );

        it( "Should return null if no employee is found", async () => {
            const employee = await EmployeeService.deleteEmployee( "55417624-c159-4eab-9260-d4679a2e9b31" );

            should().not.exist( employee );
        } );
    } );
} );
