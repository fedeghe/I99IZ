import Browser from './Browser'
import BrowserFeatures from './BrowserFeatures'
import Selector from './Selector'
import { mixin } from './../../core/shared'
import pkg from './../../../package.json'


export const K = x => x 
export const emptyFunction = () => {}
const Prototype =  {
    ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script\\s*>',
    JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,
    Version: pkg.version,
    emptyFunction,
    K,
};
mixin(Prototype, Browser)
mixin(Prototype, BrowserFeatures)
mixin(Prototype, Selector)

export default Prototype