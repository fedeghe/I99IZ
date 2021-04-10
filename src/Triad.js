/**
 * Why Triad?
 * 
 * Triad is needed to avoid circular imports between the elements exported there
 * Class needs Object
 * Object needs Hash
 * 
 */

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
import _Function from './protos/Function'
import $A from './funcs/$A'
import Prototype, { emptyFunction } from './objects/Prototype'



var $break = {};

const ARRAY_inspect = a => '[' + a.map(_Object.inspect).join(', ') + ']';

export const _Enumerable = (function() {
    function all(els, iterator, context) {
        iterator = iterator || Prototype.K;
        var result = true;
        this.each(els, function(value, index) {
            result = result && !!iterator.call(context, value, index, this);
            if (!result) throw $break;
        }, this);
        return result;
    }

    function any(els, iterator, context) {
        iterator = iterator || Prototype.K;
        var result = false;
        this.each(els, function(value, index) {
            if (result = !!iterator.call(context, value, index, this))
                throw $break;
        }, this);
        return result;
    }

    function collect(els, iterator, context) {
        iterator = iterator || Prototype.K;
        var results = [];
        this.each(els, function(value, index) {
            results.push(iterator.call(context, value, index, this));
        }, this);
        return results;
    }

    function detect(els, iterator, context) {
        var result;
        this.each(els, function(value, index) {
            if (iterator.call(context, value, index, this)) {
                result = value;
                throw $break;
            }
        }, this);
        return result;
    }

    function each(els, iterator, context) {
        try {
            this._each(els, iterator, context);
        } catch (e) {
            if (e != $break) throw e;
        }
        return els;
    }

    function eachSlice(els, number, iterator, context) {
        var index = -number,
            slices = [],
            array = this.toArray(els);

        if (number < 1) return array;
        while ((index += number) < array.length)
            slices.push(this.collect(array.slice(index, index + number), iterator, context))
        return slices

    }

    function findAll(els, iterator, context) {
        var results = [];
        this.each(els, function(value, index) {
            if (iterator.call(context, value, index, this))
                results.push(value);
        }, this);
        return results;
    }

    function include(els, object) {
        if (isFunction(els.indexOf) && els.indexOf(object) != -1)
            return true;

        var found = false;
        this.each(els, function(value) {
            if (value == object) {
                found = true;
                throw $break;
            }
        });
        return found;
    }

    function inGroupsOf(els, number, fillWith) {
        fillWith = isUndefined(fillWith) ? null : fillWith;
        var slices = this.eachSlice(els, number, slice => slice),
            l = slices.length;
        while (slices[l - 1].length < number) {
            slices[l - 1].push(fillWith)
        }
        return slices

    }

    function inject(els, memo, iterator, context) {
        this.each(els, function(value, index) {
            memo = iterator.call(context, memo, value, index, this);
        }, this);
        return memo;
    }

    function inspect(o) {
        // return '#<Enumerable:' + this.toArray().inspect() + '>';
        return '#<Enumerable:' + ARRAY_inspect(this.toArray(o)) + '>';
    }

    function invoke(method) {
        var args = $A(arguments).slice(1);
        return this.els.map(function(value) {
            return value[method].apply(value, args);
        });
    }

    function max(els, iterator, context) {
        iterator = iterator || Prototype.K;
        var result;
        this.each(els, function(value, index) {
            value = iterator.call(context, value, index, this);
            if (result == null || value >= result)
                result = value;
        }, this);
        return result;
    }

    function min(els, iterator, context) {
        iterator = iterator || Prototype.K;
        var result;
        this.each(els, function(value, index) {
            value = iterator.call(context, value, index, this);
            if (result == null || value < result)
                result = value;
        }, this);
        return result;
    }

    function partition(els, iterator, context) {
        iterator = iterator || Prototype.K;
        var trues = [],
            falses = [];
        this.each(els, function(value, index) {
            (iterator.call(context, value, index, this) ?
                trues : falses).push(value);
        }, this);
        return [trues, falses];
    }

    function pluck(els, property) {
        var results = [];
        this.each(els, function(value) {
            results.push(value[property]);
        });
        return results;
    }

    function reject(els, iterator, context) {
        var results = [];
        this.each(els, function(value, index) {
            if (!iterator.call(context, value, index, this))
                results.push(value);
        }, this);
        return results;
    }

    function size(els) {
        return this.toArray(els).length;
    }

    function sortBy(els, iterator, context) {
        var t = this.map(els, function(value, index) {
            return {
                value: value,
                criteria: iterator.call(context, value, index, this)
            };
        }, this).sort(function(left, right) {
            var a = left.criteria,
                b = right.criteria;
            return a < b ? -1 : a > b ? 1 : 0;
        })
        return this.pluck(t, 'value');
    }

    function toArray(o) {
        return this.map(o, Prototype.K);
    }

    function zip() {
        var iterator = Prototype.K,
            args = $A(arguments);
        if (Object.isFunction(args.last()))
            iterator = args.pop();

        var collections = [this].concat(args).map($A);
        return this.map(function(value, index) {
            return iterator(collections.pluck(index));
        });
    }


    return {
        all: all,
        any: any,
        collect: collect,
        detect: detect,
        each: each,
        eachSlice: eachSlice,
        entries: toArray,
        every: all,
        filter: findAll,
        find: detect,
        findAll: findAll,
        include: include,
        inGroupsOf: inGroupsOf,
        inject: inject,
        inspect: inspect,
        invoke: invoke,
        map: collect,
        max: max,
        member: include,
        min: min,
        partition: partition,
        pluck: pluck,
        reject: reject,
        select: findAll,
        size: size,
        some: any,
        sortBy: sortBy,
        toArray: toArray,
        zip: zip
    };
})();

