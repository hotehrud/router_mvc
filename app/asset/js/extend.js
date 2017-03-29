exports.extends = ( () => {
    const method = {};

    method.remove = (obj, keys) => {
        if (typeof keys === 'string') {
            keys = [keys];
        }

        return keys.reduce( (obj, key) => {
            delete obj[key];
            return obj;
        }, obj)
    }

    method.copy = (obj, target, except) => {
        method.remove(target, except);

        for (let attr in target) {
            if (target.hasOwnProperty(attr)) {
                obj[attr] = target[attr];
            }
        }

    }

    return method;
})()