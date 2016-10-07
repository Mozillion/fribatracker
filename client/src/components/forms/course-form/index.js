import xs from 'xstream';
import {html} from 'snabbdom-jsx';
import isolate from '@cycle/isolate';
import {Form, TextField, AddDecField, Select} from 'components/ui/form';
import {courseRatings} from 'constants';
import Button from 'components/ui/button';
import R from 'ramda';
import {Row, Column} from 'components/ui/grid';
import pairwise from 'xstream/extra/pairwise';
import dropRepeats from 'xstream/extra/dropRepeats';
import styles from './course-form.scss';
import Course from 'models/course';
import Alert from 'components/ui/alert';

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
    const par = FormComponent(AddDecField, {
        layout$: xs.of('none'),
        label$: xs.of('Par'),
        props$: xs.of({
            style: {width: '3.2rem'},
            value: 3
        }),
        min$: xs.of(1),
        max$: xs.of(8)
    });
    const length = FormComponent(TextField, {
        layout$: xs.of('none'),
        append$: xs.of('m'),
        props$: xs.of({
            type: 'number',
        }),
        validators$: xs.of([
            ['int', {min: 1, max: 1000}]
        ])
    });
    const relief = FormComponent(TextField, {
        layout$: xs.of('none'),
        append$: xs.of('m'),
        props$: xs.of({
            type: 'number',
            step: 0.1,
        }),
        validators$: xs.of([
            ['float', {min: -1000, max: 1000}]
        ])
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
    const fairwayCount = FormComponent(AddDecField, {
        label$: xs.of('Väyliä'),
        props$: xs.of({
            style: {width: '3.2rem'},
            value: 18
        }),
        min$: xs.of(1),
        max$: xs.of(100)
    });

    const change$ = fairwayCount.value$.compose(pairwise).map(([prev, next]) => next - prev).startWith(0);
    const response$ = sources.db.select('courseForm').flatten();

    const alert = response$.map(response =>
        Alert({
            DOM,
            content$: xs.of('Rata tallennettu'),
            type$: xs.of('success'),
            close$: submitButton.click$
        }).DOM
    ).flatten().startWith('');

    return {
        reset$: response$,
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
            fairways: fairwayCount.value$.compose(dropRepeats()).fold((acc, value) => {
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
        render$: xs.combine(alert, fairwayCount.DOM).map(([alert, fairwayButton]) => xs.of((alerts, elements, actions, formStyles) => (
            <form className={formStyles.grid}>
                {alert}
                {alerts}
                {elements.name}
                {elements.rating}
                {fairwayButton}
                {elements.fairways.map(({name, par, length, relief}, idx) => (
                    <div className={styles.fairway} key={idx}>
                        <Row>
                            <Column col={4}>{name}</Column>
                            <Column col={8}>{par}</Column>
                        </Row>
                        <Row>
                            <Column col={4}><label>Pituus</label></Column>
                            <Column col={8}>{length}</Column>
                        </Row>
                        <Row>
                            <Column col={4}><label>Korkeusero</label></Column>
                            <Column col={8}>{relief}</Column>
                        </Row>
                    </div>
                ))}
                {do {
                    if (actions) {
                        <div className={formStyles.actions}>
                            {actions.submit}
                        </div>
                    } else {
                        ''
                    }
                }}
            </form>
        ))).flatten(),
        db: validatedValuesAfterSubmit$.map(values => {
            return {
                category: 'courseForm',
                table: 'courses',
                add: new Course(values)
            }
        }),
        submitOn$: submitButton.click$,
        afterSubmit$: response$
    };
}

export default sources => isolate(Form(CourseForm))(sources);
