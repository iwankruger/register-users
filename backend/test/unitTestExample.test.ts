import { UnitTestExample } from '../src/services/UnitTestExample';

// -------------------------------------------------------------------------------------------------------- //
// MOCKS
// -------------------------------------------------------------------------------------------------------- //
// example of mock in __mocks__ folder
// uncomment here and comment out example of mock in test file
jest.mock('../src/services/StringUtility');

// example of mock function in test file
// to use, uncomment and comment out folder mock above

//jest.mock("../services/StringUtility", () => {
//    return {
//        stringify: jest.fn().mockImplementation((req, callback) => {
//            let payload = null;
//            switch (req) {
//                case 'a':
//                    payload = 'A';
//                    break;
//                case 'b':
//                    payload = 'B';
//                    break;
//                default:
//                    payload = 'C';
//            }
//
//            callback(null, payload);
//        })
//    };
//});


// -------------------------------------------------------------------------------------------------------- //
// TESTS
// -------------------------------------------------------------------------------------------------------- //
describe('UnitTestExample', () => {
    test('add: is-valid', () => {
        expect(UnitTestExample.sum(1, 2)).toBe(3);
    });

    test('add using mock: is-valid', () => {
        UnitTestExample.testMock('a', (error: Error, payload: string) => {
            console.log('RESULT ', payload);
            expect(payload).toBe('A');
        })

    });

});