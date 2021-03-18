import _String from './String'

const _Number = (function () {
    const toPaddedString = (number, length, radix) => {
        var str = number.toString(radix || 10);
        return _String.times('0', length - str.length) + str;
    }
    return {
        abs : () => {/*placeholder*/},
        ceil : () => {/*placeholder*/},
        floor : () => {/*placeholder*/},
        round : () => {/*placeholder*/},
        succ : () => {/*placeholder*/},
        times : () => {/*placeholder*/},
        toColorPart : () => {/*placeholder*/},
        toPaddedString
    }
})()

export default _Number