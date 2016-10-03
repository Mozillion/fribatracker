import xs from 'xstream';
import {html} from 'snabbdom-jsx';
import isolate from '@cycle/isolate';
import styles from './dialog.scss';
import classes from 'helpers/classes';
import Button from 'components/ui/button';

function createComponents(DOM) {
    const closeButton = Button({
        DOM,
        props$: xs.of({
            content: <i className="fa fa-times"></i>,
            type: 'button',
            look: 'plain',
            className: styles.closeButton
        })
    });
    return {
        closeButton
    };
}

function intent(DOM, open$, closeWhen$, components) {
    const outsideClick$ = DOM.select(`.${styles.backdrop}`).events('click');
    const close$ = xs.merge(closeWhen$, components.closeButton.click$);
    return {
        open$,
        close$,
        outsideClick$
    };
}

function model({open$, close$, outsideClick$}, modal$) {
    const state = {
        open$:  xs.merge(
                    open$.mapTo(true),
                    close$.mapTo(false),
                    modal$.map(isModal => isModal ? xs.never() : outsideClick$.mapTo(false)).flatten()
                ).startWith(false),
        // shake$: xs.merge(
        //     DOM.select(`.${styles.dialog}`).events('animationend').mapTo(false),
        //     modal$.map(isModal => isModal ? outsideClick$.mapTo(true) : xs.never()).flatten()
        // ).startWith(false)
    };
    return state;
}

function view({open$}, props$, header$, content$, footer$, components) {
    return xs.combine(open$, props$, header$, content$, footer$, components.closeButton.DOM).map(([isOpen, props, header, content, footer, closeButton]) => {
        props = classes(props).add(styles.dialog).normalize();
        return (
            <div attrs-hidden={!isOpen}>
                <div className={styles.backdrop}></div>
                <div {...props} style-display={isOpen ? 'block' : 'none'}>
                    {do {
                        if (header) {
                            <header>{header}{closeButton}</header>;
                        } else {
                            '';
                        }
                    }}
                    <main>{content}</main>
                    {do {
                        if (footer) {
                            footer = Array.isArray(footer) ? footer : [footer];
                            <footer>
                                <ul>
                                    {footer.map(elem => <li>{elem}</li>)}
                                </ul>
                            </footer>
                        } else {
                            ''
                        }
                    }}
                </div>
            </div>
        );
    });
}

function Dialog({DOM, props$ = xs.of({}), open$, close$ = xs.never(), modal$ = xs.of(false), header$ = xs.of(false), content$, footer$ = xs.of(false)}) {
    const components = createComponents(DOM);
    const actions = intent(DOM, open$, close$, components);
    const state = model(actions, modal$);
    const vdom$ = view(state, props$, header$, content$, footer$, components);
    return {
        DOM: vdom$,
    }
}
export default sources => isolate(Dialog)(sources);
