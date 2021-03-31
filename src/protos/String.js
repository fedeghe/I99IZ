import { isNumber, isFunction, isString } from './../core/checkers'
import Prototype from './../objects/Prototype'
import { toPaddedString } from './Number'
import { _Template } from './../TRIAD1'


const blank = str => /^\s*$/.test(str)
const interpret = str => str == null ? '' : String(str)
const camelize = str => str.replace(
    /-+(.)?/g,
    (_, chr) => chr ? chr.toUpperCase() : ''
)
const capitalize = str => str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
const dasherize = str => str.replace(/_/g, '-')
    // not being triple here allows new String('') to return true here
const empty = str => str == ''
const endsWith = (str, pattern, position) => {
    var len = str.length;
    pattern = String(pattern);
    position = isNumber(position) ? position : len;
    if (position < 0) position = 0;
    if (position > len) position = len;
    var d = position - pattern.length;
    return d >= 0 && str.indexOf(pattern, d) === d;
}
const escapeHTML = str => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const evalJSON = (str, sanitize) => {
    var json = unfilterJSON(str),
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    if (cx.test(json)) {
        json = json.replace(cx, function(a) {
            return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        });
    }
    try {
        if (!sanitize || json.isJSON()) return eval('(' + json + ')');
    } catch (e) {}
    throw new SyntaxError('Badly formed JSON string: ' + inspect(str));
}

const evalScripts = str => extractScripts(str).map(eval)

const extractScripts = str => {
    var matchAll = new RegExp(Prototype.ScriptFragment, 'img'),
        matchOne = new RegExp(Prototype.ScriptFragment, 'im');
    return (str.match(matchAll) || []).map(function(scriptTag) {
        return (scriptTag.match(matchOne) || ['', ''])[1];
    });
}
const include = (str, pattern) => str.indexOf(pattern) > -1

const inspect = (str, useDoubleQuotes) => {
    var escapedString = str.replace(/[\x00-\x1f\\]/g, function(character) {
        if (character in specialChar) {
            return specialChar[character];
        }
        return toPaddedString('\\u00' + character.charCodeAt(), 2, 16);
    });
    if (useDoubleQuotes) return '"' + escapedString.replace(/"/g, '\\"') + '"';
    return "'" + escapedString.replace(/'/g, '\\\'') + "'";
}

const interpolate = (str, object, pattern) => new _Template(str, pattern).evaluate(object)



function prepareReplacement(replacement) {
    if (isFunction(replacement)) return replacement;
    var template = new _Template(replacement);
    return function(match) {
        return template.evaluate(match)
    };
}

function isNonEmptyRegExp(regexp) {
    return regexp.source && regexp.source !== '(?:)';
}
const gsub = (str, pattern, replacement) => {
    var result = '',
        source = str,
        match;
    replacement = prepareReplacement(replacement);

    if (isString(pattern))
        pattern = RegExp.escape(pattern);

    if (!(pattern.length || isNonEmptyRegExp(pattern))) {
        replacement = replacement('');
        return replacement + source.split('').join(replacement) + replacement;
    }

    while (source.length > 0) {
        match = source.match(pattern)
        if (match && match[0].length > 0) {
            result += source.slice(0, match.index);
            result += interpret(replacement(match));
            source = source.slice(match.index + match[0].length);
        } else {
            result += source, source = '';
        }
    }
    return result;
}


const times = (str, count) => count < 1 ?
    '' :
    new Array(count + 1).join(str);

export default {
    blank,
    camelize,
    capitalize,
    dasherize,
    empty,
    endsWith,
    escapeHTML,
    evalJSON,
    evalScripts,
    extractScripts,
    include,

    inspect,
    interpolate,
    interpret,
    isJSON: () => {},
    gsub,
    parseQuery: () => {},
    scan: () => {},
    specialChar: {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '\\': '\\\\'
    },
    startsWith: () => {},
    strip: () => {},
    stripScripts: () => {},
    stripTags: () => {},
    sub: () => {},
    succ: () => {},
    times,
    toArray: () => {},
    toQueryParams: () => {},
    truncate: () => {},
    unescapeHTML: () => {},
    underscore: () => {},
    unfilterJSON: () => {},
}