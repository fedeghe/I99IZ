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
import { extend } from './../core/shared'
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

export const clone = function(object) {
    return extend({}, object);
}


export const keys = object => {
    if (!isObject(object)) {
        throw new TypeError();
    }
    return Object.keys(object)
}

export const values = object => {
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

export const stringify = object => {
    return JSON.stringify(object);
}

export const toHTML = object => {
    return object && object.toHTML ? object.toHTML() : String.interpret(object);
}




export default {
    clone,
    extend,
    inspect: o => JSON.stringify(o, null, 2),
    isArray,
    isDate,
    isElement,
    isFunction,
    // isHash,
    isNumber,
    isString,
    isUndefined,
    keys,
    toHTML,
    toJSON: stringify,
    // toQueryString,
    values,
}