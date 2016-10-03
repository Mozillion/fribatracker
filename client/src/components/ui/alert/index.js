import xs from 'xstream';
import {html} from 'snabbdom-jsx';
import classes from 'helpers/classes';
import styles from './alerts.scss';
import isolate from '@cycle/isolate';

function intent({DOM, close$}) {
    return {
        close$: xs.merge(close$, DOM.select(`.${styles.closeButton}`).events('click'))
    }
}

function model(actions) {
    return {
        open$: actions.close$.mapTo(false).startWith(true)
    };
}

function view({state, props$, header$, content$, type$, closable$}) {
    return xs.combine(state.open$, props$, header$, content$, type$, closable$).map(([open, props, header, content, type, closable]) => {
        const newProps = classes(props).add(styles.alert);
        if (type) {
            newProps.add(styles[type]);
        }
        props = newProps.normalize();
        return (
            <div {...props} hidden={!open}>
                {header ? <h1>{header}</h1> : ''}
                {closable ? <button type="button" className={styles.closeButton}><i className="fa fa-times"></i></button> : ''}
                {content ? content : ''}
            </div>
        );
    });
}

function Alert({DOM, props$ = xs.of({}), header$ = xs.of(false), content$ = xs.of(false), type$ = xs.of(null), close$ = xs.never(), closable$ = xs.of(true)}) {
    const actions = intent({DOM, close$});
    const state = model(actions);
    const vdom$ = view({state, props$, header$, content$, type$, closable$});
    return {
        DOM: vdom$
    }
}

export default sources => isolate(Alert)(sources);
