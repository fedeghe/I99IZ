/**
 * @jest-environment jsdom
 */
import Enumerable from './../../src/objects/Enumerable'
import { _Class } from './../../src/Triad'
import { extend } from './../../src/core/shared'

describe('object - Enumerable', function() {

    it('basic - class create - no context', () => {
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
    it('basic - class create - with context', () => {
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

    it('basic - extend - no context', () => {
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

    it('basic - extend - with context', () => {
        var YourObject = extend({
            el: [1, 2, 3],
            _each: (iterator, ctx) => ctx.forEach(iterator)
        }, Enumerable);
        var s = 0
        YourObject.each(a => s += a, YourObject.el)
        expect(s).toBe(6)
    });

});