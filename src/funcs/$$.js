export default (...args) => {
    const r = document.querySelectorAll(args.join(', '))
    return r.length ? [].slice.call(r, 0) : [];
};