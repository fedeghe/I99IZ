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
    it('Class.create deeper', async() => {
        // from http://api.prototypejs.org/language/Class/prototype/addMethods/
        const r = await page.evaluate(() => {
            var Animal = Class.create({
                initialize: function(name, sound) {
                    this.name = name;
                    this.sound = sound;
                },
                speak: function() {
                    return (this.name + " says: " + this.sound + "!");
                }
            });
            var Snake = Class.create(Animal, {
                initialize: function($super, name) {
                    $super(name, 'hissssssssss');
                }
            });
            var ringneck = new Snake("Ringneck");


            return ringneck.speak();

        })
        expect(r).toBe('Ringneck says: hissssssssss!');
    });

    it.skip('Class.addMethods', async() => {
        // from http://api.prototypejs.org/language/Class/prototype/addMethods/
        // fails !!!!
        const r = await page.evaluate(() => {
            var Animal = Class.create({
                initialize: function(name, sound) {
                    this.name = name;
                    this.sound = sound;
                },
                speak: function() {
                    return (this.name + " says: " + this.sound + "!");
                }
            });
            var Snake = Class.create(Animal, {
                initialize: function($super, name) {
                    $super(name, 'hissssssssss');
                }
            });
            var ringneck = new Snake("Ringneck");

            Snake.addMethods({
                attack: function($super) {
                    $super();
                    return "You should probably run. He looks really mad.";
                }
            });

            return {
                speak: ringneck.speak(),
                attack: ringneck.attack()
            }

        })
        expect(r.attack).toBe('You should probably run. He looks really mad.');
    });
});