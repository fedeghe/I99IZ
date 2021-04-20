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


});