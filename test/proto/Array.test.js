/**
 * @jest-environment jsdom
 */
import { _Array } from './../../src/Triad'
import { isNumber, isString } from './../../src/core/checkers'

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
    it('filter', () => {
        const bench = {
            input: [{
                a: [1, 2, 3, 4, 5, 6],
                f: a => a % 2 === 0
            }, {
                a: [1, '2', '3', 4],
                f: isString
            }],
            output: [
                [2, 4, 6],
                ['2', '3']
            ],
        };
        bench.input.forEach(function(input, i) {
            expect(_Array.filter(input.a, input.f)).toMatchObject(bench.output[i])
        })
    });
    it('first', () => {
        const bench = {
            input: [
                [1, 2, 3, 4, 5, 6],
                ['foo'],
                ['boo', 'foo'],
            ],
            output: [1, 'foo', 'boo'],
        };
        bench.input.forEach(function(input, i) {
            expect(_Array.first(input)).toBe(bench.output[i])
        })
    });
    it('flatten', () => {
        const bench = {
            input: [
                [1, 2, [3, [4, [5, [6, 7]]], 8, [9, [10]]]],
                [1, [2, [3, [4, [5, [6, [7, [8, [9, [10]]]]]]]]], 11],
            ],
            output: [
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
            ],
        };
        bench.input.forEach(function(input, i) {
            expect(_Array.flatten(input)).toMatchObject(bench.output[i])
        })
    });
    it('indexOf', () => {
        const bench = {
            input: [
                [
                    [3, 6, 4, 8, 6, 1, 66], 8
                ],
                [
                    [3, 6, 4, 8, 6, 1, 66], 6
                ],
                [
                    [3, 6, 4, 8, 6, 1, 66], 67
                ]
            ],
            output: [
                3, 1, -1
            ],
        };
        bench.input.forEach(function(input, i) {
            expect(_Array.indexOf.apply(null, input)).toBe(bench.output[i])
        })
    });
    it('inspect', () => {
        const bench = {
            input: [
                [3, 6, 4, 8, 6, 1, 66],
                [3, { name: 'foo' }, 66]
            ],
            output: [
                '[3, 6, 4, 8, 6, 1, 66]',
                '[3, {\n  "name": "foo"\n}, 66]'
            ],
        };
        bench.input.forEach(function(input, i) {
            expect(_Array.inspect(input)).toBe(bench.output[i])
        })
    });
    it('intersect', () => {
        const bench = {
            input: [
                [
                    [3, 6, 4, 8, 6, 1, 66],
                    [4, 7, 11, 1, 1]
                ],
                [
                    [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    [5, 6, 7, 8, 9, 10, 11, 12, 13]
                ],
            ],
            output: [
                [4, 1],
                [5, 6, 7, 8, 9]
            ],
        };
        bench.input.forEach(function(input, i) {
            expect(_Array.intersect.apply(null, input)).toMatchObject(bench.output[i])
        })
    });
    it('last', () => {
        const bench = {
            input: [
                [1, 2, 3, 4, 5, 6],
                ['foo'],
                ['boo', 'foo'],
            ],
            output: [6, 'foo', 'foo'],
        };
        bench.input.forEach(function(input, i) {
            expect(_Array.last(input)).toBe(bench.output[i])
        })
    });
    it('lastIndexOf', () => {
        const bench = {
            input: [
                [
                    [3, 6, 4, 8, 6, 1, 66], 6
                ],
                [
                    [3, 6, 4, 8, 6, 1, 66], 6, 3
                ],
                [
                    [3, 6, 4, 8, 6, 1, 66], 6, -4
                ],
            ],
            output: [
                4, 1, 1
            ],
        };
        bench.input.forEach(function(input, i) {
            expect(_Array.lastIndexOf.apply(null, input)).toBe(bench.output[i])
        })
    });
    it('map', () => {
        var a = [undefined, 'A', undefined, 'B', null, 'C'],
            b = [1, 2, 3, 4, 5, 6],
            a0 = _Array.map(a),
            b0 = _Array.map(b, e => e * e);

        expect(a0).toMatchObject(a)
        expect(b0).toMatchObject([1, 4, 9, 16, 25, 36])
    });
    it('reverse', () => {
        const bench = {
            input: [
                [3, 6, 4, 8, 6, 1, 66],
                [3, 6, 4, 'bbb', 6, 'AAAA', 66],
            ],
            output: [
                [66, 1, 6, 8, 4, 6, 3],
                [66, 'AAAA', 6, 'bbb', 4, 6, 3],
            ],
        };
        bench.input.forEach(function(input, i) {
            expect(_Array.reverse(input)).toMatchObject(bench.output[i])
        })
    });
    it('size', () => {
        const bench = {
            input: [
                [3, 6, 4, 8, 6, 1, 66],
                [],
                [2],
            ],
            output: [
                7, 0, 1
            ],
        };
        bench.input.forEach(function(input, i) {
            expect(_Array.size(input)).toBe(bench.output[i])
        })
    });
    it('some', () => {
        const bench = {
            input: [
                [
                    [0, false, '', null]
                ],
                [
                    [0, false, '', null, 1]
                ],
                [
                    [0, 1, 0, 0, 0]
                ],
                [
                    [1, 45, 3, 4, 6], e => e > 45
                ],
                [
                    [1, 45, 3, 4, 6], e => e > 44
                ],
            ],
            output: [
                false, true, true, false, true
            ],
        };
        bench.input.forEach(function(input, i) {
            expect(_Array.some.apply(null, input)).toBe(bench.output[i])
        })
    });
    it('uniq', () => {
        const bench = {
            input: [
                [
                    [0, false, '', null]
                ],
                [
                    [2, 6, 3, 8, 5, 3, 5, 9, 1, 9, 0]
                ],
                [
                    [1, 1, 2, 3, 4, 4, 5, 5, 6, 7, 8, 8, 9, 9, 9]
                ],
                [
                    [1, 1, 2, 3, 4, 4, 5, 5, 6, 7, 8, 8, 9, 9, 9], true
                ],
            ],
            output: [
                [0, false, '', null],
                [2, 6, 3, 8, 5, 9, 1, 0],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
            ],
        };
        bench.input.forEach(function(input, i) {
            expect(_Array.uniq.apply(null, input)).toMatchObject(bench.output[i])
        })
    });

    it('without', () => {
        const bench = {
            input: [
                [
                    [0, false, '', null], false, 0
                ],
                [
                    [1, 2, 3, 4, 5, 6, 7, 8, 9], 1, 3, 5, 7, 9
                ],
            ],
            output: [
                ['', null],
                [2, 4, 6, 8],
            ],
        };
        bench.input.forEach(function(input, i) {
            expect(_Array.without.apply(null, input)).toMatchObject(bench.output[i])
        })
    });

});