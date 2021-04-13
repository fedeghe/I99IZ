import { isFunction, isUndefined } from './../core/checkers'

function update(array, args) {
    var arrayLength = array.length,
        length = args.length;
    while (length--) array[arrayLength + length] = args[length];
    return array;
}

function merge(array, args) {
    array = [].slice.call(array, 0);
    return update(array, args);
}

function argumentNames(func) {
    var names = func.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
        .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
        .replace(/\s+/g, '').split(',');
    return names.length == 1 && !names[0] ? [] : names;
}

function wrap(func, wrapper) {
    var __method = func;
    return function() {
        var a = update([__method.bind(func)], arguments);
        return wrapper.apply(func, a);
    }
}

function bindAsEventListener(func, context) {
    var args = slice.call(arguments, 2);
    return function(event) {
        var a = update([event || window.event], args);
        return func.apply(context, a);
    }
}

function curry(func, ...args) {
    if (!args.length) return func;
    return function() {
        var a = merge(args, arguments);
        return func.apply(this, a);
    }
}

function bind(fn, context) {
    if (arguments.length < 3 && isUndefined(arguments[1]))
        return fn;

    if (!isFunction(fn))
        throw new TypeError("The object is not callable.");

    var nop = function() {};
    var __method = fn,
        args = [].slice.call(arguments, 2);

    var bound = function() {
        var a = merge(args, arguments);
        var c = this instanceof bound ? this : context;
        return __method.apply(c, a);
    };

    nop.prototype = fn.prototype;
    bound.prototype = new nop();

    return bound;
}

function delay(fn, timeout) {
    var __method = fn,
        args = [].slice.call(arguments, 2);
    timeout = timeout * 1000;
    return window.setTimeout(function() {
        return __method.apply(__method, args);
    }, timeout);
}

const _Function = {
    argumentNames,
    bind,
    bindAsEventListener,
    curry,
    delay,
    wrap
}
export default _Function