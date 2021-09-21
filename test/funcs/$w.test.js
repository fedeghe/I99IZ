/**
 * @jest-environment jsdom
 */
import $w from './../../src/funcs/$w'
describe('$w', () => {
    it('should work as expected', () => {
        const bench = {
            input: ['apples bananas kiwis'],
            output: [
                ['apples', 'bananas', 'kiwis']
            ],
        };
        bench.input.forEach(function(input, i) {
            expect($w(input)).toMatchObject(bench.output[i])
        })
    });
})