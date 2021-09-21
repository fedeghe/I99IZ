import 'expect-puppeteer'
let page;
describe('Date.prototype', function() {
    beforeAll(async() => {
        page = await browser.newPage();
        await page.goto('http://localhost:8080/', {
            waitUntil: 'networkidle0'
        });
    });
    afterAll(async() => {
        await page.close();
    });

    it('toISOString works as expected', async() => {
        const r = await page.evaluate(() => {
            var d = new Date(1969, 11, 31, 19);
            return d.toISOString();
        })
        expect(r).toBe('1969-12-31T18:00:00.000Z')
    });

    it('toJSON aliases toISOString works as expected', async() => {
        const r = await page.evaluate(() => {
            var d = new Date(1969, 11, 31, 19);
            return d.toJSON();
        })
        expect(r).toBe('1969-12-31T18:00:00.000Z')
    });

});