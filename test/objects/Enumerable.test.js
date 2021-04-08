/**
 * @jest-environment jsdom
 */
import Enumerable from './../../src/objects/Enumerable'
import { _Class } from './../../src/Triad'
import { extend } from './../../src/core/shared'
import { isString } from './../../src/core/checkers'

describe('object - Enumerable', () => {
    describe('all', () => {
        it('should return true', () => {
            var YourObject = extend({
                el: [1, 2, 3],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.all(YourObject.el)).toBeTruthy()
        });
        it('should return false', () => {
            var YourObject = extend({
                el: [1, 0, 3],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.all(YourObject.el)).toBeFalsy()
        });
        it('should return true - with iterator', () => {
            var YourObject = extend({
                el: [2, 4, 6],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.all(YourObject.el, e => e % 2 === 0)).toBeTruthy()
        });
        it('should return false - with iterator', () => {
            var YourObject = extend({
                el: [1, 4, 3],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.all(YourObject.el, e => e % 2 === 0)).toBeFalsy()
        });

    })
    describe('any', () => {
        it('should return true', () => {
            var YourObject = extend({
                els: [0, false, 1, ''],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.any(YourObject.els)).toBeTruthy()
        });
        it('should return false', () => {
            var YourObject = extend({
                els: ['', 0, false, null],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.any(YourObject.els)).toBeFalsy()
        });
        it('should return true - with iterator', () => {
            var YourObject = extend({
                els: [2, 1, 3, 5],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.any(YourObject.els, e => e % 2 === 0)).toBeTruthy()
        });
        it('should return false - with iwterator', () => {
            var YourObject = extend({
                els: [1, 7, 3, 9],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.any(YourObject.els, e => e % 2 === 0)).toBeFalsy()
        });
    })
    describe('collect', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: ['Hitch', "Hiker's", 'Guide', 'to', 'the', 'Galaxy'],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.collect(YourObject.els, s => s.charAt(0).toUpperCase()))
                .toMatchObject(['H', 'H', 'G', 'T', 'T', 'G'])
        });
    })
    describe('detect', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: ['Hitch', "Hiker's", 'Guide', 'to', 'the', 'Galaxy'],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.detect(YourObject.els, s => s.charAt(0).toUpperCase() === 'G'))
                .toBe('Guide')
        });
    })
    describe('* each', () => {
        it('class create', () => {
            var YourObject = _Class.create(Enumerable, {
                initialize: function(e) {
                    this.e = e;
                },
                _each: function(els, iterator) {
                    els.forEach(iterator)
                },
            });
            var myO = new YourObject([1, 2, 3])
            var s = 0
            myO.each(myO.e, a => s += a)
            expect(s).toBe(6)
        })
    });
    describe('eachSlice', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: [{ name: 'Sunny', age: 20 },
                    { name: 'Audrey', age: 21 },
                    { name: 'Matt', age: 20 },
                    { name: 'Amelie', age: 26 },
                    { name: 'Will', age: 21 }
                ],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);

            expect(YourObject.eachSlice(YourObject.els, 3, s => s.name))
                .toMatchObject([
                    ['Sunny', 'Audrey', 'Matt'],
                    ['Amelie', 'Will']
                ])
        })
    })
    describe('findAll', () => {
        // it.skip('problem, cause uses Enumerable.collect thus we need array to be extended with Enumerable, which cant be', () => {});
        it('should return the expected', () => {
            var YourObject = extend({
                els: [1, 'two', 3, 'four', 5],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);

            expect(YourObject.findAll(YourObject.els, isString))
                .toMatchObject(['two', 'four'])
        })
    })

    describe('include', () => {
        // it.skip('problem, cause uses Enumerable.collect thus we need array to be extended with Enumerable, which cant be', () => {});
        it('should return the expected', () => {
            var YourObject = extend({
                els: [1, 'two', 3, 'four', 5],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);

            expect(YourObject.include(YourObject.els, 3))
                .toBeTruthy()
            expect(YourObject.include(YourObject.els, 7))
                .toBeFalsy()
        })
    })

    describe('inGroupsOf', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: [
                    { name: 'Sunny', age: 20 },
                    { name: 'Audrey', age: 21 },
                    { name: 'Matt', age: 20 },
                    { name: 'Amelie', age: 26 },
                    { name: 'Will', age: 21 }
                ],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);
            var res = YourObject.inGroupsOf(YourObject.els, 2, { name: '', age: 0 })
            expect(res)
                .toMatchObject([
                    [{ name: 'Sunny', age: 20 }, { name: 'Audrey', age: 21 }],
                    [{ name: 'Matt', age: 20 }, { name: 'Amelie', age: 26 }],
                    [{ name: 'Will', age: 21 }, { name: '', age: 0 }]
                ])

        })
    })

    describe('inject', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);

            expect(YourObject.inject(YourObject.els, 0, function(acc, n) { return acc + n; }))
                .toBe(45)
        })
    })

    describe('inspect', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);

            expect(YourObject.inspect(YourObject.els)).toBe('[1, 2, 3, 4, 5, 6, 7, 8, 9]')
        })
    })

    describe('toArray', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);
            var o = YourObject.toArray(YourObject.els)
            expect(o).toMatchObject([1, 2, 3, 4, 5, 6, 7, 8, 9])
            expect(o[2]).toBe(3)
        })
    })

});