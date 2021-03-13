const fs = require('fs'),
    path = require('path'),
    html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

jest.dontMock('fs');

describe('$', function () {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    afterEach(jest.resetModules);

    it('finds a node', () => {
        window.onload = () => {
            expect($('el')).toBeInTheDocument()
        }
    });
    it('do not finds a node', () => {
        window.onload = () => {
            expect($('foofoo')).toBeNull()
        }
    });
});