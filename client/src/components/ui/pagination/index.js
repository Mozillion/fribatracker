import xs from 'xstream';
import {html} from 'snabbdom-jsx';
import isolate from '@cycle/isolate';
import styles from './pagination.scss';
import R from 'ramda';

function PageButton({curPage, page}, children) {
    return <a dataset-page={page} class={{[styles.disabled]: curPage == page}}>{children}</a>;
}

/**
 * @param Stream options.totalItems$
 * @param Stream options.props$      {page, pageSize, maxShownPages, showFirst, showLast, showNextPrevious}
 */
function Pagination({DOM, totalItems$, props$}) {
    const defaultedProps$ = props$.map(props => Object.assign({
        page: 1,
        pageSize: 10,
        maxShownPages: 5,
        showFirst: true,
        showLast: true,
        showNextPrevious: true,
    }, props));
    const page$ = DOM.select(`a:not(.${styles.disabled})`).events('click').map(event => parseInt(event.currentTarget.dataset.page));
    const state$ = defaultedProps$.map(props => page$.map(page => Object.assign({}, props, {page})).startWith(props)).flatten().remember();

    const vdom$ = xs.combine(totalItems$, state$).map(([totalItems, {page, pageSize, maxShownPages, showFirst, showLast, showNextPrevious}]) => {
        const totalPages = Math.ceil(totalItems / pageSize);
        return (
            <ul className={styles.pagination} hidden={totalPages <= 1}>
                {showFirst ? <li key="first"><PageButton curPage={page} page={1}><i className="fa fa-step-backward"></i></PageButton></li> : ''}
                {showNextPrevious ? <li key="previous"><PageButton curPage={page} page={Math.max(1, page - 1)}><i className="fa fa-backward"></i></PageButton></li> : ''}
                {do {
                    const minPage = Math.max(1, page - Math.floor(maxShownPages / 2));
                    const maxPage = Math.min(totalPages, page + Math.ceil(maxShownPages / 2));
                    if (maxShownPages <= 0) {
                        '';
                    } else {
                        R.range(minPage, maxPage + 1).map(i => <li key={i} class={{[styles.currentPage]: page == i}}><PageButton curPage={page} page={i}>{i}</PageButton></li>);
                    }
                }}
                {showNextPrevious ? <li key="next"><PageButton curPage={page} page={Math.min(totalPages, page + 1)}><i className="fa fa-forward"></i></PageButton></li> : ''}
                {showLast ? <li key="last"><PageButton curPage={page} page={totalPages}><i className="fa fa-step-forward"></i></PageButton></li> : ''}
            </ul>
        );
    });
    return {
        DOM: vdom$,
        state$,
        preventDefault: DOM.select('a').events('click')
    }
}

export default sources => isolate(Pagination)(sources);
