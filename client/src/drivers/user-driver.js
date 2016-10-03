import xs from 'xstream';

function userDriver(user$) {
    const out$ = user$.remember();
    out$.addListener({
        next: () => {},
        error: () => {},
        complete: () =>  {},
    });
    return out$;
}


export default userDriver;
