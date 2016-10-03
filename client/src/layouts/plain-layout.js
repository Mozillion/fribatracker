import {html} from 'snabbdom-jsx';
import mergeSinks from 'helpers/merge-sinks';

function PlainLayout(Page) {
    return sources => {
        const sinks = Page(sources);
        sinks.DOM = sinks.DOM.map(page => (
            <main>
                {page}
            </main>
        ));
        return sinks;
    }
}

export default PlainLayout;
