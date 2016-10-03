import {html} from 'snabbdom-jsx';
import xs from 'xstream';
import isolate from '@cycle/isolate';
import FormField from './form-field';
import styles from './form.scss';

function RadioButtonGroup({DOM, props$, options$}) {
    const value$ = DOM.select('input').events('change').map(event => event.target.value);
    const state$ = props$.map(props => value$.map(value => (Object.assign({}, props, {value}))).startWith(props)).flatten().remember();
    const vdom$ = xs.combine(state$, options$).map(([state, options]) => {
        return (
            <span>
                {options.map(option => {
                    let {text, ...others} = option;
                    if (others.name === undefined) {
                        others.name = state.name;
                    }
                    if (state.value !== undefined && others.value == state.value) {
                        others.checked = true;
                    }
                    return (
                        <label className={styles.radio}>
                            <input type="radio" {...others} />
                            {text}
                        </label>
                    )
                })}
            </span>
    );});
    return {
        DOM: vdom$,
        value$: state$.map(state => state.value),
    };
}
const FormRadioButtonGroup = sources => isolate(FormField(RadioButtonGroup))(sources);
export default FormRadioButtonGroup;
