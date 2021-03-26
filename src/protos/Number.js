import _String from './String'


export const toPaddedString = (number, length, radix) => {
    var str = number.toString(radix || 10);
    return _String.times('0', length - str.length) + str;
}
const abs = () => { /*placeholder*/ }
const ceil = () => { /*placeholder*/ }
const floor = () => { /*placeholder*/ }
const round = () => { /*placeholder*/ }
const succ = () => { /*placeholder*/ }
const times = () => { /*placeholder*/ }
const toColorPart = () => { /*placeholder*/ }



export default {
    toPaddedString
}