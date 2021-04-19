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
            false, false
        ]
        const r = await page.evaluate(() => {
            var d = [
                [' ', ' '],
                ['hello!', 'lo!'],
                ['hello!', 'lo'],
                ['', ' '],
            ]
            return d.map(e => e[0].endsWith(e[1]));
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
    });


});