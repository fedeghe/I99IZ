import 'expect-puppeteer'
let page;
describe('Array.prototype', function() {
    beforeAll(async() => {
        page = await browser.newPage();
        await page.goto('http://localhost:8080/', {
            waitUntil: 'networkidle0'
        });
    });
    afterAll(async() => {
        await page.close();
    });

    it('each, from Enumerable', async() => {
        const r = await page.evaluate(() => {
            let sum = 0;
            [1, 2, 3, 4].each(e => sum += e)
            return sum
        })
        expect(r).toBe(10)
    });

    it('clear', async() => {
        const r = await page.evaluate(() => {
            const t = [1, 2, 3, 4]
            t.clear()
            return t.length
        })
        expect(r).toBe(0)
    });

    it('clone', async() => {
        const r = await page.evaluate(() => {
            const t = [1, 2, 3, 4],
                b = t.clone();
            return t.length === b.length &&
                t[0] === b[0] &&
                t[1] === b[1] &&
                t[2] === b[2] &&
                t[3] === b[3]
        })
        expect(r).toBeTruthy()
    });

    it('compact', async() => {
        const r = await page.evaluate(() => {
            const t = [undefined, 'A', undefined, 'B', null, 'C'],
                b = t.compact();
            return [
                t.length,
                b.length,
                b
            ]
        })
        expect(r[0]).toBe(6)
        expect(r[1]).toBe(3)
        expect(r[2]).toMatchObject(['A', 'B', 'C'])
    });

    it('every', async() => {
        const r = await page.evaluate(() => {
            const bench = {
                positive: [
                    [1, 2, 3, 4, 5, 6],
                    ['a', true, 2]
                ],
                negative: [
                    ['', 1, 2, 3, 4, 5, 6],
                    [0, 1, 2, 3, 4, 5, 6],
                    [false, true, 1, 'a'],
                ]
            }
            return {
                positive: bench.positive.reduce((acc, el) => {
                    acc = acc && el.every()
                    return acc
                }, true),
                negative: bench.negative.reduce((acc, el) => {
                    acc = acc || el.every()
                    return acc
                }, false)
            }
        })
        expect(r.positive).toBeTruthy()
        expect(r.negative).toBeFalsy()
    });

    it('filter', async() => {
        const out = [
                [2, 4, 6],
                ['2', '3']
            ],
            r = await page.evaluate(() => {
                const bench = [{
                    a: [1, 2, 3, 4, 5, 6],
                    f: a => a % 2 === 0
                }, {
                    a: [1, '2', '3', 4],
                    f: Object.isString
                }];
                return bench.map(input =>
                    input.a.filter(input.f)
                )
            });
        r.forEach((e, i) => {
            expect(e).toMatchObject(out[i])
        })
    });

    it('first', async() => {
        const out = [1, 'foo', 'boo'],
            r = await page.evaluate(() => {
                const bench = [
                    [1, 2, 3, 4, 5, 6],
                    ['foo'],
                    ['boo', 'foo'],
                ];
                return bench.map(input =>
                    input.first()
                )
            });
        r.forEach((e, i) => {
            expect(e).toBe(out[i])
        })
    });

    it('flatten', async() => {
        const out = [
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
            ],
            r = await page.evaluate(() => {
                const bench = [
                    [1, 2, [3, [4, [5, [6, 7]]], 8, [9, [10]]]],
                    [1, [2, [3, [4, [5, [6, [7, [8, [9, [10]]]]]]]]], 11],
                ];
                return bench.map(input =>
                    input.flatten()
                )
            });
        r.forEach((e, i) => {
            expect(e).toMatchObject(out[i])
        })
    });

    it('indexOf', async() => {
        const out = [
                3, 1, -1
            ],
            r = await page.evaluate(() => {
                const bench = [
                    [
                        [3, 6, 4, 8, 6, 1, 66], 8
                    ],
                    [
                        [3, 6, 4, 8, 6, 1, 66], 6
                    ],
                    [
                        [3, 6, 4, 8, 6, 1, 66], 67
                    ]
                ];
                return bench.map(input =>
                    input[0].indexOf(input[1])
                )
            });
        r.forEach((e, i) => {
            expect(e).toBe(out[i])
        })
    });

    it('inspect', async() => {
        const out = [
                '[3, 6, 4, 8, 6, 1, 66]',
                '[3, [object Object], 66]'
            ],
            r = await page.evaluate(() => {
                const bench = [
                    [3, 6, 4, 8, 6, 1, 66],
                    [3, { name: 'foo' }, 66]
                ];
                return bench.map(input =>
                    input.inspect()
                )
            });
        r.forEach((e, i) => {
            expect(e).toBe(out[i])
        })
    });

    it('intersect', async() => {
        const out = [
                [4, 1],
                [5, 6, 7, 8, 9]
            ],
            r = await page.evaluate(() => {
                const bench = [
                    [
                        [3, 6, 4, 8, 6, 1, 66],
                        [4, 7, 11, 1, 1]
                    ],
                    [
                        [1, 2, 3, 4, 5, 6, 7, 8, 9],
                        [5, 6, 7, 8, 9, 10, 11, 12, 13]
                    ],
                ];
                return bench.map(input =>
                    input[0].intersect(input[1])
                )
            });
        r.forEach((e, i) => {
            expect(e).toMatchObject(out[i])
        })
    });

    it('last', async() => {
        const out = [6, 'foo', 'foo'],
            r = await page.evaluate(() => {
                const bench = [
                    [1, 2, 3, 4, 5, 6],
                    ['foo'],
                    ['boo', 'foo'],
                ];
                return bench.map(input =>
                    input.last()
                )
            });
        r.forEach((e, i) => {
            expect(e).toBe(out[i])
        })
    });

    it('lastIndexOf', async() => {
        const out = [4, 1, 1],
            r = await page.evaluate(() => {
                const bench = [{
                        i: [3, 6, 4, 8, 6, 1, 66],
                        j: [6]
                    },
                    {
                        i: [3, 6, 4, 8, 6, 1, 66],
                        j: [6, 3]
                    },
                    {
                        i: [3, 6, 4, 8, 6, 1, 66],
                        j: [6, -4]
                    },
                ];
                return bench.map(input =>
                    input.i.lastIndexOf.apply(input.i, input.j)
                )
            });
        r.forEach((e, i) => {
            expect(e).toBe(out[i])
        })
    });

    it('map', async() => {
        const a = [null, 'A', null, 'B', null, 'C'],

            r = await page.evaluate(() => {
                const a = [undefined, 'A', undefined, 'B', null, 'C'],
                    b = [1, 2, 3, 4, 5, 6];
                return [
                    a.map(),
                    b.map(e => e * e)
                ]
            });
        expect(r[0]).toMatchObject(a)
        expect(r[1]).toMatchObject([1, 4, 9, 16, 25, 36])
    });

    it('reverse', async() => {
        const out = [
                [66, 1, 6, 8, 4, 6, 3],
                [66, 'AAAA', 6, 'bbb', 4, 6, 3],
            ],
            r = await page.evaluate(() => {
                const bench = [
                    [3, 6, 4, 8, 6, 1, 66],
                    [3, 6, 4, 'bbb', 6, 'AAAA', 66],
                ];
                return bench.map(input => input.reverse())
            });
        r.forEach((e, i) => {
            expect(e).toMatchObject(out[i])
        })
    });

    it('size', async() => {
        const out = [
                7, 0, 1
            ],
            r = await page.evaluate(() => {
                const bench = [
                    [3, 6, 4, 8, 6, 1, 66],
                    [],
                    [2]
                ];
                return bench.map(input => input.size())
            });
        r.forEach((e, i) => {
            expect(e).toBe(out[i])
        })
    });

    it('some', async() => {
        const out = [
                false, true, true, false, true
            ],
            r = await page.evaluate(() => {
                const bench = [
                    [
                        [0, false, '', null]
                    ],
                    [
                        [0, false, '', null, 1]
                    ],
                    [
                        [0, 1, 0, 0, 0]
                    ],
                    [
                        [1, 45, 3, 4, 6], e => e > 45
                    ],
                    [
                        [1, 45, 3, 4, 6], e => e > 44
                    ],
                ];
                return bench.map(input => input[0].some.call(input[0], input[1]))
            });
        r.forEach((e, i) => {
            expect(e).toBe(out[i])
        })
    });

    it('uniq', async() => {
        const out = [
                // TODO: align, this is how it should be
                [0, /*false, '',*/ null],
                [2, 6, 3, 8, 5, 9, 1, 0],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
            ],
            r = await page.evaluate(() => {
                const bench = [
                    [
                        [0, false, '', null]
                    ],
                    [
                        [2, 6, 3, 8, 5, 3, 5, 9, 1, 9, 0]
                    ],
                    [
                        [1, 1, 2, 3, 4, 4, 5, 5, 6, 7, 8, 8, 9, 9, 9]
                    ],
                    [
                        [1, 1, 2, 3, 4, 4, 5, 5, 6, 7, 8, 8, 9, 9, 9], true
                    ],
                ];
                return bench.map(input => input[0].uniq.call(input[0], input[1]))
            });
        r.forEach((e, i) => {
            expect(e).toMatchObject(out[i])
        })
    });

    it('without', async() => {
        const out = [
                // TODO: align, this is how it should be
                [ /*'', */ null],
                [2, 4, 6, 8],
            ],
            r = await page.evaluate(() => {
                const bench = [
                    [
                        [0, false, '', null],
                        [false, 0]
                    ],
                    [
                        [1, 2, 3, 4, 5, 6, 7, 8, 9],
                        [1, 3, 5, 7, 9]
                    ],
                ];
                return bench.map(input => {
                    const a = input[0]
                    const rest = input.unshift()
                    return input[0].without.apply(a, input[1])
                })
            });

        r.forEach((e, i) => {
            expect(e).toMatchObject(out[i])
        })
    });
});