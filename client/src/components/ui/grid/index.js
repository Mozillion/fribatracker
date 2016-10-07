import {html} from 'snabbdom-jsx';
import styles from './grid.scss';
import classes from 'helpers/classes';

function Layout({type, width, ...other}, children) {
    let props = Object.assign({}, other);
    switch (type) {
        case 'fixed':
            props = classes(props).add(styles.fluid).normalize();
            props.style = {'max-width': width};
            break;
        case 'fluid':
            props = classes(props).add(styles.fluid).normalize();
            break;
        case 'fluid-fixed':
           props = classes(props).add(styles.fluidFixed).normalize();
            break;
    }
    return <div {...props}>{children}</div>;
}

function Row(props, children) {
    const p = classes(props).add(styles.row).normalize();
    return <div {...p}>{children}</div>;
}

function Column(props, children) {
    const classNames = [styles[`column${props.col}`]];
    if (props.left !== undefined) {
        classNames.push(styles[`left${props.left}`]);
    }
    if (props.right !== undefined) {
        classNames.push(styles[`right${props.right}`]);
    }
    return <div classNames={classNames}>{children}</div>;
}

export {Layout, Row, Column};
