/**
 * @jest-environment jsdom
 */
import Prototype from './../../src/objects/Prototype'

describe('Prototype', () => {
    describe('Browser', () => {
        it('should be the expected', () => {
            expect(Prototype.Browser.WebKit).toBeTruthy()
            expect(Prototype.Browser.IE).toBeFalsy()
            expect(Prototype.Browser.opera).toBeFalsy()
            expect(Prototype.Browser.Gecko).toBeFalsy()
            expect(Prototype.Browser.MobileSafari).toBeFalsy()
        });
    });
    describe('BrowserFeatures', () => {
        it('should be the expected', () => {
            expect(Prototype.BrowserFeatures.XPath).toBeTruthy()
            expect(Prototype.BrowserFeatures.SelectorsAPI).toBeTruthy()
            expect(Prototype.BrowserFeatures.ElementExtensions).toBeTruthy()
            expect(Prototype.BrowserFeatures.SpecificElementExtensions).toBeTruthy()
        });
    });
});