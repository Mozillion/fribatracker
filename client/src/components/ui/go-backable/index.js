import xs from 'xstream';
import {html} from 'snabbdom-jsx';
import mergeSinks from 'helpers/merge-sinks';
import styles from './go-backable.scss';
import Icon from 'components/ui/icon';

function goBackable(Component) {
    return sources => {
        const component = Component(sources);
        const click$ = sources.DOM.select('a').events('click');
        return mergeSinks({
            DOM: component.DOM.map(component =>
                <div>
                    <div className={styles.goBack}>
                        <a href='#'><Icon glyph="long-arrow-left" /></a>
                    </div>
                    {component}
                </div>
            )
        }, component, {
            router: click$.mapTo({type: 'goBack'}),
            preventDefault: click$
        });
    }
}

export default goBackable;
