import {html} from 'snabbdom-jsx';
import fa from 'font-awesome/scss/font-awesome.scss';

function Icon({glyph, size, fixed, spin, classNames, props}, children) {
    let classes = [fa.fa, fa[`fa-${glyph}`]];
    if (size !== undefined) {
        classes.push(fa[`fa-${size}`]);
    }
    if (fixed) {
        classes.push(fa['fa-fw']);
    }
    if (spin) {
        classes.push(fa['fa-spin']);
    }

    if (classNames !== undefined) {
        classes = classes.concat(classNames);
    }
    return <i classNames={classes} {...props}></i>;
}

export default Icon;
