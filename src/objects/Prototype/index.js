import Browser from './Browser'
import BrowserFeatures from './BrowserFeatures'
import Selector from './Selector'
import { extend } from './../../core/shared'
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
extend(Prototype, Browser)
extend(Prototype, BrowserFeatures)
extend(Prototype, Selector)

export default Prototype