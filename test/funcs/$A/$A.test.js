import $A from '../../../src/funcs/$A'

const fs = require('fs'),
    path = require('path'),
    html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8').toString();

jest.dontMock('fs');

describe('$A', function () {
    beforeEach(() => {
        document.documentElement.innerHTML = html;
    });

    afterEach(jest.resetModules);

    it('arguments to array', () => {
        function _() {
            var args = $A(arguments)
            expect(args.length).toBe(5)
        }
        _(1,2,3,4,5)
    })

    // it('HTMLcollection to array', async () => {
    //     window.onload = () => {
    //         var spans = document.getElementsByTagName('span'),
    //             spansArr = $A(spans);
    //         expect(spansArr.length).toBe(2)
    //     }
    // });

    // it('NodeList to array', () => {
    //     window.onload = () => {
    //         var parent = document.getElementById('parent'),
    //             NodeList = $A(parent.children);
    //         expect(NodeList.length).toBe(3)   
    //     }
    // });
});