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
import Enumerable from './../objects/Enumerable'
import Prototype from './../objects/Prototype'
import { extend } from './../core/shared'
import { _Object } from './../Triad'

// function inject(arr, memo, iterator, ctx) {
//     iterator = iterator || Prototype.K;
//     return arr.reduce(iterator.bind(ctx), memo);
// }
const inspect = a => '[' + a.map(_Object.inspect).join(', ') + ']';

const each = (a, iterator, ctx) => {
        // console.log('a: ', a)
        // console.log('iterator: ', iterator)
        return a.forEach(iterator.bind(ctx))
    }
    // export default {
    //     each,
    //     from: $A,
    //     inject,
    //     inspect
    // }
export default extend(Enumerable, {
    _each: each,
    from: $A,
    // inject,
    inspect
})