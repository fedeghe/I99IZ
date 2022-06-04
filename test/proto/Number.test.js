/**
 * @jest-environment jsdom
 */
import _Number from './../../src/protos/Number'

describe('prototype - Number', function() {
    it('abs', () => {
        expect(_Number.abs(-2)).toBe(2)
        expect(_Number.abs(4)).toBe(4)
        expect(_Number.abs(-3123.123123123123123)).toBe(3123.123123123123123)
        expect(_Number.abs(-3123.123123123123123E10)).toBe(3123.123123123123123E10)
    });
    it('ceil', () => {
        expect(_Number.ceil(2.5)).toBe(3)
        expect(_Number.ceil(-2.5)).toBe(-2)
        expect(_Number.ceil(1.9999999999999)).toBe(2)
        expect(_Number.ceil(2.000000000000001)).toBe(3)
    });
    it('floor', () => {
        expect(_Number.floor(2.5)).toBe(2)
        expect(_Number.floor(-2.5)).toBe(-3)
        expect(_Number.floor(1.9999999999999)).toBe(1)
        expect(_Number.floor(2.000000000000001)).toBe(2)
    });
    it('round', () => {
        expect(_Number.round(2.5)).toBe(3)
        expect(_Number.round(-2.5)).toBe(-2)
        expect(_Number.round(1.9999999999999)).toBe(2)
        expect(_Number.round(2.000000000000001)).toBe(2)
        expect(_Number.round(2.499999999999999)).toBe(2)
        expect(_Number.round(2.500000000000000)).toBe(3)
    });
    it('succ', () => {
        expect(_Number.succ(2.5)).toBe(3.5)
        expect(_Number.succ(2)).toBe(3)
        expect(_Number.succ(-1)).toBe(0)
        expect(_Number.succ(0)).toBe(1)
    });
    it('times', () => {
        var obj = { count: 0, total: 0 };

        function add(addend) {
            ++this.count;
            this.total += addend;
        }
        _Number.times(4, add, obj)
        expect(obj.count).toBe(4)
        expect(obj.total).toBe(6)
    });
    it('toColorPart', () => {
        expect(_Number.toColorPart(2)).toBe('02')
        expect(_Number.toColorPart(22)).toBe('16')
        expect(_Number.toColorPart(223344)).toBe('36870')
    });
    it('toPaddedString', () => {
        expect(_Number.toPaddedString(2.4, 5, 10)).toBe('002.4')
        expect(_Number.toPaddedString(2.4, 4, 10)).toBe('02.4')
        expect(_Number.toPaddedString(2.4, 3, 10)).toBe('2.4')
        expect(_Number.toPaddedString(2.4, 2, 10)).toBe('2.4')
        expect(_Number.toPaddedString(2.4, 1, 10)).toBe('2.4')
    });
});