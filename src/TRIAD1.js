import { extend } from './core/shared'
import { IS_DONTENUM_BUGGY, DONT_ENUMS } from './core/constants'
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
} from './core/checkers'
import _string from './protos/String'

import _Enumerable from './Objects/Enumerable'

import $A from './funcs/$A'
import Prototype, { emptyFunction } from './objects/Prototype'
import _Function from './protos/Function'



// _OBJECT ============================================
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

export const isHash = object => object instanceof _Hash

export const toQueryString = object => _Hash(object).toQueryString()

export const stringify = object => {
    return JSON.stringify(object);
}

export const toHTML = object => {
    return object && object.toHTML ? object.toHTML() : String.interpret(object);
}

export const _Object = {
    clone,
    extend,
    inspect: o => JSON.stringify(o, null, 2),
    isArray,
    isDate,
    isElement,
    isFunction,
    isHash,
    isNumber,
    isString,
    isUndefined,
    keys,
    toHTML,
    toJSON: stringify,
    toQueryString,
    values,
}



// _Class ---------------------------------------------------
function subclass() {};

function create() {
    var parent = null,
        properties = $A(arguments);
    if (isFunction(properties[0]))
        parent = properties.shift();

    function klass() {
        this.initialize.apply(this, arguments);
    }

    extend(klass, _Class.Methods);
    klass.superclass = parent;
    klass.subclasses = [];

    if (parent) {
        subclass.prototype = parent.prototype;
        klass.prototype = new subclass;
        parent.subclasses.push(klass);
    }

    for (var i = 0, length = properties.length; i < length; i++)
        klass.addMethods(properties[i]);

    if (!klass.prototype.initialize)
        klass.prototype.initialize = emptyFunction;

    klass.prototype.constructor = klass;
    return klass;
}

function addMethods(source) {
    var ancestor = this.superclass && this.superclass.prototype,
        properties = Object.keys(source);

    if (IS_DONTENUM_BUGGY) {
        if (source.toString != Object.prototype.toString)
            properties.push("toString");
        if (source.valueOf != Object.prototype.valueOf)
            properties.push("valueOf");
    }

    for (var i = 0, length = properties.length; i < length; i++) {
        var property = properties[i],
            value = source[property];
        if (ancestor && isFunction(value) &&

            _Object.argumentNames(value)[0] == "$super") {

            var method = value;
            value = _Function.wrap(
                (function(m) {
                    return function() {
                        return ancestor[m].apply(this, arguments);
                    };
                })(property),
                method
            );
            value.valueOf = (function(method) {
                return function() {
                    return method.valueOf.call(method);
                };
            })(method);

            value.toString = (function(method) {
                return function() {
                    return method.toString.call(method);
                };
            })(method);
        }
        this.prototype[property] = value;
    }
    return this;
}
export const _Class = {
    create,
    Methods: {
        addMethods
    }
};



// _Hash ===============================================================
export const _Hash = _Class.create(_Enumerable, (function() {
    const toObject = o => _Object.clone(o._object);

    function initialize(object) {
        this._object = _Object.isHash(object) ?
            toObject(object) :
            _Object.clone(object);
    }
    return {
        initialize,
        toObject,
        toTemplateReplacements: toObject
    };
})());

// export triad
export default {
    _Class,
    _Hash,
    _Object
}