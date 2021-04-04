/**
 * @jest-environment jsdom
 */
import Enumerable from './../../src/objects/Enumerable'
import { _Class } from './../../src/Triad'
import { extend } from './../../src/core/shared'

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
        it.skip('should return true', () => {
            var YourObject = extend({
                els: [0, false, 1, ''],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.any(YourObject.els)).toBeTruthy()
        });
        it.skip('should return false', () => {
            var YourObject = extend({
                els: ['', 0, false, null],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.any(YourObject.els)).toBeFalsy()
        });
        it.skip('should return true - with iterator', () => {
            var YourObject = extend({
                els: [2, 1, 3, 5],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.any(YourObject.els, e => e % 2 === 0)).toBeTruthy()
        });
        it.skip('should return false - with iwterator', () => {
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
        it.skip('should return the expected', () => {
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
        it.skip('should return the expected', () => {
            var YourObject = extend({
                els: ['Hitch', "Hiker's", 'Guide', 'to', 'the', 'Galaxy'],
                _each: function(iterator) {
                    this.els.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.detect(s => s.charAt(0).toUpperCase() === 'G'))
                .toBe('Guide')
        });
    })
    describe('* each', () => {
        it('works as expected', () => {
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

        it.skip('class create - no context', () => {
            var YourObject = _Class.create(Enumerable, {
                initialize: function(e) {
                    this.e = e;
                },
                _each: function(iterator) {
                    this.e.forEach(iterator)
                },
            });
            var myO = new YourObject([1, 2, 3])
            var s = 0
            myO.each(a => s += a)
            expect(s).toBe(6)
        });
        it.skip('class create - with context', () => {
            var YourObject = _Class.create(Enumerable, {
                initialize: function(e) {
                    this.e = e;
                },
                _each: function(iterator, ctx) {
                    ctx.forEach(iterator)
                },
            });
            var myO = new YourObject([1, 2, 3])
            var s = 0
            myO.each(a => s += a, myO.e)
            expect(s).toBe(6)
        });

        it.skip('extend - no context', () => {
            var YourObject = extend({
                el: [1, 2, 3],
                _each: function(iterator) {
                    this.el.forEach(iterator)
                }
            }, Enumerable);
            var s = 0
            YourObject.each(a => s += a)
            expect(s).toBe(6)
        });

        it.skip('extend - with context', () => {
            var YourObject = extend({
                el: [1, 2, 3],
                _each: (iterator, ctx) => ctx.forEach(iterator)
            }, Enumerable);
            var s = 0
            YourObject.each(a => s += a, YourObject.el)
            expect(s).toBe(6)
        });
    });
    describe('eachSlice', () => {
        // it.skip('problem, cause uses Enumerable.collect thus we need array to be extended with Enumerable, which cant be', () => {});
        it.skip('should return the expected', () => {
            var YourObject = extend({
                els: [{ name: 'Sunny', age: 20 },
                    { name: 'Audrey', age: 21 },
                    { name: 'Matt', age: 20 },
                    { name: 'Amelie', age: 26 },
                    { name: 'Will', age: 21 }
                ],
                _each: function(iterator) {
                    this.els.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.eachSlice(3, s => s.name, YourObject.els))
                .toMatchObject([
                    ['Sunny', 'Audrey', 'Matt'],
                    ['Amelie', 'Will']
                ])
        })
    })

});