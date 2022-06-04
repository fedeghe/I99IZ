import { isElement } from './../core/checkers'

const $ =  (...args) => {
    if (args.length > 1) return args.map(a => $(a))
    var e = args[0]
    if (isElement(e)) return e;
    return document.getElementById(e)
}

export default $