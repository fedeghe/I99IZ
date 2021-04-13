/**
 * @jest-environment jsdom
 */
import _Function from './../../src/protos/Function'
import { isNumber, isString } from './../../src/core/checkers'

describe('prototype - Function', function() {

    it('argumentNames', () => {
        function aFunction(foo, boo, too) { return true }
        expect(_Function.argumentNames(aFunction)).toMatchObject(["foo", "boo", "too"])
    })

    it('wrap', () => {
        function aFunction(foo, boo, too) {
            return `${foo} - ${boo} - ${too}`
        }
        var wrapped = _Function.wrap(aFunction, function(origFunction, a, b, c, beK) {
            if (beK) return origFunction(a, b, c);
            else {
                var tmp = origFunction(a, b, c)
                return tmp.toUpperCase()
            }
        })
        expect(wrapped('a', 'b', 'c')).toBe('A - B - C')
        expect(wrapped('a', 'b', 'c', true)).toBe('a - b - c')
    })

});