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


});