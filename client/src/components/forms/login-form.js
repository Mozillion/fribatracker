import xs from 'xstream';
import {html} from 'snabbdom-jsx';
import isolate from '@cycle/isolate';
import formStyles from 'components/ui/form/form.scss';
import {Form, TextField} from 'components/ui/form';
import Button from 'components/ui/button';

function LoginForm({FormComponent, validatedValuesAfterSubmit$, ...sources}) {
    const submitButton = FormComponent(Button, {
        props$: xs.of({
            content: 'Kirjaudu',
            type: 'submit',
            look: 'primary'
        })
    });
    const response$ = sources.HTTP.select('login').flatten();
    return {
        elements$: xs.of({
            username: FormComponent(TextField, {
                label$: xs.of('Tunnus'),
                props$: xs.of({
                    type: 'text',
                }),
                validators$: xs.of([
                    ['required']
                ])
            }),
            password: FormComponent(TextField, {
                label$: xs.of('Salasana'),
                props$: xs.of({
                    type: 'password',
                }),
                validators$: xs.of([
                    ['required']
                ])
            }),
        }),
        actions$: xs.of({
            submit: submitButton
        }),
        render$: xs.of((alerts, elements, actions) => (
            <form className={formStyles.grid}>
                {alerts}
                {elements.username}
                {elements.password}
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
        )),
        HTTP: validatedValuesAfterSubmit$.map(values => {
            return {
                url: '/login',
                method: 'POST',
                send: values,
                category: 'login'
            }
        }),
        submitOn$: submitButton.click$,
        afterSubmit$: response$,
        user$: response$.filter(({response}) => response && response.ok).map(({response}) => response.body.user)
    };
}

export default sources => isolate(Form(LoginForm))(sources);
