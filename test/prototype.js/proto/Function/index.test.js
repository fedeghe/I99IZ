import 'expect-puppeteer'
let page;
describe('Function.prototype', function() {
    beforeAll(async() => {
        page = await browser.newPage();
        await page.goto('http://localhost:8080/', {
            waitUntil: 'networkidle0'
        });
    });
    afterAll(async() => {
        await page.close();
    });

    it('argumentNames', async() => {
        const out = [
            ['aaa', 'bbb', 'ccc'],
            []
        ]
        const r = await page.evaluate(() => {
            var d = [
                function(aaa, bbb, ccc) { return `${aaa}-${bbb}-${ccc}`; },
                function() { return void 0; },
            ]
            return d.map(e => e.argumentNames());
        })
        out.forEach((v, i) => {
            expect(r[i]).toMatchObject(out[i])
        })
    });

    it('bind', async() => {
        const r = await page.evaluate(() => {
            function Context(name) { this.name = name }
            Context.prototype.getName = function() { return this.name; };
            const ctx = new Context('js')

            function hello(n) {
                return `Hello I'm ${this.name} (${n})`
            }
            const binded = hello.bind(ctx)
            return binded(4)
        })
        expect(r).toBe("Hello I'm js (4)")
    });

    it('bindAsEventListener', async() => {
        const r = await page.evaluate(() => {
            function sayIt(event, to, who) { return `I say foo foo ${to} ${who}`; };
            const fn = sayIt.bindAsEventListener({}, 'a', 'b');
            return fn()
                // console.log(fn({}))
        })
        expect(r).toBe('I say foo foo a b')
    });

    it('curry', async() => {
        const out = [
            'a, 1, 2, 3',
            '1, 2, 3, a',
        ]
        const r = await page.evaluate(() => {
            var d = [
                [
                    function(...args) { return args.join(', ') },
                    ['a'],
                    ['1', '2', '3']
                ],
                [
                    function(...args) { return args.join(', ') },
                    ['1', '2', '3'],
                    ['a'],
                ]
            ]
            return d.map(e => e[0].curry.apply(e[0], e[1]).apply(null, e[2]));
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    // TODO cant get how
    it.skip('defer', async() => {
        const out = [
            '1, 2, 3',
            'a, b, c',
        ]
        const r = await page.evaluate(async() => {
            var res = []
            var d = [
                [
                    function(...args) { res.push([1, ...args].join(', ')); },
                    [1, 2, 3]
                ]
                [
                    function(...args) { res.push([1, ...args].join(', ')); },
                    ['a', 'b', 'c']
                ],
            ]
            await page.waitFor(300);
            d.forEach(e => {
                e[0].defer.call(e[0], e[1])
            });
            return res
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    // TODO: same here
    it.skip('delay', async() => {
        const out = [
            '1, 2, 3',
            'a, b, c',
        ]
        const r = await page.evaluate(async() => {
            var res = []
            var d = [
                [
                    function(...args) { res.push([1, ...args].join(', ')); },
                    [0, 1, 2, 3]
                ]
                [
                    function(...args) { res.push([1, ...args].join(', ')); },
                    [0, 'a', 'b', 'c']
                ],
            ]
            await page.waitFor(300);
            d.forEach(e => {
                e[0].delay.apply(e[0], e[1])
            });
            return res
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('methodize', async() => {
        const out = [
            'hello Fred',
            'hello Federico',
        ];
        const r = await page.evaluate(() => {
            var d = [
                [{}, function(target, name) { target.name = name; }, 'Fred'],
                [{}, function(target, name) { target.name = name; }, 'Federico'],
            ];
            return d.map(e => {
                e[0].setName = e[1].methodize();
                e[0].setName(e[2]);
                return `hello ${e[0].name}`;
            });
        });
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });

    it('wrap', async() => {
        const out = [
            'Hello fred',
            '1-2',
        ];
        const r = await page.evaluate(() => {
            var d = [
                [
                    String.prototype.capitalize,
                    function(original, one, two) {
                        if (one || two) {
                            return `${one}-${two}`
                        }
                        return original()
                    },
                    'hello Fred', []
                ],
                [
                    String.prototype.capitalize,
                    function(original, one, two) {
                        if (one || two) {
                            return `${one}-${two}`
                        }
                        return original()
                    },
                    'hello Fred', ['1', '2']
                ],
            ];
            return d.map(e => {
                e[0] = e[0].wrap(e[1])
                return e[0].apply(e[2], e[3]);
            });
        });
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });



});