import _Number from './Number'


const _Date = (function () {
    const toISOString = d => ([
        d.getUTCFullYear(), '-',
        _Number.toPaddedString(d.getUTCMonth() + 1, 2), '-',
        _Number.toPaddedString(d.getUTCDate(), 2), 'T',
        _Number.toPaddedString(d.getUTCHours(), 2), ':',
        _Number.toPaddedString(d.getUTCMinutes(), 2), ':',
        _Number.toPaddedString(d.getUTCSeconds(), 2), 'Z'
    ].join(''))
    return  {
        toISOString,
        toJSON: toISOString
    }
})();

export default _Date