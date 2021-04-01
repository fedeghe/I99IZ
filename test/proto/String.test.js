/**
 * @jest-environment jsdom
 */

import _String from './../../src/protos/String'

describe('prototype - String', function() {

    it('blank', () => {
        const bench = {
            positive: ['', ' ', '  '],
            negative: ['a', ' a'],
        }
        bench.positive.forEach(p => expect(_String.blank(p)).toBe(true))
        bench.negative.forEach(p => expect(_String.blank(p)).toBe(false))
    });

    it('camelize', () => {
        const s = 'what-is-wrong',
            sc = _String.camelize(s);
        expect(sc).toBe('whatIsWrong')
    });

    it('capitalize', () => {
        const s = 'hello world there',
            sc = _String.capitalize(s);
        expect(sc).toBe('Hello world there')
    });

    it('dasherize', () => {
        const s = 'hello_World_there',
            sc = _String.dasherize(s);
        expect(sc).toBe('hello-World-there')
    });

    it('endsWith', () => {
        const bench = {
            positive: [
                ['hamburger', 'burger'],
                ['hamburger', 'bur', 6],
                ['hamburger', 'ham', 3]
            ],
            negative: [
                ['hamburger', 'ham'],
                ['hamburger', 'ham', 4]
            ],
        }
        bench.positive.forEach(p => expect(_String.endsWith.apply(null, p)).toBe(true))
        bench.negative.forEach(p => expect(_String.endsWith.apply(null, p)).toBe(false))
    });

    it('empty', () => {
        const bench = {
            positive: [''],
            negative: [' ', 'a', ' a'],
        }
        bench.positive.forEach(p => expect(_String.empty(p)).toBe(true))
        bench.negative.forEach(p => expect(_String.empty(p)).toBe(false))
    });



    it('escapeHTML', () => {
        const s = '<div class="article">This is an article</div>',
            sc = _String.escapeHTML(s);
        expect(sc).toBe('&lt;div class="article"&gt;This is an article&lt;/div&gt;')
    });

    it('evalJSON', () => {
        const s = '{ "name": "Violet", "occupation": "character" }',
            sc = _String.evalJSON(s);
        expect(sc.name).toBe('Violet')
        expect(sc.occupation).toBe('character')
    });

    it('extractScripts', () => {
        const s = 'lorem... <script>2 + 2</script> <script>Math.pow(2, 4)</script>',
            sc = _String.extractScripts(s);
        expect(sc[0]).toBe('2 + 2')
        expect(sc[1]).toBe('Math.pow(2, 4)')
    });

    it('evalScripts', () => {
        const s = 'lorem... <script>2 + 2</script> <script>Math.pow(2, 4)</script>',
            sc = _String.evalScripts(s);
        expect(sc[0]).toBe(4)
        expect(sc[1]).toBe(16)
    });

    it('gsub', () => {
        const s = 'click dblclick mousedown mouseup mouseover mousemove mouseout',
            sc = _String.gsub(s, ' ', ', ');
        expect(sc).toBe('click, dblclick, mousedown, mouseup, mouseover, mousemove, mouseout')
    });

    // var mouseEvents = ;
    // mouseEvents.gsub(' ', ', ');

    it('interpolate', () => {
        const o = { url: 'http://I99IZ.io', name: 'I99IZ' },
            int = _String.interpolate('<a href="#{url}">#{name}</a>', o);

        expect(int).toBe(`<a href="${o.url}">${o.name}</a>`)
    });


});