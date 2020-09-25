import { User } from '../src/services/User';

// -------------------------------------------------------------------------------------------------------- //
// MOCKS
// -------------------------------------------------------------------------------------------------------- //
// example of mock in __mocks__ folder
// uncomment here and comment out example of mock in test file
jest.mock('../src/database/models');
// the following is for illustration purposes of mocking resource from test file
// to use, uncomment and comment out folder mock above
// const databaseResult = [{
//     id: 1,
//     name: 'Test',
//     surname: 'Mock',
//     email: 'test@mock.com',
//     createdAt: '2020-09-25T12:04:34.000Z',
//     updatedAt: '2020-09-25T12:04:34.000Z',
//     phones: [{
//         id: 1,
//         number: '123',
//         phoneTypeId: 1,
//         userId: 1,
//         createdAt: '2020-09-25T12:04:34.000Z',
//         updatedAt: '2020-09-25T12:04:34.000Z'
//     }]},{
//         id: 2,
//         name: 'Test2',
//         surname: 'Mock2',
//         email: 'test2@mock.com',
//         createdAt: '2020-09-25T12:04:34.000Z',
//         updatedAt: '2020-09-25T12:04:34.000Z',
//         phones: [{
//             id: 2,
//             number: '222',
//             phoneTypeId: 1,
//             userId: 2,
//             createdAt: '2020-09-25T12:04:34.000Z',
//             updatedAt: '2020-09-25T12:04:34.000Z'
//         }]}
// ];
// jest.mock('../src/database/models', () => {
//     return ({
//         User: {
//             associations: { phones: 'mock' },
//             findAll: jest.fn().mockImplementation((query): Promise<any> => {
//                 console.log('QUERY ', query);
//                 if (query.where && query.where.id) {
//                     // return only one mock data item if id is provided
//                     return Promise.resolve([databaseResult[0]]);
//                 } else {
//                     // return all mock data
//                     return Promise.resolve(databaseResult);
//                 }
//             })
//         }
//     });
// });


// -------------------------------------------------------------------------------------------------------- //
// TESTS
// -------------------------------------------------------------------------------------------------------- //
describe('User Tests With Mock Database', () => {

    test('User: get all', async (done) => {

        const userData = await User.get()

        expect(userData).toBeDefined();
        expect(userData.users).toBeDefined();
        expect(userData.users.length).toBeGreaterThan(0);
        expect(typeof userData.users[0].id === 'number').toBe(true);
        expect(typeof userData.users[0].name === 'string').toBe(true);
        expect(typeof userData.users[0].surname === 'string').toBe(true);
        expect(typeof userData.users[0].email === 'string').toBe(true);
        expect(Array.isArray(userData.users[0].phones)).toBe(true);

        if (!Array.isArray(userData.users[0].phones)) throw new Error('Phone property missing')
        expect(userData.users[0].phones.length).toBeGreaterThan(0);
        expect(typeof userData.users[0].phones[0].id  === 'number').toBe(true);
        expect(typeof userData.users[0].phones[0].number  === 'string').toBe(true);
        expect(typeof userData.users[0].phones[0].phoneTypeId  === 'number').toBe(true);

        done();
    });

    test('User: get one', async (done) => {

        const userData = await User.get(1);

        expect(userData).toBeDefined();
        expect(userData.users).toBeDefined();
        expect(userData.users.length).toBe(1);
        expect(typeof userData.users[0].id === 'number').toBe(true);
        expect(typeof userData.users[0].name === 'string').toBe(true);
        expect(typeof userData.users[0].surname === 'string').toBe(true);
        expect(typeof userData.users[0].email === 'string').toBe(true);
        expect(Array.isArray(userData.users[0].phones)).toBe(true);

        if (!Array.isArray(userData.users[0].phones)) throw new Error('Phone property missing')
        expect(userData.users[0].phones.length).toBeGreaterThan(0);
        expect(typeof userData.users[0].phones[0].id  === 'number').toBe(true);
        expect(typeof userData.users[0].phones[0].number  === 'string').toBe(true);
        expect(typeof userData.users[0].phones[0].phoneTypeId  === 'number').toBe(true);

        done();
    });

});