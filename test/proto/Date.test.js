/**
 * @jest-environment jsdom
 */

import _Date from './../../src/protos/Date'
import { _Array } from './../../src/Triad'

describe('prototype - Date', function() {

    it('toISOString', () => {
        var d = new Date(1969, 11, 31, 19);
        expect(_Date.toISOString(d)).toBe('1969-12-31T18:00:00Z');
    });

    it('toJSON', () => {
        var d = new Date(1969, 11, 31, 19);
        expect(_Date.toJSON(d)).toBe('1969-12-31T18:00:00Z');
    });

});