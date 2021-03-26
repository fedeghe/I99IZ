
const _RegExp = {
    match: (rx, what) => rx.test(what),
    escape: str => String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1')
}

export default _RegExp