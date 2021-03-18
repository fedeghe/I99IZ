import { IS_DONTENUM_BUGGY } from './../core/constants'
import {isFunction} from './../core/checkers'
import $A from './../funcs/$A'
import { extend } from './../core/shared'
import Prototype, { emptyFunction } from './../objects/Prototype'
import _Function from './../protos/Function'
import _Object from './../protos/Object'

// TODO: replacements apart it it might be a good idea to rewrite it
var Class = (function() {
    
    function subclass() {};

    function create() {
        var parent = null,
            properties = $A(arguments);
        if (isFunction(properties[0]))
            parent = properties.shift();

        function klass() {
            this.initialize.apply(this, arguments);
        }

        extend(klass, Class.Methods);
        klass.superclass = parent;
        klass.subclasses = [];

        if (parent) {
            subclass.prototype = parent.prototype;
            klass.prototype = new subclass;
            parent.subclasses.push(klass);
        }

        for (var i = 0, length = properties.length; i < length; i++)
            klass.addMethods(properties[i]);

        if (!klass.prototype.initialize)
            klass.prototype.initialize = emptyFunction;

        klass.prototype.constructor = klass;
        return klass;
    }

    function addMethods(source) {
        var ancestor = this.superclass && this.superclass.prototype,
            properties = Object.keys(source);

        if (IS_DONTENUM_BUGGY) {
            if (source.toString != Object.prototype.toString)
                properties.push("toString");
            if (source.valueOf != Object.prototype.valueOf)
                properties.push("valueOf");
        }

        for (var i = 0, length = properties.length; i < length; i++) {
            var property = properties[i],
                value = source[property];
            if (ancestor && isFunction(value) &&
                
                _Object.argumentNames(value)[0] == "$super") {
                // value.argumentNames()[0] == "$super") {

                var method = value;
                // value = (function(m) {
                //     return function() {
                //         return ancestor[m].apply(this, arguments);
                //     };
                // })(property).wrap(method);
                value = _Function.wrap(
                    (function(m) {
                        return function() {
                            return ancestor[m].apply(this, arguments);
                        };
                    })(property),
                    method
                );




                value.valueOf = (function(method) {
                    return function() {
                        return method.valueOf.call(method);
                    };
                })(method);

                value.toString = (function(method) {
                    return function() {
                        return method.toString.call(method);
                    };
                })(method);
            }
            this.prototype[property] = value;
        }

        return this;
    }

    return {
        create,
        Methods: {
            addMethods
        }
    };
})();

export default Class;