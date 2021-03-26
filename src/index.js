
import vars from './vars'
import exp from './core/shared.js'
import protos from './protos'
import funcs from './funcs'
import objects from './objects'
import BOM from './BOM'

(function(CTX) {
    CTX[vars.LIB] = {};
    const NS = CTX[vars.LIB];
    exp.extend(NS, protos)
    exp.extend(NS, funcs)
    exp.extend(NS, objects)
    exp.extend(NS, BOM)
})(window);