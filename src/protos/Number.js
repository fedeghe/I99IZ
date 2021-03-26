import _String from './String'


export const toPaddedString = (number, length, radix) => {
    var str = number.toString(radix || 10);
    return _String.times('0', length - str.length) + str;
}
const abs = n => Math.abs(n)
const ceil = n => Math.ceil(n)
const floor = n => Math.floor(n)
const round = n => Math.round(n)
const succ = n => n + 1
const times = (n, interator, ctx = null) => {
    for (var i = 0; i < n; i++) {
        interator.call(ctx, i)
    }
}
const toColorPart = n => toPaddedString(n, 2, 16)

export default {
    abs,
    ceil,
    floor,
    round,
    succ,
    times,
    toColorPart,
    toPaddedString
}