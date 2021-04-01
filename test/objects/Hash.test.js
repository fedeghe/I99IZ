/**
 * @jest-environment jsdom
 */
import { _Hash } from './../../src/Triad'

describe('object - Hash', function() {
    it('set / get', () => {
        const o = { a: 1 },
            h = new _Hash(o);

        h.set('b', 2);
        expect(h.get('b')).toBe(2)
    });

    it('each', () => {
        const o = { a: 1, b: 2, c: 3 },
            h = new _Hash(o),
            ctx = new function() {
                this.els = []
            }

        h.each(function(el) {
            this.els.push(el.key);
            this.els.push(el.value);
        }, ctx);
        expect(ctx.els[0]).toBe('a')
        expect(ctx.els[1]).toBe(1)
        expect(ctx.els[2]).toBe('b')
        expect(ctx.els[3]).toBe(2)
        expect(ctx.els[4]).toBe('c')
        expect(ctx.els[5]).toBe(3)
    });

    it('unset', () => {
        const o = { a: 1, b: 22 },
            h = new _Hash(o);

        expect(h.get('b')).toBe(22)
        h.unset('b');
        expect(h.get('b')).toBeUndefined()
    });

    it('toObject', () => {
        const a = { a: 'apple', b: 'banana', c: 'coconut' },
            h = new _Hash(a),
            o = h.toObject();

        expect(JSON.stringify(o)).toBe(JSON.stringify(a))
    });

    it('keys', () => {
        const a = { a: 'apple', b: 'banana', c: 'coconut' },
            h = new _Hash(a),
            k = h.keys();
        expect(JSON.stringify(k)).toBe(JSON.stringify(['a', 'b', 'c']))
    });

    it('values', () => {
        const a = { a: 'apple', b: 'banana', c: 'coconut' },
            h = new _Hash(a),
            k = h.values();
        expect(JSON.stringify(k)).toBe(JSON.stringify(['apple', 'banana', 'coconut']))
    });

    it('index', () => {
        const a = { a: 'apple', b: 'banana', c: 'coconut' },
            h = new _Hash(a),
            k = h.index('banana');
        expect(k).toBe('b')
    });

    it('merge', () => {
        const a = { a: 'apple', b: 'banana', c: 'coconut' },
            h = new _Hash(a),
            k = h.merge({ a: 'ant', e: 'elephant' });
        expect(k.get('a')).toBe('ant')
        expect(k.get('b')).toBe('banana')
        expect(k.get('c')).toBe('coconut')
        expect(k.get('e')).toBe('elephant')
    });

    it('update', () => {
        const a = { a: 'apple', b: 'banana', c: 'coconut' },
            h = new _Hash(a);

        h.update({ a: 'ant', e: 'elephant' });
        const k = h.keys();
        expect(h.get('a')).toBe('ant')
        expect(JSON.stringify(k)).toBe(JSON.stringify(['a', 'b', 'c', 'e']))
    });

    it('toQueryString', () => {
        const a = {
                action: 'ship',
                order_id: 123,
                fees: ['f1', 'f2']
            },
            h = new _Hash(a),
            qs = h.toQueryString()

        expect(qs).toBe('action=ship&order_id=123&fees=f1&fees=f2');
    });

    it('inspect', () => {
        const a = {
                action: 'ship',
                order_id: 123,
                fees: ['f1', 'f2']
            },
            h = new _Hash(a),
            i = h.inspect()

        expect(i).toBe(`#<Hash:{"action": "ship", "order_id": 123, "fees": [\n  "f1",\n  "f2"\n]}>`);
    });

    it('inspect', () => {
        const a = {
                action: 'ship',
                order_id: 123,
                fees: ['f1', 'f2']
            },
            h = new _Hash(a),
            c = h.clone();

        expect(h.inspect()).toBe(c.inspect());
    });

});