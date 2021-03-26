import { toPaddedString } from './Number'


export const toISOString = d => ([
    d.getUTCFullYear(), '-',
    toPaddedString(d.getUTCMonth() + 1, 2), '-',
    toPaddedString(d.getUTCDate(), 2), 'T',
    toPaddedString(d.getUTCHours(), 2), ':',
    toPaddedString(d.getUTCMinutes(), 2), ':',
    toPaddedString(d.getUTCSeconds(), 2), 'Z'
].join(''))

export const toJSON = toISOString

export default {
    toISOString,
    toJSON
}