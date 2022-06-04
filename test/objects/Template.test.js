/**
 * @jest-environment jsdom
 */
import { _Template } from './../../src/Triad'
// import { extend } from './../../src/core/shared'
// import { isString } from './../../src/core/checkers'
// import $H from './../../src/funcs/$H'

describe('object - Template', () => {
    it('evaluate', () => {
        var myTemplate = new _Template('The TV show #{title} was created by #{author} (#{network}).');
        var show = {
            title: 'The Simpsons',
            author: 'Matt Groening',
            network: 'FOX'
        };
        var t = myTemplate.evaluate(show)
        expect(t).toBe('The TV show The Simpsons was created by Matt Groening (FOX).')
    })

    it('evaluate escape', () => {
        var myTemplate = new _Template(
            'In #{lang} we also use the \\#{variable} syntax for templates.');
        var data = { lang: 'Ruby', variable: '(not used)' };

        var t = myTemplate.evaluate(data);
        expect(t).toBe('In Ruby we also use the #{variable} syntax for templates.')
    })
});