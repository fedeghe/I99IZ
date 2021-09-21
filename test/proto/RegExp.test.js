/**
 * @jest-environment jsdom
 */

import _RegExp from './../../src/protos/RegExp'
import { _Array } from './../../src/Triad'

describe('prototype - RegExp', function() {

    it('match', () => {
        const bench = {
            positive: [
                [/abc/, 'abc'],
                [/abc/, 'abcd'],
                [/abc/, '0abc'],
                [/^[\w]*$/, 'abc'],
            ],
            negative: [
                [/^abc$/, 'abcd'],
                [/^abc$/, '0abc'],
                [/^[\w]*$/, 'abc%'],
            ],
        }
        bench.positive.forEach(input => expect(_RegExp.match.apply(null, input)).toBe(true))
        bench.negative.forEach(input => expect(_RegExp.match.apply(null, input)).toBe(false))
    });
    it('escape', () => {
        const bench = {
            input: [
                '\\r\e?\/{[]\]',
                '/([.*+?^=!:${}()|[\]\/\\])/g'
            ],
            output: [
                '\\\\re\\?\\/\\{\\[\\]\\]',
                '\\/\\(\\[\\.\\*\\+\\?\\^\\=\\!\\:\\$\\{\\}\\(\\)\\|\\[\\]\\/\\\\\\]\\)\\/g'
            ],
        };
        bench.input.forEach(function(input, i) {
            expect(_RegExp.escape(input)).toBe(bench.output[i])
        })
    })
});