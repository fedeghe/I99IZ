/**
 * @jest-environment jsdom
 */
import _Array from './../../src/protos/Array'
import { isNumber } from './../../src/core/checkers'

describe('prototype - Array', function() {
    it.skip('each, from Enumerable', () => {
        var a = [1, 2, 3, 4]
        _Array.each(a, function(e) {
            expect(isNumber(e)).toBeTruthy()
        })
    });

});