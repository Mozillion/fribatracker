import {html} from 'snabbdom-jsx';
import xs from 'xstream';
import isolate from '@cycle/isolate';
import MainLayout from 'layouts/main-layout';
import requireLogin from 'components/require-login';
import {Layout, Row, Column} from 'components/ui/grid';

function Home(sources) {
    const vdom$ = xs.of(
        <Row>
            <Column col={3}>Homepage 1!</Column>
            <Column col={3} left={5}>Homepage 2!</Column>
        </Row>
    );
    return {
        DOM: vdom$
    }
}

export default sources => requireLogin(isolate(MainLayout(Home)))(sources);
