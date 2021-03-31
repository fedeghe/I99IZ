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
import _String from './protos/String'

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
    function initialize(object) {
        this._object = _Object.isHash(object) ?
            toObject(object) :
            _Object.clone(object);
    }

    function _each(iterator, context) {
        var i = 0;
        for (var key in this._object) {
            var value = this._object[key],
                pair = [key, value];
            pair.key = key;
            pair.value = value;
            iterator.call(context, pair, i);
            i++;
        }
    }

    function set(key, value) {
        return this._object[key] = value;
    }

    function get(key) {
        if (this._object[key] !== Object.prototype[key])
            return this._object[key];
    }

    function unset(key) {
        var value = this._object[key];
        delete this._object[key];
        return value;
    }

    function toObject() {
        return Object.clone(this._object);
    }



    function keys() {
        return this.pluck('key');
    }

    function values() {
        return this.pluck('value');
    }

    function index(value) {
        var match = this.detect(function(pair) {
            return pair.value === value;
        });
        return match && match.key;
    }

    function merge(object) {
        return this.clone().update(object);
    }

    function update(object) {
        return new _Hash(object).inject(this, function(result, pair) {
            result.set(pair.key, pair.value);
            return result;
        });
    }

    function toQueryPair(key, value) {
        if (Object.isUndefined(value)) return key;

        value = String.interpret(value);

        value = value.gsub(/(\r)?\n/, '\r\n');
        value = encodeURIComponent(value);
        value = value.gsub(/%20/, '+');
        return key + '=' + value;
    }

    function toQueryString() {
        return this.inject([], function(results, pair) {
            var key = encodeURIComponent(pair.key),
                values = pair.value;

            if (values && typeof values == 'object') {
                if (Object.isArray(values)) {
                    var queryValues = [];
                    for (var i = 0, len = values.length, value; i < len; i++) {
                        value = values[i];
                        queryValues.push(toQueryPair(key, value));
                    }
                    return results.concat(queryValues);
                }
            } else results.push(toQueryPair(key, values));
            return results;
        }).join('&');
    }

    function inspect() {
        return '#<Hash:{' + this.map(function(pair) {
            return pair.map(Object.inspect).join(': ');
        }).join(', ') + '}>';
    }

    function clone() {
        return new _Hash(this);
    }

    return {
        initialize: initialize,
        _each: _each,
        set: set,
        get: get,
        unset: unset,
        toObject: toObject,
        toTemplateReplacements: toObject,
        keys: keys,
        values: values,
        index: index,
        merge: merge,
        update: update,
        toQueryString: toQueryString,
        inspect: inspect,
        toJSON: toObject,
        clone: clone
    };
})());


// Template ===========================


var Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;

export const _Template = _Class.create({
    initialize: function(template, pattern) {
        this.template = template.toString();
        this.pattern = pattern || Pattern;
    },

    evaluate: function(object) {
        if (object && isObject(object))
            object = _Hash.toTemplateReplacements(object);

        return _String.gsub(this.template, this.pattern, function(match) {
            if (object == null) return (match[1] + '');

            var before = match[1] || '';
            if (before == '\\') return match[2];

            var ctx = object,
                expr = match[3],
                pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;

            match = pattern.exec(expr);
            if (match == null) return before;

            while (match != null) {

                var comp = _String.startsWith(match[1], '[') ?
                    match[2].replace(/\\\\]/g, ']') :
                    match[1];
                ctx = ctx[comp];
                if (null == ctx || '' == match[3]) break;
                expr = expr.substring('[' == match[3] ? match[1].length : match[0].length);
                match = pattern.exec(expr);
            }

            return before + _String.interpret(ctx);
        });
    }
});
_Template.Pattern = Pattern;



// export triad
export default {
    _Class,
    _Hash,
    _Object,
    _Template
}