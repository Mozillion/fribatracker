import xs from 'xstream';
import {html} from 'snabbdom-jsx';
import isolate from '@cycle/isolate';
import FormField from './form-field';

function Select({DOM, props$, options$}) {
    const value$ = DOM.select('select').events('change').map(event => event.target.value);
    const state$ = props$.map(props => value$.map(value => (Object.assign({}, props, {value}))).startWith(Object.assign({value: ''}, props))).flatten().remember();

    const vdom$ = xs.combine(state$, options$).map(([state, options]) => {
        const {value, props} = state;
        return (
            <select {...props}>
                {options.map(({text, ...others}) => {
                    if (value == others.value) {
                        others.selected = true;
                    }
                    return <option {...others}>{text}</option>;
                })}
            </select>
    );});
    return {
        DOM: vdom$,
        value$: state$.map(state => state.value),
    };
}
const FormSelect = sources => isolate(FormField(Select))(sources);
export default FormSelect;
