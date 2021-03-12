export default (...args) => {
    const r = document.querySelectorAll(args.join(', '))
    return r.length ? r : [];
};