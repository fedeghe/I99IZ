/**
 * @jest-environment jsdom
 */

import _String from './../../src/protos/String'
import _Array from './../../src/protos/Array'

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

    it('include', () => {
        const bench = {
            positive: [
                ['framework', 'frame']
            ],
            negative: [
                ['framework', 'fre']
            ],
        }
        bench.positive.forEach(p => expect(_String.include.apply(null, p)).toBe(true))
        bench.negative.forEach(p => expect(_String.include.apply(null, p)).toBe(false))
    });

    it('inspect', () => {
        const s = 'I\'m so happy.',
            r1 = _String.inspect(s),
            r2 = _String.inspect(s, true);

        expect(r1).toBe("'I\\\'m so happy.'")
        expect(r2).toBe('"I\'m so happy."')
    });

    it('interpolate', () => {
        const o = { url: 'http://I99IZ.io', name: 'I99IZ' },
            int = _String.interpolate('<a href="#{url}">#{name}</a>', o);

        expect(int).toBe(`<a href="${o.url}">${o.name}</a>`)
    });
    it('interpret', () => {
        const bench = {
            input: [1],
            output: ['1'],
        };
        bench.input.forEach(function(input, i) {
            expect(_String.interpret(input)).toBe(bench.output[i])
        })
    });

    it('isJSON', () => {
        const bench = {
            positive: ["{ \"foo\": 42 }", '{ "foo": 42 }'],
            negative: ['{ foo: 42 }', ' ', 'a', ' a'],
        }
        bench.positive.forEach(p => expect(_String.isJSON(p)).toBe(true))
        bench.negative.forEach(p => expect(_String.isJSON(p)).toBe(false))
    });
    it('parseQuery', () => {
        const s = 'section=blog&id=45',
            res = _String.parseQuery(s)

        expect(res.section).toBe('blog')
        expect(res.id).toBe("45")
    });
    it('scan', () => {
        var fruits = [];
        _String.scan('apple, pear & orange', /\w+/, function(match) { fruits.push(match[0]) });
        var r = _Array.inspect(fruits);
        expect(fruits.length).toBe(3)
        expect(r.length).toBe(27)
    })


});