/**
 * @jest-environment jsdom
 */
import { screen } from '@testing-library/dom'
import _String from './../../src/protos/String'

describe('prototype - String', function() {

    it('interpolate', () => {
        const o = { url: 'http://I99IZ.io', name: 'I99IZ' },
            int = _String.interpolate('<a href="#{url}">#{name}</a>', o);

        expect(int).toBe(`<a href="${o.url}">${o.name}</a>`)
    });


});