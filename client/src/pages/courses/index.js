import {html} from 'snabbdom-jsx';
import xs from 'xstream';
import isolate from '@cycle/isolate';
import MainLayout from 'layouts/main-layout';
import requireLogin from 'components/require-login';
import routes from 'routes';
import Course from 'models/course';

function Courses({DOM, db}) {
    const vdom$ = db.select('getCourses').flatten().startWith(null).map(courses => {
        return (
            <div>
                {do {
                    if (Array.isArray(courses)) {
                        ''
                    } else {
                        ''
                    }
                }}
                <a href={routes.courses.add}>Lisää</a>
            </div>
        );
    });
    const click$ = DOM.select('a').events('click');
    const query = xs.of(Course.query('getCourses').findAll());
    return  {
        DOM: vdom$,
        router: click$.map(event => event.target.getAttribute('href')),
        preventDefault: click$,
        db: query
    }
}

export default sources => requireLogin(isolate(MainLayout(Courses)))(sources);
