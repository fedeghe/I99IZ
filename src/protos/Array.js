/**
 * polluted functions:
 * - from
 * - clear
 * - clone
 * - compact
 * - every
 * - filter
 * - first
 * - flatten
 * - indexOf
 * - inspect
 * - intersect
 * - last
 * - lastIndexOf
 * - map
 * - reverse
 * - size
 * - some
 * - toArray
 * - uniq
 * - without
 */

import $A from './../funcs/$A'
import { _Object } from './../Triad'

const inject = (arr, memo, iterator) => {
    iterator = iterator || Prototype.K;
    var context = arguments[3];
    return arr.reduce(iterator.bind(context), memo);
}
const inspect = a => '[' + a.map(_Object.inspect).join(', ') + ']';


export default {
    _each: (a, b, c, d) => {
        console.log('each called: ', a, b, c, d)
    },
    from: $A,
    inject,
    inspect
}