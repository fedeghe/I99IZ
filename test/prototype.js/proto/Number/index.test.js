import { replace } from './../../utils'

const fs = require('fs'),
    path = require('path'),
    config = require('./../../config.json'),
    html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8').toString();

jest.dontMock('fs');


describe('prototype.js - Number.prototype', function() {
    beforeEach(() => {
        document.body.innerHTML = replace(html, config);
    });

    afterEach(jest.resetModules);

    it('abs', () => {
        window.onload = () => {
            var n = -2
            expect(n.abs()).toBe(2)
            n = 4
            expect(n.abs(4)).toBe(4)
            n = -3123.123123123123123
            expect(n.abs()).toBe(3123.123123123123123)
            n = -3123.123123123123123E10
            expect(n.abs()).toBe(3123.123123123123123E10)
        }
    });
    it('ceil', () => {
        window.onload = () => {
            var n = -2
            expect(n.ceil()).toBe(3)
            n = -2.5
            expect(n.ceil()).toBe(-2)
            n = 1.9999999999999
            expect(n.ceil()).toBe(2)
            n = 2.000000000000001
            expect(n.ceil()).toBe(3)
        }
    });
    it('floor', () => {
        window.onload = () => {
            var n = 2.5
            expect(n.floor()).toBe(2)
            n = -2.5
            expect(n.floor()).toBe(-3)
            n = 1.9999999999999
            expect(n.floor()).toBe(1)
            n = 2.000000000000001
            expect(n.floor()).toBe(2)
        }
    });
    it('round', () => {
        window.onload = () => {
            var n = 2.5
            expect(_Number.round(2.5)).toBe(3)
            expect(_Number.round(-2.5)).toBe(-2)
            expect(_Number.round(1.9999999999999)).toBe(2)
            expect(_Number.round(2.000000000000001)).toBe(2)
            expect(_Number.round(2.499999999999999)).toBe(2)
            expect(_Number.round(2.500000000000000)).toBe(3)
        }
    });
});