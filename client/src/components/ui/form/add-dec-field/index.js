import {html} from 'snabbdom-jsx';
import xs from 'xstream';
import isolate from '@cycle/isolate';
import FormField from './../form-field';
import styles from './add-dec-field.scss';
import R from 'ramda';
import Icon from 'components/ui/icon';

function AddDecField({DOM, props$ = xs.of({}), min$ = xs.of(null), max$ = xs.of(null)}) {
    const dec$ = xs.create();
    const add$ = xs.create();
    const initialValue$ = props$.map(props => R.propOr(0, 'value', props));
    const value$ = xs.combine(
            xs.merge(initialValue$, dec$, add$, DOM.select('input').events('change').map(e => {
                const value = parseInt(e.target.value);
                if (isNaN(value)) {
                    return 0;
                }
                return value;
            })),
            min$,
            max$
        )
        .map(([value, min, max]) => {
            if (min !== null && R.lt(value, min)) {
                value = min;
            }
            if (max !== null && R.gt(value, max)) {
                value = max;
            }
            return value;
        })
        .remember();
    dec$.imitate(value$.map(value => DOM.select('.addButton').events('click').mapTo(value - 1)).flatten());
    add$.imitate(value$.map(value => DOM.select('.decButton').events('click').mapTo(value + 1)).flatten());

    const vdom$ = xs.combine(props$, value$).map(([props, value]) => {
        return (
            <div className={styles.addDecField}>
                <button type="button" classNames={[styles.button, 'addButton']}><Icon glyph="minus-circle" /></button>
                <input type="number" {...R.omit(['value'], props)} liveProps-value={value} />
                <button type="button" classNames={[styles.button, 'decButton']}><Icon glyph="plus-circle" /></button>
            </div>
        );
    });
    return {
        DOM: vdom$,
        value$: value$
    };
}
const FormAddDecField = sources => isolate(FormField(AddDecField))(sources);
export default FormAddDecField;
