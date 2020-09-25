import { sum } from '../src/foo';

describe('calculate', () => {

    test('basic', () => {
    expect(sum()).toBe(0);
    });

    test('basic again', () => {
    expect(sum(1, 2)).toBe(3);
    });
});