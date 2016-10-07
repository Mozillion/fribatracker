import xs from 'xstream';
import Hammer from 'hammerjs';
import R from 'ramda';

function Gestures({DOM, recognizers$, element$}) {
    const stream$ = xs.combine(element$, recognizers$).map(([element, recognizers]) => {
        const hooks = R.pathOr({}, ['data','hook'], element);
        const origInsert = R.path(['insert'], hooks);
        const mc$ = xs.create();
        hooks.insert = function(vnode) {
            const mc = new Hammer.Manager(vnode.elm, {
                recognizers
            });
            // shamefullysendn3dt();
        }
        element.data.hook = hooks;
        return {element, mc$};
    });
    return {
        DOM: stream$.map(sinks => sinks.element);
        events: function(type) {
            return stream$.map(sinks => sinks.events$);
        }
    };
}

export default Gestures;
