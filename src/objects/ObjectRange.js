import { _Class } from './../Triad'
import { _Enumerable } from './../Triad'
import _Number from './../protos/Number'
import _String from './../protos/String'
import { isString, isNumber } from './../core/checkers'
var ObjectRange = _Class.create(_Enumerable, (function() {
    function initialize(start, end, exclusive) {
        this.start = start;
        this.end = end;
        this.exclusive = exclusive;
    }

    function _each(iterator, context) {
        var value = this.start,
            i;
        for (i = 0; this.include(value); i++) {
            iterator.call(context, value, i);
            if (isNumber(value)) {
                value = _Number.succ(value);
            }
            if (isString(value)) {
                value = _String.succ(value);
            }
        }
    }

    function include(value) {
        if (value < this.start)
            return false;
        if (this.exclusive)
            return value < this.end;
        return value <= this.end;
    }

    return {
        initialize: initialize,
        _each: _each,
        include: include
    };
})());

export default ObjectRange