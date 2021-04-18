/**
 * @jest-environment jsdom
 */
import { _Class } from './../../src/Triad'

describe('object - Class', () => {
    describe('create', () => {
        it('should create a class expected', () => {
            var Animal = _Class.create({
                initialize: function(name, sound) {
                    this.name = name;
                    this.sound = sound;
                },
                speak: function() {
                    return this.name + " says: " + this.sound + "!";
                }
            });
            var a = new Animal('Blue', 'Woof')
            expect(a.speak()).toBe('Blue says: Woof!')
        });
        it('should extend a class as expected', () => {
            function Person(name) {
                this.name = name
            }
            const Programmer = _Class.create(new Person('Jack'), {
                program: () => 'System.out.println("Hello world");'
            })
            const p = new Programmer()
            expect(p.name).toBe('Jack')
            p.name = 'Jeff'
            expect(p.name).toBe('Jeff')
            expect(p.program()).toBe('System.out.println(\"Hello world\");')
        });
    });
});