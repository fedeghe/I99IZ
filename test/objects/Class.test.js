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
            const Person = _Class.create({
                initialize: function(name) {
                    this.name = name
                }
            })
            const Programmer = _Class.create(Person, {
                program: () => 'System.out.println("Hello world");'
            })
            const p = new Programmer('Jack')
            expect(p.name).toBe('Jack')
            p.name = 'Jeff'
            expect(p.name).toBe('Jeff')
            expect(p.program()).toBe('System.out.println(\"Hello world\");')
        });
    });
    describe('addMethods', () => {
        it.skip('should add Methods as expected', () => {
            var Animal = _Class.create({
                initialize: function(name, sound) {
                    // console.log(this)
                    this.name = name;
                    this.sound = sound;
                },
                speak: function() {
                    return this.name + " says: " + this.sound + "!";
                }
            });
            var Snake = _Class.create(Animal, {
                initialize: function($super, name) {
                    // console.log('super', this, $super)
                    $super(name, 'hissssssssss');
                }
            });
            var ringneck = new Snake('xxxx')
            expect(ringneck.speak()).toBe('Ringneck says: hissssssssss!')
        });
    });
});