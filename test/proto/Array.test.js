/**
 * @jest-environment jsdom
 */
import { _Array } from './../../src/Triad'
import { isNumber, isUndefined } from './../../src/core/checkers'

describe('prototype - Array', function() {
    it('each, from Enumerable', () => {
        var a = [1, 2, 3, 4];
        _Array.each(a, function(e) {
            expect(isNumber(e)).toBeTruthy()
        })
    });
    it('clear', () => {
        var a = [1, 2, 3, 4];
        _Array.clear(a)
        expect(a.length).toBe(0)
        expect(a[0]).toBeUndefined()
    });
    it('clone', () => {
        var a = [1, 2, 3, 4],
            b = _Array.clone(a);
        expect(a.length).toBe(b.length)
        a.forEach((e, i) => expect(a[i]).toBe(b[i]))
    });

});