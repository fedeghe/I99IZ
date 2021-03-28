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
        const r = await page.evaluate(() => ({
            n1: (-2).abs(),
            n2: (4).abs(),
            n3: (-3123.123123123123123).abs(),
            n4: (-3123.123123123123123E10).abs()
        }))

        expect(r.n1).toBe(2)
        expect(r.n2).toBe(4)
        expect(r.n3).toBe(3123.123123123123123)
        expect(r.n4).toBe(3123.123123123123123E10)

    });
    it('ceil', async() => {
        const r = await page.evaluate(() => ({
            n1: (-2).ceil(),
            n2: (-2.5).ceil(),
            n3: (1.9999999999999).ceil(),
            n4: (2.000000000000001).ceil()
        }))
        expect(r.n1).toBe(-2)
        expect(r.n2).toBe(-2)
        expect(r.n3).toBe(2);
        expect(r.n4).toBe(3)
    });

    it('floor', async() => {
        const r = await page.evaluate(() => ({
            n1: (2.5).floor(),
            n2: (-2.5).floor(),
            n3: (1.9999999999999).floor(),
            n4: (2.000000000000001).floor()
        }))
        expect(r.n1).toBe(2)
        expect(r.n2).toBe(-3)
        expect(r.n3).toBe(1)
        expect(r.n4).toBe(2)
    });

    it('round', async() => {
        const r = await page.evaluate(() => ({
            n1: (2.5).round(),
            n2: (-2.5).round(),
            n3: (1.9999999999999).round(),
            n4: (2.000000000000001).round(),
            n5: (2.499999999999999).round(),
            n6: (2.500000000000000).round()
        }))
        expect(r.n1).toBe(3)
        expect(r.n2).toBe(-2)
        expect(r.n3).toBe(2)
        expect(r.n4).toBe(2)
        expect(r.n5).toBe(2)
        expect(r.n6).toBe(3)
    });

    it('succ', async() => {
        const r = await page.evaluate(() => ({
            n1: (2.5).succ(),
            n2: (2).succ(),
            n3: (-1).succ(),
            n4: (0).succ()
        }))
        expect(r.n1).toBe(3.5)
        expect(r.n2).toBe(3)
        expect(r.n3).toBe(0)
        expect(r.n4).toBe(1)
    });

    it('times', async() => {
        const r = await page.evaluate(() => {
            var obj = { count: 0, total: 0 };

            function add(addend) {
                ++this.count;
                this.total += addend;
            }
            (4).times(add, obj)
            return obj
        })

        expect(r.count).toBe(4)
        expect(r.total).toBe(6)
    });

    it('toColorPart', async() => {
        const r = await page.evaluate(() => ({
            n1: (2).toColorPart(),
            n2: (22).toColorPart(),
            n3: (223344).toColorPart()
        }))
        expect(r.n1).toBe('02')
        expect(r.n2).toBe('16')
        expect(r.n3).toBe('36870')
    });

    it('toPaddedString', async() => {
        const r = await page.evaluate(() => ({
            n1: (2.4).toPaddedString(5, 10),
            n2: (2.4).toPaddedString(4, 10),
            n3: (2.4).toPaddedString(3, 10),
            n4: (2.4).toPaddedString(2, 10),
            n5: (2.4).toPaddedString(1, 10)
        }))
        expect(r.n1).toBe('002.4')
        expect(r.n2).toBe('02.4')
        expect(r.n3).toBe('2.4')
        expect(r.n4).toBe('2.4')
        expect(r.n5).toBe('2.4')
    });

});