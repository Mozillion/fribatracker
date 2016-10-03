import xs from 'xstream';

function preventDefaultDriver(prevented$) {
    prevented$.addListener({
        next: event => {
            event.preventDefault();
            if (event.type === 'blur') {
                event.target.focus();
            }
        },
        error: () => {},
        complete: () => {},
    });
    return xs.empty();
}

export default preventDefaultDriver;
