/**
 * whenever we suspect a polluted function from another prototype is used
 * just count that this mathod has been translated 
 * to 
 * NS.p[constructor][function](ctx, ...rest)
 */
import Prototype from './Prototype'

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

    function detect(iterator, context) {
        var result;
        this.each(function(value, index) {
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

    function eachSlice(number, iterator, context) {
        var index = -number,
            slices = [],
            array = this.toArray();
        console.log(array)
        if (number < 1) return array;
        while ((index += number) < array.length)
            slices.push(array.slice(index, index + number));
        return slices.collect(iterator, context);

    }

    function findAll(iterator, context) {
        var results = [];
        this.each(function(value, index) {
            if (iterator.call(context, value, index, this))
                results.push(value);
        }, this);
        return results;
    }


    /**
     * 
     * THIS IS NOT EVEN PUBLISHED OR USED ANYWHERE WITHIN Enumerable
     * I comment it out
     *
    function grep(filter, iterator, context) {
        iterator = iterator || Prototype.K;
        var results = [];

        if (Object.isString(filter))
            filter = new RegExp(RegExp.escape(filter));

        this.each(function(value, index) {
            if (filter.match(value))
                results.push(iterator.call(context, value, index, this));
        }, this);
        return results;
    }
    */

    function include(object) {
        if (Object.isFunction(this.indexOf) && this.indexOf(object) != -1)
            return true;

        var found = false;
        this.each(function(value) {
            if (value == object) {
                found = true;
                throw $break;
            }
        });
        return found;
    }

    function inGroupsOf(number, fillWith) {
        fillWith = Object.isUndefined(fillWith) ? null : fillWith;
        return this.eachSlice(number, function(slice) {
            while (slice.length < number) slice.push(fillWith);
            return slice;
        });
    }

    function inject(els, memo, iterator, context) {
        this.each(els, function(value, index) {
            memo = iterator.call(context, memo, value, index, this);
        }, this);
        return memo;
    }

    function inspect() {
        return '#<Enumerable:' + this.toArray().inspect() + '>';
    }

    function invoke(method) {
        var args = $A(arguments).slice(1);
        return this.map(function(value) {
            return value[method].apply(value, args);
        });
    }

    function max(iterator, context) {
        iterator = iterator || Prototype.K;
        var result;
        this.each(function(value, index) {
            value = iterator.call(context, value, index, this);
            if (result == null || value >= result)
                result = value;
        }, this);
        return result;
    }

    function min(iterator, context) {
        iterator = iterator || Prototype.K;
        var result;
        this.each(function(value, index) {
            value = iterator.call(context, value, index, this);
            if (result == null || value < result)
                result = value;
        }, this);
        return result;
    }

    function partition(iterator, context) {
        iterator = iterator || Prototype.K;
        var trues = [],
            falses = [];
        this.each(function(value, index) {
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

    function reject(iterator, context) {
        var results = [];
        this.each(function(value, index) {
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

    function toArray() {
        return this.map(Prototype.K);
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