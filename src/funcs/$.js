import { isElement } from './../core/checkers'

export default id => {
    if (isElement(id)) return id;
    return document.getElementById(id)
}