import vars from './vars'
import exp from './core/shared.js'
import protos from './protos'
import funcs from './funcs'
import objects from './objects'
import BOM from './BOM'
import TRIAD from './TRIAD1'

(function(CTX) {
    CTX[vars.LIB] = {};
    const NS = CTX[vars.LIB];

    protos.p.Object = TRIAD._Object
    objects.Hash = TRIAD._Hash
    objects.Class = TRIAD._Class

    exp.extend(NS, protos)
    exp.extend(NS, funcs)
    exp.extend(NS, objects)
    exp.extend(NS, BOM)
})(window);