import 'expect-puppeteer'
let page;
describe('RegExp.prototype', function() {
    beforeAll(async() => {
        page = await browser.newPage();
        await page.goto('http://localhost:8080/', {
            waitUntil: 'networkidle0'
        });
    });
    afterAll(async() => {
        await page.close();
    });

    it('match', async() => {
        const r = await page.evaluate(() => {
            const bench = {
                positive: [
                    [/abc/, 'abc'],
                    [/abc/, 'abcd'],
                    [/abc/, '0abc'],
                    [/^[\w]*$/, 'abc'],
                ],
                negative: [
                    [/^abc$/, 'abcd'],
                    [/^abc$/, '0abc'],
                    [/^[\w]*$/, 'abc%'],
                ],
            }
            return {
                positive: bench.positive.reduce((acc, el) => {
                    return acc && el[0].match(el[1])
                }, true),
                negative: bench.negative.reduce((acc, el) => {
                    return acc && !(el[0].match(el[1]))
                }, true)
            }
        })

        expect(r.positive).toBeTruthy()
        expect(r.negative).toBeTruthy()
    });

    it('escape', async() => {
        const out = [
            '\\\\re\\?\\/\\{\\[\\]\\]',
            '\\/\\(\\[\\.\\*\\+\\?\\^\\=\\!\\:\\$\\{\\}\\(\\)\\|\\[\\]\\/\\\\\\]\\)\\/g'
        ]
        const r = await page.evaluate(() => {
            const bench = [
                new RegExp('\\r\e?\/{[]\]'),
                new RegExp('/([.*+?^=!:${}()|[\]\/\\])/g')
            ]
            return bench.map(el => el.escape())
        })
        out.forEach((v, i) => {
            expect(r[i]).toBe(out[i])
        })
        expect(r.positive).toBeTruthy()
        expect(r.negative).toBeTruthy()
    });

});