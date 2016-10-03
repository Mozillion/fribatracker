import {html} from 'snabbdom-jsx';
import isolate from '@cycle/isolate';
import FormField from './form-field';

function TextArea({DOM, props$}) {
    const value$ = DOM.select('textarea').events('input').map(event => event.target.value);
    const state$ = props$.map(props => value$.map(value => (Object.assign({}, props, {value}))).startWith(props)).flatten().remember();

    const vdom$ = state$.map(({value, ...state}) => <textarea {...state}>{value}</textarea>);
    return {
        DOM: vdom$,
        value$: state$.map(state => state.value),
    };
}
const FormTextArea = sources => isolate(FormField(TextArea))(sources);
export default FormTextArea;
