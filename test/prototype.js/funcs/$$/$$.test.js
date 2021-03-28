import 'expect-puppeteer'

let page;

describe('$$', function() {
    beforeAll(async() => {
        page = await browser.newPage();
        await page.goto('http://localhost:8080/', {
            waitUntil: 'networkidle0'
        });
    });
    afterAll(async() => {
        await page.close();
    });

    it('basic case', async() => {
        const elCount = await page.evaluate(() => window.$$('span').length)
        expect(elCount).toBe(4)
    })

    it('more selectors case', async() => {

        const r = await page.evaluate(() => {
            const res = window.$$('strong.foo', 'span')

            return {
                count: res.length,
                el0: res[0].tagName,
                el1: res[1].tagName,
                el2: res[2].tagName,
            }
        })
        expect(r.count).toBe(6)
        expect(r.el0).toBe('SPAN')
        expect(r.el1).toBe('SPAN')
        expect(r.el2).toBe('STRONG')

    })
    it('more selectors ordered per document presence', async() => {
        const r = await page.evaluate(() => {
            const res = window.$$('#visible', 'strong.foo', 'span')
            return {
                count: res.length,
                el0: res[5].tagName,
            }
        })

        expect(r.count).toBe(7)
        expect(r.el0).toBe('DIV')

    })

    it('returns an array', async() => {
        const r = await page.evaluate(() => {
            const res = window.$$('#visible', 'strong.foo', 'span')
            return res instanceof Array
        })
        expect(r).toBeTruthy()
    })

    it('should return an empty array', async() => {

        const r = await page.evaluate(() => {
            const res = window.$$('#visiblestrong.foo')
            return {
                isArray: res instanceof Array,
                count: res.length
            }
        })
        expect(r.isArray).toBeTruthy()
        expect(r.count).toBe(0)
    })

});