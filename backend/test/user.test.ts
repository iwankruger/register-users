import { sum } from '../src/foo';




// -------------------------------------------------------------------------------------------------------- //
// LIFE-CYCLE
// -------------------------------------------------------------------------------------------------------- //

afterAll(async (done) => {
    console.log('Done!!!');
    //await db.sequelize.close();
    done();
}, 5000);

describe('user tests', () => {

    test('basic', () => {
    expect(sum()).toBe(0);
    });

    test('basic again', () => {
    expect(sum(1, 2)).toBe(3);
    });
});