import xs from 'xstream';
import {html} from 'snabbdom-jsx';
import isolate from '@cycle/isolate';
import FormField from './form-field';

function measureInputValueWidth(vnode) {
    const span = document.createElement('span');
    span.appendChild(document.createTextNode(vnode.elm.value));
    const style = window.getComputedStyle(vnode.elm);
    span.style.font = style.font;
    span.style.position = 'absolute';
    span.style.visibility = 'hidden';
    document.body.insertBefore(span, document.body.childNodes[0]);
    const width = span.offsetWidth
    const padding = parseFloat(style.paddingLeft)
                    + parseFloat(style.paddingRight)
                    + parseFloat(style.borderLeftWidth)
                    + parseFloat(style.borderRightWidth);
    document.body.removeChild(span);
    return {width, padding};
}

function updateWidth(vnode) {
    const {width, padding} = measureInputValueWidth(vnode);
    vnode.elm.style.width = width + padding + 'px';
    vnode.elm.style.minWidth = `calc(1em + ${padding}px)`;
};

function TextField({DOM, props$, autoWidth$ = xs.of(false)}) {
    const value$ = DOM.select('input').events('input').map(event => event.target.value);
    const state$ = props$
        .map(props => value$.map(value => Object.assign({}, props, {value})).startWith(Object.assign({value: ''}, props)))
        .flatten()
        .remember();

    const vdom$ = xs.combine(autoWidth$, state$).map(([autoWidth, props]) => {
        if (!props.type) {
            props.type = 'text';
        }
        const hooks = autoWidth ? {
            insert: updateWidth,
            update: updateWidth,
        } : {};
        return <input {...props} hook={hooks} />
    });
    return {
        DOM: vdom$,
        value$: state$.map(state => state.value)
    };
}
const FormTextField = sources => isolate(FormField(TextField))(sources);
export default FormTextField;
