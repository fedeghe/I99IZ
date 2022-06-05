import { isElement } from './../core/checkers'
import _Element from './../protos/Element'

const $ =  (...args) => {
    if (args.length > 1) return args.map(a => $(a))
    var e = args[0]
    if (isElement(e)) return e;
    return _Element.extend(document.getElementById(e))
}

export default $