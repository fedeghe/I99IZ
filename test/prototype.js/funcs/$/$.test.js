import 'expect-puppeteer'

let page;

describe('$', () => {
    beforeAll(async() => {
        page = await browser.newPage();
        await page.goto('http://localhost:8080/', {
            waitUntil: 'networkidle0'
        });
    });
    afterAll(async() => {
        await page.close();
    });

    it('finds an element as expected', async() => {
        const elContent = await page.evaluate(el => window.$(el).innerText, 'el')
        expect(elContent).toBe('Foo')
    })
})