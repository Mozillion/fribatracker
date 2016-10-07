import R from 'ramda';
import validator from 'validator';

const capitalize = R.compose(
    R.join(''),
    R.over(R.lensIndex(0), R.toUpper)
);

function minMaxError(params, {onlyMin, onlyMax, both}) {
    if (params.min === undefined) {
        return onlyMax;
    }
    if (params.max === undefined) {
        return onlyMin;
    }
    return both;
}

function validate(value, validators) {
    value = R.trim(typeof value == 'string' ? value : R.toString(value));
    const required = R.find(R.equals(['required']), validators) !== undefined;
    if (validator.isLength(value, {min: 1})) {
        for (let i = 0; i < validators.length; ++i) {
            const type = validators[i][0];
            const params = validators[i].length > 1 ? validators[i][1] : {};
            if (typeof type == 'function') {
                return type(value);
            } else {
                switch (type) {
                    case 'length':
                        if (!validator.isLength(value, params)) {
                            return minMaxError(params, {
                                onlyMin: `Kirjoita vähintään ${params.min} merkkiä`,
                                onlyMax: `Kirjoita enintään ${params.max} merkkiä`,
                                both: `Kirjoita ${params.min} - ${params.max} merkkiä`
                            });
                        }
                        break;
                    case 'int':
                    case 'float':
                        if (!validator['is' + capitalize(type)](value, params)) {
                            return minMaxError(params, {
                                onlyMin: `Arvon tulee olla vähintään ${params.min}`,
                                onlyMax: `Arvon tulee olla enintään ${params.max}`,
                                both: `Arvon tulee olla välillä ${params.min} - ${params.max}`
                            });
                        }
                        break;
                }
            }
        }
        return true;
    }
    return required ? 'Pakollinen' : true;
}
export default validate;
