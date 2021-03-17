import { replace } from './../../utils'

const fs = require('fs'),
    path = require('path'),
    config = require('./../../config.json'),
    html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8').toString();

jest.dontMock('fs');


describe('$A', function () {
    beforeEach(() => {
        document.body.innerHTML = replace(html, config);
    });

    afterEach(jest.resetModules);

    it('arguments to array', () => {
        window.onload = () => {
            function fn() {
                var args = $A(arguments)
                expect(args.length).toBe(5)
            }
            fn(1,2,3,4,5)
        }
    })

    it('HTMLcollection to array',  () => {
        window.onload = () => {
            var spans = document.getElementsByTagName('span'),
                spansArr = $A(spans);
            expect(spansArr.length).toBe(4);
        }
    });

    it('NodeList to array', () => {
        window.onload = () => {
            var parent = document.getElementById('parent'),
                NodeList = $A(parent.children);
            
            expect(NodeList.length).toBe(3);
        }
    });
    it('falsy to empty array', () => {
        window.onload = () => {
            var a = $A();
            expect(a.length).toBe(0);
            expect(isArray(a)).toBeTruthy()
        }
    });
    it('Array to array', () => {
        window.onload = () => {
            var a = $A([1,2,3,4,5]);
            expect(a.length).toBe(5);
            expect(isArray(a)).toBeTruthy()
        }
    });

    it('Iterable to array', () => {
        window.onload = () => {
            var a0 = $A([1,2,3,4,5]),
                a = $A(a0)
            expect(a.length).toBe(5);
            expect(isArray(a)).toBeTruthy()
        }
    })
});