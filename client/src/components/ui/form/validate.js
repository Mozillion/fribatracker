import R from 'ramda';
import validator from 'validator';

function validate(value, validators) {
    value = R.trim(typeof value == 'string' ? value : R.toString(value));
    for (let i = 0; i < validators.length; ++i) {
        const type = validators[i][0];
        const params = validators[i].length > 1 ? validators[i][1] : null;
        if (typeof type == 'function') {
            return type(value);
        } else {
            switch (type) {
                case 'required':
                    if (!validator.isLength(value, {min: 1})) {
                        return 'Pakollinen';
                    }
                    break;
                case 'length':
                    if (!validator.isLength(value, params)) {
                        return `Kirjoita ${params.min} - ${params.max} merkkiä`;
                    }
                    break;
            }
        }
    }
    return true;
}
export default validate;
