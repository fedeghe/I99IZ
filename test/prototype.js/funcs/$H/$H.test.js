import 'expect-puppeteer'

let page;

describe('$H', function() {
    beforeAll(async() => {
        page = await browser.newPage();
        await page.goto('http://localhost:8080/', {
            waitUntil: 'networkidle0'
        });
    });
    afterAll(async() => {
        await page.close();
    });
    it('should work as an alias', async() => {
        const r = await page.evaluate(() => {
            const h = $H({ a: 'apple', b: 'banana', c: 'coconut' }),
                k = h.keys();
            return JSON.stringify(k);
        });
        expect(r).toBe(JSON.stringify(['a', 'b', 'c']));
    });
});