/**
 * @jest-environment jsdom
 */
import { screen } from '@testing-library/dom'
import { _Object, _Class, _Hash } from './../../src/Triad'
import _String from './../../src/protos/String'

describe('prototype - Object', function() {
    it('clone', () => {
        const o = { a: 1, b: { c: 33 } },
            oStr = JSON.stringify(o),
            oc = _Object.clone(o),
            ocStr = JSON.stringify(oc);
        expect(oStr).toBe(ocStr)
    });

    it('extend', () => {
        const o = { a: 1, b: { c: 33 } },
            ext = { d: 3, f: 44, fn: n => n ** 2 },
            extended = _Object.extend(o, ext);
        expect(o.d).toBe(3)
        expect(extended.d).toBe(3)
        expect(extended.fn(3)).toBe(9)
    });

    it('inspect', () => {
        const o = { d: 3, f: 44, fn: n => n ** 2 },
            inspection = _Object.inspect(o),
            parsed = JSON.parse(inspection);
        expect(parsed.d).toBe(3)
        expect(parsed.f).toBe(44)
    });

    it('isArray', () => {
        const bench = {
            positive: [
                [],
                new Array, [1, 2, 3],
            ],
            negative: [
                1,
                false,
                () => {},
                Symbol('foo')
            ]
        }
        bench.positive.forEach(b => expect(_Object.isArray(b)).toBe(true))
        bench.negative.forEach(b => expect(_Object.isArray(b)).toBe(false))
    });

    it('isDate', () => {
        const bench = {
            positive: [
                new Date(),
            ],
            negative: [
                '', new String(), 1, false, () => {}, {},
                [], Symbol('hello')
            ]
        }
        bench.positive.forEach(b => expect(_Object.isDate(b)).toBe(true))
        bench.negative.forEach(b => expect(_Object.isDate(b)).toBe(false))
    });

    it('isElement', () => {
        document.body.innerHTML = `
            <span data-testid="not-empty">
                <span data-testid="empty"></span>
            </span>
            <div id="visible" data-testid="visible">Visible Example</div>
        `
        const node = screen.queryByTestId('visible')
        expect(_Object.isElement(node)).toBe(true)
    });

    it('isFunction', () => {
        const bench = {
            positive: [
                () => {},
                function() {},
                new Function(''),
                Date, Object, Symbol, expect, it,
            ],
            negative: [
                '', new String(), 1, false, {},
                [], Symbol('hello')
            ]
        }
        bench.positive.forEach(b => expect(_Object.isFunction(b)).toBe(true))
        bench.negative.forEach(b => expect(_Object.isFunction(b)).toBe(false))
    });

    it('isHash', () => {
        const h = new _Hash([1, 2, 3, 4]);
        expect(_Object.isHash(h)).toBe(true)
    });

    it('isNumber', () => {
        const bench = {
            positive: [
                1, Math.PI, Math.E, 42.34, 3E-231
            ],
            negative: [
                '', new String(), false, {},
                [], Symbol('hello')
            ]
        }
        bench.positive.forEach(b => expect(_Object.isNumber(b)).toBe(true))
        bench.negative.forEach(b => expect(_Object.isNumber(b)).toBe(false))
    });

    it('isString', () => {
        const bench = {
            positive: [
                '', new String(), 'sadasd', ['a', 'b'].join(),
                `${bench}`, (() => 'hei')()
            ],
            negative: [
                1, false, () => {}, {},
                [], Symbol('hello')
            ]
        }
        bench.positive.forEach(b => expect(_Object.isString(b)).toBe(true))
        bench.negative.forEach(b => expect(_Object.isString(b)).toBe(false))
    });

    it('isUndefined', () => {
        const bench = {
            negative: [
                '', new String(), 1, false, () => {}, {},
                [], Symbol('hello')
            ]
        }
        bench.negative.forEach(b => expect(_Object.isUndefined(b)).toBe(false))

        // to test the positive we need a function
        const fn = aaa => _Object.isUndefined(aaa)
        expect(fn()).toBe(true)
    });
    it('keys', () => {
        const aaa = { a: 1, b: 2, c: 3, d: { e: 4 } },
            k = _Object.keys(aaa)
        expect(JSON.stringify(k)).toBe('["a","b","c","d"]')
    });
    it('toJSON', () => {
        const aaa = { a: 1, b: 2, c: 3, d: { e: 4 } },
            str = JSON.stringify(aaa);
        expect(_Object.toJSON(aaa)).toBe(str)
    });
    it('toHTML', () => {
        var Bookmark = _Class.create({
            initialize: function(name, url) {
                this.name = name;
                this.url = url;
            },
            toHTML: function() {
                return _String.interpolate('<a href="#{url}">#{name}</a>', this);
            }
        });
        var api = new Bookmark('Prototype API', 'http://prototypejs.org/api');
        expect(_Object.toHTML(api)).toBe('<a href="http://prototypejs.org/api">Prototype API</a>')
    });
    it('toQueryString', () => {
        const params = { a: "one", b: 2, c: "asd:asda" };

        expect(_Object.toQueryString(params)).toBe('a=one&b=2&c=asd%3Aasda')
    });

    it('values', () => {
        const aaa = { a: 1, b: 2, c: 3, d: { e: 4 } },
            k = _Object.values(aaa)
        expect(JSON.stringify(k)).toBe('[1,2,3,{"e":4}]')
    });

});