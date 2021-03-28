import $A from '../../../src/funcs/$A'
import { isArray } from '../../../src/core/checkers'

const fs = require('fs'),
    path = require('path'),
    html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8').toString();

jest.dontMock('fs');

describe('$A', function() {
    beforeEach(() => {
        document.body.innerHTML = html;
    });

    afterEach(jest.resetModules);

    it('arguments to array', () => {
        function fn() {
            var args = $A(arguments)
            expect(args.length).toBe(5)
        }
        fn(1, 2, 3, 4, 5)
    })

    it('HTMLcollection to array', () => {
        var spans = document.getElementsByTagName('span'),
            spansArr = $A(spans);
        expect(spansArr.length).toBe(4);
    });

    it('NodeList to array', () => {
        var parent = document.getElementById('parent'),
            NodeList = $A(parent.children);

        expect(NodeList.length).toBe(3);
    });
    it('falsy to empty array', () => {
        var a = $A();
        expect(a.length).toBe(0);
        expect(isArray(a)).toBeTruthy()
    });
    it('Array to array', () => {
        var a = $A([1, 2, 3, 4, 5]);
        expect(a.length).toBe(5);
        expect(isArray(a)).toBeTruthy()
    });

    // it.skip('Iterable to array', () => {})
});