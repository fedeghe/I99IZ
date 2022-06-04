import { CLASS_TYPES } from './constants'

const hasNativeIsArray = typeof Array.isArray == 'function'
    && Array.isArray([])
    && !Array.isArray({});

export const _toString = Object.prototype.toString,
    _hasOwnProperty = Object.prototype.hasOwnProperty,
    checkType = (el, type) => typeof(el) === type,
    isFunction = el => _toString.call(el) === CLASS_TYPES.FUNCTION_CLASS,
    isString = el => _toString.call(el) === CLASS_TYPES.STRING_CLASS,
    isBoolean = el => _toString.call(el) === CLASS_TYPES.BOOLEAN_CLASS,
    isNumber = el => _toString.call(el) === CLASS_TYPES.NUMBER_CLASS,
    isArray = (() => hasNativeIsArray ? Array.isArray : el => _toString.call(el) === CLASS_TYPES.ARRAY_CLASS)(),
    isDate = el => _toString.call(el) === CLASS_TYPES.DATE_CLASS,
    isObject = el => _toString.call(el) === CLASS_TYPES.OBJECT_CLASS,
    isElement = el => !!(el && el.nodeType == 1),
    isUndefined = el => typeof el === 'undefined';

export default {
    isFunction,
    isString,
    isBoolean,
    isNumber,
    isArray,
    isDate,
    isUndefined,
    isElement,
    isObject,
    checkType,
    _toString,
    _hasOwnProperty   
}