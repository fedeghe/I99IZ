export const replace = (s, replacements) => {
    let res = s;
    for (var replacement in replacements) {
        res = res.replace(new RegExp(`\\$\\$${replacement}\\$\\$`, 'm'), replacements[replacement]);
    }
    return res;
};