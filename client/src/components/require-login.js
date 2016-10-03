import mergeSinks from 'helpers/merge-sinks';
import xs from 'xstream';
import R from 'ramda';
import routes from 'routes';

function requireLogin(Component) {
    return sources => {
        const user$ = sources.user$.take(1);
        const sinks = {
            /**
             * Ohjataan loginiin, ja loginin jälkeen ohjataan tälle sivulle uudestaan
             */
            router: xs.combine(
                        sources.location$,
                        user$.filter(user => !user)
                    ).map(([location, user]) => ({pathname: routes.login, state: {redirect: location.pathname}}))
        };
        const cSinks = Component(sources);
        const guardedSinks = R.map(sink => user$.filter(user => user).mapTo(sink).flatten(), cSinks);
        return mergeSinks({}, sinks, guardedSinks);
    }
}

export default requireLogin;
