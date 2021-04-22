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
            [],
        ]
        const r = await page.evaluate(() => {
            var d = [
                [
                    function() { return [].slice.call(arguments, 0).join(', ') },
                    ['']
                ]
            ]
            return d.map(e => e.curry());
        })
        out.forEach((v, i) => {
            expect(r[i]).toMatchObject(out[i])
        })
    });


});