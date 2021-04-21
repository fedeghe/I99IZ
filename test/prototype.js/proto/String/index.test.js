import 'expect-puppeteer'
let page;
describe('String.prototype', function() {
    beforeAll(async() => {
        page = await browser.newPage();
        await page.goto('http://localhost:8080/', {
            waitUntil: 'networkidle0'
        });
    });
    afterAll(async() => {
        await page.close();
    });

    it('blank', async() => {
        const r = await page.evaluate(() => {
            var d = [
                '',
                'aaa',
                '  '
            ]
            return d.map(e => e.blank());
        })
        expect(r[0]).toBeTruthy()
        expect(r[1]).toBeFalsy()
        expect(r[2]).toBeTruthy()
    });

    it('camelize', async() => {
        const out = [
            'backgroundColor',
            'MozBinding'
        ]
        const r = await page.evaluate(() => {
            var d = ['background-color', '-moz-binding']
            return d.map(e => e.camelize());
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('capitalize', async() => {
        const out = [
            'Hello',
            'Hello world!'
        ]
        const r = await page.evaluate(() => {
            var d = ['hello', 'HELLO WORLD!']
            return d.map(e => e.capitalize());
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('dasherize', async() => {
        const out = [
            'border-bottom-width',
            '-a-b-c-d-e-'
        ]
        const r = await page.evaluate(() => {
            var d = ['border_bottom_width', '_a_b_c_d_e_']
            return d.map(e => e.dasherize());
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('empty', async() => {
        const out = [
            false, true, false
        ]
        const r = await page.evaluate(() => {
            var d = [
                ' ',
                '',
                'a'
            ]
            return d.map(e => e.empty());
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('endsWith', async() => {
        const out = [
            true, true,
            false, false,
            true
        ]
        const r = await page.evaluate(() => {
            var d = [
                [' ', [' ']],
                ['hello!', ['lo!']],
                ['hello!', ['lo']],
                ['', [' ']],
                ['slaughter', ['laugh', 6]]
            ]
            return d.map(e => e[0].endsWith.apply(e[0], e[1]));
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('escapeHTML', async() => {
        const out = [
            '&lt;div class="article"&gt;This is an article&lt;/div&gt;'
        ]
        const r = await page.evaluate(() => {
            var d = [
                '<div class="article">This is an article</div>',
            ]
            return d.map(e => e.escapeHTML());
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('evalJSON', async() => {
        const out = [
            { "name": "Violet", "occupation": "character" },
            { "name": "Violet", "occupation": "character" },

        ]
        const r = await page.evaluate(() => {
            var d = [
                ['{ "name": "Violet", "occupation": "character" }'],
                ['/*-secure-\n{"name": "Violet", "occupation": "character"}\n*\/']
            ]
            return d.map(e => e.length ? e[0].evalJSON(e[1]) :
                e[0].evalJSON()
            );
        })
        out.forEach((v, i) => {
            expect(r[i]).toMatchObject(out[i])
        })
    });

    it('evalScripts', async() => {
        const out = [
            [4],
            [6, "hello"]
        ]
        const r = await page.evaluate(() => {
            var d = [
                'lorem... <script>2 + 2</script>',
                '<script>2 + 4</script><script>(function (){return "hello"})()</script>'
            ]
            return d.map(e => e.evalScripts());
        })
        out.forEach((v, i) => {
            expect(r[i]).toMatchObject(out[i])
        })
    });

    it('extractScripts', async() => {
        const out = [
            ['2 + 2'],
            ['2 + 4', '(function (){return "hello"})()']
        ]
        const r = await page.evaluate(() => {
            var d = [
                'lorem... <script>2 + 2</script>',
                '<script>2 + 4</script><script>(function (){return "hello"})()</script>'
            ]
            return d.map(e => e.extractScripts());
        })
        out.forEach((v, i) => {
            expect(r[i]).toMatchObject(out[i])
        })
    });

    it('gsub', async() => {
        const out = [
            'click, dblclick, mousedown, mouseup, mouseover, mousemove, mouseout',
            'click, dblclick, mousedown, mouseup, mouseover, mousemove, mouseout',
            'onClick onDblclick onMousedown onMouseup onMouseover onMousemove onMouseout',
            '<img alt="a pear" src="/img/pear.jpg" /> <img alt="an orange" src="/img/orange.jpg" />',
            '<img alt="a pear" src="/img/pear.jpg" /> <img alt="an orange" src="/img/orange.jpg" />'
        ]
        const r = await page.evaluate(() => {
            var d = [
                ['click dblclick mousedown mouseup mouseover mousemove mouseout', [' ', ', ']],
                ['click dblclick mousedown mouseup mouseover mousemove mouseout', [/\s+/, ', ']],
                ['click dblclick mousedown mouseup mouseover mousemove mouseout', [/\w+/, function(match) { return 'on' + match[0].capitalize() }]],
                ['![a pear](/img/pear.jpg) ![an orange](/img/orange.jpg)', [
                    /!\[(.*?)\]\((.*?)\)/,
                    function(match) {
                        return '<img alt="' + match[1] + '" src="' + match[2] + '" />';
                    }
                ]],
                ['![a pear](/img/pear.jpg) ![an orange](/img/orange.jpg)', [
                    /!\[(.*?)\]\((.*?)\)/, '<img alt="#{1}" src="#{2}" />'
                ]]

            ]
            return d.map(e => {
                return e[0].gsub.apply(e[0], e[1])
            });
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('include', async() => {
        const out = [
            true, false, true, true, false
        ]
        const r = await page.evaluate(() => {
            var d = [
                ['Prototype framework', 'frame'],
                ['Prototype framework', 'frameset'],
                ['Prototype framework', 'work'],
                ['Prototype framework', 'type'],
                ['Prototype framework', 'Type'] // it is case sensitive
            ]
            return d.map(e => {
                return e[0].include.call(e[0], e[1])
            });
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('inspect', async() => {
        const out = [
            '\'I\\\'m so happy.\'',
            '"I\'m so happy."'
        ]
        const r = await page.evaluate(() => {
            var d = [
                ['I\'m so happy.', false],
                ['I\'m so happy.', true],
            ]
            return d.map(e => {
                return e[0].inspect.call(e[0], e[1])
            });
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('interpolate', async() => {
        const out = [
            "I'm Federico and I can do anything",
            "I'm Federico and I can do anything",
        ]
        const r = await page.evaluate(() => {
            var d = [
                ["I'm #{name} and I can do #{what}", [{ name: 'Federico', what: 'anything' }]],
                ["I'm ${name} and I can do ${what}", [{ name: 'Federico', what: 'anything' }, /(^|.|\r|\n)(\$\{(\w*)\})/]],
            ]
            return d.map(e => {
                return e[0].interpolate.apply(e[0], e[1])
            });
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('interpret', async() => {
        const out = [
            "1",
            "2.1212",
            "false",
            "true",
            "",
            "",
            "function () {}",
        ]
        const r = await page.evaluate(() => {
            var d = [1, 2.1212, false, true, null, undefined, () => {}]
            return d.map(e => {
                return String.interpret(e)
            });
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('isJSON', async() => {
        const out = [
            false, false,
            // false, buggy (prototype.js line 765) // TODO: not forget
            true
        ]
        const r = await page.evaluate(() => {
            var d = [
                "what",
                "\"something\"",
                // '{foo:42}',
                "{\"foo\":42}"
            ]
            return d.map(e => {
                return e[0].isJSON.call(e[0])
            });
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('parseQuery', async() => {
        const out = [
            { section: 'blog', id: '45' },
            { section: 'blog', id: '45' },
            { section: 'blog', id: '45' },
            { section: 'blog', tag: ['javascript', 'prototype', 'doc'] },
            { tag: 'ruby on rails' },
            { id: '45', raw: undefined }
        ]
        const r = await page.evaluate(() => {
            var d = [
                ["section=blog&id=45", '&'],
                ['section=blog;id=45', ';'],
                ['http://www.example.com?section=blog&id=45#comments'],
                ['section=blog&tag=javascript&tag=prototype&tag=doc'],
                ['tag=ruby%20on%20rails'],
                ['id=45&raw']
            ]
            return d.map(e => {
                return e[0].parseQuery.call(e[0], e[1])
            });
        })
        out.forEach((v, i) => {
            expect(JSON.stringify(r[i])).toBe(JSON.stringify(out[i]))
        })
    });

    it('scan', async() => {
        const out = [
            ['<!--apple--!>', '<!--pear--!>', '<!--orange--!>'],
        ]
        const r = await page.evaluate(() => {
            const realOuts = [
                []
            ]
            var d = [
                ['apple, pear & orange', [/\w+/, s => realOuts[0].push('<!--' + s[0] + '--!>')]],
            ]
            return {
                real: d.map(e => { return e[0].scan.apply(e[0], e[1]) }),
                realOuts
            }
        })
        out.forEach((v, i) => {
            expect(JSON.stringify(r.realOuts[i])).toBe(JSON.stringify(out[i]))
        })
    });

    it('startsWith', async() => {
        const out = [
            true, true,
            false, false,
            true
        ]
        const r = await page.evaluate(() => {
            var d = [
                [' ', [' ']],
                ['hello!', ['he']],
                ['hello!', ['!he']],
                ['', [' ']],
                ['slaughter', ['ugh', 3]]
            ]
            return d.map(e => e[0].startsWith.apply(e[0], e[1]));
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('strip', async() => {
        const out = [
            'hello !',
            'hello !',
            'hello !',
            'hello !',
            'hello !',
        ]
        const r = await page.evaluate(() => {
            var d = [
                '     hello !',
                'hello !     ',
                '      hello !     ',
                ' hello !    ',
                'hello !',
            ]
            return d.map(e => e.strip());
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('stripScripts', async() => {
        const out = [
            "<p>This is a test.End of test</p>",
            "<p>This is a test.End of test</p>"
        ]
        const r = await page.evaluate(() => {
            var d = [
                "<p>This is a test.<script>alert(\"Look, a test!\");</script>End of test</p>",
                "<p>This is a test.<script type=\"text/javascript\">alert(\"Look, a test!\");</script>End of test</p>"
            ]
            return d.map(e => e.stripScripts());
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('stripTags', async() => {
        const out = [
            "a link",
            'a linkalert("hello world!");'
        ]
        const r = await page.evaluate(() => {
            var d = [
                'a <a href="#">link</a>',
                'a <a href="#">link</a><script>alert("hello world!");</script>'
            ]
            return d.map(e => e.stripTags());
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('sub', async() => {
        const out = [
            'apple, pear orange',
            'apple, pear orange',
            'apple, pear, orange',
            'Apple, Pear, orange',
            '<img alt="a pear" src="/img/pear.jpg" /> ![an orange](/img/orange.jpg)'
        ]
        const r = await page.evaluate(() => {
            var d = [
                ['apple pear orange', [' ', ', ']],
                ['apple pear orange', [' ', ', ', 1]],
                ['apple pear orange', [' ', ', ', 2]],
                ['apple pear orange', [/\w+/, function(match) { return match[0].capitalize() + ',' }, 2]],
                [
                    '![a pear](/img/pear.jpg) ![an orange](/img/orange.jpg)', [
                        /!\[(.*?)\]\((.*?)\)/,
                        function(match) {
                            return '<img alt="' + match[1] + '" src="' + match[2] + '" />';
                        }
                    ]
                ],
            ]
            return d.map(e => e[0].sub.apply(e[0], e[1]));
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('succ', async() => {
        const out = [
            'b', 3, 'aab', 'zz{'
        ]
        const r = await page.evaluate(() => {
            var d = [
                'a', 2, 'aaa', 'zzz'
            ]
            return d.map(e => e.succ());
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('times', async() => {
        const out = [
            'aa',
            'echo echo echo '
        ]
        const r = await page.evaluate(() => {
            var d = [
                ['a', 2],
                ['echo ', 3],
            ]
            return d.map(e => e[0].times.call(e[0], e[1]));
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('toArray', async() => {
        const out = [
            ['a'],
            ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'],
        ]
        const r = await page.evaluate(() => {
            var d = [
                'a',
                'hello world'
            ]
            return d.map(e => e.toArray());
        })
        out.forEach((v, i) => {
            expect(r[i]).toMatchObject(out[i])
        })
    });

    // aliased by parseQuery
    it('toQueryParams', async() => {
        const out = [
            { section: 'blog', id: '45' },
            { section: 'blog', id: '45' },
            { section: 'blog', id: '45' },
            { section: 'blog', tag: ['javascript', 'prototype', 'doc'] },
            { tag: 'ruby on rails' },
            { id: '45', raw: undefined }
        ]
        const r = await page.evaluate(() => {
            var d = [
                ["section=blog&id=45", '&'],
                ['section=blog;id=45', ';'],
                ['http://www.example.com?section=blog&id=45#comments'],
                ['section=blog&tag=javascript&tag=prototype&tag=doc'],
                ['tag=ruby%20on%20rails'],
                ['id=45&raw']
            ]
            return d.map(e => {
                return e[0].toQueryParams.call(e[0], e[1])
            });
        })
        out.forEach((v, i) => {
            expect(JSON.stringify(r[i])).toBe(JSON.stringify(out[i]))
        })
    });


});