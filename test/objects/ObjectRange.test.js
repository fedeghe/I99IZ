/**
 * @jest-environment jsdom
 */
import _ObjectRange from './../../src/objects/ObjectRange'
import { isNumber, isString } from './../../src/core/checkers'

describe('object - ObjectRange', () => {
    it('number include -  inclusive', () => {
        var r = new _ObjectRange(1, 5, false);
        expect(r.include(2)).toBeTruthy()
        expect(r.include(5)).toBeTruthy()
    })
    it('number include - exclusive', () => {
        var r = new _ObjectRange(1, 5, true);
        expect(r.include(2)).toBeTruthy()
        expect(r.include(5)).toBeFalsy()
    })
    it('number include - check content type', () => {
        var r = new _ObjectRange(1, 5, true);
        r.each(e => expect(isNumber(e)).toBeTruthy())
    })
    it('string include - check content type', () => {
        var r = new _ObjectRange('a', 'e', false);
        expect(r.include('b')).toBeTruthy()
        expect(r.include('c')).toBeTruthy()
        expect(r.include('d')).toBeTruthy()
        expect(r.include('e')).toBeTruthy()
        r.each(e => expect(isString(e)).toBeTruthy())
    })
});