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

    method.find = (str, subString) => {
        const indices = [];
        let fromIndex = str.indexOf(subString);

        while(fromIndex != -1) {

            indices.push(fromIndex);
            fromIndex += subString.length;

            fromIndex = str.indexOf(subString, fromIndex)

        }

        return indices;

    }

    method.slice = (str, subString, end) => {
        const idxes = method.find(str, subString);

        return idxes.length == 0
            ? str
            : str.slice(0, idxes[end])
    }

    return method;
})()