/**
 * @jest-environment jsdom
 */

import { screen } from '@testing-library/dom'
import $ from './../../src/funcs/$'
describe('$', () => {
    it('basic case', () => {
        document.body.innerHTML = `
            <span data-testid="not-empty">
                <span data-testid="empty"></span>
            </span>
            <div id="visible" data-testid="visible">Visible Example</div>
        `
        const r1 = $('visible')
        const r2 = screen.queryByTestId('visible')
        expect(r1.innerHTML).toBe(r2.innerHTML)
    })
    it('should not find an element', () => {
        document.body.innerHTML = `
            <span data-testid="not-empty">
                <span data-testid="empty"></span>
            </span>
            <div id="visible" data-testid="visible">Visible Example</div>
        `
        const r1 = $('foofoo')
        expect(r1).toBeNull()
    })
    it('should return the element passed', () => {
        document.body.innerHTML = `
            <span data-testid="not-empty">
                <span data-testid="empty"></span>
            </span>
            <div id="visible" data-testid="visible">Visible Example</div>
        `
        const e = document.getElementById('visible')
        const r1 = $(e)
        expect(e).toBe(r1)
    })

    it('should return more elements', () => {
        document.body.innerHTML = `
            <span data-testid="not-empty">
                <span data-testid="empty"></span>
            </span>
            <div id="visible" data-testid="visible">Visible Example</div>
            <div id="invisible" data-testid="invisible">Invisible Example</div>
        `
        const e1 = document.getElementById('visible'),
            e2 = document.getElementById('invisible'),
            r = $('visible', 'invisible')
        expect(JSON.stringify([e1, e2])).toBe(JSON.stringify(r))
    })

})