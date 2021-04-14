/**
 * @jest-environment jsdom
 */
import _Function from './../../src/protos/Function'
import $A from './../../src/funcs/$A'
import { isNumber, isString } from './../../src/core/checkers'

jest.useFakeTimers();

describe('prototype - Function', function() {

    it('argumentNames', () => {
        function aFunction(foo, boo, too) { return true }
        expect(_Function.argumentNames(aFunction)).toMatchObject(["foo", "boo", "too"])
    })

    it('bind', () => {
        function O() {}
        O.prototype.sayIt = function() { return 'foo foo' }

        function iSayIt() { return this.sayIt() }
        const fn = _Function.bind(iSayIt, new O);
        expect(fn()).toBe('foo foo')
    })

    it('curry', () => {
        function showArguments() {
            return $A(arguments).join(', ');
        }
        const fn1 = _Function.curry(showArguments, 1, 2, 3);
        expect(fn1(6, 7, 8)).toBe('1, 2, 3, 6, 7, 8')
        const fn2 = _Function.curry(fn1, 4, 5);
        expect(fn2(4, 5)).toBe('1, 2, 3, 4, 5, 4, 5')
    })

    it('delay', () => {
        const callback = jest.fn();
        _Function.delay(callback, 1, 'hello')
        jest.runAllTimers();
        expect(callback).toBeCalled();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith('hello')
    })

    it('defer', () => {
        const callback = jest.fn();
        _Function.defer(callback, 'hello')
        jest.runAllTimers();
        expect(callback).toBeCalled();
        expect(callback).toHaveBeenCalledTimes(1);
    })

    it('methodize', () => {
        function setName(target, name) {
            target.name = name;
        }
        var obj = {};
        setName(obj, 'Fred');
        expect(obj.name).toBe('Fred');
        obj.setName = _Function.methodize(setName);
        obj.setName('Barney');
        expect(obj.name).toBe('Barney');
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