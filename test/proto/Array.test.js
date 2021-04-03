/**
 * @jest-environment jsdom
 */
import _Array from './../../src/protos/Array'
import { isNumber } from './../../src/core/checkers'

// console.log(_Array)
describe('prototype - Array', function() {
    it('each, from Enumerable', () => {
        var a = [1, 2, 3, 4];
        _Array.each(a, function(e) {
            expect(isNumber(e)).toBeTruthy()
        })
    });

});