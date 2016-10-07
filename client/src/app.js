import xs from 'xstream';
import {run} from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import {makeRouterDriver} from 'cyclic-router';
import {makeHTTPDriver} from '@cycle/http';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {html} from 'snabbdom-jsx';
import switchPath from 'switch-path';
import classModule from 'snabbdom/modules/class';
import propsModule from 'snabbdom/modules/props';
import attrsModule from 'snabbdom/modules/attributes';
import eventlistenersModule from 'snabbdom/modules/eventlisteners';
import liveProps from 'components/live-props';
import styleModule from 'snabbdom/modules/style';
import heroModule from 'snabbdom/modules/hero';
import datasetModule from 'snabbdom/modules/dataset';
import provideRelogin from 'components/provide-relogin';
import preventDefaultDriver from 'drivers/prevent-default-driver';
import userDriver from 'drivers/user-driver';
import makeDexieDriver from 'drivers/dexie-driver';
import R from 'ramda';
import {routeConfig} from './routes';
import NotFound from 'pages/not-found';
import onlineDriver from 'drivers/online-driver';
import Course from 'models/course';

import {MainHTTPSource} from '@cycle/http/lib/MainHTTPSource';
const origSelect = MainHTTPSource.prototype.select;
MainHTTPSource.prototype.select = function() {
    const r$$ = origSelect.apply(this, arguments)
        .filter(() => true) // ilman tätä requestit lähtee tuplana?!
        .map(response$ => response$.replaceError(err => xs.of(err.response)).map(response => ({response, request: response$.request})));
    return r$$;
};

// indexedDB.deleteDatabase('fribatracker')
function main(sources) {
    const foo = Object.assign({'*': 'not-found'}, routeConfig);
    const page$ = sources.router.define(foo).map(function({path, value: page, location}) {
        return xs.fromPromise(new Promise(function(resolve, reject) {
            if (!location.state) {
                location.state = {};
            }
            location.state.navPath = page.navPath;
            const pageSources = Object.assign({}, sources, {
                router: sources.router.path(path),
                location$: xs.of(location)
            });
            // try {
                require.ensure([], function(require) {
                    const component = require('./pages/' + page.filepath).default(pageSources);
                    resolve(component);
                });
            // } catch (e) {
            //     resolve(NotFound(pageSources));
            // }
        }));
    }).flatten();

    return {
        router: page$.map(s => s.router ? s.router : xs.never()).flatten(),
        DOM: page$.map(s => s.DOM).flatten(),
        HTTP: page$.map(s => s.HTTP ? s.HTTP : xs.never()).flatten(),
        preventDefault: page$.map(s => s.preventDefault ? s.preventDefault : xs.never()).flatten(),
        user$: page$.map(s => s.user$ ? s.user$ : xs.never()).flatten().startWith(window.__INITIAL_DATA__.user),
        db: page$.map(s => s.db ? s.db : xs.never()).flatten(),
    }
}

const drivers = {
    DOM: makeDOMDriver('#app', {
        modules: [classModule, propsModule, liveProps, attrsModule, /*eventlistenersModule,*/ styleModule, /*heroModule,*/ datasetModule]
    }),
    router: makeRouterDriver(createBrowserHistory(), switchPath),
    HTTP: makeHTTPDriver(),
    preventDefault: preventDefaultDriver,
    user$: userDriver,
    online$: onlineDriver,
    db: makeDexieDriver('fribatracker',
        [
            {
                schema: {
                    courses: '++id'
                }
            },
        ],
        {
            classMap:{
                courses: Course
            }
        }
    )
};

run(provideRelogin(main), drivers);
