import Dexie from 'dexie';
import xs from 'xstream';


        // db: xs.of({
        //     category: 'query',
        //     table: 'courses',
        //     get: 1
        // }),
        // db: xs.of({
        //     category: 'query',
        //     table: 'courses',
        //     add: {name: 'foo', location: 'goo'}
        // }),
        // db: xs.of({
        //     category: 'query',
        //     table: 'courses',
        //     update: {id: 4, name: 'foo', location: 'goo'}
        // }),
        // db: xs.of({
        //     category: 'query',
        //     table: 'courses',
        //     delete: 5
        // }),
        // db: xs.of({
        //     category: 'query',
        //     select: 'count',
        //     table: 'courses',
        //     where: ':id',
        //     above: 1,
        //     or: ':id',
        //     below: 5,
        //     and: course => course.location == 'Mukkula',
        //     filter: course => course.location == 'Mukkula',
        //     offset: 1,
        //     limit: 2,
        //     sortBy: ':id DESC',
        //     // sortBy: ':id'
        // })

function eventProducer(obj, event) {
    return {
        start: function(listener) {
            obj.on(event, function() {
                listener.next(obj, ...arguments);
            });
        },
        stop: () => {}
    }
}

function makeDexieDriver(dbName, versions, config = {}) {
    const db = new Dexie(dbName, {autoOpen: false});
    versions.forEach(({schema, upgrade}, index) => {
        const version = db.version(index + 1).stores(schema);
        if (typeof upgrade == 'function') {
            version.upgrade(upgrade);
        }
    });
    db.open().catch(function(err) {
        console.error('Failed to open db: ' + (err.stack || err));
    });
    if (config.populate) {
        db.on('populate', function() {
            config.populate(db);
        });
    }
    return function(query$) {
        const stream$$ = query$.map(query => {
            const params = [
                'get',
                'add',
                'put',
                'delete',
                'where',
                'or',
                'and',
                'filter',
                'offset',
                'limit',
                'orderBy',
                'sortBy',
            ];
            let q = db[query.table];
            params.forEach(method => {
                /**
                 * TODO: handle
                 *     sortby ':id DESC'
                 *     between [1,2]
                 */
                if (query.hasOwnProperty(method)) {
                    if (method == 'where' || method == 'or') {
                        q = q[method].call(q, query[method].index);
                        const conditions = ['above','below'];
                        conditions.forEach(cond => {
                            if (query[method].hasOwnProperty(cond)) {
                                q = q[cond].call(q, query[method][cond]);
                            }
                        });
                    } else {
                        q = q[method].call(q, query[method]);
                    }
                }
            });
            if (query.hasOwnProperty('select')) {
                q = q[query.select].call(q);
            }
            if (!(q instanceof Dexie.Promise)) {
                q = q.toArray();
            }

            const out$ = xs.fromPromise(q);
            out$.category = query.category;
            return out$;
        });
        stream$$.addListener({
            next: () => {},
            error: (e) => {console.log(e)},
            complete: () => {}
        });
        return Object.assign({}, {
            events: event => xs.create(eventProducer(db, event)),
            select: category => category === undefined ? stream$$ : stream$$.filter(result$ => result$.category === category)
        });
    };
}

export default makeDexieDriver;
