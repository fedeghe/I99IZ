/**
 * @jest-environment jsdom
 */
import $H from './../../src/funcs/$H'
describe('$H', () => {
    it('should work as an alias', () => {
        const h = $H({ a: 'apple', b: 'banana', c: 'coconut' }),
            k = h.keys();
        expect(JSON.stringify(k)).toBe(JSON.stringify(['a', 'b', 'c']))
    })
})