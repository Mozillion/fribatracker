import {html} from 'snabbdom-jsx';
import xs from 'xstream';
import isolate from '@cycle/isolate';
import MainLayout from 'layouts/main-layout';
import requireLogin from 'components/require-login';
import routes from 'routes';

function Courses(sources) {
    const vdom$ = xs.of(<a href={routes.courses.add}>Lisää</a>);
    const click$ = sources.DOM.select('a').events('click');
    return  {
        DOM: vdom$,
        router: click$.map(event => event.target.getAttribute('href')),
        preventDefault: click$
    }
}

export default sources => requireLogin(isolate(MainLayout(Courses)))(sources);
