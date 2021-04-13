function update(array, args) {
    var arrayLength = array.length,
        length = args.length;
    while (length--) array[arrayLength + length] = args[length];
    return array;
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

const _Function = {
    argumentNames,
    wrap
}
export default _Function