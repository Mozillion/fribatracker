import xs from 'xstream';
import {html} from 'snabbdom-jsx';
import isolate from '@cycle/isolate';
import {Form, TextField, AddDecField, Select} from 'components/ui/form';
import {courseRatings} from 'constants';
import Button from 'components/ui/button';
import R from 'ramda';
import pairwise from 'xstream/extra/pairwise';

function fairway(idx, FormComponent) {
    const name = FormComponent(TextField, {
        layout$: xs.of('none'),
        autoWidth$: xs.of(true),
        props$: xs.of({
            type: 'text',
            placeholder: 'Nimi',
            value: '#' + idx
        }),
        validators$: xs.of([
            ['required'],
            ['length', {min: 1, max: 100}]
        ])
    });
    const par = FormComponent(TextField, {
        layout$: xs.of('none'),
        prepend$: xs.of('Par'),
        props$: xs.of({
            type: 'number',
            // placeholder: 'Pituus'
        }),
        // validators$: xs.of([
        //     ['required'],
        //     ['length', {min: 1, max: 100}]
        // ])
    });
    const length = FormComponent(TextField, {
        layout$: xs.of('none'),
        prepend$: xs.of('Pituus'),
        append$: xs.of('m'),
        props$: xs.of({
            type: 'number',
            // placeholder: 'Pituus'
        }),
        // validators$: xs.of([
        //     ['required'],
        //     ['length', {min: 1, max: 100}]
        // ])
    });
    const relief = FormComponent(TextField, {
        layout$: xs.of('none'),
        prepend$: xs.of('Korkeusero'),
        append$: xs.of('m'),
        props$: xs.of({
            type: 'number',
            step: 0.1
            // placeholder: 'Pituus'
        }),
        // validators$: xs.of([
        //     ['required'],
        //     ['length', {min: 1, max: 100}]
        // ])
    });
    return {name, par, length, relief};
}

function CourseForm({DOM, FormComponent, validatedValuesAfterSubmit$, ...sources}) {
    const submitButton = FormComponent(Button, {
        props$: xs.of({
            content: 'Tallenna',
            type: 'submit',
            look: 'primary'
        })
    });
    const fairwayButton = FormComponent(AddDecField, {
        label$: xs.of('Väyliä'),
        props$: xs.of({
            style: {width: '3.2rem'},
            value: 18
        }),
        min$: xs.of(1),
        max$: xs.of(100)
    });

    const change$ = fairwayButton.value$.compose(pairwise).map(([prev, next]) => next - prev).startWith(0);
    // const response$ = sources.HTTP.select('login').flatten();
    return {
        elements$: xs.of({
            name: FormComponent(TextField, {
                label$: xs.of('Nimi'),
                props$: xs.of({
                    type: 'text',
                }),
                validators$: xs.of([
                    ['required'],
                    ['length', {min: 1, max: 100}]
                ])
            }),
            rating: FormComponent(Select, {
                label$: xs.of('Luokitus'),
                options$: xs.of(R.zipWith((value, text) => ({value, text}), courseRatings, courseRatings))
            }),
            fairwayButton,
            fairways: fairwayButton.value$.fold((acc, value) => {
                const change = value - acc.length;
                if (change > 0) {
                    const fairways = R.range(acc.length, value).map(idx => fairway(idx + 1, FormComponent));
                    const remembered = fairways.map(obj => R.map(sinks => R.map(sink => sink.remember(), sinks), obj))
                    return acc.concat(remembered);
                }
                return acc.slice(0, change);
            }, [])
        }),
        actions$: xs.of({
            submit: submitButton
        }),
        render$: xs.of((alerts, elements, actions, styles) => (
            <form className={styles.grid}>
                {alerts}
                {elements.name}
                {elements.rating}
                {elements.fairwayButton}
                {elements.fairways.map(({name, par, length, relief}, idx) => <div className={styles.inlineGroup} key={idx}>{name}{par}{length}{relief}</div>)}
                {do {
                    if (actions) {
                        <div className={styles.actions}>
                            {actions.submit}
                        </div>
                    } else {
                        ''
                    }
                }}
            </form>
        )),
        // HTTP: validatedValuesAfterSubmit$.map(values => {
        //     return {
        //         url: '/login',
        //         method: 'POST',
        //         send: values,
        //         category: 'login'
        //     }
        // }),
        submitOn$: submitButton.click$,
        afterSubmit$: xs.never()
    };
}

export default sources => isolate(Form(CourseForm))(sources);
