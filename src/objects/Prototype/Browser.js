const ua = navigator.userAgent,
    isOpera = !!(window.opera && opera.toString() == "[object Opera]");

export default {
    /* opera has both attachEvent / addEventListener
     */
    IE: !!window.attachEvent && !isOpera,
    opera: isOpera,
    WebKit: ua.indexOf('AppleWebKit/') > -1,
    Gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
    MobileSafari: /Apple.*Mobile/.test(ua)
};