import {html} from 'snabbdom-jsx';
import xs from 'xstream';
import isolate from '@cycle/isolate';
import MainLayout from 'layouts/main-layout';

function NotFound(sources) {
    return {
        DOM: xs.of(
            <div>
                <h1>Oho!</h1>
                <div>Etsimääsi sivua ei löytynyt</div>
            </div>
        ),
    };
}

export default sources => isolate(MainLayout(NotFound))(sources);
