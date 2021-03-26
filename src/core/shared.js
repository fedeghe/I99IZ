

export const extend = (destination, source) => {
    for (var property in source)
        destination[property] = source[property];
    return destination;
}


export default {
    extend
}