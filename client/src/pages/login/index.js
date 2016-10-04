import {html} from 'snabbdom-jsx';
import xs from 'xstream';
import isolate from '@cycle/isolate';
import PlainLayout from 'layouts/plain-layout';
import LoginForm from 'components/forms/login-form';
import mergeSinks from 'helpers/merge-sinks';
import routes from 'routes';
import R from 'ramda';

function Login(sources) {
    const loginForm = LoginForm(sources);
    const router = xs.merge(
        sources.user$.take(1).filter(user => user).mapTo(routes.home),
        xs.combine(sources.location$, loginForm.afterSubmit$.filter(({response}) => response && response.ok)).map(([location]) => R.pathOr(routes.home, ['state','redirect'], location))
    );
    return mergeSinks({
        router,
    }, loginForm);
}

export default sources => isolate(PlainLayout(Login))(sources);
