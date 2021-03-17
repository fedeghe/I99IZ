import { replace } from './../../utils'

const fs = require('fs'),
    path = require('path'),
    config = require('./../../config.json'),
    html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8').toString();

jest.dontMock('fs');


describe('$', function () {
    beforeEach(() => {
        document.body.innerHTML = replace(html, config);
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