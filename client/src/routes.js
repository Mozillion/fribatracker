import R from 'ramda';

const routeTree = {
    home: '/',
    login: '/kirjaudu',
    // courses: '/radat',
    courses: {
        base: '/radat',
        add: '/lisaa',
        del: {
            base: '/del',
            me: '/me'
        }
    },
    players: '/pelaajat',
    results: '/tulokset'
};

// const routeConfig = function readRouteConfig(config, basePath) {
//     const routes = {};
//     for (const [basePage, config] of R.toPairs(config)) {
//         if (typeof config === 'string') {
//             routes[config] = `${basePath}/${basePage}/index.js`;
//         } else {
//             const subroutes = readRouteConfig(R.omit(['base'], config), `${basePath}/${basePage}`);
//             routes[config.base] = Object.assign({'/': `${basePath}/${basePage}/index.js`}, subroutes);
//         }
//     }
//     return routes;
// }(routeTree, '');
const routeConfig = function readRouteConfig(config, basePath) {
    const routes = {};
    for (const [basePage, config] of R.toPairs(config)) {
        if (typeof config === 'string') {
            routes[config] = {filepath: [...basePath, basePage, 'index.js'].join('/'), navPath: [...basePath, basePage].join('.')};
        } else {
            const subroutes = readRouteConfig(R.omit(['base'], config), [...basePath, basePage]);
            routes[config.base] = Object.assign({'/': {filepath: [...basePath, basePage, 'index.js'].join('/'), navPath: [...basePath, basePage].join('.')}}, subroutes);
        }
    }
    return routes;
}(routeTree, '');

const routes = function normalizeRoutes(config, base) {
    const routes = {};
    for (const [basePage, config] of R.toPairs(config)) {
        if (typeof config === 'string') {
            routes[basePage] = base + config;
        } else {
            const subtree = normalizeRoutes(R.omit(['base'], config), base + config.base);
            routes[basePage] = Object.assign({base: base + config.base}, subtree);
        }
    }
    return routes;
}(routeTree, '');

export {routeConfig};
export default routes;
