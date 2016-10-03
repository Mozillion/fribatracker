import xs from 'xstream';
import {html} from 'snabbdom-jsx';
import R from 'ramda';
import validate from './validate';
import styles from './form.scss';
import classes from 'helpers/classes';

function FormField(Component) {
    return function({validators$ = xs.of([]), label$ = xs.of(false), layout$ = xs.of('grid'), append$ = xs.of(false), prepend$ = xs.of(false), submitTried$ = xs.of(false), ...sources}) {
        sources.props$ = sources.props$ || xs.of({});
        const sinks = Component(sources);
        const error$ = xs.combine(sinks.value$, validators$).map(([value, validators]) => {
            const ok = validate(value, validators);
            if (ok === true) {
                return false;
            }
            return ok;
        }).remember();
        const dirty$ = sinks.value$.drop(1).take(1).mapTo(true).startWith(false);
        sinks.DOM = xs.combine(sinks.DOM, layout$, label$, error$, submitTried$, validators$, dirty$, append$, prepend$)
        .map(([input, layout, label, error, submitTried, validators, dirty, append, prepend]) => {
            let labelProps = {};
            let containerProps = {};
            const showError = error && (dirty || submitTried);
            input.data.props = R.pathOr({}, ['data','props'], input);
            if (showError) {
                if (input.sel !== 'span') {
                    input.data.props = classes(input.data.props).add(styles.error).normalize();
                }
                labelProps = classes(labelProps).add(styles.error).normalize();
            }
            let required = '';
            if (R.find(validator => validator[0] == 'required', validators) !== undefined) {
                required = <span className={styles.required}>*</span>;
            }

            const appendElem = append === false ? '' : <span className={styles.append}>{append}</span>;
            if (append !== false) {
                containerProps = classes(containerProps).add(styles.appendGroup).normalize();
            }
            const prependElem = prepend === false ? '' : <span className={styles.prepend}>{prepend}</span>;
            if (prepend !== false) {
                containerProps = classes(containerProps).add(styles.prependGroup).normalize();
            }
            let vdom = null;
            switch (layout) {
                case 'grid':
                    containerProps = classes(containerProps).add(styles.gridGroup).normalize();
                    vdom =
                        <div {...containerProps}>
                            {label ? <label {...labelProps}>{label} {required}</label> : ''}
                            <div className={styles.inputGroup}>
                                {prependElem}
                                {input}
                                {appendElem}
                                {showError ? <span className={styles.error}>{error}</span> : ''}
                            </div>
                        </div>
                    break;

                case 'horizontal':
                    containerProps = classes(containerProps).add(styles.horizontalGroup).normalize();
                    vdom =
                        <div {...containerProps}>
                            {label ? <label {...labelProps}>{label} {required}</label> : ''}
                            {prependElem}
                            {input}
                            {appendElem}
                            {showError ? <span className={styles.error}>{error}</span> : ''}
                        </div>;
                    break;

                case 'none':
                    vdom =
                        <span {...containerProps}>
                            {label ? <label {...labelProps}>{label} {required}</label> : ''}
                            {prependElem}
                            {input}
                            {appendElem}
                            {showError ? <span className={styles.error}>{error}</span> : ''}
                        </span>;
                    break;

                default: // vertical
                    containerProps = classes(containerProps).add(styles.group).normalize();
                    vdom =
                        <div {...containerProps}>
                            {label ? <label {...labelProps}>{label} {required}{showError ? <span className={styles.error}>{error}</span> : ''}</label> : ''}
                            {prependElem}
                            {input}
                            {appendElem}
                            {showError && !label ? <span className={styles.error}>{error}</span> : ''}
                        </div>;

            }
            return vdom;
        });
        sinks.error$ = error$;
        return sinks;
    }
}
export default FormField;
