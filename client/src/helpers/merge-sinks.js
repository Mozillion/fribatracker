import xs from 'xstream';
import R from 'ramda';

function mergeSinks(customSinks, ...components) {
    let toMerge = {};
    components.forEach(component => {
        for (const [key, stream] of R.toPairs(component)) {
            if (!customSinks.hasOwnProperty(key)) {
                if (!toMerge.hasOwnProperty(key)) {
                    toMerge[key] = [];
                }
                toMerge[key].push(stream);
            }
        }
    });
    const merged = R.map((streams, key) => {
        if (streams.length > 1) {
            return xs.merge(...streams);
        }
        return streams[0];
    }, toMerge);
    return Object.assign({}, customSinks, merged);
}

export default mergeSinks;
