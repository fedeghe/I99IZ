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
    });

    it('startsWith', () => {
        const bench = {
            positive: [
                ['hamburger', 'ham'],
                ['hamburger', 'amburger', 1],
                ['hamburger', 'burger', 3]
            ],
            negative: [
                ['hamburger', 'ha', 1],
                ['hamburger', 'han'],
            ],
        }
        bench.positive.forEach(p => expect(_String.startsWith.apply(null, p)).toBe(true))
        bench.negative.forEach(p => expect(_String.startsWith.apply(null, p)).toBe(false))
    });

    it('strip', () => {
        var strs = [
            _String.strip(' foo'),
            _String.strip('   foo'),
            _String.strip('foo '),
            _String.strip('foo   '),
            _String.strip('   foo    ')
        ];
        strs.forEach(s => expect(s).toBe('foo'))
    });

    it('stripScripts', () => {
        var str = _String.stripScripts('<p>This is a test.<script>alert("Look, a test!");</script>End of test</p>');
        expect(str).toBe('<p>This is a test.End of test</p>')
    });

    it('stripTags', () => {
        var strs = [
            _String.stripTags('a <a href="#">link</a>'),
            _String.stripTags('a <a href="#">link</a><script>alert("hello world!");</script>'),
        ];
        expect(strs[0]).toBe('a link')
        expect(strs[1]).toBe('a linkalert("hello world!");')
    });

    it('sub', () => {
        let str = 'apple pear orange',
            bench = {
                input: [
                    [str, ' ', ', '],
                    [str, ' ', ', ', 1],
                    [str, ' ', ', ', 2],
                    [str, /\w+/, function(match) { return _String.capitalize(match[0]) + ',' }, 2]
                ],
                output: [
                    'apple, pear orange',
                    'apple, pear orange',
                    'apple, pear, orange',
                    'Apple, Pear, orange'
                ],
            };
        bench.input.forEach(
            (p, i) => expect(_String.sub.apply(null, p)).toBe(bench.output[i])
        )
        str = '![a pear](/img/pear.jpg) ![an orange](/img/orange.jpg)';
        bench = {
            input: [
                [str, /!\[(.*?)\]\((.*?)\)/, function(match) {
                    return '<img alt="' + match[1] + '" src="' + match[2] + '" />';
                }],
                [str, /!\[(.*?)\]\((.*?)\)/, '<img alt="#{1}" src="#{2}" />']
            ],
            output: [
                '<img alt="a pear" src="/img/pear.jpg" /> ![an orange](/img/orange.jpg)',
                '<img alt="a pear" src="/img/pear.jpg" /> ![an orange](/img/orange.jpg)'
            ],
        };
        bench.input.forEach(
            (p, i) => expect(_String.sub.apply(null, p)).toBe(bench.output[i])
        )
    });

    it('succ', () => {
        let benchs = {
            input: ['a', 'aaa'],
            output: ['b', 'aab']
        };
        benchs.input.forEach(
            (p, i) => expect(_String.succ(p)).toBe(benchs.output[i])
        )
    });

    it('times', () => {
        const benchs = {
            input: [
                ['a', 3],
                ['abc', 5],
                ['echo', 2],
            ],
            output: [
                'aaa',
                'abcabcabcabcabc',
                'echoecho'
            ]
        };
        benchs.input.forEach(
            (p, i) => expect(_String.times.apply(null, p)).toBe(benchs.output[i])
        )
    });

    it.skip('toArray', () => {
        let benchs = {
            input: [
                'Hello world!'
            ],
            output: [
                ['H', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', '!']
            ]
        };
        benchs.input.forEach(
            (p, i) => expect(JSON.stringify(_String.toArray(p))).toBe(JSON.stringify(benchs.output[i]))
        )
    });

    // alias
    it('toQueryParams', () => {
        const s = 'section=blog&id=45',
            res = _String.toQueryParams(s)
            // console.log('res', res)

        expect(res.section).toBe('blog')
        expect(res.id).toBe("45")
    });

    it('truncate', () => {
        const benchs = {
            input: [
                ['A random sentence whose length exceeds 30 characters.'],
                ['Some random text'],
                ['Some random text', 10],
                ['Some random text', 10, ' [...]'],
            ],
            output: [
                'A random sentence whose len...',
                'Some random text',
                'Some ra...',
                'Some [...]'
            ]
        };
        benchs.input.forEach(
            (p, i) => expect(_String.truncate.apply(null, p)).toBe(benchs.output[i])
        )
    });

    it('underscore', () => {
        const benchs = {
            input: [
                'borderBottomWidth',
            ],
            output: [
                'border_bottom_width',
            ]
        };
        benchs.input.forEach(
            (p, i) => expect(_String.underscore(p)).toBe(benchs.output[i])
        )
    });

    it('unescapeHTML', () => {
        const benchs = {
            input: [
                'x &gt; 10',
                '<h1>Pride &amp; Prejudice</h1>;'
            ],
            output: [
                'x > 10',
                'Pride & Prejudice;'
            ]
        };
        benchs.input.forEach(
            (p, i) => expect(_String.unescapeHTML(p)).toBe(benchs.output[i])
        )
    });

    it('unfilterJSON', () => {
        const benchs = {
            input: [
                '/*-secure-\n{"name": "Violet", "occupation": "character", "age": 25}\n*\/'
            ],
            output: [
                { "name": "Violet", "occupation": "character", "age": 25 }
            ]
        };
        benchs.input.forEach(
            (p, i) => expect(JSON.stringify(JSON.parse(_String.unfilterJSON(p))))
            .toBe(JSON.stringify(benchs.output[i]))
        )
    });
});