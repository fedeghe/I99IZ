export default {
    XPath: !!document.evaluate,
    SelectorsAPI: !!document.querySelector,
    ElementExtensions: (function() {
        var constructor = window.Element || window.HTMLElement;
        return !!(constructor && constructor.prototype);
    })(),
    SpecificElementExtensions: (function() {
        if (typeof window.HTMLDivElement !== 'undefined') return true;
        var div = document.createElement('div'),
            form = document.createElement('form'),
            isSupported = false;

        div.__proto__ &&
            (div.__proto__ !== form.__proto__) &&
            (isSupported = true);

        div = form = null;

        return isSupported;
    })()
}