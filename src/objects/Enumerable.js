/**
 * whenever we suspect a polluted function from another prototype is used
 * just count that this mathod has been translated 
 * to 
 * NS.p[constructor][function](ctx, ...rest)
 */
import Prototype from './Prototype'
// import _Array from './../protos/Array'

import $A from './../funcs/$A'

import { isFunction, isUndefined } from './../core/checkers'

var $break = {};

var Enumerable = (function() {

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
        return '#<Enumerable:' + _Array.inspect(this.toArray(o)) + '>';
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

    function size() {
        return this.toArray().length;
    }

    function sortBy(iterator, context) {
        return this.map(function(value, index) {
            return {
                value: value,
                criteria: iterator.call(context, value, index, this)
            };
        }, this).sort(function(left, right) {
            var a = left.criteria,
                b = right.criteria;
            return a < b ? -1 : a > b ? 1 : 0;
        }).pluck('value');
    }

    function toArray(o) {
        return o.map(Prototype.K);
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

export default Enumerable