import 'expect-puppeteer'

let page;

describe('$A', function() {
    beforeAll(async() => {
        page = await browser.newPage();
        await page.goto('http://localhost:8080/', {
            waitUntil: 'networkidle0'
        });
    });
    afterAll(async() => {
        await page.close();
    });

    it('arguments to array', async() => {
        const r = await page.evaluate(() => {
            function fn() {
                return $A(arguments).length;
            }
            return fn(1, 2, 3, 4, 5);
        });
        expect(r).toBe(5);
    });

    it('HTMLcollection to array', async() => {
        const r = await page.evaluate(() => {
            var spans = document.getElementsByTagName('span'),
                spansArr = $A(spans);
            return spansArr.length;
        });
        expect(r).toBe(4);
    });

    it('NodeList to array', async() => {
        const r = await page.evaluate(() => {
            var lis = document.getElementById('parent'),
                lisArr = $A(lis.children);
            return lisArr.length;
        });
        expect(r).toBe(3);
    });




    it('falsy to empty array', async() => {
        const r = await page.evaluate(() => {
            var lis = $A();
            return {
                count: lis.length,
                isArray: lis instanceof Array
            };
        });
        expect(r.count).toBe(0);
        expect(r.isArray).toBeTruthy();
    });

    it('Array to array', async() => {
        const r = await page.evaluate(() => {
            var lis = $A([1, 2, 3, 4, 5]);
            return {
                count: lis.length,
                isArray: lis instanceof Array
            }
        });
        expect(r.count).toBe(5);
        expect(r.isArray).toBeTruthy();
    });

    it('Iterable to array', async() => {
        const r = await page.evaluate(() => {
            var a = $A([1, 2, 3, 4, 5]),
                lis = $A(a);
            return {
                count: lis.length,
                isArray: lis instanceof Array
            };
        });
        expect(r.count).toBe(5);
        expect(r.isArray).toBeTruthy();
    })
});