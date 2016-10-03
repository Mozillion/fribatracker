import xs from 'xstream';

export default function xsCombineObj(obj) {
    let sources = [];
    let keys = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key.replace(/\$$/, ''));
            sources.push(obj[key]);
        }
    }
    return xs.combine(...sources).map(function () {
        let args = arguments[0];
        let argsLength = args.length;
        let combination = {};
        for (let i = argsLength - 1; i >= 0; --i) {
            combination[keys[i]] = args[i];
        }

        return combination;
    });
}
