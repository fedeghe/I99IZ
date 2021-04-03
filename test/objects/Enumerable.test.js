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
                _each: function(iterator) {
                    this.el.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.all()).toBeTruthy()
        });
        it('should return false', () => {
            var YourObject = extend({
                el: [1, 0, 3],
                _each: function(iterator) {
                    this.el.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.all()).toBeFalsy()
        });
        it('should return true - with iterator', () => {
            var YourObject = extend({
                el: [2, 4, 6],
                _each: function(iterator) {
                    this.el.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.all(e => e % 2 === 0)).toBeTruthy()
        });
        it('should return false - with iwterator', () => {
            var YourObject = extend({
                el: [1, 4, 3],
                _each: function(iterator) {
                    this.el.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.all(e => e % 2 === 0)).toBeFalsy()
        });
    })
    describe('any', () => {
        it('should return true', () => {
            var YourObject = extend({
                el: [0, false, 1, ''],
                _each: function(iterator) {
                    this.el.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.any()).toBeTruthy()
        });
        it('should return false', () => {
            var YourObject = extend({
                el: ['', 0, false, null],
                _each: function(iterator) {
                    this.el.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.any()).toBeFalsy()
        });
        it('should return true - with iterator', () => {
            var YourObject = extend({
                el: [2, 1, 3, 5],
                _each: function(iterator) {
                    this.el.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.any(e => e % 2 === 0)).toBeTruthy()
        });
        it('should return false - with iwterator', () => {
            var YourObject = extend({
                el: [1, 7, 3, 9],
                _each: function(iterator) {
                    this.el.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.any(e => e % 2 === 0)).toBeFalsy()
        });
    })
    describe('collect', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                el: ['Hitch', "Hiker's", 'Guide', 'to', 'the', 'Galaxy'],
                _each: function(iterator) {
                    this.el.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.collect(s => s.charAt(0).toUpperCase()))
                .toMatchObject(['H', 'H', 'G', 'T', 'T', 'G'])
        });
    })
    describe('detect', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                el: ['Hitch', "Hiker's", 'Guide', 'to', 'the', 'Galaxy'],
                _each: function(iterator) {
                    this.el.forEach(iterator)
                }
            }, Enumerable);
            expect(YourObject.detect(s => s.charAt(0).toUpperCase() === 'G'))
                .toBe('Guide')
        });
    })
    describe('* each', () => {
        it('class create - no context', () => {
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
        it('class create - with context', () => {
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

        it('extend - no context', () => {
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

        it('extend - with context', () => {
            var YourObject = extend({
                el: [1, 2, 3],
                _each: (iterator, ctx) => ctx.forEach(iterator)
            }, Enumerable);
            var s = 0
            YourObject.each(a => s += a, YourObject.el)
            expect(s).toBe(6)
        });
    });

});