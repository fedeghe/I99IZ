// just for the coverage
import './../../src/index.js'


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
})