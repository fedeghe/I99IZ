import ObjectRange from './../objects/ObjectRange'
export default (start, end, exclusive) => {
    return new ObjectRange(start, end, exclusive);
}