import xs from 'xstream';
import Dialog from 'components/ui/dialog';
import LoginForm from 'components/forms/login-form';
import mergeSinks from 'helpers/merge-sinks';
import {html} from 'snabbdom-jsx';

function provideRelogin(Component) {
    return sources => {
        const errorResponse$ = sources.HTTP.select().flatten().filter(o => o.response.statusCode == 401);
        const loginDialog$ = errorResponse$.map(({request}) => {
            const loginForm = LoginForm({renderActions$: xs.of(false), ...sources});
            const modal = Dialog({
                DOM: sources.DOM,
                open$: xs.of(true),
                close$: loginForm.afterSubmit$.filter(({response}) => response.ok),
                modal$: xs.of(true),
                header$: xs.of('Kirjaudu'),
                content$: loginForm.DOM,
                footer$: loginForm.actions$.map(actions => actions.submit.DOM).flatten()
            });
            return {
                sinks: mergeSinks({DOM: modal.DOM}, loginForm, modal),
                request
            };
        }).remember();
        const sinks = {
            DOM: loginDialog$.map(loginDialog => loginDialog.sinks.DOM).flatten(),
            HTTP: loginDialog$.map(loginDialog => xs.merge(loginDialog.sinks.HTTP, loginDialog.sinks.afterSubmit$.filter(({response}) => response.ok).mapTo(loginDialog.request))).flatten(),
            preventDefault: loginDialog$.map(loginDialog => loginDialog.sinks.preventDefault).flatten(),
            user$: xs.merge(errorResponse$.mapTo(null), loginDialog$.map(loginDialog => loginDialog.sinks.user$).flatten())
        };

        const cSinks = Component(sources);
        return mergeSinks({
            DOM: xs.combine(sinks.DOM.startWith(''), cSinks.DOM).map(([dialog, dom]) => <div>{dialog}{dom}</div>),
        }, sinks, cSinks);
    }
}

export default provideRelogin;
