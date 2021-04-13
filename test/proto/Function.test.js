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

});