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

    it('abs', async() => {
        const r = await page.evaluate(() => {
            var n1 = -2,
                n2 = 4,
                n3 = -3123.123123123123123,
                n4 = -3123.123123123123123E10;
            return {
                n1: n1.abs(),
                n2: n2.abs(),
                n3: n3.abs(),
                n4: n4.abs()
            }
        })

        expect(r.n1).toBe(2)
        expect(r.n2).toBe(4)
        expect(r.n3).toBe(3123.123123123123123)
        expect(r.n4).toBe(3123.123123123123123E10)

    });
    // it('ceil', () => {
    //     window.onload = () => {
    //         var n = -2
    //         expect(n.ceil()).toBe(3)
    //         n = -2.5
    //         expect(n.ceil()).toBe(-2)
    //         n = 1.9999999999999
    //         expect(n.ceil()).toBe(2)
    //         n = 2.000000000000001
    //         expect(n.ceil()).toBe(3)
    //     }
    // });
    // it('floor', () => {
    //     window.onload = () => {
    //         var n = 2.5
    //         expect(n.floor()).toBe(2)
    //         n = -2.5
    //         expect(n.floor()).toBe(-3)
    //         n = 1.9999999999999
    //         expect(n.floor()).toBe(1)
    //         n = 2.000000000000001
    //         expect(n.floor()).toBe(2)
    //     }
    // });
    // it('round', () => {
    //     window.onload = () => {
    //         var n = 2.5
    //         expect(_Number.round(2.5)).toBe(3)
    //         expect(_Number.round(-2.5)).toBe(-2)
    //         expect(_Number.round(1.9999999999999)).toBe(2)
    //         expect(_Number.round(2.000000000000001)).toBe(2)
    //         expect(_Number.round(2.499999999999999)).toBe(2)
    //         expect(_Number.round(2.500000000000000)).toBe(3)
    //     }
    // });
});