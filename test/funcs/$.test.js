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
})