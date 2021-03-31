import 'expect-puppeteer'
let page;
describe('Class', function() {
    beforeAll(async() => {
        page = await browser.newPage();
        await page.goto('http://localhost:8080/', {
            waitUntil: 'networkidle0'
        });
    });
    afterAll(async() => {
        await page.close();
    });

    it('Class.create', async() => {
        const r = await page.evaluate(() => {
            var Parent = {
                name: 'Parent'
            }
            var Person = Class.create(Parent, (function() {
                return {
                    sayHello: function() {
                        return 'Hello from ' + this.name
                    }
                }
            })())
            var p = new Person();
            return p.sayHello()
        })
        expect(r).toBe('Hello from Parent')
        expect(true).toBeTruthy()

    });


});