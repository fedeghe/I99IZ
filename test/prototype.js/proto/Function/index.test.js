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

    // TODO: boring
    it.skip('bindAsEventListener', async() => {});

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

    // TODO cant see how
    it.skip('defer', async() => {
        const out = [
            '1',
            '2',
        ]
        const r = await page.evaluate(() => {
            var res = []
            var d = [
                [
                    function(...args) { res.push([1, ...args].join(', ')) },
                    [1, 2, 3]
                ]
                [
                    function(...args) { res.push([1, ...args].join(', ')) },
                    ['a', 'b', 'c']
                ],
            ]
            d.forEach(e => {
                e[0].defer(e[1])
            });
            return res
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });


});