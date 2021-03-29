/**
 * @jest-environment jsdom
 */

import $$ from './../../src/funcs/$$'
describe('$$', () => {
    it.only('basic case', () => {
        document.body.innerHTML = `
            <span data-testid="not-empty">
                <span data-testid="empty"></span>
            </span>
            <div id="visible" data-testid="visible">Visible Example</div>
        `
        const r1 = $$('span')
        expect(r1.length).toBe(2)
    })
    it('more selectors case', () => {
        document.body.innerHTML = `
            <span data-testid="not-empty">
                <span data-testid="empty"></span>
            </span>
            <div id="visible" data-testid="visible">Visible Example</div>
            <strong class="foo">foo</strong>
        `
        const r1 = $$('span', 'strong.foo')
        expect(r1[0].tagName).toBe('SPAN')
        expect(r1[1].tagName).toBe('SPAN')
        expect(r1[2].tagName).toBe('STRONG')
        expect(r1.length).toBe(3)
    })
    it('more selectors ordered per document presence', () => {
        document.body.innerHTML = `
            <span data-testid="not-empty">
                <span data-testid="empty"></span>
            </span>
            <div id="visible" data-testid="visible">Visible Example</div>
            <strong class="foo">foo</strong>
        `
        const r1 = $$('#visible', 'strong.foo', 'span')
        expect(r1[0].tagName).toBe('SPAN')
        expect(r1[1].tagName).toBe('SPAN')
        expect(r1[2].tagName).toBe('DIV')
        expect(r1[3].tagName).toBe('STRONG')
        expect(r1.length).toBe(4)
    })
    it('returns an array', () => {
        document.body.innerHTML = `
            <span data-testid="not-empty">
                <span data-testid="empty"></span>
            </span>
            <div id="visible" data-testid="visible">Visible Example</div>
            <strong class="foo">foo</strong>
        `
        const r = $$('#visible', 'strong.foo', 'span')
        expect(r instanceof Array).toBeTruthy()
    })
    it('should return an empty array', () => {
        document.body.innerHTML = `
            <span data-testid="not-empty">
                <span data-testid="empty"></span>
            </span>
            <div id="visible" data-testid="visible">Visible Example</div>
            <strong class="foo">foo</strong>
        `
        const r1 = $$('#visiblestrong.foo')

        expect(r1 instanceof Array).toBeTruthy()
        expect(r1.length).toBe(0)
    })

})