import xs from 'xstream';
import {html} from 'snabbdom-jsx';
import isolate from '@cycle/isolate';
import Pagination from 'components/ui/pagination';
import dropRepeats from 'xstream/extra/dropRepeats';
import styles from './datatable.scss';
import R from 'ramda';
import xsCombineObj from 'helpers/xs-combine-obj';
import debounce from 'xstream/extra/debounce';

function falsy(value) {
    return value === undefined || value === null || value === NaN || value === false;
}

function defaultRender() {
    return xs.of(({header, filters, body, pagination}) => (
        <div>
            <table className={styles.table}>
                <thead>
                    {filters}
                    {header}
                </thead>
                {body}
            </table>
            {pagination}
        </div>
    ));
}

function getCellContentStream(row, col) {
    let content = null;
    if (falsy(row[col.key])) {
        if (col.default) {
            content = col.default(row);
        } else {
            content = xs.of('');
        }
    } else {
        content = xs.of(row[col.key]);
    }
    return content;
}

function getFilterStream(columns$, valueOperator = R.identity) {
    return columns$
        .map(columns => {
            const hasFilters = R.find(R.has('filter'), columns) !== undefined;
            if (hasFilters) {
                return xsCombineObj(R.compose(
                    R.map(column => xsCombineObj(valueOperator(R.pick(['=','<','<=','>','>=','IN','LIKE'], column.filter)))),
                    R.indexBy(R.prop('key')),
                    R.filter(R.has('filter'))
                )(columns));
            }
            return xs.of(null);
        })
        .flatten()
}

function intent({DOM, columns$}) {
    const changeSorting$ = DOM.select(`.${styles.sortButton}`).events('click').map(event => {
        if (event.currentTarget.dataset.sortColumn !== 'null') {
            return {column: event.currentTarget.dataset.sortColumn, direction: event.currentTarget.dataset.sortDirection};
        }
        return null;
    });
    const changeFilter$ = getFilterStream(columns$, R.map(value$ => value$.compose(debounce(500)))).drop(1);

    return {
        changeSorting$,
        changeFilter$,
    };
}

function model({actions, DOM, HTTP, source$, columns$, pagination$, sort$: initialSort$}) {
    const sort$ = xs.merge(actions.changeSorting$, initialSort$).remember();

    const initialFilter$ = getFilterStream(columns$).take(1);
    const filter$ = xs.merge(actions.changeFilter$, initialFilter$);

    const requestForData$ = xs.create();
    const dataProvider$ = source$.map(source => {
        if (Array.isArray(source)) {
            return {
                totalItems$: xs.of(source.length),
                data$: requestForData$.map(({page, pageSize}) => {
                    const startIndex = (page - 1) * pageSize;
                    const endIndex = startIndex + pageSize;
                    return source.slice(startIndex, endIndex);
                })
            };
        } else if (typeof source === 'string') {
            const response$ = HTTP.select('data-fetch').flatten().map(({response}) => response.ok ? response.body : {data: [], totalItems: 0});
            return {
                totalItems$: response$.map(response => response.totalItems).startWith(0),
                data$: response$.map(response => response.data).startWith([]),
                HTTP: requestForData$.map(params => ({
                    url: source,
                    method: 'GET',
                    query: params,
                    category: 'data-fetch'
                }))
            };
        }
        throw new Error('Invalid source');
    }).remember();
    const pager = Pagination({
        totalItems$: dataProvider$.map(dp => dp.totalItems$).flatten(),
        props$: pagination$,
        DOM
    });
    requestForData$.imitate(dataProvider$.map(dp => {
        return xs.combine(pager.state$, sort$, filter$).map(([{page, pageSize}, sort, filter]) => {
            let x = {page, pageSize};
            if (sort) {
                x.sort = sort;
            }
            if (filter) {
                x.filter = filter;
            }
            return x;
        }).compose(dropRepeats());
    }).flatten());

    return {
        dataProvider$,
        pager,
        sort$
    };
}

function view({columns$, dataProvider$, pager, sort$, render$}) {
    const header$ = xs.combine(columns$, sort$).map(([columns, sort]) => {
        return (
            <tr>
                {columns.map(column => {
                    let sortButton = '';
                    if (column.sortable) {
                        let sortTo = {column: column.key, direction: 'ASC'};
                        let icon = 'fa fa-sort';
                        if (sort && sort.column == column.key) {
                            if (sort.direction == 'ASC') {
                                sortTo = {column: column.key, direction: 'DESC'};
                                icon = 'fa fa-sort-asc';
                            } else {
                                sortTo = {column: null, direction: null};
                                icon = 'fa fa-sort-desc';
                            }
                        }
                        sortButton = <button className={styles.sortButton} dataset-sortColumn={sortTo.column} dataset-sortDirection={sortTo.direction}><i className={icon}></i></button>
                    }
                    return <th>{falsy(column.header) ? '' : column.header}{sortButton}</th>;
                })}
            </tr>
        );
    });
    const filters$ = columns$
        .map(columns => {
            const hasFilters = R.find(R.has('filter'), columns) !== undefined;
            if (hasFilters) {
                return xs.combine(...columns.map(column => {
                    return column.filter ? column.filter.DOM : xs.of('');
                }));
            }
            return xs.of(null);
        })
        .flatten()
        .map(filters => filters ? <tr>{filters.map(filter => <th>{filter}</th>)}</tr> : '');

    const data$ = dataProvider$.map(dp => dp.data$).flatten();
    const body$ = xs.combine(columns$, data$).map(([columns, data]) => {
            let rows = [];
            data.forEach((row, rowIdx) => {
                rows.push([]);
                columns.forEach(col => {
                    rows[rowIdx].push(getCellContentStream(row, col));
                });
            });
            return rows;
        })
        .map(rows => xs.combine(...rows.map(columns => xs.combine(...columns))))
        .flatten()
        .map(rows => {
            return (
                <tbody>
                    {rows.map(row => <tr>{R.map(col => <td>{col}</td>, row)}</tr>)}
                </tbody>
            );
        });

    const vdom$ = xs.combine(header$, filters$, body$, pager.DOM, render$).map(([header, filters, body, pagination, render]) => render({header, filters, body, pagination}));
    return vdom$;
}

function DataTable({DOM, HTTP, columns$, source$, pagination$ = xs.of({}), sort$ = xs.of(null), render$ = defaultRender()}) {

    const actions = intent({DOM, columns$});
    const state = model({actions, source$, pagination$, columns$, sort$, DOM, HTTP});
    const vdom$ = view({columns$, render$, ...state});

    return {
        DOM: vdom$,
        preventDefault: state.pager.preventDefault,
        HTTP: state.dataProvider$.map(dataProvider => dataProvider.HTTP ? dataProvider.HTTP : xs.never()).flatten()
    }
}

export default sources => isolate(DataTable)(sources);
