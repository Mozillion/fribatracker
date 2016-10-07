import xs from 'xstream';
import {html} from 'snabbdom-jsx';
import isolate from '@cycle/isolate';
import styles from './navbar.scss';
import R from 'ramda';
import routes from 'routes';

function NavItem(link, location) {
    let active = false;
    if (location.state && location.state.navPath) {
        const path = location.state.navPath.split('.');
        const base = [];
        active = path.some(fragment => {
            let url = R.path([...base, fragment], routes);
            if (typeof url !== 'string') {
                url = url.base;
            }
            base.push(fragment);
            return url == link.url;
        });
    }
    const props = {
        'attrs-data-link': JSON.stringify(R.omit(['title'], link)),
        href: link.url,
        class: {
            [styles.active]: active
        }
    };
    if (link.tooltip !== undefined) {
        props['attrs-data-ks-tooltip'] = link.tooltip;
        props['attrs-data-ks-tooltip-position'] = 'bottom';
    }
    return <li><a {...props}>{link.title}</a></li>
}

function view(location$, primaryLinks$, secondaryLinks$) {
    return xs.combine(location$, primaryLinks$, secondaryLinks$).map(([location, primaryLinks, secondaryLinks]) => (
        <div className={styles.navbar}>
            <nav>
                <ul>
                    {primaryLinks.map(link => NavItem(link, location))}
                </ul>
                {secondaryLinks.map(link => {
                    if (link === false) {
                        return false;
                    }
                    return NavItem(link, location);
                }).filter(dom => dom !== false).map(dom => <ul>{dom}</ul>)}
            </nav>
        </div>
    ))
}

function Navbar({DOM, location$, primaryLinks$ = xs.of([]), secondaryLinks$ = xs.of(false)}) {
    const vdom$ = view(location$, primaryLinks$, secondaryLinks$);
    const click$ = DOM.select('a').events('click');
    const navigate$ = click$.map(event => JSON.parse(event.currentTarget.dataset.link));
    return  {
        DOM: vdom$,
        preventDefault: click$,
        navigate$
    }
}

export default sources => isolate(Navbar)(sources);
