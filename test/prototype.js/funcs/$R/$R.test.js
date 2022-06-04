import 'expect-puppeteer'

let page;

describe('$R', function() {
    beforeAll(async() => {
        page = await browser.newPage();
        await page.goto('http://localhost:8080/', {
            waitUntil: 'networkidle0'
        });
    });
    afterAll(async() => {
        await page.close();
    });
    it('should work as expected', async() => {
        const r = await page.evaluate(() => $A($R(0, 5)).join(', '));
        expect(r).toBe('0, 1, 2, 3, 4, 5');
    });
    it('should work as expected also', async() => {
        const r = await page.evaluate(() => $A($R(0, 5, true)).join(', '));
        expect(r).toBe('0, 1, 2, 3, 4');
    });
});