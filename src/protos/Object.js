/**
 * clone
 * extend
 * inspect
 * isArray
 * isDate
 * isElement
 * isFunction
 * isHash
 * isNumber
 * isString
 * isUndefined
 * keys
 * toHTML
 * toJSON
 * toQueryString
 * values
 */
// import Hash from './../objects/Hash'
import extend from './../core/shared'
import { IS_DONTENUM_BUGGY, DONT_ENUMS } from './../core/constants'
import {
    _hasOwnProperty,
    isArray,
    isDate,
    isElement,
    isFunction,
    isObject,
    isNumber,
    isString,
    isUndefined,
} from './../core/checkers'
import _string from './String'

const _Object = (function() {

    function clone(object) {
        return extend({}, object);
    }

    function keys(object) {
        if (!isObject(object)) {
            throw new TypeError();
        }
        return Object.keys(object)
    }

    function values(object) {
        var results = [];
        for (var property in object)
            results.push(object[property]);
        return results;
    }

    // function isHash(object) {
    //     return object instanceof Hash;
    // }
    // function toQueryString(object) {
    //     return Hash(object).toQueryString();
    // }

    function stringify(object) {
        return JSON.stringify(object);
    }

    function toHTML(object) {
        return object && object.toHTML ? object.toHTML() : String.interpret(object);
    }

    return {
        clone,
        extend,
        inspect: o => JSON.stringify(o, null, 2),
        isArray,
        // isHash,
        isString,
        isDate,
        isUndefined,
        isElement,
        isFunction,
        isNumber,
        keys,
        // toQueryString,
        values,
        toJSON: stringify,
        toHTML,
    }
})();

export default _Object