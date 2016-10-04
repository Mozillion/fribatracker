import xs from 'xstream';
import fromEvent from 'xstream/extra/fromEvent';

function onlineDriver() {
    const origOpen = XMLHttpRequest.prototype.open;
    const XMLHttpRequestOffline$ = xs.create({
        start: function(listener) {
            XMLHttpRequest.prototype.open = function() {
                this.addEventListener('error', function() {
                    listener.next(false);
                });
                origOpen.apply(this, arguments);
            };
        },
        stop: function() {
            XMLHttpRequest.prototype.open = origOpen;
        }
    });

    const online$ = fromEvent(window, 'online');
    const offline$ = fromEvent(window, 'offline');
    return xs.merge(XMLHttpRequestOffline$, xs.merge(online$, offline$).map(event => navigator.onLine)).startWith(true);
}

export default onlineDriver;
