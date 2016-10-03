import {html} from 'snabbdom-jsx';
import isolate from '@cycle/isolate';
import FormField from './form-field';

function Checkbox({DOM, props$}) {
    const value$ = DOM.select('input').events('change').map(event => ({checked: event.target.checked, value: event.target.value}));
    const state$ = props$.map(props => value$.map(newProps => (Object.assign({}, props, newProps))).startWith(props)).flatten().remember();

    const vdom$ = state$.map(state => <input type="checkbox" {...state} />);
    return {
        DOM: vdom$,
        value$: state$.map(state => state.checked ? state.value : '')
    };
}
const FormCheckbox = sources => isolate(FormField(Checkbox))(sources);
export default FormCheckbox;
