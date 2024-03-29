import vars from './vars'
import exp from './core/shared.js'
import protos from './protos'
import funcs from './funcs'
import objects from './objects'
import BOM from './BOM'
import Triad from './Triad'

(function(CTX) {
    CTX[vars.LIB] = {};
    const NS = CTX[vars.LIB];

    protos.p.Object = Triad._Object
    protos.p.Array = Triad._Array
    objects.Hash = Triad._Hash
    objects.Class = Triad._Class
    objects.Template = Triad._Template

    exp.extend(NS, protos)
    exp.extend(NS, funcs)
    exp.extend(NS, objects)
    exp.extend(NS, BOM)
    exp.extend(NS, {
        "$continue": new Error('"throw $continue" is deprecated, use "return" instead'),
        "$break": {}
    })
})(window);