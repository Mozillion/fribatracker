import xs from 'xstream';
import R from 'ramda';
import Button from 'components/ui/button';
import dropRepeats from 'xstream/extra/dropRepeats';
import xsCombineObj from 'helpers/xs-combine-obj';
import {html} from 'snabbdom-jsx';
import Alert from 'components/ui/alert';
import styles from 'components/ui/form/form.scss';

function pluckCombineNestedObject(prop) {
    return function(stream$) {
        return stream$.map(object => xsCombineObj(R.map(function combine(element) {
            if (element.hasOwnProperty(prop)) {
                return element[prop] instanceof xs ? element[prop] : xs.of(element[prop]);
            }
            if (element instanceof xs) {
                return element.map(inner => combine(inner)).flatten();
            }
            if (Array.isArray(element)) {
                return xs.combine(...element.map(inner => combine(inner)));
            }
            return xsCombineObj(R.map(inner => combine(inner), element));
        }, object))).flatten();
    }
}

function Form(FormConfigComponent) {
    return ({renderActions$ = xs.of(true), ...sources}) => {
        const alerts$ = sources.HTTP.select().flatten().filter(({response}) => response && response.body).map(({response}) => response.body.alerts).startWith([]);
        const submitting$ = xs.create();
        const submitTried$ = xs.create();
        const reset$ = xs.create();
        const FormComponent = function(Component, cSources) {
            return Component({
                DOM: sources.DOM,
                submitTried$: submitTried$.startWith(false),
                submitting$: submitting$.startWith(false),
                reset$,
                ...cSources
            })
        };
        const elementsProxy$ = xs.create();
        const values$ = elementsProxy$.compose(pluckCombineNestedObject('value$'));
        const valid$ = elementsProxy$.compose(pluckCombineNestedObject('error$')).map(elements => {
            const error = R.find(function hasError(value) {
                if (Array.isArray(value)) {
                    return R.find(hasError, value);
                }
                if (value === Object(value)) {
                    return R.find(hasError, R.values(value));
                }
                return value !== false;
            }, R.values(elements));
            return error === undefined;
        });

        const submitOn$ = xs.create();
        const validatedValuesAfterSubmit$ = xs.combine(valid$, values$)
            .map(([valid, values]) => submitOn$.map(() => [valid, values])).flatten()
            .filter(([valid, values]) => valid)
            .map(([valid, values]) => values);
        const {render$, ...sinks} = FormConfigComponent({FormComponent, validatedValuesAfterSubmit$, ...sources});
        submitOn$.imitate(sinks.submitOn$);
        submitTried$.imitate(sinks.submitOn$.take(1));
        if (sinks.reset$) {
            reset$.imitate(sinks.reset$);
        }
        delete sinks.submitOn$;
        elementsProxy$.imitate(sinks.elements$);
        submitting$.imitate(xs.merge(validatedValuesAfterSubmit$.mapTo(true), sinks.afterSubmit$.mapTo(false)));
        sinks.DOM = xs.combine(
            alerts$.map(alerts => {
                return xs.combine(...alerts.map(msg => {
                    const alert = Alert({
                        DOM: sources.DOM,
                        content$: xs.of(msg),
                        type$: xs.of('error'),
                        close$: submitOn$
                    });
                    return alert.DOM;
                }));
            }).flatten(),
            render$,
            renderActions$,
            sinks.actions$.map(actions => xsCombineObj(R.map(elem => elem.DOM, actions))).flatten(),
            elementsProxy$.compose(pluckCombineNestedObject('DOM'))
        ).map(([alerts, render, renderActions, actions, elements]) => render(alerts, elements, renderActions ? actions : false, styles));
        sinks.preventDefault = xs.merge(sources.DOM.select('form').events('submit'), sinks.preventDefault ? sinks.preventDefault : xs.never());
        return sinks;
    }
}

export default Form;
