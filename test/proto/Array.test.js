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
            //no ref
        b[0] = 2;
        expect(a[0]).toBe(1)
        expect(b[0]).toBe(2)
    });
    it('compact', () => {
        var a = [undefined, 'A', undefined, 'B', null, 'C'],
            b = _Array.compact(a);
        expect(a.length).toBe(6)
        expect(b.length).toBe(3)
        expect(b).toMatchObject(['A', 'B', 'C'])
    });
    it('every', () => {
        const bench = {
            positive: [
                [1, 2, 3, 4, 5, 6],
                ['a', true, 2]
            ],
            negative: [
                ['', 1, 2, 3, 4, 5, 6],
                [0, 1, 2, 3, 4, 5, 6],
                [false, true, 1, 'a'],
            ]
        }
        bench.positive.forEach(b => expect(_Array.every(b)).toBe(true))
        bench.negative.forEach(b => expect(_Array.every(b)).toBe(false))
    });

});