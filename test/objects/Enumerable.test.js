/**
 * @jest-environment jsdom
 */
import { _Class, _Enumerable } from './../../src/Triad'
import { extend } from './../../src/core/shared'
import { isString } from './../../src/core/checkers'
import $H from './../../src/funcs/$H'

describe('object - Enumerable', () => {
    describe('all', () => {
        it('should return true', () => {
            var YourObject = extend({
                el: [1, 2, 3],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            expect(YourObject.all(YourObject.el)).toBeTruthy()
        });
        it('should return false', () => {
            var YourObject = extend({
                el: [1, 0, 3],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            expect(YourObject.all(YourObject.el)).toBeFalsy()
        });
        it('should return true - with iterator', () => {
            var YourObject = extend({
                el: [2, 4, 6],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            expect(YourObject.all(YourObject.el, e => e % 2 === 0)).toBeTruthy()
        });
        it('should return false - with iterator', () => {
            var YourObject = extend({
                el: [1, 4, 3],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            expect(YourObject.all(YourObject.el, e => e % 2 === 0)).toBeFalsy()
        });

    })
    describe('any', () => {
        it('should return true', () => {
            var YourObject = extend({
                els: [0, false, 1, ''],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            expect(YourObject.any(YourObject.els)).toBeTruthy()
        });
        it('should return false', () => {
            var YourObject = extend({
                els: ['', 0, false, null],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            expect(YourObject.any(YourObject.els)).toBeFalsy()
        });
        it('should return true - with iterator', () => {
            var YourObject = extend({
                els: [2, 1, 3, 5],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            expect(YourObject.any(YourObject.els, e => e % 2 === 0)).toBeTruthy()
        });
        it('should return false - with iwterator', () => {
            var YourObject = extend({
                els: [1, 7, 3, 9],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            expect(YourObject.any(YourObject.els, e => e % 2 === 0)).toBeFalsy()
        });
    })
    describe('collect', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: ['Hitch', "Hiker's", 'Guide', 'to', 'the', 'Galaxy'],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            expect(YourObject.collect(YourObject.els, s => s.charAt(0).toUpperCase()))
                .toMatchObject(['H', 'H', 'G', 'T', 'T', 'G'])
        });
    })
    describe('detect', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: ['Hitch', "Hiker's", 'Guide', 'to', 'the', 'Galaxy'],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            expect(YourObject.detect(YourObject.els, s => s.charAt(0).toUpperCase() === 'G'))
                .toBe('Guide')
        });
    })
    describe('* each', () => {
        it('class create', () => {
            var YourObject = _Class.create(_Enumerable, {
                initialize: function(e) {
                    this.e = e;
                },
                _each: function(els, iterator) {
                    els.forEach(iterator)
                },
            });
            var myO = new YourObject([1, 2, 3])
            var s = 0
            myO.each(myO.e, a => s += a)
            expect(s).toBe(6)
        })
        it('class create, obj', () => {
            var YourObject = _Class.create(_Enumerable, {
                initialize: function(e) {
                    this.e = e;
                },
                _each: function(els, iterator) {
                    els.forEach(iterator)
                },
            });
            var myO = new YourObject([{ n: 1 }, { n: 2 }, { n: 3 }])
            var s = 0
            myO.each(myO.e, a => s += a.n)
            expect(s).toBe(6)
        })
    });
    describe('eachSlice', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: [{ name: 'Sunny', age: 20 },
                    { name: 'Audrey', age: 21 },
                    { name: 'Matt', age: 20 },
                    { name: 'Amelie', age: 26 },
                    { name: 'Will', age: 21 }
                ],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);

            expect(YourObject.eachSlice(YourObject.els, 3, s => s.name))
                .toMatchObject([
                    ['Sunny', 'Audrey', 'Matt'],
                    ['Amelie', 'Will']
                ])
        })
    })
    describe('findAll', () => {
        // it.skip('problem, cause uses Enumerable.collect thus we need array to be extended with Enumerable, which cant be', () => {});
        it('should return the expected', () => {
            var YourObject = extend({
                els: [1, 'two', 3, 'four', 5],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);

            expect(YourObject.findAll(YourObject.els, isString))
                .toMatchObject(['two', 'four'])
        })
    })

    describe('include', () => {
        // it.skip('problem, cause uses Enumerable.collect thus we need array to be extended with Enumerable, which cant be', () => {});
        it('should return the expected', () => {
            var YourObject = extend({
                els: [1, 'two', 3, 'four', 5],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);

            expect(YourObject.include(YourObject.els, 3))
                .toBeTruthy()
            expect(YourObject.include(YourObject.els, 7))
                .toBeFalsy()
        })
    })

    describe('inGroupsOf', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: [
                    { name: 'Sunny', age: 20 },
                    { name: 'Audrey', age: 21 },
                    { name: 'Matt', age: 20 },
                    { name: 'Amelie', age: 26 },
                    { name: 'Will', age: 21 }
                ],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            var res = YourObject.inGroupsOf(YourObject.els, 2, { name: '', age: 0 })
            expect(res)
                .toMatchObject([
                    [{ name: 'Sunny', age: 20 }, { name: 'Audrey', age: 21 }],
                    [{ name: 'Matt', age: 20 }, { name: 'Amelie', age: 26 }],
                    [{ name: 'Will', age: 21 }, { name: '', age: 0 }]
                ])

        })
    })

    describe('inject', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);

            expect(YourObject.inject(YourObject.els, 0, function(acc, n) { return acc + n; }))
                .toBe(45)
        })
    })

    describe('inspect', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);

            expect(YourObject.inspect(YourObject.els)).toBe('[1, 2, 3, 4, 5, 6, 7, 8, 9]')
        })
    })

    describe('invoke', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: ['hello', 'world'],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);

            expect(YourObject.invoke('toUpperCase', ...YourObject.els)).toMatchObject(["HELLO", "WORLD"])
        })
    })
    describe('max', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: [1, 5, 3, 9, 5, 66, 3],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);

            expect(YourObject.max(YourObject.els)).toBe(66)
        })
        it('should return the expected with a max function', () => {
            var YourObject = extend({
                els: ['hello', 'foo'],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);

            expect(YourObject.max(YourObject.els, e => e.length)).toBe(5)
        })
    })
    describe('min', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: [1, 5, -3, 9, -5, 66, 3],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);

            expect(YourObject.min(YourObject.els)).toBe(-5)
        })
        it('should return the expected with a min function', () => {
            var YourObject = extend({
                els: ['hello', 'foo'],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);

            expect(YourObject.min(YourObject.els, e => e.length)).toBe(3)
        })
    })
    describe('partition', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: ['hello', null, 42, false, true, , 17],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);

            expect(YourObject.partition(YourObject.els)).toMatchObject([
                ['hello', 42, true, 17],
                [null, false]
            ])
        })
        it('should return the expected, with strategy', () => {
            var YourObject = extend({
                els: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);

            expect(YourObject.partition(YourObject.els, function(n) {
                return 0 == n % 2;
            })).toMatchObject([
                [2, 4, 6, 8, 10],
                [1, 3, 5, 7, 9]
            ])
        })
    })
    describe('pluck', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: ['hello', 'my', 'dear'],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            const t = YourObject.pluck(YourObject.els, 'length')
            expect(t).toMatchObject([5, 2, 4])
        })
    })
    describe('reject', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: ['hello', 1, 'dear', 2, false, true, 3],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            const t = YourObject.reject(YourObject.els, isString)
            expect(t).toMatchObject([1, 2, false, true, 3])
        })
    })
    describe('size', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: ['hello', 1, 'dear', 2, false, true, 3],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            const t = YourObject.size(YourObject.els, isString)
            expect(t).toBe(7)
        })
    })
    describe('sortBy', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: ['hello', 'world', 'this', 'is', 'nice'],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            const t = YourObject.sortBy(YourObject.els, s => s.length)
            expect(t).toMatchObject(['is', 'this', 'nice', 'hello', 'world'])
        })
    })

    describe('toArray', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            var o = YourObject.toArray(YourObject.els)
            expect(o).toMatchObject([1, 2, 3, 4, 5, 6, 7, 8, 9])
            expect(o[2]).toBe(3)
        })

        // TODO
        it.skip('should return the expected - hash', () => {
            var YourObject = extend({
                els: $H({ name: 'Sunny', age: 20 }),
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            var o = YourObject.toArray(YourObject.els)
                // console.log(o)
            expect(o).toMatchObject([
                ['name', 'Sunny'],
                ['age', 20]
            ])
        })
    })
    describe('zip', () => {
        it('should return the expected', () => {
            var YourObject = extend({
                els: ['Jane', 'Nitin', 'Guy'],
                lastNames: ['Doe', 'Patel', 'Forcier'],
                ages: [23, 41, 17],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            const t = YourObject.zip(YourObject.els, YourObject.lastNames, YourObject.ages)
            expect(t).toMatchObject([
                ['Jane', 'Doe', 23],
                ['Nitin', 'Patel', 41],
                ['Guy', 'Forcier', 17]
            ])
        })
        it('should return the expected - with iterator', () => {
            var YourObject = extend({
                els: ['Jane', 'Nitin', 'Guy'],
                lastNames: ['Doe', 'Patel', 'Forcier'],
                ages: [23, 41, 17],
                _each: function(els, iterator) {
                    els.forEach(iterator)
                }
            }, _Enumerable);
            const t = YourObject.zip(
                YourObject.els,
                YourObject.lastNames,
                YourObject.ages,
                function(tuple) {
                    return tuple[0] + ' ' + tuple[1] + ' is ' + tuple[2];
                }
            )
            expect(t).toMatchObject(['Jane Doe is 23', 'Nitin Patel is 41', 'Guy Forcier is 17'])
        })
    })

});