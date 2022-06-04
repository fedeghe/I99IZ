import Browser from './Browser'
import BrowserFeatures from './BrowserFeatures'
import Element from './../../protos/Element'

import { extend } from './../../core/shared'
import pkg from './../../../package.json'

/**
 * Sizzle publishes itself in window
 * would not be a bad idea to avoid that
 * and just export it
 * 
 * * 
 * IN CASE also the static methods added to Sizzle (e.g. matches, matchSelector) ARE NEEDED
 * 
 * 
 * otherwise if only Sizzle is used we could write an adapter method using querySelectorAll
 */
import './Sizzle';

export const K = x => x;

export const emptyFunction = () => {};

const Prototype = {
    ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script\\s*>',
    JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,
    Version: pkg.version,
    emptyFunction,
    _original_property: window.Sizzle,
    K,
};

extend(Prototype, { Browser });

extend(Prototype, { BrowserFeatures });

// Selector needs to be there since it contains a self ref
Prototype.Selector = (function() {
    function find(elements, expression, index) {
        index = index || 0;
        var match = Prototype.Selector.match,
            length = elements.length,
            matchIndex = 0,
            i;

        for (i = 0; i < length; i++) {
            if (match(elements[i], expression) && index == matchIndex++) {
                return Element.extend(elements[i]);
            }
        }
    }

    function extendElements(elements) {
        for (var i = 0, length = elements.length; i < length; i++) {
            Element.extend(elements[i]);
        }
        return elements;
    }

    var K = Prototype.K,
        ret = (function(engine) {
            return {
                engine,
                select: function (selector, scope) {
                    return extendElements(engine(selector, scope || document));
                },
                match: function (element, selector) {
                    return engine.matches(selector, [element]).length == 1;
                },
                find,
                extendElements: (Element.extend === K) ? K : extendElements,
                extendElement: Element.extend
            }
        })(Prototype._original_property);

    delete window.Sizzle;
    delete Prototype._original_property;
    return ret;
})();


export default Prototype;