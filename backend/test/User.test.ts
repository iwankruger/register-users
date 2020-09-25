import { User } from '../src/services/User';
import { Database } from '../src/database/Database';

afterAll(async (done) => {
    await Database.getInstance().close();
    done();
}, 5000);

// -------------------------------------------------------------------------------------------------------- //
// TESTS
// -------------------------------------------------------------------------------------------------------- //
describe('User Tests with MySQL database', () => {

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

        const userData = await User.get(1)

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