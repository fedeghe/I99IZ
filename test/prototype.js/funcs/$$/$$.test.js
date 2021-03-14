import { replace } from './../../utils'

const fs = require('fs'),
    path = require('path'),
    config = require('./../../config.json'),
    html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8').toString();

jest.dontMock('fs');

describe('$$', function () {
    beforeEach(() => {
        document.documentElement.innerHTML = replace(html, config);
    });

    afterEach(jest.resetModules);



    it('basic case', () => {
        window.onload = () => {
            const r1 = $$('span')
            expect(r1.length).toBe(2)
        }
    })
    it('more selectors case', () => {
        window.onload = () => {
            const r1 = $$('span', 'strong.foo')
            expect(r1[0].tagName).toBe('SPAN')
            expect(r1[1].tagName).toBe('SPAN')
            expect(r1[2].tagName).toBe('STRONG')
            expect(r1.length).toBe(3)
        }
    })
    it('more selectors ordered per document presence', () => {
        window.onload = () => {
            const r1 = $$('#visible', 'strong.foo', 'span')
            expect(r1[0].tagName).toBe('SPAN')
            expect(r1[1].tagName).toBe('SPAN')
            expect(r1[2].tagName).toBe('DIV')
            expect(r1[3].tagName).toBe('STRONG')
            expect(r1.length).toBe(4)
        }
    })
    it('returns an array', () => {
        window.onload = () => {
            const r = $$('#visible', 'strong.foo', 'span')
            expect(r instanceof Array).toBeTruthy()
        }
    })
    it('should return an empty array', () => {
        window.onload = () => {
            const r1 = $$('#visiblestrong.foo')
            expect(r1 instanceof Array).toBeTruthy()
            expect(r1.length).toBe(0)
        }
    })

});

