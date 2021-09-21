export const IS_DONTENUM_BUGGY = (function () {
    for (var p in {
        toString: 1
    }) {
        if (p === 'toString') return false;
    }
    return true;
})();
export const DONT_ENUMS = [
    'toString', 'toLocaleString', 'valueOf',
    'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
    'constructor'
];

export const CLASS_TYPES = {
    FUNCTION_CLASS: '[object Function]',
    BOOLEAN_CLASS: '[object Boolean]',
    NUMBER_CLASS: '[object Number]',
    STRING_CLASS: '[object String]',
    ARRAY_CLASS: '[object Array]',
    DATE_CLASS: '[object Date]',
    OBJECT_CLASS: '[object Object]'
}

export const TYPES = {
    NULL_TYPE: 'Null',
    UNDEFINED_TYPE: 'Undefined',
    BOOLEAN_TYPE: 'Boolean',
    NUMBER_TYPE: 'Number',
    STRING_TYPE: 'String',
    OBJECT_TYPE: 'Object',
}

export default {
    IS_DONTENUM_BUGGY,
    DONT_ENUMS,
    CLASS_TYPES,
    TYPES
}