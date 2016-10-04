import {html} from 'snabbdom-jsx';
import xs from 'xstream';
import styles from './main-layout.scss';
import mergeSinks from 'helpers/merge-sinks';
import routes from 'routes';
import Navbar from 'components/ui/navbar';
import {Layout} from 'components/ui/grid';

function MainLayout(Page) {
    return sources => {
        const navbar = Navbar({
            DOM: sources.DOM,
            location$: sources.location$,
            primaryLinks$: xs.of([
                {title: 'Etusivu', url: routes.home},
                {title: 'Radat', url: routes.courses.base},
                {title: 'Pelaajat', url: routes.players},
                {title: 'Etusivu', url: routes.results},
            ]),
            secondaryLinks$: sources.user$.map(user => ([
                {title: `Kirjaudu ulos ${user ? user.username : 'Vieras'}`, url: '/logout'},
            ])),
        });

        const changePage$ = navbar.navigate$.filter(link => link.url != '/logout').map(link => link.url);
        const logout$ = sources.HTTP.select('logout').flatten().filter(({response}) => response.ok).mapTo(routes.login);
        const router = xs.merge(logout$, changePage$);

        const page = Page(sources);
        const vdom$ = xs.combine(navbar.DOM, page.DOM, sources.online$).map(([navbar, page, online]) => (
            <Layout type="fluid-fixed" className={styles.layout}>
                <header>
                    {online ? '' : <div className={styles.offline}>Ei verkkoyhteyttä</div>}
                    {navbar}
                </header>
                <main>
                    {page}
                </main>
            </Layout>
        ));
        return mergeSinks({DOM: vdom$}, page, navbar, {
            router,
            HTTP: navbar.navigate$.filter(link => link.url == '/logout').mapTo({
                url: '/logout',
                method: 'POST',
                category: 'logout'
            }),
            user$: logout$.mapTo(null)
        });
    }
}

export default MainLayout;
