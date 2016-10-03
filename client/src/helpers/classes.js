class ClassManager
{
    constructor(props) {
        this.props = props;
        if (!this.props.class) {
            this.props.class = {};
        }
    }

    add(className) {
        this.props.class[className] = true;
        return this;
    }

    remove(className) {
        this.props.class[className] = false;
        return this;
    }

    normalize() {
        if ('className' in this.props) {
            this._normalize('className');
        }
        if ('classNames' in this.props) {
            this._normalize('classNames');
        }
        return this.props;
    }

    _normalize(key) {
        this.props[key].split(' ').forEach(className => {
            if (className != '') {
                this.props.class[className] = true;
            }
        });
        delete this.props[key];
    }
}

function classes(props) {
    return new ClassManager(props);
}

export default classes;
