import { isString } from './../core/checkers'
import _String from './../protos/String'
export default str => {
    if (!isString(str)) return [];
    str = _String.strip(str);
    return str ? str.split(/\s+/) : [];
}