import xs from 'xstream';
import {html} from 'snabbdom-jsx';
import styles from './button.scss';
import classes from 'helpers/classes';
import isolate from '@cycle/isolate';

function Button({DOM, submitting$ = xs.of(false), props$}) {

    const vdom$ = xs.combine(props$, submitting$).map(([props, submitting]) => {
        let {content, look, ...others} = props;
        if (look) {
            others = classes(others).add(styles.default).add(styles[look]).normalize();
        }
        let spinner = '';
        if (props.type == 'submit' && submitting) {
            spinner = <i className="fa fa-circle-o-notch fa-spin"></i>;
            others.disabled = true;
        }
        if (others.disabled === undefined) {
            others.disabled = false;
        }
        return <button {...others}>{content} {spinner}</button>;
    });
    return {
        DOM: vdom$,
        click$: DOM.select('button').events('click')
    };
}
export default sources => isolate(Button)(sources);
