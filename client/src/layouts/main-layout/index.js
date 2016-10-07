import {html} from 'snabbdom-jsx';
import xs from 'xstream';
import styles from './main-layout.scss';
import mergeSinks from 'helpers/merge-sinks';
import routes from 'routes';
import Navbar from 'components/ui/navbar';
import {Layout} from 'components/ui/grid';
import Icon from 'components/ui/icon';
import Gestures from 'components/ui/gestures';
import HammerJs from 'hammerjs'

function MainLayout(Page) {
    return sources => {
        const navbar = Navbar({
            DOM: sources.DOM,
            location$: sources.location$,
            primaryLinks$: xs.of([
                {title: <div className={styles.link}><Icon glyph="home" size="2x" /><div>Etusivu</div></div>, url: routes.home},
                {title: <div className={styles.link}><Icon glyph="compass" size="2x" /><div>Radat</div></div>, url: routes.courses.base},
                {title: <div className={styles.link}><Icon glyph="user" size="2x" /><div>Pelaajat</div></div>, url: routes.players},
                {title: <div className={styles.link}><Icon glyph="bar-chart" size="2x" /><div>Tulokset</div></div>, url: routes.results},
            ]),
            secondaryLinks$: sources.user$.map(user => ([
                {title: <div className={styles.logoutLink}><Icon glyph="sign-out" size="2x" /><div>{user ? user.username : 'Vieras'}</div></div>, url: '/logout'},
            ])),
        });

        const changePage$ = navbar.navigate$.filter(link => link.url != '/logout').map(link => link.url);
        const logout$ = sources.HTTP.select('logout').flatten().filter(({response}) => response.ok).mapTo(routes.login);
        const router = xs.merge(logout$, changePage$);


        // hammer: xs.of({
        //     element: '#app',
        //     recognizers: ['swipe', {direction: 'horizontal'}]
        // })


        // const hooks = {
        //     insert: function() {
        //         debugger;
        //         const el = document.querySelector('main');
        //         const mc = new Hammer.Manager(el, {
        //             recognizers: [
        //                 [Hammer.Swipe, {direction: Hammer.DIRECTION_HORIZONTAL}]
        //             ]
        //         });
        //         mc.on('swipe', event => {
        //             console.log(event);
        //         });
        //     }
        // }


        const page = Page(sources);
        const gestures = Gestures({
            recognizers$: xs.of([[HammerJs.Swipe, {direction: HammerJs.DIRECTION_HORIZONTAL}]]),
            element$: page.DOM
        });
        const vdom$ = xs.combine(navbar.DOM, gestures.DOM, sources.online$).map(([navbar, page, online]) => (
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