/**
 * OBJECT
 */
export const _Object = (function() {

    const clone = function(object) {
        return extend({}, object);
    }

    const keys = object => {
        if (!isObject(object)) {
            throw new TypeError();
        }
        return Object.keys(object)
    }

    const values = object => {
        var results = [];
        for (var property in object)
            results.push(object[property]);
        return results;
    }

    const isHash = object => object instanceof _Hash

    const toQueryString = object => new _Hash(object).toQueryString()

    const stringify = object => {
        return JSON.stringify(object);
    }

    const toHTML = object => {
        return object && object.toHTML ? object.toHTML() : String.interpret(object);
    }

    return {
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
})();



/**
 * Class
 */
export const _Class = (function() {
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
    return {
        create,
        Methods: {
            addMethods
        }
    }
})();



/**
 * Hash
 */
export const _Hash = _Class.create(_Enumerable, (function() {
    function initialize(object) {
        this._object = _Object.isHash(object) ?
            toObject(object) :
            _Object.clone(object);
    }

    function _each(els, iterator, context) {
        var i = 0;
        for (var key in els) {
            var value = els[key],
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
        return _Object.clone(this._object);
    }

    function keys() {
        return this.pluck(this._object, 'key');
    }

    function values() {
        return this.pluck(this._object, 'value');
    }

    function index(value) {
        var match = this.detect(function(pair) {
            return pair.value === value;
        });
        return match && match.key;
    }

    function merge(object) {
        return this.clone().update(object)
    }

    function update(object) {
        return new _Hash(object).inject(this, function(result, pair) {
            result.set(pair.key, pair.value);
            return result;
        });
    }

    function toQueryPair(key, value) {
        if (isUndefined(value)) return key;
        value = _String.interpret(value);
        value = _String.gsub(value, /(\r)?\n/, '\r\n');
        value = encodeURIComponent(value);
        value = _String.gsub(value, /%20/, '+');
        return key + '=' + value;
    }

    function toQueryString() {
        return this.inject(this._object, [], function(results, pair) {
            var key = encodeURIComponent(pair.key),
                values = pair.value;

            if (values && typeof values == 'object') {
                if (_Object.isArray(values)) {
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

        return '#<Hash:{' + this.map(this._object, function(pair) {
            return pair.map(_Object.inspect).join(': ');
        }).join(', ') + '}>';
    }

    function clone() {
        return new _Hash(this._object);
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


/**
 * Template
 */
export const _Template = (function() {

    const T = _Class.create({
        initialize: function(template, pattern) {
            this.template = template.toString();
            this.pattern = pattern || T.Pattern;
        },

        evaluate: function(object) {
            if (object && isFunction(object.toTemplateReplacements)) {
                // console.log(_Hash)
                object = object.toTemplateReplacements();
            }

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
    T.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;

    return T
})()





export const _Array = extend(_Enumerable, (function() {
    // const inject = (arr, memo, iterator, ctx) => {
    //     iterator = iterator || Prototype.K;
    //     return arr.reduce(iterator.bind(ctx), memo);
    // }

    const last = a => a[a.length - 1]
    const each = (a, iterator, ctx) => a.forEach(iterator.bind(ctx))
    return {
        _each: each,
        from: $A,
        // inject,
        inspect: ARRAY_inspect,
        last
    }
})())


// export triad
export default {
    _Array,
    _Class,
    _Enumerable,
    _Hash,
    _Object,
    _Template
}