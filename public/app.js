webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _xstreamRun = __webpack_require__(115);
	
	var _dom = __webpack_require__(102);
	
	var _cyclicRouter = __webpack_require__(139);
	
	var _http = __webpack_require__(113);
	
	var _createBrowserHistory = __webpack_require__(192);
	
	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _switchPath = __webpack_require__(224);
	
	var _switchPath2 = _interopRequireDefault(_switchPath);
	
	var _class = __webpack_require__(73);
	
	var _class2 = _interopRequireDefault(_class);
	
	var _props = __webpack_require__(76);
	
	var _props2 = _interopRequireDefault(_props);
	
	var _attributes = __webpack_require__(72);
	
	var _attributes2 = _interopRequireDefault(_attributes);
	
	var _eventlisteners = __webpack_require__(74);
	
	var _eventlisteners2 = _interopRequireDefault(_eventlisteners);
	
	var _liveProps = __webpack_require__(117);
	
	var _liveProps2 = _interopRequireDefault(_liveProps);
	
	var _style = __webpack_require__(77);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _hero = __webpack_require__(75);
	
	var _hero2 = _interopRequireDefault(_hero);
	
	var _dataset = __webpack_require__(218);
	
	var _dataset2 = _interopRequireDefault(_dataset);
	
	var _provideRelogin = __webpack_require__(118);
	
	var _provideRelogin2 = _interopRequireDefault(_provideRelogin);
	
	var _preventDefaultDriver = __webpack_require__(133);
	
	var _preventDefaultDriver2 = _interopRequireDefault(_preventDefaultDriver);
	
	var _userDriver = __webpack_require__(134);
	
	var _userDriver2 = _interopRequireDefault(_userDriver);
	
	var _dexieDriver = __webpack_require__(132);
	
	var _dexieDriver2 = _interopRequireDefault(_dexieDriver);
	
	var _ramda = __webpack_require__(5);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	var _routes = __webpack_require__(12);
	
	var _notFound = __webpack_require__(27);
	
	var _notFound2 = _interopRequireDefault(_notFound);
	
	var _MainHTTPSource = __webpack_require__(45);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var origSelect = _MainHTTPSource.MainHTTPSource.prototype.select;
	_MainHTTPSource.MainHTTPSource.prototype.select = function () {
	    var r$$ = origSelect.apply(this, arguments).filter(function () {
	        return true;
	    }) // ilman tätä requestit lähtee tuplana?!
	    .map(function (response$) {
	        return response$.replaceError(function (err) {
	            return _xstream2.default.of(err.response);
	        }).map(function (response) {
	            return { response: response, request: response$.request };
	        });
	    });
	    return r$$;
	};
	
	// indexedDB.deleteDatabase('fribatracker')
	function main(sources) {
	
	    // const s = sources.db.select('query').flatten().debug();
	    // s.addListener({
	    //     next: () => {},
	    //     error: () => {},
	    //     complete: () => {}
	    // });
	
	    var foo = Object.assign({ '*': 'not-found' }, _routes.routeConfig);
	    var page$ = sources.router.define(foo).map(function (_ref) {
	        var path = _ref.path;
	        var page = _ref.value;
	        var location = _ref.location;
	
	        return _xstream2.default.fromPromise(new Promise(function (resolve, reject) {
	            if (!location.state) {
	                location.state = {};
	            }
	            location.state.navPath = page.navPath;
	            var pageSources = Object.assign({}, sources, {
	                router: sources.router.path(path),
	                location$: _xstream2.default.of(location)
	            });
	            // try {
	            __webpack_require__.e/* nsure */(1, function (require) {
	                var component = __webpack_require__(277)("./" + page.filepath).default(pageSources);
	                resolve(component);
	            });
	            // } catch (e) {
	            //     resolve(NotFound(pageSources));
	            // }
	        }));
	    }).flatten();
	
	    return {
	        router: page$.map(function (s) {
	            return s.router ? s.router : _xstream2.default.never();
	        }).flatten(),
	        DOM: page$.map(function (s) {
	            return s.DOM;
	        }).flatten(),
	        HTTP: page$.map(function (s) {
	            return s.HTTP ? s.HTTP : _xstream2.default.never();
	        }).flatten(),
	        preventDefault: page$.map(function (s) {
	            return s.preventDefault ? s.preventDefault : _xstream2.default.never();
	        }).flatten(),
	        user$: page$.map(function (s) {
	            return s.user$ ? s.user$ : _xstream2.default.never();
	        }).flatten().startWith(window.__INITIAL_DATA__.user)
	    };
	}
	
	var drivers = {
	    DOM: (0, _dom.makeDOMDriver)('#app', {
	        modules: [_class2.default, _props2.default, _liveProps2.default, _attributes2.default, /*eventlistenersModule,*/_style2.default, /*heroModule,*/_dataset2.default]
	    }),
	    router: (0, _cyclicRouter.makeRouterDriver)((0, _createBrowserHistory2.default)(), _switchPath2.default),
	    HTTP: (0, _http.makeHTTPDriver)(),
	    preventDefault: _preventDefaultDriver2.default,
	    user$: _userDriver2.default,
	    db: (0, _dexieDriver2.default)('fribatracker', [{
	        schema: {
	            courses: '++id'
	        }
	    }])
	};
	
	(0, _xstreamRun.run)((0, _provideRelogin2.default)(main), drivers);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_1 = __webpack_require__(2);
	var XStreamAdapter = {
	    adapt: function (originStream, originStreamSubscribe) {
	        if (XStreamAdapter.isValidStream(originStream)) {
	            return originStream;
	        }
	        ;
	        var dispose = null;
	        return xstream_1.default.create({
	            start: function (out) {
	                var observer = out;
	                dispose = originStreamSubscribe(originStream, observer);
	            },
	            stop: function () {
	                if (typeof dispose === 'function') {
	                    dispose();
	                }
	            }
	        });
	    },
	    makeSubject: function () {
	        var stream = xstream_1.default.create();
	        var observer = {
	            next: function (x) { stream.shamefullySendNext(x); },
	            error: function (err) { stream.shamefullySendError(err); },
	            complete: function () { stream.shamefullySendComplete(); }
	        };
	        return { observer: observer, stream: stream };
	    },
	    remember: function (stream) {
	        return stream.remember();
	    },
	    isValidStream: function (stream) {
	        return (typeof stream.addListener === 'function' &&
	            typeof stream.shamefullySendNext === 'function');
	    },
	    streamSubscribe: function (stream, observer) {
	        stream.addListener(observer);
	        return function () { return stream.removeListener(observer); };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = XStreamAdapter;
	//# sourceMappingURL=index.js.map

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (value) {
		if (value == null) throw new TypeError("Cannot use null or undefined");
		return value;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var assign        = __webpack_require__(29)
	  , normalizeOpts = __webpack_require__(162)
	  , isCallable    = __webpack_require__(156)
	  , contains      = __webpack_require__(57)
	
	  , d;
	
	d = module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if ((arguments.length < 2) || (typeof dscr !== 'string')) {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (dscr == null) {
			c = w = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
			w = contains.call(dscr, 'w');
		}
	
		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};
	
	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== 'string') {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (get == null) {
			get = undefined;
		} else if (!isCallable(get)) {
			options = get;
			get = set = undefined;
		} else if (set == null) {
			set = undefined;
		} else if (!isCallable(set)) {
			options = set;
			set = undefined;
		}
		if (dscr == null) {
			c = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
		}
	
		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (fn) {
		if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
		return fn;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _ramda = __webpack_require__(5);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	var _validate = __webpack_require__(128);
	
	var _validate2 = _interopRequireDefault(_validate);
	
	var _form = __webpack_require__(16);
	
	var _form2 = _interopRequireDefault(_form);
	
	var _classes = __webpack_require__(14);
	
	var _classes2 = _interopRequireDefault(_classes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function FormField(Component) {
	    return function (_ref) {
	        var _ref$validators$ = _ref.validators$;
	        var validators$ = _ref$validators$ === undefined ? _xstream2.default.of([]) : _ref$validators$;
	        var _ref$label$ = _ref.label$;
	        var label$ = _ref$label$ === undefined ? _xstream2.default.of(false) : _ref$label$;
	        var _ref$layout$ = _ref.layout$;
	        var layout$ = _ref$layout$ === undefined ? _xstream2.default.of('grid') : _ref$layout$;
	        var _ref$append$ = _ref.append$;
	        var append$ = _ref$append$ === undefined ? _xstream2.default.of(false) : _ref$append$;
	        var _ref$prepend$ = _ref.prepend$;
	        var prepend$ = _ref$prepend$ === undefined ? _xstream2.default.of(false) : _ref$prepend$;
	        var _ref$submitTried$ = _ref.submitTried$;
	        var submitTried$ = _ref$submitTried$ === undefined ? _xstream2.default.of(false) : _ref$submitTried$;
	
	        var sources = _objectWithoutProperties(_ref, ['validators$', 'label$', 'layout$', 'append$', 'prepend$', 'submitTried$']);
	
	        sources.props$ = sources.props$ || _xstream2.default.of({});
	        var sinks = Component(sources);
	        var error$ = _xstream2.default.combine(sinks.value$, validators$).map(function (_ref2) {
	            var _ref3 = _slicedToArray(_ref2, 2);
	
	            var value = _ref3[0];
	            var validators = _ref3[1];
	
	            var ok = (0, _validate2.default)(value, validators);
	            if (ok === true) {
	                return false;
	            }
	            return ok;
	        }).remember();
	        var dirty$ = sinks.value$.drop(1).take(1).mapTo(true).startWith(false);
	        sinks.DOM = _xstream2.default.combine(sinks.DOM, layout$, label$, error$, submitTried$, validators$, dirty$, append$, prepend$).map(function (_ref4) {
	            var _ref5 = _slicedToArray(_ref4, 9);
	
	            var input = _ref5[0];
	            var layout = _ref5[1];
	            var label = _ref5[2];
	            var error = _ref5[3];
	            var submitTried = _ref5[4];
	            var validators = _ref5[5];
	            var dirty = _ref5[6];
	            var append = _ref5[7];
	            var prepend = _ref5[8];
	
	            var labelProps = {};
	            var containerProps = {};
	            var showError = error && (dirty || submitTried);
	            input.data.props = _ramda2.default.pathOr({}, ['data', 'props'], input);
	            if (showError) {
	                if (input.sel !== 'span') {
	                    input.data.props = (0, _classes2.default)(input.data.props).add(_form2.default.error).normalize();
	                }
	                labelProps = (0, _classes2.default)(labelProps).add(_form2.default.error).normalize();
	            }
	            var required = '';
	            if (_ramda2.default.find(function (validator) {
	                return validator[0] == 'required';
	            }, validators) !== undefined) {
	                required = (0, _snabbdomJsx.html)(
	                    'span',
	                    { className: _form2.default.required },
	                    '*'
	                );
	            }
	
	            var appendElem = append === false ? '' : (0, _snabbdomJsx.html)(
	                'span',
	                { className: _form2.default.append },
	                append
	            );
	            if (append !== false) {
	                containerProps = (0, _classes2.default)(containerProps).add(_form2.default.appendGroup).normalize();
	            }
	            var prependElem = prepend === false ? '' : (0, _snabbdomJsx.html)(
	                'span',
	                { className: _form2.default.prepend },
	                prepend
	            );
	            if (prepend !== false) {
	                containerProps = (0, _classes2.default)(containerProps).add(_form2.default.prependGroup).normalize();
	            }
	            var vdom = null;
	            switch (layout) {
	                case 'grid':
	                    containerProps = (0, _classes2.default)(containerProps).add(_form2.default.gridGroup).normalize();
	                    vdom = (0, _snabbdomJsx.html)(
	                        'div',
	                        containerProps,
	                        label ? (0, _snabbdomJsx.html)(
	                            'label',
	                            labelProps,
	                            label,
	                            ' ',
	                            required
	                        ) : '',
	                        (0, _snabbdomJsx.html)(
	                            'div',
	                            { className: _form2.default.inputGroup },
	                            prependElem,
	                            input,
	                            appendElem,
	                            showError ? (0, _snabbdomJsx.html)(
	                                'span',
	                                { className: _form2.default.error },
	                                error
	                            ) : ''
	                        )
	                    );
	                    break;
	
	                case 'horizontal':
	                    containerProps = (0, _classes2.default)(containerProps).add(_form2.default.horizontalGroup).normalize();
	                    vdom = (0, _snabbdomJsx.html)(
	                        'div',
	                        containerProps,
	                        label ? (0, _snabbdomJsx.html)(
	                            'label',
	                            labelProps,
	                            label,
	                            ' ',
	                            required
	                        ) : '',
	                        prependElem,
	                        input,
	                        appendElem,
	                        showError ? (0, _snabbdomJsx.html)(
	                            'span',
	                            { className: _form2.default.error },
	                            error
	                        ) : ''
	                    );
	                    break;
	
	                case 'none':
	                    vdom = (0, _snabbdomJsx.html)(
	                        'span',
	                        containerProps,
	                        label ? (0, _snabbdomJsx.html)(
	                            'label',
	                            labelProps,
	                            label,
	                            ' ',
	                            required
	                        ) : '',
	                        prependElem,
	                        input,
	                        appendElem,
	                        showError ? (0, _snabbdomJsx.html)(
	                            'span',
	                            { className: _form2.default.error },
	                            error
	                        ) : ''
	                    );
	                    break;
	
	                default:
	                    // vertical
	                    containerProps = (0, _classes2.default)(containerProps).add(_form2.default.group).normalize();
	                    vdom = (0, _snabbdomJsx.html)(
	                        'div',
	                        containerProps,
	                        label ? (0, _snabbdomJsx.html)(
	                            'label',
	                            labelProps,
	                            label,
	                            ' ',
	                            required,
	                            showError ? (0, _snabbdomJsx.html)(
	                                'span',
	                                { className: _form2.default.error },
	                                error
	                            ) : ''
	                        ) : '',
	                        prependElem,
	                        input,
	                        appendElem,
	                        showError && !label ? (0, _snabbdomJsx.html)(
	                            'span',
	                            { className: _form2.default.error },
	                            error
	                        ) : ''
	                    );
	
	            }
	            return vdom;
	        });
	        sinks.error$ = error$;
	        return sinks;
	    };
	}
	exports.default = FormField;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _ramda = __webpack_require__(5);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function mergeSinks(customSinks) {
	    var toMerge = {};
	
	    for (var _len = arguments.length, components = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        components[_key - 1] = arguments[_key];
	    }
	
	    components.forEach(function (component) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = _ramda2.default.toPairs(component)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var _step$value = _slicedToArray(_step.value, 2);
	
	                var key = _step$value[0];
	                var stream = _step$value[1];
	
	                if (!customSinks.hasOwnProperty(key)) {
	                    if (!toMerge.hasOwnProperty(key)) {
	                        toMerge[key] = [];
	                    }
	                    toMerge[key].push(stream);
	                }
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	    });
	    var merged = _ramda2.default.map(function (streams, key) {
	        if (streams.length > 1) {
	            return _xstream2.default.merge.apply(_xstream2.default, _toConsumableArray(streams));
	        }
	        return streams[0];
	    }, toMerge);
	    return Object.assign({}, customSinks, merged);
	}
	
	exports.default = mergeSinks;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.routeConfig = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _ramda = __webpack_require__(5);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var routeTree = {
	    home: '/',
	    login: '/kirjaudu',
	    // courses: '/radat',
	    courses: {
	        base: '/radat',
	        add: '/lisaa',
	        del: {
	            base: '/del',
	            me: '/me'
	        }
	    },
	    players: '/pelaajat',
	    results: '/tulokset'
	};
	
	// const routeConfig = function readRouteConfig(config, basePath) {
	//     const routes = {};
	//     for (const [basePage, config] of R.toPairs(config)) {
	//         if (typeof config === 'string') {
	//             routes[config] = `${basePath}/${basePage}/index.js`;
	//         } else {
	//             const subroutes = readRouteConfig(R.omit(['base'], config), `${basePath}/${basePage}`);
	//             routes[config.base] = Object.assign({'/': `${basePath}/${basePage}/index.js`}, subroutes);
	//         }
	//     }
	//     return routes;
	// }(routeTree, '');
	var routeConfig = function readRouteConfig(config, basePath) {
	    var routes = {};
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        for (var _iterator = _ramda2.default.toPairs(config)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _step$value = _slicedToArray(_step.value, 2);
	
	            var basePage = _step$value[0];
	            var _config = _step$value[1];
	
	            if (typeof _config === 'string') {
	                routes[_config] = { filepath: [].concat(_toConsumableArray(basePath), [basePage, 'index.js']).join('/'), navPath: [].concat(_toConsumableArray(basePath), [basePage]).join('.') };
	            } else {
	                var subroutes = readRouteConfig(_ramda2.default.omit(['base'], _config), [].concat(_toConsumableArray(basePath), [basePage]));
	                routes[_config.base] = Object.assign({ '/': { filepath: [].concat(_toConsumableArray(basePath), [basePage, 'index.js']).join('/'), navPath: [].concat(_toConsumableArray(basePath), [basePage]).join('.') } }, subroutes);
	            }
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	
	    return routes;
	}(routeTree, '');
	
	var routes = function normalizeRoutes(config, base) {
	    var routes = {};
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;
	
	    try {
	        for (var _iterator2 = _ramda2.default.toPairs(config)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var _step2$value = _slicedToArray(_step2.value, 2);
	
	            var basePage = _step2$value[0];
	            var _config2 = _step2$value[1];
	
	            if (typeof _config2 === 'string') {
	                routes[basePage] = base + _config2;
	            } else {
	                var subtree = normalizeRoutes(_ramda2.default.omit(['base'], _config2), base + _config2.base);
	                routes[basePage] = Object.assign({ base: base + _config2.base }, subtree);
	            }
	        }
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
	    }
	
	    return routes;
	}(routeTree, '');
	
	exports.routeConfig = routeConfig;
	exports.default = routes;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	function isElement(obj) {
	    return typeof HTMLElement === "object" ?
	        obj instanceof HTMLElement || obj instanceof DocumentFragment :
	        obj && typeof obj === "object" && obj !== null &&
	            (obj.nodeType === 1 || obj.nodeType === 11) &&
	            typeof obj.nodeName === "string";
	}
	exports.SCOPE_PREFIX = "$$CYCLEDOM$$-";
	function getElement(selectors) {
	    var domElement = (typeof selectors === "string" ?
	        document.querySelector(selectors) :
	        selectors);
	    if (typeof selectors === "string" && domElement === null) {
	        throw new Error("Cannot render into unknown element `" + selectors + "`");
	    }
	    else if (!isElement(domElement)) {
	        throw new Error("Given container is not a DOM element neither a " +
	            "selector string.");
	    }
	    return domElement;
	}
	exports.getElement = getElement;
	function getScope(namespace) {
	    return namespace
	        .filter(function (c) { return c.indexOf(exports.SCOPE_PREFIX) > -1; })
	        .slice(-1) // only need the latest, most specific, isolated boundary
	        .join("");
	}
	exports.getScope = getScope;
	function getSelectors(namespace) {
	    return namespace.filter(function (c) { return c.indexOf(exports.SCOPE_PREFIX) === -1; }).join(" ");
	}
	exports.getSelectors = getSelectors;
	//# sourceMappingURL=utils.js.map

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ClassManager = function () {
	    function ClassManager(props) {
	        _classCallCheck(this, ClassManager);
	
	        this.props = props;
	        if (!this.props.class) {
	            this.props.class = {};
	        }
	    }
	
	    _createClass(ClassManager, [{
	        key: 'add',
	        value: function add(className) {
	            this.props.class[className] = true;
	            return this;
	        }
	    }, {
	        key: 'remove',
	        value: function remove(className) {
	            this.props.class[className] = false;
	            return this;
	        }
	    }, {
	        key: 'normalize',
	        value: function normalize() {
	            if ('className' in this.props) {
	                this._normalize('className');
	            }
	            if ('classNames' in this.props) {
	                this._normalize('classNames');
	            }
	            return this.props;
	        }
	    }, {
	        key: '_normalize',
	        value: function _normalize(key) {
	            var _this = this;
	
	            this.props[key].split(' ').forEach(function (className) {
	                if (className != '') {
	                    _this.props.class[className] = true;
	                }
	            });
	            delete this.props[key];
	        }
	    }]);
	
	    return ClassManager;
	}();
	
	function classes(props) {
	    return new ClassManager(props);
	}
	
	exports.default = classes;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(176)() ? Symbol : __webpack_require__(178);


/***/ },
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"menu-item":"menu-item-3pJT2lXm4UWneCQc8UlCvJ","open":"open-kLlA_-iWTUzuIZ87frr0B","button-dropdown":"button-dropdown-3qZ_QOm2VptlZ7Ymo4QDEn","dismiss-modal":"dismiss-modal-1R5txxUJ4_v49YIGKVGc6z","errors":"errors-1I-j5cm9lA_ho-3_1AmXFo","warnings":"warnings-3NG3FSsgkUze5LbdbMpI9S","successes":"successes-pJr0Bcw0rpaFoH1u5m4s6","error":"error-1awBHoz0F0gbjzEqfKHC40","warning":"warning-3-aLtOR2QIh9MZbH1pej9K","success":"success-2xvzicZs6aDHkEVnZuiOGq","growl_container":"growl_container-3mAINYGx3g2gWdRntPSMGV","growl":"growl-1CcfCRLU3bs3qGFUxl0vb3","show":"show-z1TFnQmHM1uFQgCB52WxK","hide":"hide-1U4_65pRvyPdYYIwiIqmAs","fadeInDown":"fadeInDown-1Ewo_dBgj-yMQx94Z9CTtt","status_bar":"status_bar-3QiO7ZDo8gbdAwmPy_Umm6","status_bar-status":"status_bar-status-3gcVhQZF54MTJiOiDefzZk","tooltip":"tooltip-3-VVniBcd4Koo0kVwnLpeL","tooltip-bottom":"tooltip-bottom-28WVBvtl8WoeGYIrfkvMCD","tooltip-left":"tooltip-left-3VhEXWx2XiuGvabLcbknuq","tooltip-right":"tooltip-right-1DrK2TplnCQuYexlxFE5MK","tooltip-red":"tooltip-red-25eb4z9Gm405VpDstvUOVa","tooltip-orange":"tooltip-orange-1M0nN-ndbWxbDhY4nn-H1f","tooltip-yellow":"tooltip-yellow-2JdvtQ0YqgAYOAtxJO7vqQ","tooltip-green":"tooltip-green-KBixrt0ITFa0kZ-_jPt63","tooltip-blue":"tooltip-blue-15BGVwCvi8cRQBOgm3kWPC","tooltip-violet":"tooltip-violet-3YcezerVg-5kv4FdKI_UvS","tooltip-primary":"tooltip-primary-U6cjnJIxADEdYJbgO2Srh","tooltip-secondary":"tooltip-secondary-2fRgrErlVspInyIaoZp4jk","form":"form-6lB0uTBOpSoKn35HUMeW6","group":"group-3LOWnpa10tmo1HUNS8RTdj","horizontalGroup":"horizontalGroup-2s00mKfmbY8wR-9YNGIesP","gridGroup":"gridGroup-AW1ehtLuwORFV_8OH8QQ1","radio":"radio-2V-R1SexJRiufhczWfeqLM","inputGroup":"inputGroup-1fteNCEj2hEOEaNwsYU3GW","inlineGroup":"inlineGroup-2c_nL_4knQfUz0ZkP9JhPO","horizontal":"horizontal-3TT5i9HD8uUcAynN0RoUwc","grid":"grid-pYi66ykHicNaPvQVIdGrq","checkbox":"checkbox-2x7n-VzYi37TGsh-246Wj0","actions":"actions-60_h4Lf_y4gRghtdjd7Sz","required":"required-EUqE739MpR8_-xnJMpmaQ","appendGroup":"appendGroup-9CPig_JCmjI-7uWWqJSrr","append":"append-ChiwS8e9Kuc5VwvCGFpnB","prependGroup":"prependGroup-3kx10WGUWJgPDP-0_cymwI","prepend":"prepend-2PAjxOrm5Vwa8lXc7oE_Ht"};

/***/ },
/* 17 */,
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _button = __webpack_require__(182);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _classes = __webpack_require__(14);
	
	var _classes2 = _interopRequireDefault(_classes);
	
	var _isolate = __webpack_require__(4);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function Button(_ref) {
	    var DOM = _ref.DOM;
	    var _ref$submitting$ = _ref.submitting$;
	    var submitting$ = _ref$submitting$ === undefined ? _xstream2.default.of(false) : _ref$submitting$;
	    var props$ = _ref.props$;
	
	
	    var vdom$ = _xstream2.default.combine(props$, submitting$).map(function (_ref2) {
	        var _ref3 = _slicedToArray(_ref2, 2);
	
	        var props = _ref3[0];
	        var submitting = _ref3[1];
	        var content = props.content;
	        var look = props.look;
	
	        var others = _objectWithoutProperties(props, ['content', 'look']);
	
	        if (look) {
	            others = (0, _classes2.default)(others).add(_button2.default.default).add(_button2.default[look]).normalize();
	        }
	        var spinner = '';
	        if (props.type == 'submit' && submitting) {
	            spinner = (0, _snabbdomJsx.html)('i', { className: 'fa fa-circle-o-notch fa-spin' });
	            others.disabled = true;
	        }
	        if (others.disabled === undefined) {
	            others.disabled = false;
	        }
	        return (0, _snabbdomJsx.html)(
	            'button',
	            others,
	            content,
	            ' ',
	            spinner
	        );
	    });
	    return {
	        DOM: vdom$,
	        click$: DOM.select('button').events('click')
	    };
	}
	
	exports.default = function (sources) {
	    return (0, _isolate2.default)(Button)(sources);
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _mainLayout = __webpack_require__(188);
	
	var _mainLayout2 = _interopRequireDefault(_mainLayout);
	
	var _mergeSinks = __webpack_require__(11);
	
	var _mergeSinks2 = _interopRequireDefault(_mergeSinks);
	
	var _routes = __webpack_require__(12);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _navbar = __webpack_require__(130);
	
	var _navbar2 = _interopRequireDefault(_navbar);
	
	var _grid = __webpack_require__(48);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function MainLayout(Page) {
	    return function (sources) {
	        var navbar = (0, _navbar2.default)({
	            DOM: sources.DOM,
	            location$: sources.location$,
	            primaryLinks$: _xstream2.default.of([{ title: 'Etusivu', url: _routes2.default.home }, { title: 'Radat', url: _routes2.default.courses.base }, { title: 'Pelaajat', url: _routes2.default.players }, { title: 'Etusivu', url: _routes2.default.results }]),
	            secondaryLinks$: sources.user$.map(function (user) {
	                return [{ title: 'Kirjaudu ulos ' + (user ? user.username : 'Vieras'), url: '/logout' }];
	            })
	        });
	
	        var changePage$ = navbar.navigate$.filter(function (link) {
	            return link.url != '/logout';
	        }).map(function (link) {
	            return link.url;
	        });
	        var logout$ = sources.HTTP.select('logout').flatten().filter(function (_ref) {
	            var response = _ref.response;
	            return response.ok;
	        }).mapTo(_routes2.default.login);
	        var router = _xstream2.default.merge(logout$, changePage$);
	
	        var page = Page(sources);
	        var vdom$ = _xstream2.default.combine(navbar.DOM, page.DOM).map(function (_ref2) {
	            var _ref3 = _slicedToArray(_ref2, 2);
	
	            var navbar = _ref3[0];
	            var page = _ref3[1];
	            return (0, _snabbdomJsx.html)(
	                _grid.Layout,
	                { type: 'fluid-fixed', className: _mainLayout2.default.layout },
	                (0, _snabbdomJsx.html)(
	                    'header',
	                    null,
	                    navbar
	                ),
	                (0, _snabbdomJsx.html)(
	                    'main',
	                    null,
	                    page
	                )
	            );
	        });
	        return (0, _mergeSinks2.default)({ DOM: vdom$ }, page, navbar, {
	            router: router,
	            HTTP: navbar.navigate$.filter(function (link) {
	                return link.url == '/logout';
	            }).mapTo({
	                url: '/logout',
	                method: 'POST',
	                category: 'logout'
	            }),
	            user$: logout$.mapTo(null)
	        });
	    };
	}
	
	exports.default = MainLayout;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(55)()
		? Object.setPrototypeOf
		: __webpack_require__(56);


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.createPath = exports.parsePath = exports.getQueryStringValueFromPath = exports.stripQueryStringValueFromPath = exports.addQueryStringValueToPath = undefined;
	
	var _warning = __webpack_require__(23);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var addQueryStringValueToPath = exports.addQueryStringValueToPath = function addQueryStringValueToPath(path, key, value) {
	  var _parsePath = parsePath(path);
	
	  var pathname = _parsePath.pathname;
	  var search = _parsePath.search;
	  var hash = _parsePath.hash;
	
	
	  return createPath({
	    pathname: pathname,
	    search: search + (search.indexOf('?') === -1 ? '?' : '&') + key + '=' + value,
	    hash: hash
	  });
	};
	
	var stripQueryStringValueFromPath = exports.stripQueryStringValueFromPath = function stripQueryStringValueFromPath(path, key) {
	  var _parsePath2 = parsePath(path);
	
	  var pathname = _parsePath2.pathname;
	  var search = _parsePath2.search;
	  var hash = _parsePath2.hash;
	
	
	  return createPath({
	    pathname: pathname,
	    search: search.replace(new RegExp('([?&])' + key + '=[a-zA-Z0-9]+(&?)'), function (match, prefix, suffix) {
	      return prefix === '?' ? prefix : suffix;
	    }),
	    hash: hash
	  });
	};
	
	var getQueryStringValueFromPath = exports.getQueryStringValueFromPath = function getQueryStringValueFromPath(path, key) {
	  var _parsePath3 = parsePath(path);
	
	  var search = _parsePath3.search;
	
	  var match = search.match(new RegExp('[?&]' + key + '=([a-zA-Z0-9]+)'));
	  return match && match[1];
	};
	
	var extractPath = function extractPath(string) {
	  var match = string.match(/^(https?:)?\/\/[^\/]*/);
	  return match == null ? string : string.substring(match[0].length);
	};
	
	var parsePath = exports.parsePath = function parsePath(path) {
	  var pathname = extractPath(path);
	  var search = '';
	  var hash = '';
	
	  (undefined) !== 'production' ? (0, _warning2.default)(path === pathname, 'A path must be pathname + search + hash only, not a full URL like "%s"', path) : void 0;
	
	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }
	
	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }
	
	  if (pathname === '') pathname = '/';
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	};
	
	var createPath = exports.createPath = function createPath(location) {
	  if (location == null || typeof location === 'string') return location;
	
	  var basename = location.basename;
	  var pathname = location.pathname;
	  var search = location.search;
	  var hash = location.hash;
	
	  var path = (basename || '') + pathname;
	
	  if (search && search !== '?') path += search;
	
	  if (hash) path += hash;
	
	  return path;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = {
	  array: Array.isArray,
	  primitive: function(s) { return typeof s === 'string' || typeof s === 'number'; },
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = function() {};
	
	if ((undefined) !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}
	
	module.exports = warning;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_1 = __webpack_require__(2);
	function fromEvent(element, eventName, useCapture) {
	    if (useCapture === void 0) { useCapture = false; }
	    return xstream_1.Stream.create({
	        element: element,
	        next: null,
	        start: function start(listener) {
	            this.next = function next(event) { listener.next(event); };
	            this.element.addEventListener(eventName, this.next, useCapture);
	        },
	        stop: function stop() {
	            this.element.removeEventListener(eventName, this.next, useCapture);
	        }
	    });
	}
	exports.fromEvent = fromEvent;
	//# sourceMappingURL=fromEvent.js.map

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var is = __webpack_require__(22);
	var vnode = __webpack_require__(35);
	function isGenericStream(x) {
	    return !Array.isArray(x) && typeof x.map === "function";
	}
	function mutateStreamWithNS(vNode) {
	    addNS(vNode.data, vNode.children, vNode.sel);
	    return vNode;
	}
	function addNS(data, children, selector) {
	    data.ns = "http://www.w3.org/2000/svg";
	    if (selector !== "foreignObject" && typeof children !== "undefined" && is.array(children)) {
	        for (var i = 0; i < children.length; ++i) {
	            if (isGenericStream(children[i])) {
	                children[i] = children[i].map(mutateStreamWithNS);
	            }
	            else {
	                addNS(children[i].data, children[i].children, children[i].sel);
	            }
	        }
	    }
	}
	function h(sel, b, c) {
	    var data = {};
	    var children;
	    var text;
	    var i;
	    if (arguments.length === 3) {
	        data = b;
	        if (is.array(c)) {
	            children = c;
	        }
	        else if (is.primitive(c)) {
	            text = c;
	        }
	    }
	    else if (arguments.length === 2) {
	        if (is.array(b)) {
	            children = b;
	        }
	        else if (is.primitive(b)) {
	            text = b;
	        }
	        else {
	            data = b;
	        }
	    }
	    if (is.array(children)) {
	        children = children.filter(function (x) { return x; });
	        for (i = 0; i < children.length; ++i) {
	            if (is.primitive(children[i])) {
	                children[i] = vnode(undefined, undefined, undefined, children[i]);
	            }
	        }
	    }
	    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
	        addNS(data, children, sel);
	    }
	    return vnode(sel, data, children, text, undefined);
	}
	exports.h = h;
	;
	//# sourceMappingURL=hyperscript.js.map

/***/ },
/* 26 */,
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _isolate = __webpack_require__(4);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _mainLayout = __webpack_require__(19);
	
	var _mainLayout2 = _interopRequireDefault(_mainLayout);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function NotFound(sources) {
	    return {
	        DOM: _xstream2.default.of((0, _snabbdomJsx.html)(
	            'div',
	            null,
	            (0, _snabbdomJsx.html)(
	                'h1',
	                null,
	                'Oho!'
	            ),
	            (0, _snabbdomJsx.html)(
	                'div',
	                null,
	                'Etsimääsi sivua ei löytynyt'
	            )
	        ))
	    };
	}
	
	exports.default = function (sources) {
	    return (0, _isolate2.default)((0, _mainLayout2.default)(NotFound))(sources);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	var toString = Object.prototype.toString
	
	  , id = toString.call((function () { return arguments; }()));
	
	module.exports = function (x) { return (toString.call(x) === id); };


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(151)()
		? Object.assign
		: __webpack_require__(152);


/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';
	
	var toString = Object.prototype.toString
	
	  , id = toString.call('');
	
	module.exports = function (x) {
		return (typeof x === 'string') || (x && (typeof x === 'object') &&
			((x instanceof String) || (toString.call(x) === id))) || false;
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var clear    = __webpack_require__(54)
	  , assign   = __webpack_require__(29)
	  , callable = __webpack_require__(9)
	  , value    = __webpack_require__(7)
	  , d        = __webpack_require__(8)
	  , autoBind = __webpack_require__(142)
	  , Symbol   = __webpack_require__(15)
	
	  , defineProperty = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , Iterator;
	
	module.exports = Iterator = function (list, context) {
		if (!(this instanceof Iterator)) return new Iterator(list, context);
		defineProperties(this, {
			__list__: d('w', value(list)),
			__context__: d('w', context),
			__nextIndex__: d('w', 0)
		});
		if (!context) return;
		callable(context.on);
		context.on('_add', this._onAdd);
		context.on('_delete', this._onDelete);
		context.on('_clear', this._onClear);
	};
	
	defineProperties(Iterator.prototype, assign({
		constructor: d(Iterator),
		_next: d(function () {
			var i;
			if (!this.__list__) return;
			if (this.__redo__) {
				i = this.__redo__.shift();
				if (i !== undefined) return i;
			}
			if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
			this._unBind();
		}),
		next: d(function () { return this._createResult(this._next()); }),
		_createResult: d(function (i) {
			if (i === undefined) return { done: true, value: undefined };
			return { done: false, value: this._resolve(i) };
		}),
		_resolve: d(function (i) { return this.__list__[i]; }),
		_unBind: d(function () {
			this.__list__ = null;
			delete this.__redo__;
			if (!this.__context__) return;
			this.__context__.off('_add', this._onAdd);
			this.__context__.off('_delete', this._onDelete);
			this.__context__.off('_clear', this._onClear);
			this.__context__ = null;
		}),
		toString: d(function () { return '[object Iterator]'; })
	}, autoBind({
		_onAdd: d(function (index) {
			if (index >= this.__nextIndex__) return;
			++this.__nextIndex__;
			if (!this.__redo__) {
				defineProperty(this, '__redo__', d('c', [index]));
				return;
			}
			this.__redo__.forEach(function (redo, i) {
				if (redo >= index) this.__redo__[i] = ++redo;
			}, this);
			this.__redo__.push(index);
		}),
		_onDelete: d(function (index) {
			var i;
			if (index >= this.__nextIndex__) return;
			--this.__nextIndex__;
			if (!this.__redo__) return;
			i = this.__redo__.indexOf(index);
			if (i !== -1) this.__redo__.splice(i, 1);
			this.__redo__.forEach(function (redo, i) {
				if (redo > index) this.__redo__[i] = --redo;
			}, this);
		}),
		_onClear: d(function () {
			if (this.__redo__) clear.call(this.__redo__);
			this.__nextIndex__ = 0;
		})
	})));
	
	defineProperty(Iterator.prototype, Symbol.iterator, d(function () {
		return this;
	}));
	defineProperty(Iterator.prototype, Symbol.toStringTag, d('', 'Iterator'));


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.locationsAreEqual = exports.statesAreEqual = exports.createLocation = exports.createQuery = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _invariant = __webpack_require__(64);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _warning = __webpack_require__(23);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _PathUtils = __webpack_require__(21);
	
	var _Actions = __webpack_require__(60);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createQuery = exports.createQuery = function createQuery(props) {
	  return _extends(Object.create(null), props);
	};
	
	var createLocation = exports.createLocation = function createLocation() {
	  var input = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
	  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	  var object = typeof input === 'string' ? (0, _PathUtils.parsePath)(input) : input;
	
	  (undefined) !== 'production' ? (0, _warning2.default)(!object.path, 'Location descriptor objects should have a `pathname`, not a `path`.') : void 0;
	
	  var pathname = object.pathname || '/';
	  var search = object.search || '';
	  var hash = object.hash || '';
	  var state = object.state;
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	};
	
	var isDate = function isDate(object) {
	  return Object.prototype.toString.call(object) === '[object Date]';
	};
	
	var statesAreEqual = exports.statesAreEqual = function statesAreEqual(a, b) {
	  if (a === b) return true;
	
	  var typeofA = typeof a === 'undefined' ? 'undefined' : _typeof(a);
	  var typeofB = typeof b === 'undefined' ? 'undefined' : _typeof(b);
	
	  if (typeofA !== typeofB) return false;
	
	  !(typeofA !== 'function') ? (undefined) !== 'production' ? (0, _invariant2.default)(false, 'You must not store functions in location state') : (0, _invariant2.default)(false) : void 0;
	
	  // Not the same object, but same type.
	  if (typeofA === 'object') {
	    !!(isDate(a) && isDate(b)) ? (undefined) !== 'production' ? (0, _invariant2.default)(false, 'You must not store Date objects in location state') : (0, _invariant2.default)(false) : void 0;
	
	    if (!Array.isArray(a)) {
	      var keysofA = Object.keys(a);
	      var keysofB = Object.keys(b);
	      return keysofA.length === keysofB.length && keysofA.every(function (key) {
	        return statesAreEqual(a[key], b[key]);
	      });
	    }
	
	    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
	      return statesAreEqual(item, b[index]);
	    });
	  }
	
	  // All other serializable types (string, number, boolean)
	  // should be strict equal.
	  return false;
	};
	
	var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
	  return a.key === b.key &&
	  // a.action === b.action && // Different action !== location change.
	  a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && statesAreEqual(a.state, b.state);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};
	
	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;
	
	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);
	
	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self] && self);
	
	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window] && window);
	
	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
	
	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal ||
	  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	    freeSelf || thisGlobal || Function('return this')();
	
	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}
	
	module.exports = root;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(275)(module), (function() { return this; }())))

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';
	
	var proto = Element.prototype;
	var vendor = proto.matches
	  || proto.matchesSelector
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;
	
	module.exports = match;
	
	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */
	
	function match(el, selector) {
	  if (vendor) return vendor.call(el, selector);
	  var nodes = el.parentNode.querySelectorAll(selector);
	  for (var i = 0; i < nodes.length; i++) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function(sel, data, children, text, elm) {
	  var key = data === undefined ? undefined : data.key;
	  return {sel: sel, data: data, children: children,
	          text: text, elm: elm, key: key};
	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(208).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36).setImmediate, __webpack_require__(36).clearImmediate))

/***/ },
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
/***/ function(module, exports) {

	"use strict";
	var ScopeChecker = (function () {
	    function ScopeChecker(scope, isolateModule) {
	        this.scope = scope;
	        this.isolateModule = isolateModule;
	    }
	    ScopeChecker.prototype.isStrictlyInRootScope = function (leaf) {
	        for (var el = leaf; el; el = el.parentElement) {
	            var scope = this.isolateModule.isIsolatedElement(el);
	            if (scope && scope !== this.scope) {
	                return false;
	            }
	            if (scope) {
	                return true;
	            }
	        }
	        return true;
	    };
	    return ScopeChecker;
	}());
	exports.ScopeChecker = ScopeChecker;
	//# sourceMappingURL=ScopeChecker.js.map

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_adapter_1 = __webpack_require__(6);
	var xstream_1 = __webpack_require__(2);
	function createVTree(vnode, children) {
	    return {
	        sel: vnode.sel,
	        data: vnode.data,
	        text: vnode.text,
	        elm: vnode.elm,
	        key: vnode.key,
	        children: children,
	    };
	}
	function makeTransposeVNode(runStreamAdapter) {
	    return function transposeVNode(vnode) {
	        if (!vnode) {
	            return null;
	        }
	        else if (vnode && typeof vnode.data === "object" && vnode.data.static) {
	            return xstream_1.default.of(vnode);
	        }
	        else if (runStreamAdapter.isValidStream(vnode)) {
	            var xsStream = xstream_adapter_1.default.adapt(vnode, runStreamAdapter.streamSubscribe);
	            return xsStream.map(transposeVNode).flatten();
	        }
	        else if (typeof vnode === "object") {
	            if (!vnode.children || vnode.children.length === 0) {
	                return xstream_1.default.of(vnode);
	            }
	            var vnodeChildren = vnode.children
	                .map(transposeVNode)
	                .filter(function (x) { return x !== null; });
	            if (vnodeChildren.length === 0) {
	                return xstream_1.default.of(createVTree(vnode, []));
	            }
	            else {
	                return xstream_1.default.combine.apply(xstream_1.default, vnodeChildren)
	                    .map(function (children) { return createVTree(vnode, children.slice()); });
	            }
	        }
	        else {
	            throw new Error("Unhandled vTree Value");
	        }
	    };
	}
	exports.makeTransposeVNode = makeTransposeVNode;
	//# sourceMappingURL=transposition.js.map

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * History driver factory
	 *
	 * This is a function which, when called, returns a History Driver for Cycle.js
	 * apps. The driver is also a function, and it takes a stream of new locations
	 * (strings representing pathnames or location objects) as input, and outputs
	 * another stream of locations that were applied.
	 *
	 * @param {History} history the History object created by the history library.
	 * This object is usually created through `createBrowserHistory()` or
	 * `createHashHistory()` or `createMemoryHistory()` from the `history` library.
	 * Alternatively, you may use `createServerHistory` from this library.
	 * @param {object} options an object with some options specific to this driver.
	 * Options may be: `capture`, a boolean to indicate whether the driver should
	 * intercept and handle any click event that leads to a link, like on an `<a>`
	 * element; `onError`, a callback function that takes an error as argument and
	 * handles it, use this to configure what to do with driver errors.
	 * @return {Function} the History Driver function
	 * @function makeHistoryDriver
	 */
	var makeHistoryDriver_1 = __webpack_require__(110);
	exports.makeHistoryDriver = makeHistoryDriver_1.makeHistoryDriver;
	/**
	 * Creates a "ServerHistory" object similar to the History objects that the
	 * `history` library can create. Use this when you want to support server-side
	 * rendering.
	 *
	 * @param {string|object} location this may be either a string representing the
	 * pathname, or a location object with fields like `pathname`, `search`,
	 * `query`, `state`, `action`, `key`, `hash`, etc.
	 * @return {object} a History object.
	 * @function createServerHistory
	 */
	var serverHistory_1 = __webpack_require__(111);
	exports.createServerHistory = serverHistory_1.createServerHistory;
	var util_1 = __webpack_require__(44);
	exports.supportsHistory = util_1.supportsHistory;
	exports.createLocation = util_1.createLocation;
	//# sourceMappingURL=index.js.map

/***/ },
/* 44 */
/***/ function(module, exports) {

	"use strict";
	function supportsHistory() {
	    if (typeof navigator === 'undefined') {
	        return false;
	    }
	    var ua = navigator.userAgent;
	    if ((ua.indexOf('Android 2.') !== -1 ||
	        ua.indexOf('Android 4.0') !== -1) &&
	        ua.indexOf('Mobile Safari') !== -1 &&
	        ua.indexOf('Chrome') === -1 &&
	        ua.indexOf('Windows Phone') === -1) {
	        return false;
	    }
	    if (typeof window !== 'undefined') {
	        return window.history && 'pushState' in window.history;
	    }
	    else {
	        return false;
	    }
	}
	exports.supportsHistory = supportsHistory;
	var locationDefaults = {
	    pathname: '/',
	    action: 'POP',
	    hash: '',
	    search: '',
	    state: undefined,
	    key: null,
	    query: null,
	};
	function createLocation(location) {
	    if (typeof location === 'string') {
	        return Object.assign({}, locationDefaults, { pathname: location });
	    }
	    return Object.assign({}, locationDefaults, location);
	}
	exports.createLocation = createLocation;
	//# sourceMappingURL=util.js.map

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isolate_1 = __webpack_require__(114);
	var xstream_adapter_1 = __webpack_require__(6);
	var MainHTTPSource = (function () {
	    function MainHTTPSource(_res$$, runStreamAdapter, _name, _namespace) {
	        if (_namespace === void 0) { _namespace = []; }
	        this._res$$ = _res$$;
	        this.runStreamAdapter = runStreamAdapter;
	        this._name = _name;
	        this._namespace = _namespace;
	        this.isolateSource = isolate_1.isolateSource;
	        this.isolateSink = isolate_1.isolateSink;
	    }
	    MainHTTPSource.prototype.filter = function (predicate) {
	        var filteredResponse$$ = this._res$$.filter(function (r$) { return predicate(r$.request); });
	        return new MainHTTPSource(filteredResponse$$, this.runStreamAdapter, this._name, this._namespace);
	    };
	    MainHTTPSource.prototype.select = function (category) {
	        var res$$ = this._res$$;
	        if (category) {
	            res$$ = this._res$$.filter(function (res$) { return res$.request && res$.request.category === category; });
	        }
	        var out = this.runStreamAdapter.adapt(res$$, xstream_adapter_1.default.streamSubscribe);
	        out._isCycleSource = this._name;
	        return out;
	    };
	    return MainHTTPSource;
	}());
	exports.MainHTTPSource = MainHTTPSource;
	//# sourceMappingURL=MainHTTPSource.js.map

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _isolate = __webpack_require__(4);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _form = __webpack_require__(16);
	
	var _form2 = _interopRequireDefault(_form);
	
	var _form3 = __webpack_require__(47);
	
	var _button = __webpack_require__(18);
	
	var _button2 = _interopRequireDefault(_button);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function LoginForm(_ref) {
	    var FormComponent = _ref.FormComponent;
	    var validatedValuesAfterSubmit$ = _ref.validatedValuesAfterSubmit$;
	
	    var sources = _objectWithoutProperties(_ref, ['FormComponent', 'validatedValuesAfterSubmit$']);
	
	    var submitButton = FormComponent(_button2.default, {
	        props$: _xstream2.default.of({
	            content: 'Kirjaudu',
	            type: 'submit',
	            look: 'primary'
	        })
	    });
	    var response$ = sources.HTTP.select('login').flatten();
	    return {
	        elements$: _xstream2.default.of({
	            username: FormComponent(_form3.TextField, {
	                label$: _xstream2.default.of('Tunnus'),
	                props$: _xstream2.default.of({
	                    type: 'text'
	                }),
	                validators$: _xstream2.default.of([['required']])
	            }),
	            password: FormComponent(_form3.TextField, {
	                label$: _xstream2.default.of('Salasana'),
	                props$: _xstream2.default.of({
	                    type: 'password'
	                }),
	                validators$: _xstream2.default.of([['required']])
	            })
	        }),
	        actions$: _xstream2.default.of({
	            submit: submitButton
	        }),
	        render$: _xstream2.default.of(function (alerts, elements, actions) {
	            return (0, _snabbdomJsx.html)(
	                'form',
	                { className: _form2.default.grid },
	                alerts,
	                elements.username,
	                elements.password,
	                actions ? (0, _snabbdomJsx.html)(
	                    'div',
	                    { className: _form2.default.actions },
	                    actions.submit
	                ) : ''
	            );
	        }),
	        HTTP: validatedValuesAfterSubmit$.map(function (values) {
	            return {
	                url: '/login',
	                method: 'POST',
	                send: values,
	                category: 'login'
	            };
	        }),
	        submitOn$: submitButton.click$,
	        afterSubmit$: response$,
	        user$: response$.filter(function (_ref2) {
	            var response = _ref2.response;
	            return response.ok;
	        }).map(function (_ref3) {
	            var response = _ref3.response;
	            return response.body.user;
	        })
	    };
	}
	
	exports.default = function (sources) {
	    return (0, _isolate2.default)((0, _form3.Form)(LoginForm))(sources);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.formStyles = exports.AddDecField = exports.RadioButtonGroup = exports.Checkbox = exports.TextArea = exports.Select = exports.TextField = exports.Form = undefined;
	
	var _form = __webpack_require__(123);
	
	var _form2 = _interopRequireDefault(_form);
	
	var _textField = __webpack_require__(127);
	
	var _textField2 = _interopRequireDefault(_textField);
	
	var _select = __webpack_require__(125);
	
	var _select2 = _interopRequireDefault(_select);
	
	var _textArea = __webpack_require__(126);
	
	var _textArea2 = _interopRequireDefault(_textArea);
	
	var _checkbox = __webpack_require__(122);
	
	var _checkbox2 = _interopRequireDefault(_checkbox);
	
	var _radioButton = __webpack_require__(124);
	
	var _radioButton2 = _interopRequireDefault(_radioButton);
	
	var _addDecField = __webpack_require__(121);
	
	var _addDecField2 = _interopRequireDefault(_addDecField);
	
	var _form3 = __webpack_require__(16);
	
	var _form4 = _interopRequireDefault(_form3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Form = _form2.default;
	exports.TextField = _textField2.default;
	exports.Select = _select2.default;
	exports.TextArea = _textArea2.default;
	exports.Checkbox = _checkbox2.default;
	exports.RadioButtonGroup = _radioButton2.default;
	exports.AddDecField = _addDecField2.default;
	exports.formStyles = _form4.default;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Column = exports.Row = exports.Layout = undefined;
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _grid = __webpack_require__(186);
	
	var _grid2 = _interopRequireDefault(_grid);
	
	var _classes = __webpack_require__(14);
	
	var _classes2 = _interopRequireDefault(_classes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function Layout(_ref, children) {
	    var type = _ref.type;
	    var width = _ref.width;
	
	    var other = _objectWithoutProperties(_ref, ['type', 'width']);
	
	    var props = Object.assign({}, other);
	    switch (type) {
	        case 'fixed':
	            props = (0, _classes2.default)(props).add(_grid2.default.fluid).normalize();
	            props.style = { 'max-width': width };
	            break;
	        case 'fluid':
	            props = (0, _classes2.default)(props).add(_grid2.default.fluid).normalize();
	            break;
	        case 'fluid-fixed':
	            props = (0, _classes2.default)(props).add(_grid2.default.fluidFixed).normalize();
	            break;
	    }
	    return (0, _snabbdomJsx.html)(
	        'div',
	        props,
	        children
	    );
	}
	
	function Row(props, children) {
	    return (0, _snabbdomJsx.html)(
	        'div',
	        { className: _grid2.default.row },
	        children
	    );
	}
	
	function Column(props, children) {
	    var classNames = [_grid2.default['column' + props.col]];
	    if (props.left !== undefined) {
	        classNames.push(_grid2.default['left' + props.left]);
	    }
	    if (props.right !== undefined) {
	        classNames.push(_grid2.default['right' + props.right]);
	    }
	    return (0, _snabbdomJsx.html)(
	        'div',
	        { classNames: classNames },
	        children
	    );
	}
	
	exports.Layout = Layout;
	exports.Row = Row;
	exports.Column = Column;

/***/ },
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */
/***/ function(module, exports) {

	/*!
	 * Cross-Browser Split 1.1.1
	 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
	 * Available under the MIT License
	 * ECMAScript compliant, uniform cross-browser split method
	 */
	
	/**
	 * Splits a string into an array of strings using a regex or string separator. Matches of the
	 * separator are not included in the result array. However, if `separator` is a regex that contains
	 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
	 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
	 * cross-browser.
	 * @param {String} str String to split.
	 * @param {RegExp|String} separator Regex or string to use for separating the string.
	 * @param {Number} [limit] Maximum number of items to include in the result array.
	 * @returns {Array} Array of substrings.
	 * @example
	 *
	 * // Basic use
	 * split('a b c d', ' ');
	 * // -> ['a', 'b', 'c', 'd']
	 *
	 * // With limit
	 * split('a b c d', ' ', 2);
	 * // -> ['a', 'b']
	 *
	 * // Backreferences in result array
	 * split('..word1 word2..', /([a-z]+)(\d+)/i);
	 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
	 */
	module.exports = (function split(undef) {
	
	  var nativeSplit = String.prototype.split,
	    compliantExecNpcg = /()??/.exec("")[1] === undef,
	    // NPCG: nonparticipating capturing group
	    self;
	
	  self = function(str, separator, limit) {
	    // If `separator` is not a regex, use `nativeSplit`
	    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
	      return nativeSplit.call(str, separator, limit);
	    }
	    var output = [],
	      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
	      (separator.sticky ? "y" : ""),
	      // Firefox 3+
	      lastLastIndex = 0,
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      separator = new RegExp(separator.source, flags + "g"),
	      separator2, match, lastIndex, lastLength;
	    str += ""; // Type-convert
	    if (!compliantExecNpcg) {
	      // Doesn't need flags gy, but they don't hurt
	      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
	    }
	    /* Values for `limit`, per the spec:
	     * If undefined: 4294967295 // Math.pow(2, 32) - 1
	     * If 0, Infinity, or NaN: 0
	     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	     * If other: Type-convert, then use the above rules
	     */
	    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
	    limit >>> 0; // ToUint32(limit)
	    while (match = separator.exec(str)) {
	      // `separator.lastIndex` is not reliable cross-browser
	      lastIndex = match.index + match[0].length;
	      if (lastIndex > lastLastIndex) {
	        output.push(str.slice(lastLastIndex, match.index));
	        // Fix browsers whose `exec` methods don't consistently return `undefined` for
	        // nonparticipating capturing groups
	        if (!compliantExecNpcg && match.length > 1) {
	          match[0].replace(separator2, function() {
	            for (var i = 1; i < arguments.length - 2; i++) {
	              if (arguments[i] === undef) {
	                match[i] = undef;
	              }
	            }
	          });
	        }
	        if (match.length > 1 && match.index < str.length) {
	          Array.prototype.push.apply(output, match.slice(1));
	        }
	        lastLength = match[0].length;
	        lastLastIndex = lastIndex;
	        if (output.length >= limit) {
	          break;
	        }
	      }
	      if (separator.lastIndex === match.index) {
	        separator.lastIndex++; // Avoid an infinite loop
	      }
	    }
	    if (lastLastIndex === str.length) {
	      if (lastLength || !separator.test("")) {
	        output.push("");
	      }
	    } else {
	      output.push(str.slice(lastLastIndex));
	    }
	    return output.length > limit ? output.slice(0, limit) : output;
	  };
	
	  return self;
	})();


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// Inspired by Google Closure:
	// http://closure-library.googlecode.com/svn/docs/
	// closure_goog_array_array.js.html#goog.array.clear
	
	'use strict';
	
	var value = __webpack_require__(7);
	
	module.exports = function () {
		value(this).length = 0;
		return this;
	};


/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';
	
	var create = Object.create, getPrototypeOf = Object.getPrototypeOf
	  , x = {};
	
	module.exports = function (/*customCreate*/) {
		var setPrototypeOf = Object.setPrototypeOf
		  , customCreate = arguments[0] || create;
		if (typeof setPrototypeOf !== 'function') return false;
		return getPrototypeOf(setPrototypeOf(customCreate(null), x)) === x;
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// Big thanks to @WebReflection for sorting this out
	// https://gist.github.com/WebReflection/5593554
	
	'use strict';
	
	var isObject      = __webpack_require__(157)
	  , value         = __webpack_require__(7)
	
	  , isPrototypeOf = Object.prototype.isPrototypeOf
	  , defineProperty = Object.defineProperty
	  , nullDesc = { configurable: true, enumerable: false, writable: true,
			value: undefined }
	  , validate;
	
	validate = function (obj, prototype) {
		value(obj);
		if ((prototype === null) || isObject(prototype)) return obj;
		throw new TypeError('Prototype must be null or an object');
	};
	
	module.exports = (function (status) {
		var fn, set;
		if (!status) return null;
		if (status.level === 2) {
			if (status.set) {
				set = status.set;
				fn = function (obj, prototype) {
					set.call(validate(obj, prototype), prototype);
					return obj;
				};
			} else {
				fn = function (obj, prototype) {
					validate(obj, prototype).__proto__ = prototype;
					return obj;
				};
			}
		} else {
			fn = function self(obj, prototype) {
				var isNullBase;
				validate(obj, prototype);
				isNullBase = isPrototypeOf.call(self.nullPolyfill, obj);
				if (isNullBase) delete self.nullPolyfill.__proto__;
				if (prototype === null) prototype = self.nullPolyfill;
				obj.__proto__ = prototype;
				if (isNullBase) defineProperty(self.nullPolyfill, '__proto__', nullDesc);
				return obj;
			};
		}
		return Object.defineProperty(fn, 'level', { configurable: false,
			enumerable: false, writable: false, value: status.level });
	}((function () {
		var x = Object.create(null), y = {}, set
		  , desc = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
	
		if (desc) {
			try {
				set = desc.set; // Opera crashes at this point
				set.call(x, y);
			} catch (ignore) { }
			if (Object.getPrototypeOf(x) === y) return { set: set, level: 2 };
		}
	
		x.__proto__ = y;
		if (Object.getPrototypeOf(x) === y) return { level: 2 };
	
		x = {};
		x.__proto__ = y;
		if (Object.getPrototypeOf(x) === y) return { level: 1 };
	
		return false;
	}())));
	
	__webpack_require__(154);


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(164)()
		? String.prototype.contains
		: __webpack_require__(165);


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isIterable = __webpack_require__(169);
	
	module.exports = function (value) {
		if (!isIterable(value)) throw new TypeError(value + " is not iterable");
		return value;
	};


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(171)() ? Map : __webpack_require__(175);


/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	var PUSH = exports.PUSH = 'PUSH';
	
	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = exports.REPLACE = 'REPLACE';
	
	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = exports.POP = 'POP';

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.go = exports.replaceLocation = exports.pushLocation = exports.startListener = exports.getUserConfirmation = exports.getCurrentLocation = undefined;
	
	var _LocationUtils = __webpack_require__(32);
	
	var _DOMUtils = __webpack_require__(62);
	
	var _DOMStateStorage = __webpack_require__(190);
	
	var _PathUtils = __webpack_require__(21);
	
	var _ExecutionEnvironment = __webpack_require__(63);
	
	var PopStateEvent = 'popstate';
	var HashChangeEvent = 'hashchange';
	
	var needsHashchangeListener = _ExecutionEnvironment.canUseDOM && !(0, _DOMUtils.supportsPopstateOnHashchange)();
	
	var _createLocation = function _createLocation(historyState) {
	  var key = historyState && historyState.key;
	
	  return (0, _LocationUtils.createLocation)({
	    pathname: window.location.pathname,
	    search: window.location.search,
	    hash: window.location.hash,
	    state: key ? (0, _DOMStateStorage.readState)(key) : undefined
	  }, undefined, key);
	};
	
	var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation() {
	  var historyState = void 0;
	  try {
	    historyState = window.history.state || {};
	  } catch (error) {
	    // IE 11 sometimes throws when accessing window.history.state
	    // See https://github.com/ReactTraining/history/pull/289
	    historyState = {};
	  }
	
	  return _createLocation(historyState);
	};
	
	var getUserConfirmation = exports.getUserConfirmation = function getUserConfirmation(message, callback) {
	  return callback(window.confirm(message));
	}; // eslint-disable-line no-alert
	
	var startListener = exports.startListener = function startListener(listener) {
	  var handlePopState = function handlePopState(event) {
	    if (event.state !== undefined) // Ignore extraneous popstate events in WebKit
	      listener(_createLocation(event.state));
	  };
	
	  (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);
	
	  var handleUnpoppedHashChange = function handleUnpoppedHashChange() {
	    return listener(getCurrentLocation());
	  };
	
	  if (needsHashchangeListener) {
	    (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleUnpoppedHashChange);
	  }
	
	  return function () {
	    (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);
	
	    if (needsHashchangeListener) {
	      (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleUnpoppedHashChange);
	    }
	  };
	};
	
	var updateLocation = function updateLocation(location, updateState) {
	  var state = location.state;
	  var key = location.key;
	
	
	  if (state !== undefined) (0, _DOMStateStorage.saveState)(key, state);
	
	  updateState({ key: key }, (0, _PathUtils.createPath)(location));
	};
	
	var pushLocation = exports.pushLocation = function pushLocation(location) {
	  return updateLocation(location, function (state, path) {
	    return window.history.pushState(state, null, path);
	  });
	};
	
	var replaceLocation = exports.replaceLocation = function replaceLocation(location) {
	  return updateLocation(location, function (state, path) {
	    return window.history.replaceState(state, null, path);
	  });
	};
	
	var go = exports.go = function go(n) {
	  if (n) window.history.go(n);
	};

/***/ },
/* 62 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
	  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
	};
	
	var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
	  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
	};
	
	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
	 */
	var supportsHistory = exports.supportsHistory = function supportsHistory() {
	  var ua = window.navigator.userAgent;
	
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
	
	  return window.history && 'pushState' in window.history;
	};
	
	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */
	var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
	  return window.navigator.userAgent.indexOf('Firefox') === -1;
	};
	
	/**
	 * Returns true if browser fires popstate on hash change.
	 * IE10 and IE11 do not.
	 */
	var supportsPopstateOnHashchange = exports.supportsPopstateOnHashchange = function supportsPopstateOnHashchange() {
	  return window.navigator.userAgent.indexOf('Trident') === -1;
	};

/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if ((undefined) !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;


/***/ },
/* 65 */
/***/ function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]';
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = getNative;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var root = __webpack_require__(33);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used to match HTML entities and HTML characters. */
	var reUnescapedHtml = /[&<>"'`]/g,
	    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
	
	/** Used to map characters to HTML entities. */
	var htmlEscapes = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#39;',
	  '`': '&#96;'
	};
	
	/**
	 * Used by `_.escape` to convert characters to HTML entities.
	 *
	 * @private
	 * @param {string} chr The matched character to escape.
	 * @returns {string} Returns the escaped character.
	 */
	function escapeHtmlChar(chr) {
	  return htmlEscapes[chr];
	}
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = Symbol ? symbolProto.toString : undefined;
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return Symbol ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	/**
	 * Converts the characters "&", "<", ">", '"', "'", and "\`" in `string` to
	 * their corresponding HTML entities.
	 *
	 * **Note:** No other characters are escaped. To escape additional
	 * characters use a third-party library like [_he_](https://mths.be/he).
	 *
	 * Though the ">" character is escaped for symmetry, characters like
	 * ">" and "/" don't need escaping in HTML and have no special meaning
	 * unless they're part of a tag or unquoted attribute value.
	 * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
	 * (under "semi-related fun fact") for more details.
	 *
	 * Backticks are escaped because in IE < 9, they can break out of
	 * attribute values or HTML comments. See [#59](https://html5sec.org/#59),
	 * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
	 * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
	 * for more details.
	 *
	 * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
	 * to reduce XSS vectors.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to escape.
	 * @returns {string} Returns the escaped string.
	 * @example
	 *
	 * _.escape('fred, barney, & pebbles');
	 * // => 'fred, barney, &amp; pebbles'
	 */
	function escape(string) {
	  string = toString(string);
	  return (string && reHasUnescapedHtml.test(string))
	    ? string.replace(reUnescapedHtml, escapeHtmlChar)
	    : string;
	}
	
	module.exports = escape;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseFor = __webpack_require__(196),
	    bindCallback = __webpack_require__(199),
	    keys = __webpack_require__(204);
	
	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}
	
	/**
	 * Creates a function for `_.forOwn` or `_.forOwnRight`.
	 *
	 * @private
	 * @param {Function} objectFunc The function to iterate over an object.
	 * @returns {Function} Returns the new each function.
	 */
	function createForOwn(objectFunc) {
	  return function(object, iteratee, thisArg) {
	    if (typeof iteratee != 'function' || thisArg !== undefined) {
	      iteratee = bindCallback(iteratee, thisArg, 3);
	    }
	    return objectFunc(object, iteratee);
	  };
	}
	
	/**
	 * Iterates over own enumerable properties of an object invoking `iteratee`
	 * for each property. The `iteratee` is bound to `thisArg` and invoked with
	 * three arguments: (value, key, object). Iteratee functions may exit iteration
	 * early by explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.forOwn(new Foo, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a' and 'b' (iteration order is not guaranteed)
	 */
	var forOwn = createForOwn(baseForOwn);
	
	module.exports = forOwn;


/***/ },
/* 68 */
/***/ function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isArguments;


/***/ },
/* 69 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** `Object#toString` result references. */
	var arrayTag = '[object Array]',
	    funcTag = '[object Function]';
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = isArray;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = selectorParser;
	
	var _browserSplit = __webpack_require__(53);
	
	var _browserSplit2 = _interopRequireDefault(_browserSplit);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
	var notClassId = /^\.|#/;
	
	function selectorParser() {
	  var selector = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	  var tagName = void 0;
	  var id = '';
	  var classes = [];
	
	  var tagParts = (0, _browserSplit2.default)(selector, classIdSplit);
	
	  if (notClassId.test(tagParts[1]) || selector === '') {
	    tagName = 'div';
	  }
	
	  var part = void 0;
	  var type = void 0;
	  var i = void 0;
	
	  for (i = 0; i < tagParts.length; i++) {
	    part = tagParts[i];
	
	    if (!part) {
	      continue;
	    }
	
	    type = part.charAt(0);
	
	    if (!tagName) {
	      tagName = part;
	    } else if (type === '.') {
	      classes.push(part.substring(1, part.length));
	    } else if (type === '#') {
	      id = part.substring(1, part.length);
	    }
	  }
	
	  return {
	    tagName: tagName,
	    id: id,
	    className: classes.join(' ')
	  };
	}

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	
	// https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/parse-tag.js
	
	var split = __webpack_require__(53);
	
	var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
	var notClassId = /^\.|#/;
	
	module.exports = function parseSelector(selector, upper) {
	  selector = selector || '';
	  var tagName;
	  var id = '';
	  var classes = [];
	
	  var tagParts = split(selector, classIdSplit);
	
	  if (notClassId.test(tagParts[1]) || selector === '') {
	    tagName = 'div';
	  }
	
	  var part, type, i;
	
	  for (i = 0; i < tagParts.length; i++) {
	    part = tagParts[i];
	
	    if (!part) {
	      continue;
	    }
	
	    type = part.charAt(0);
	
	    if (!tagName) {
	      tagName = part;
	    } else if (type === '.') {
	      classes.push(part.substring(1, part.length));
	    } else if (type === '#') {
	      id = part.substring(1, part.length);
	    }
	  }
	
	  return {
	    tagName: upper === true ? tagName.toUpperCase() : tagName,
	    id: id,
	    className: classes.join(' ')
	  };
	};

/***/ },
/* 72 */
/***/ function(module, exports) {

	var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare", 
	                "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable", 
	                "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple", 
	                "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly", 
	                "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate", 
	                "truespeed", "typemustmatch", "visible"];
	    
	var booleanAttrsDict = {};
	for(var i=0, len = booleanAttrs.length; i < len; i++) {
	  booleanAttrsDict[booleanAttrs[i]] = true;
	}
	    
	function updateAttrs(oldVnode, vnode) {
	  var key, cur, old, elm = vnode.elm,
	      oldAttrs = oldVnode.data.attrs || {}, attrs = vnode.data.attrs || {};
	  
	  // update modified attributes, add new attributes
	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      // TODO: add support to namespaced attributes (setAttributeNS)
	      if(!cur && booleanAttrsDict[key])
	        elm.removeAttribute(key);
	      else
	        elm.setAttribute(key, cur);
	    }
	  }
	  //remove removed attributes
	  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
	  // the other option is to remove all attributes with value == undefined
	  for (key in oldAttrs) {
	    if (!(key in attrs)) {
	      elm.removeAttribute(key);
	    }
	  }
	}
	
	module.exports = {create: updateAttrs, update: updateAttrs};


/***/ },
/* 73 */
/***/ function(module, exports) {

	function updateClass(oldVnode, vnode) {
	  var cur, name, elm = vnode.elm,
	      oldClass = oldVnode.data.class || {},
	      klass = vnode.data.class || {};
	  for (name in oldClass) {
	    if (!klass[name]) {
	      elm.classList.remove(name);
	    }
	  }
	  for (name in klass) {
	    cur = klass[name];
	    if (cur !== oldClass[name]) {
	      elm.classList[cur ? 'add' : 'remove'](name);
	    }
	  }
	}
	
	module.exports = {create: updateClass, update: updateClass};


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var is = __webpack_require__(22);
	
	function arrInvoker(arr) {
	  return function() {
	    if (!arr.length) return;
	    // Special case when length is two, for performance
	    arr.length === 2 ? arr[0](arr[1]) : arr[0].apply(undefined, arr.slice(1));
	  };
	}
	
	function fnInvoker(o) {
	  return function(ev) { 
	    if (o.fn === null) return;
	    o.fn(ev); 
	  };
	}
	
	function updateEventListeners(oldVnode, vnode) {
	  var name, cur, old, elm = vnode.elm,
	      oldOn = oldVnode.data.on || {}, on = vnode.data.on;
	  if (!on) return;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    if (old === undefined) {
	      if (is.array(cur)) {
	        elm.addEventListener(name, arrInvoker(cur));
	      } else {
	        cur = {fn: cur};
	        on[name] = cur;
	        elm.addEventListener(name, fnInvoker(cur));
	      }
	    } else if (is.array(old)) {
	      // Deliberately modify old array since it's captured in closure created with `arrInvoker`
	      old.length = cur.length;
	      for (var i = 0; i < old.length; ++i) old[i] = cur[i];
	      on[name]  = old;
	    } else {
	      old.fn = cur;
	      on[name] = old;
	    }
	  }
	  if (oldOn) {
	    for (name in oldOn) {
	      if (on[name] === undefined) {
	        var old = oldOn[name];
	        if (is.array(old)) {
	          old.length = 0;
	        }
	        else {
	          old.fn = null;
	        }
	      }
	    }
	  }
	}
	
	module.exports = {create: updateEventListeners, update: updateEventListeners};


/***/ },
/* 75 */
/***/ function(module, exports) {

	var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
	var nextFrame = function(fn) { raf(function() { raf(fn); }); };
	
	function setNextFrame(obj, prop, val) {
	  nextFrame(function() { obj[prop] = val; });
	}
	
	function getTextNodeRect(textNode) {
	  var rect;
	  if (document.createRange) {
	    var range = document.createRange();
	    range.selectNodeContents(textNode);
	    if (range.getBoundingClientRect) {
	        rect = range.getBoundingClientRect();
	    }
	  }
	  return rect;
	}
	
	function calcTransformOrigin(isTextNode, textRect, boundingRect) {
	  if (isTextNode) {
	    if (textRect) {
	      //calculate pixels to center of text from left edge of bounding box
	      var relativeCenterX = textRect.left + textRect.width/2 - boundingRect.left;
	      var relativeCenterY = textRect.top + textRect.height/2 - boundingRect.top;
	      return relativeCenterX + 'px ' + relativeCenterY + 'px';
	    }
	  }
	  return '0 0'; //top left
	}
	
	function getTextDx(oldTextRect, newTextRect) {
	  if (oldTextRect && newTextRect) {
	    return ((oldTextRect.left + oldTextRect.width/2) - (newTextRect.left + newTextRect.width/2));
	  }
	  return 0;
	}
	function getTextDy(oldTextRect, newTextRect) {
	  if (oldTextRect && newTextRect) {
	    return ((oldTextRect.top + oldTextRect.height/2) - (newTextRect.top + newTextRect.height/2));
	  }
	  return 0;
	}
	
	function isTextElement(elm) {
	  return elm.childNodes.length === 1 && elm.childNodes[0].nodeType === 3;
	}
	
	var removed, created;
	
	function pre(oldVnode, vnode) {
	  removed = {};
	  created = [];
	}
	
	function create(oldVnode, vnode) {
	  var hero = vnode.data.hero;
	  if (hero && hero.id) {
	    created.push(hero.id);
	    created.push(vnode);
	  }
	}
	
	function destroy(vnode) {
	  var hero = vnode.data.hero;
	  if (hero && hero.id) {
	    var elm = vnode.elm;
	    vnode.isTextNode = isTextElement(elm); //is this a text node?
	    vnode.boundingRect = elm.getBoundingClientRect(); //save the bounding rectangle to a new property on the vnode
	    vnode.textRect = vnode.isTextNode ? getTextNodeRect(elm.childNodes[0]) : null; //save bounding rect of inner text node
	    var computedStyle = window.getComputedStyle(elm, null); //get current styles (includes inherited properties)
	    vnode.savedStyle = JSON.parse(JSON.stringify(computedStyle)); //save a copy of computed style values
	    removed[hero.id] = vnode;
	  }
	}
	
	function post() {
	  var i, id, newElm, oldVnode, oldElm, hRatio, wRatio,
	      oldRect, newRect, dx, dy, origTransform, origTransition,
	      newStyle, oldStyle, newComputedStyle, isTextNode,
	      newTextRect, oldTextRect;
	  for (i = 0; i < created.length; i += 2) {
	    id = created[i];
	    newElm = created[i+1].elm;
	    oldVnode = removed[id];
	    if (oldVnode) {
	      isTextNode = oldVnode.isTextNode && isTextElement(newElm); //Are old & new both text?
	      newStyle = newElm.style;
	      newComputedStyle = window.getComputedStyle(newElm, null); //get full computed style for new element
	      oldElm = oldVnode.elm;
	      oldStyle = oldElm.style;
	      //Overall element bounding boxes
	      newRect = newElm.getBoundingClientRect();
	      oldRect = oldVnode.boundingRect; //previously saved bounding rect
	      //Text node bounding boxes & distances
	      if (isTextNode) {
	        newTextRect = getTextNodeRect(newElm.childNodes[0]);
	        oldTextRect = oldVnode.textRect;
	        dx = getTextDx(oldTextRect, newTextRect);
	        dy = getTextDy(oldTextRect, newTextRect);
	      } else {
	        //Calculate distances between old & new positions
	        dx = oldRect.left - newRect.left;
	        dy = oldRect.top - newRect.top;
	      }
	      hRatio = newRect.height / (Math.max(oldRect.height, 1));
	      wRatio = isTextNode ? hRatio : newRect.width / (Math.max(oldRect.width, 1)); //text scales based on hRatio
	      // Animate new element
	      origTransform = newStyle.transform;
	      origTransition = newStyle.transition;
	      if (newComputedStyle.display === 'inline') //inline elements cannot be transformed
	        newStyle.display = 'inline-block';        //this does not appear to have any negative side effects
	      newStyle.transition = origTransition + 'transform 0s';
	      newStyle.transformOrigin = calcTransformOrigin(isTextNode, newTextRect, newRect);
	      newStyle.opacity = '0';
	      newStyle.transform = origTransform + 'translate('+dx+'px, '+dy+'px) ' +
	                               'scale('+1/wRatio+', '+1/hRatio+')';
	      setNextFrame(newStyle, 'transition', origTransition);
	      setNextFrame(newStyle, 'transform', origTransform);
	      setNextFrame(newStyle, 'opacity', '1');
	      // Animate old element
	      for (var key in oldVnode.savedStyle) { //re-apply saved inherited properties
	        if (parseInt(key) != key) {
	          var ms = key.substring(0,2) === 'ms';
	          var moz = key.substring(0,3) === 'moz';
	          var webkit = key.substring(0,6) === 'webkit';
	      	  if (!ms && !moz && !webkit) //ignore prefixed style properties
	        	  oldStyle[key] = oldVnode.savedStyle[key];
	        }
	      }
	      oldStyle.position = 'absolute';
	      oldStyle.top = oldRect.top + 'px'; //start at existing position
	      oldStyle.left = oldRect.left + 'px';
	      oldStyle.width = oldRect.width + 'px'; //Needed for elements who were sized relative to their parents
	      oldStyle.height = oldRect.height + 'px'; //Needed for elements who were sized relative to their parents
	      oldStyle.margin = 0; //Margin on hero element leads to incorrect positioning
	      oldStyle.transformOrigin = calcTransformOrigin(isTextNode, oldTextRect, oldRect);
	      oldStyle.transform = '';
	      oldStyle.opacity = '1';
	      document.body.appendChild(oldElm);
	      setNextFrame(oldStyle, 'transform', 'translate('+ -dx +'px, '+ -dy +'px) scale('+wRatio+', '+hRatio+')'); //scale must be on far right for translate to be correct
	      setNextFrame(oldStyle, 'opacity', '0');
	      oldElm.addEventListener('transitionend', function(ev) {
	        if (ev.propertyName === 'transform')
	          document.body.removeChild(ev.target);
	      });
	    }
	  }
	  removed = created = undefined;
	}
	
	module.exports = {pre: pre, create: create, destroy: destroy, post: post};


/***/ },
/* 76 */
/***/ function(module, exports) {

	function updateProps(oldVnode, vnode) {
	  var key, cur, old, elm = vnode.elm,
	      oldProps = oldVnode.data.props || {}, props = vnode.data.props || {};
	  for (key in oldProps) {
	    if (!props[key]) {
	      delete elm[key];
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    old = oldProps[key];
	    if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
	      elm[key] = cur;
	    }
	  }
	}
	
	module.exports = {create: updateProps, update: updateProps};


/***/ },
/* 77 */
/***/ function(module, exports) {

	var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
	var nextFrame = function(fn) { raf(function() { raf(fn); }); };
	
	function setNextFrame(obj, prop, val) {
	  nextFrame(function() { obj[prop] = val; });
	}
	
	function updateStyle(oldVnode, vnode) {
	  var cur, name, elm = vnode.elm,
	      oldStyle = oldVnode.data.style || {},
	      style = vnode.data.style || {},
	      oldHasDel = 'delayed' in oldStyle;
	  for (name in oldStyle) {
	    if (!style[name]) {
	      elm.style[name] = '';
	    }
	  }
	  for (name in style) {
	    cur = style[name];
	    if (name === 'delayed') {
	      for (name in style.delayed) {
	        cur = style.delayed[name];
	        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
	          setNextFrame(elm.style, name, cur);
	        }
	      }
	    } else if (name !== 'remove' && cur !== oldStyle[name]) {
	      elm.style[name] = cur;
	    }
	  }
	}
	
	function applyDestroyStyle(vnode) {
	  var style, name, elm = vnode.elm, s = vnode.data.style;
	  if (!s || !(style = s.destroy)) return;
	  for (name in style) {
	    elm.style[name] = style[name];
	  }
	}
	
	function applyRemoveStyle(vnode, rm) {
	  var s = vnode.data.style;
	  if (!s || !s.remove) {
	    rm();
	    return;
	  }
	  var name, elm = vnode.elm, idx, i = 0, maxDur = 0,
	      compStyle, style = s.remove, amount = 0, applied = [];
	  for (name in style) {
	    applied.push(name);
	    elm.style[name] = style[name];
	  }
	  compStyle = getComputedStyle(elm);
	  var props = compStyle['transition-property'].split(', ');
	  for (; i < props.length; ++i) {
	    if(applied.indexOf(props[i]) !== -1) amount++;
	  }
	  elm.addEventListener('transitionend', function(ev) {
	    if (ev.target === elm) --amount;
	    if (amount === 0) rm();
	  });
	}
	
	module.exports = {create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle};


/***/ },
/* 78 */
/***/ function(module, exports) {

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */
	
	function isObject(obj) {
	  return null !== obj && 'object' === typeof obj;
	}
	
	module.exports = isObject;


/***/ },
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */
/***/ function(module, exports) {

	"use strict";
	function logToConsoleError(err) {
	    var target = err.stack || err;
	    if (console && console.error) {
	        console.error(target);
	    }
	    else if (console && console.log) {
	        console.log(target);
	    }
	}
	function makeSinkProxies(drivers, streamAdapter) {
	    var sinkProxies = {};
	    for (var name_1 in drivers) {
	        if (drivers.hasOwnProperty(name_1)) {
	            var holdSubject = streamAdapter.makeSubject();
	            var driverStreamAdapter = drivers[name_1].streamAdapter || streamAdapter;
	            var stream = driverStreamAdapter.adapt(holdSubject.stream, streamAdapter.streamSubscribe);
	            sinkProxies[name_1] = {
	                stream: stream,
	                observer: holdSubject.observer,
	            };
	        }
	    }
	    return sinkProxies;
	}
	function callDrivers(drivers, sinkProxies, streamAdapter) {
	    var sources = {};
	    for (var name_2 in drivers) {
	        if (drivers.hasOwnProperty(name_2)) {
	            var driverOutput = drivers[name_2](sinkProxies[name_2].stream, streamAdapter, name_2);
	            var driverStreamAdapter = drivers[name_2].streamAdapter;
	            if (driverStreamAdapter && driverStreamAdapter.isValidStream(driverOutput)) {
	                sources[name_2] = streamAdapter.adapt(driverOutput, driverStreamAdapter.streamSubscribe);
	            }
	            else {
	                sources[name_2] = driverOutput;
	            }
	            if (sources[name_2] && typeof sources[name_2] === 'object') {
	                sources[name_2]._isCycleSource = name_2;
	            }
	        }
	    }
	    return sources;
	}
	function replicateMany(sinks, sinkProxies, streamAdapter) {
	    var results = Object.keys(sinks)
	        .filter(function (name) { return !!sinkProxies[name]; })
	        .map(function (name) {
	        return streamAdapter.streamSubscribe(sinks[name], {
	            next: function (x) { sinkProxies[name].observer.next(x); },
	            error: function (err) {
	                logToConsoleError(err);
	                sinkProxies[name].observer.error(err);
	            },
	            complete: function (x) {
	                sinkProxies[name].observer.complete(x);
	            }
	        });
	    });
	    var disposeFunctions = results
	        .filter(function (dispose) { return typeof dispose === 'function'; });
	    return function () {
	        disposeFunctions.forEach(function (dispose) { return dispose(); });
	    };
	}
	function disposeSources(sources) {
	    for (var k in sources) {
	        if (sources.hasOwnProperty(k) && sources[k]
	            && typeof sources[k].dispose === 'function') {
	            sources[k].dispose();
	        }
	    }
	}
	var isObjectEmpty = function (obj) { return Object.keys(obj).length === 0; };
	function Cycle(main, drivers, options) {
	    if (typeof main !== "function") {
	        throw new Error("First argument given to Cycle must be the 'main' " +
	            "function.");
	    }
	    if (typeof drivers !== "object" || drivers === null) {
	        throw new Error("Second argument given to Cycle must be an object " +
	            "with driver functions as properties.");
	    }
	    if (isObjectEmpty(drivers)) {
	        throw new Error("Second argument given to Cycle must be an object " +
	            "with at least one driver function declared as a property.");
	    }
	    var streamAdapter = options.streamAdapter;
	    if (!streamAdapter || isObjectEmpty(streamAdapter)) {
	        throw new Error("Third argument given to Cycle must be an options object " +
	            "with the streamAdapter key supplied with a valid stream adapter.");
	    }
	    var sinkProxies = makeSinkProxies(drivers, streamAdapter);
	    var sources = callDrivers(drivers, sinkProxies, streamAdapter);
	    var sinks = main(sources);
	    if (typeof window !== 'undefined') {
	        window.Cyclejs = { sinks: sinks };
	    }
	    var run = function () {
	        var disposeReplication = replicateMany(sinks, sinkProxies, streamAdapter);
	        return function () {
	            disposeSources(sources);
	            disposeReplication();
	        };
	    };
	    return { sinks: sinks, sources: sources, run: run };
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Cycle;
	//# sourceMappingURL=index.js.map

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_1 = __webpack_require__(2);
	var xstream_adapter_1 = __webpack_require__(6);
	var fromEvent_1 = __webpack_require__(24);
	var BodyDOMSource = (function () {
	    function BodyDOMSource(_runStreamAdapter, _name) {
	        this._runStreamAdapter = _runStreamAdapter;
	        this._name = _name;
	    }
	    BodyDOMSource.prototype.select = function (selector) {
	        // This functionality is still undefined/undecided.
	        return this;
	    };
	    BodyDOMSource.prototype.elements = function () {
	        var runSA = this._runStreamAdapter;
	        var out = runSA.remember(runSA.adapt(xstream_1.default.of(document.body), xstream_adapter_1.default.streamSubscribe));
	        out._isCycleSource = this._name;
	        return out;
	    };
	    BodyDOMSource.prototype.events = function (eventType, options) {
	        if (options === void 0) { options = {}; }
	        var stream;
	        if (options && typeof options.useCapture === 'boolean') {
	            stream = fromEvent_1.fromEvent(document.body, eventType, options.useCapture);
	        }
	        else {
	            stream = fromEvent_1.fromEvent(document.body, eventType);
	        }
	        var out = this._runStreamAdapter.adapt(stream, xstream_adapter_1.default.streamSubscribe);
	        out._isCycleSource = this._name;
	        return out;
	    };
	    return BodyDOMSource;
	}());
	exports.BodyDOMSource = BodyDOMSource;
	//# sourceMappingURL=BodyDOMSource.js.map

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_1 = __webpack_require__(2);
	var xstream_adapter_1 = __webpack_require__(6);
	var fromEvent_1 = __webpack_require__(24);
	var DocumentDOMSource = (function () {
	    function DocumentDOMSource(_runStreamAdapter, _name) {
	        this._runStreamAdapter = _runStreamAdapter;
	        this._name = _name;
	    }
	    DocumentDOMSource.prototype.select = function (selector) {
	        // This functionality is still undefined/undecided.
	        return this;
	    };
	    DocumentDOMSource.prototype.elements = function () {
	        var runSA = this._runStreamAdapter;
	        var out = runSA.remember(runSA.adapt(xstream_1.default.of(document), xstream_adapter_1.default.streamSubscribe));
	        out._isCycleSource = this._name;
	        return out;
	    };
	    DocumentDOMSource.prototype.events = function (eventType, options) {
	        if (options === void 0) { options = {}; }
	        var stream;
	        if (options && typeof options.useCapture === 'boolean') {
	            stream = fromEvent_1.fromEvent(document, eventType, options.useCapture);
	        }
	        else {
	            stream = fromEvent_1.fromEvent(document, eventType);
	        }
	        var out = this._runStreamAdapter.adapt(stream, xstream_adapter_1.default.streamSubscribe);
	        out._isCycleSource = this._name;
	        return out;
	    };
	    return DocumentDOMSource;
	}());
	exports.DocumentDOMSource = DocumentDOMSource;
	//# sourceMappingURL=DocumentDOMSource.js.map

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ScopeChecker_1 = __webpack_require__(41);
	var utils_1 = __webpack_require__(13);
	var matchesSelector;
	try {
	    matchesSelector = __webpack_require__(34);
	}
	catch (e) {
	    matchesSelector = Function.prototype;
	}
	function toElArray(input) {
	    return Array.prototype.slice.call(input);
	}
	var ElementFinder = (function () {
	    function ElementFinder(namespace, isolateModule) {
	        this.namespace = namespace;
	        this.isolateModule = isolateModule;
	    }
	    ElementFinder.prototype.call = function (rootElement) {
	        var namespace = this.namespace;
	        if (namespace.join("") === "") {
	            return rootElement;
	        }
	        var scope = utils_1.getScope(namespace);
	        var scopeChecker = new ScopeChecker_1.ScopeChecker(scope, this.isolateModule);
	        var selector = utils_1.getSelectors(namespace);
	        var topNode = rootElement;
	        var topNodeMatches = [];
	        if (scope.length > 0) {
	            topNode = this.isolateModule.getIsolatedElement(scope) || rootElement;
	            if (selector && matchesSelector(topNode, selector)) {
	                topNodeMatches.push(topNode);
	            }
	        }
	        return toElArray(topNode.querySelectorAll(selector))
	            .filter(scopeChecker.isStrictlyInRootScope, scopeChecker)
	            .concat(topNodeMatches);
	    };
	    return ElementFinder;
	}());
	exports.ElementFinder = ElementFinder;
	//# sourceMappingURL=ElementFinder.js.map

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ScopeChecker_1 = __webpack_require__(41);
	var utils_1 = __webpack_require__(13);
	var matchesSelector;
	try {
	    matchesSelector = __webpack_require__(34);
	}
	catch (e) {
	    matchesSelector = Function.prototype;
	}
	var gDestinationId = 0;
	function findDestinationId(arr, searchId) {
	    var minIndex = 0;
	    var maxIndex = arr.length - 1;
	    var currentIndex;
	    var currentElement;
	    while (minIndex <= maxIndex) {
	        currentIndex = (minIndex + maxIndex) / 2 | 0;
	        currentElement = arr[currentIndex];
	        var currentId = currentElement.destinationId;
	        if (currentId < searchId) {
	            minIndex = currentIndex + 1;
	        }
	        else if (currentId > searchId) {
	            maxIndex = currentIndex - 1;
	        }
	        else {
	            return currentIndex;
	        }
	    }
	    return -1;
	}
	/**
	 * Attaches an actual event listener to the DOM root element,
	 * handles "destinations" (interested DOMSource output subjects), and bubbling.
	 */
	var EventDelegator = (function () {
	    function EventDelegator(topElement, eventType, useCapture, isolateModule) {
	        var _this = this;
	        this.topElement = topElement;
	        this.eventType = eventType;
	        this.useCapture = useCapture;
	        this.isolateModule = isolateModule;
	        this.destinations = [];
	        this.roof = topElement.parentElement;
	        if (useCapture) {
	            this.domListener = function (ev) { return _this.capture(ev); };
	        }
	        else {
	            this.domListener = function (ev) { return _this.bubble(ev); };
	        }
	        topElement.addEventListener(eventType, this.domListener, useCapture);
	    }
	    EventDelegator.prototype.bubble = function (rawEvent) {
	        if (!document.body.contains(rawEvent.currentTarget)) {
	            return;
	        }
	        var ev = this.patchEvent(rawEvent);
	        for (var el = ev.target; el && el !== this.roof; el = el.parentElement) {
	            if (!document.body.contains(el)) {
	                ev.stopPropagation();
	            }
	            if (ev.propagationHasBeenStopped) {
	                return;
	            }
	            this.matchEventAgainstDestinations(el, ev);
	        }
	    };
	    EventDelegator.prototype.matchEventAgainstDestinations = function (el, ev) {
	        for (var i = 0, n = this.destinations.length; i < n; i++) {
	            var dest = this.destinations[i];
	            if (!dest.scopeChecker.isStrictlyInRootScope(el)) {
	                continue;
	            }
	            if (matchesSelector(el, dest.selector)) {
	                this.mutateEventCurrentTarget(ev, el);
	                dest.subject._n(ev);
	            }
	        }
	    };
	    EventDelegator.prototype.capture = function (ev) {
	        for (var i = 0, n = this.destinations.length; i < n; i++) {
	            var dest = this.destinations[i];
	            if (matchesSelector(ev.target, dest.selector)) {
	                dest.subject._n(ev);
	            }
	        }
	    };
	    EventDelegator.prototype.addDestination = function (subject, namespace, destinationId) {
	        var scope = utils_1.getScope(namespace);
	        var selector = utils_1.getSelectors(namespace);
	        var scopeChecker = new ScopeChecker_1.ScopeChecker(scope, this.isolateModule);
	        this.destinations.push({ subject: subject, scopeChecker: scopeChecker, selector: selector, destinationId: destinationId });
	    };
	    EventDelegator.prototype.createDestinationId = function () {
	        return gDestinationId++;
	    };
	    EventDelegator.prototype.removeDestinationId = function (destinationId) {
	        var i = findDestinationId(this.destinations, destinationId);
	        if (i >= 0) {
	            this.destinations.splice(i, 1);
	        }
	    };
	    EventDelegator.prototype.patchEvent = function (event) {
	        var pEvent = event;
	        pEvent.propagationHasBeenStopped = false;
	        var oldStopPropagation = pEvent.stopPropagation;
	        pEvent.stopPropagation = function stopPropagation() {
	            oldStopPropagation.call(this);
	            this.propagationHasBeenStopped = true;
	        };
	        return pEvent;
	    };
	    EventDelegator.prototype.mutateEventCurrentTarget = function (event, currentTargetElement) {
	        try {
	            Object.defineProperty(event, "currentTarget", {
	                value: currentTargetElement,
	                configurable: true,
	            });
	        }
	        catch (err) {
	            console.log("please use event.ownerTarget");
	        }
	        event.ownerTarget = currentTargetElement;
	    };
	    EventDelegator.prototype.updateTopElement = function (newTopElement) {
	        this.topElement.removeEventListener(this.eventType, this.domListener, this.useCapture);
	        newTopElement.addEventListener(this.eventType, this.domListener, this.useCapture);
	        this.topElement = newTopElement;
	    };
	    return EventDelegator;
	}());
	exports.EventDelegator = EventDelegator;
	//# sourceMappingURL=EventDelegator.js.map

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_1 = __webpack_require__(2);
	var xstream_adapter_1 = __webpack_require__(6);
	var HTMLSource = (function () {
	    function HTMLSource(html$, runSA, _name) {
	        this.runSA = runSA;
	        this._name = _name;
	        this._html$ = html$;
	        this._empty$ = runSA.adapt(xstream_1.default.empty(), xstream_adapter_1.default.streamSubscribe);
	    }
	    HTMLSource.prototype.elements = function () {
	        var out = this.runSA.adapt(this._html$, xstream_adapter_1.default.streamSubscribe);
	        out._isCycleSource = this._name;
	        return out;
	    };
	    HTMLSource.prototype.select = function (selector) {
	        return new HTMLSource(xstream_1.default.empty(), this.runSA, this._name);
	    };
	    HTMLSource.prototype.events = function (eventType, options) {
	        var out = this._empty$;
	        out._isCycleSource = this._name;
	        return out;
	    };
	    return HTMLSource;
	}());
	exports.HTMLSource = HTMLSource;
	//# sourceMappingURL=HTMLSource.js.map

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_adapter_1 = __webpack_require__(6);
	var DocumentDOMSource_1 = __webpack_require__(95);
	var BodyDOMSource_1 = __webpack_require__(94);
	var xstream_1 = __webpack_require__(2);
	var ElementFinder_1 = __webpack_require__(96);
	var fromEvent_1 = __webpack_require__(24);
	var isolate_1 = __webpack_require__(103);
	var EventDelegator_1 = __webpack_require__(97);
	var utils_1 = __webpack_require__(13);
	var matchesSelector;
	try {
	    matchesSelector = __webpack_require__(34);
	}
	catch (e) {
	    matchesSelector = Function.prototype;
	}
	var eventTypesThatDontBubble = [
	    "blur",
	    "canplay",
	    "canplaythrough",
	    "change",
	    "durationchange",
	    "emptied",
	    "ended",
	    "focus",
	    "load",
	    "loadeddata",
	    "loadedmetadata",
	    "mouseenter",
	    "mouseleave",
	    "pause",
	    "play",
	    "playing",
	    "ratechange",
	    "reset",
	    "scroll",
	    "seeked",
	    "seeking",
	    "stalled",
	    "submit",
	    "suspend",
	    "timeupdate",
	    "unload",
	    "volumechange",
	    "waiting",
	];
	function determineUseCapture(eventType, options) {
	    var result = false;
	    if (typeof options.useCapture === "boolean") {
	        result = options.useCapture;
	    }
	    if (eventTypesThatDontBubble.indexOf(eventType) !== -1) {
	        result = true;
	    }
	    return result;
	}
	var MainDOMSource = (function () {
	    function MainDOMSource(_rootElement$, _runStreamAdapter, _namespace, _isolateModule, _delegators, _name) {
	        if (_namespace === void 0) { _namespace = []; }
	        this._rootElement$ = _rootElement$;
	        this._runStreamAdapter = _runStreamAdapter;
	        this._namespace = _namespace;
	        this._isolateModule = _isolateModule;
	        this._delegators = _delegators;
	        this._name = _name;
	        this.__JANI_EVAKALLIO_WE_WILL_MISS_YOU_PLEASE_COME_BACK_EVENTUALLY = false;
	        this.isolateSource = isolate_1.isolateSource;
	        this.isolateSink = isolate_1.isolateSink;
	        this.__JANI_EVAKALLIO_WE_WILL_MISS_YOU_PLEASE_COME_BACK_EVENTUALLY = true;
	    }
	    MainDOMSource.prototype.elements = function () {
	        var output$;
	        if (this._namespace.length === 0) {
	            output$ = this._rootElement$;
	        }
	        else {
	            var elementFinder_1 = new ElementFinder_1.ElementFinder(this._namespace, this._isolateModule);
	            output$ = this._rootElement$.map(function (el) { return elementFinder_1.call(el); });
	        }
	        var runSA = this._runStreamAdapter;
	        var out = runSA.remember(runSA.adapt(output$, xstream_adapter_1.default.streamSubscribe));
	        out._isCycleSource = this._name;
	        return out;
	    };
	    Object.defineProperty(MainDOMSource.prototype, "namespace", {
	        get: function () {
	            return this._namespace;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MainDOMSource.prototype.select = function (selector) {
	        if (typeof selector !== 'string') {
	            throw new Error("DOM driver's select() expects the argument to be a " +
	                "string as a CSS selector");
	        }
	        if (selector === 'document') {
	            return new DocumentDOMSource_1.DocumentDOMSource(this._runStreamAdapter, this._name);
	        }
	        if (selector === 'body') {
	            return new BodyDOMSource_1.BodyDOMSource(this._runStreamAdapter, this._name);
	        }
	        var trimmedSelector = selector.trim();
	        var childNamespace = trimmedSelector === ":root" ?
	            this._namespace :
	            this._namespace.concat(trimmedSelector);
	        return new MainDOMSource(this._rootElement$, this._runStreamAdapter, childNamespace, this._isolateModule, this._delegators, this._name);
	    };
	    MainDOMSource.prototype.events = function (eventType, options) {
	        if (options === void 0) { options = {}; }
	        if (typeof eventType !== "string") {
	            throw new Error("DOM driver's events() expects argument to be a " +
	                "string representing the event type to listen for.");
	        }
	        var useCapture = determineUseCapture(eventType, options);
	        var namespace = this._namespace;
	        var scope = utils_1.getScope(namespace);
	        var keyParts = [eventType, useCapture];
	        if (scope) {
	            keyParts.push(scope);
	        }
	        var key = keyParts.join('~');
	        var domSource = this;
	        var rootElement$;
	        if (scope) {
	            var hadIsolated_mutable_1 = false;
	            rootElement$ = this._rootElement$
	                .filter(function (rootElement) {
	                var hasIsolated = !!domSource._isolateModule.getIsolatedElement(scope);
	                var shouldPass = hasIsolated && !hadIsolated_mutable_1;
	                hadIsolated_mutable_1 = hasIsolated;
	                return shouldPass;
	            });
	        }
	        else {
	            rootElement$ = this._rootElement$.take(2);
	        }
	        var event$ = rootElement$
	            .map(function setupEventDelegatorOnTopElement(rootElement) {
	            // Event listener just for the root element
	            if (!namespace || namespace.length === 0) {
	                return fromEvent_1.fromEvent(rootElement, eventType, useCapture);
	            }
	            // Event listener on the top element as an EventDelegator
	            var delegators = domSource._delegators;
	            var top = scope
	                ? domSource._isolateModule.getIsolatedElement(scope)
	                : rootElement;
	            var delegator;
	            if (delegators.has(key)) {
	                delegator = delegators.get(key);
	                delegator.updateTopElement(top);
	            }
	            else {
	                delegator = new EventDelegator_1.EventDelegator(top, eventType, useCapture, domSource._isolateModule);
	                delegators.set(key, delegator);
	            }
	            if (scope) {
	                domSource._isolateModule.addEventDelegator(scope, delegator);
	            }
	            var destinationId = delegator.createDestinationId();
	            var subject = xstream_1.default.create({
	                start: function () { },
	                stop: function () {
	                    if ('requestIdleCallback' in window) {
	                        requestIdleCallback(function () {
	                            delegator.removeDestinationId(destinationId);
	                        });
	                    }
	                    else {
	                        delegator.removeDestinationId(destinationId);
	                    }
	                }
	            });
	            delegator.addDestination(subject, namespace, destinationId);
	            return subject;
	        })
	            .flatten();
	        var out = this._runStreamAdapter.adapt(event$, xstream_adapter_1.default.streamSubscribe);
	        out._isCycleSource = domSource._name;
	        return out;
	    };
	    MainDOMSource.prototype.dispose = function () {
	        this._isolateModule.reset();
	    };
	    return MainDOMSource;
	}());
	exports.MainDOMSource = MainDOMSource;
	//# sourceMappingURL=MainDOMSource.js.map

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var hyperscript_1 = __webpack_require__(25);
	var classNameFromVNode_1 = __webpack_require__(209);
	var selectorParser_1 = __webpack_require__(70);
	var VNodeWrapper = (function () {
	    function VNodeWrapper(rootElement) {
	        this.rootElement = rootElement;
	    }
	    VNodeWrapper.prototype.call = function (vnode) {
	        var _a = selectorParser_1.default(vnode.sel), selectorTagName = _a.tagName, selectorId = _a.id;
	        var vNodeClassName = classNameFromVNode_1.default(vnode);
	        var vNodeData = vnode.data || {};
	        var vNodeDataProps = vNodeData.props || {};
	        var _b = vNodeDataProps.id, vNodeId = _b === void 0 ? selectorId : _b;
	        var isVNodeAndRootElementIdentical = vNodeId.toUpperCase() === this.rootElement.id.toUpperCase() &&
	            selectorTagName.toUpperCase() === this.rootElement.tagName.toUpperCase() &&
	            vNodeClassName.toUpperCase() === this.rootElement.className.toUpperCase();
	        if (isVNodeAndRootElementIdentical) {
	            return vnode;
	        }
	        var _c = this.rootElement, tagName = _c.tagName, id = _c.id, className = _c.className;
	        var elementId = id ? "#" + id : "";
	        var elementClassName = className ?
	            "." + className.split(" ").join(".") : "";
	        return hyperscript_1.h("" + tagName.toLowerCase() + elementId + elementClassName, {}, [
	            vnode
	        ]);
	    };
	    return VNodeWrapper;
	}());
	exports.VNodeWrapper = VNodeWrapper;
	//# sourceMappingURL=VNodeWrapper.js.map

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var hyperscript_1 = __webpack_require__(25);
	function isValidString(param) {
	    return typeof param === 'string' && param.length > 0;
	}
	function isSelector(param) {
	    return isValidString(param) && (param[0] === '.' || param[0] === '#');
	}
	function createTagFunction(tagName) {
	    return function hyperscript(first, b, c) {
	        if (isSelector(first)) {
	            if (typeof b !== 'undefined' && typeof c !== 'undefined') {
	                return hyperscript_1.h(tagName + first, b, c);
	            }
	            else if (typeof b !== 'undefined') {
	                return hyperscript_1.h(tagName + first, b);
	            }
	            else {
	                return hyperscript_1.h(tagName + first, {});
	            }
	        }
	        else if (!!b) {
	            return hyperscript_1.h(tagName, first, b);
	        }
	        else if (!!first) {
	            return hyperscript_1.h(tagName, first);
	        }
	        else {
	            return hyperscript_1.h(tagName, {});
	        }
	    };
	}
	var SVG_TAG_NAMES = [
	    'a', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
	    'animateMotion', 'animateTransform', 'circle', 'clipPath', 'colorProfile',
	    'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
	    'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
	    'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
	    'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
	    'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
	    'feSpotlight', 'feTile', 'feTurbulence', 'filter', 'font', 'fontFace',
	    'fontFaceFormat', 'fontFaceName', 'fontFaceSrc', 'fontFaceUri',
	    'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
	    'linearGradient', 'marker', 'mask', 'metadata', 'missingGlyph', 'mpath',
	    'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'script',
	    'set', 'stop', 'style', 'switch', 'symbol', 'text', 'textPath', 'title',
	    'tref', 'tspan', 'use', 'view', 'vkern'
	];
	var svg = createTagFunction('svg');
	SVG_TAG_NAMES.forEach(function (tag) {
	    svg[tag] = createTagFunction(tag);
	});
	var TAG_NAMES = [
	    'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
	    'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
	    'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl',
	    'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
	    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',
	    'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend',
	    'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'nav', 'noscript',
	    'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'progress', 'q',
	    'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small',
	    'source', 'span', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td',
	    'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'u', 'ul', 'video'
	];
	var exported = { SVG_TAG_NAMES: SVG_TAG_NAMES, TAG_NAMES: TAG_NAMES, svg: svg, isSelector: isSelector, createTagFunction: createTagFunction };
	TAG_NAMES.forEach(function (n) {
	    exported[n] = createTagFunction(n);
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = exported;
	//# sourceMappingURL=hyperscript-helpers.js.map

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var thunk = __webpack_require__(220);
	exports.thunk = thunk;
	/**
	 * A factory for the DOM driver function.
	 *
	 * Takes a `container` to define the target on the existing DOM which this
	 * driver will operate on, and an `options` object as the second argument. The
	 * input to this driver is a stream of virtual DOM objects, or in other words,
	 * Snabbdom "VNode" objects. The output of this driver is a "DOMSource": a
	 * collection of Observables queried with the methods `select()` and `events()`.
	 *
	 * `DOMSource.select(selector)` returns a new DOMSource with scope restricted to
	 * the element(s) that matches the CSS `selector` given.
	 *
	 * `DOMSource.events(eventType, options)` returns a stream of events of
	 * `eventType` happening on the elements that match the current DOMSource. The
	 * returned stream is an *xstream* Stream if you use `@cycle/xstream-run` to run
	 * your app with this driver, or it is an RxJS Observable if you use
	 * `@cycle/rxjs-run`, and so forth. The `options` parameter can have the field
	 * `useCapture`, which is by default `false`, except it is `true` for event
	 * types that do not bubble. Read more here
	 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
	 * about the `useCapture` and its purpose.
	 *
	 * `DOMSource.elements()` returns a stream of the DOM element(s) matched by the
	 * selectors in the DOMSource. Also, `DOMSource.select(':root').elements()`
	 * returns a stream of DOM element corresponding to the root (or container) of
	 * the app on the DOM.
	 *
	 * @param {(String|HTMLElement)} container the DOM selector for the element
	 * (or the element itself) to contain the rendering of the VTrees.
	 * @param {DOMDriverOptions} options an object with two optional fields:
	 * `transposition: boolean` enables/disables transposition of inner streams in
	 * the virtual DOM tree, `modules: array` contains additional Snabbdom modules.
	 * @return {Function} the DOM driver function. The function expects a stream of
	 * of VNode as input, and outputs the DOMSource object.
	 * @function makeDOMDriver
	 */
	var makeDOMDriver_1 = __webpack_require__(105);
	exports.makeDOMDriver = makeDOMDriver_1.makeDOMDriver;
	/**
	 * A factory for the HTML driver function.
	 *
	 * Takes an `effect` callback function and an `options` object as arguments. The
	 * input to this driver is a stream of virtual DOM objects, or in other words,
	 * Snabbdom "VNode" objects. The output of this driver is a "DOMSource": a
	 * collection of Observables queried with the methods `select()` and `events()`.
	 *
	 * The HTML Driver is supplementary to the DOM Driver. Instead of producing
	 * elements on the DOM, it generates HTML as strings and does a side effect on
	 * those HTML strings. That side effect is described by the `effect` callback
	 * function. So, if you want to use the HTML Driver on the server-side to render
	 * your application as HTML and send as a response (which is the typical use
	 * case for the HTML Driver), you need to pass something like the
	 * `html => response.send(html)` function as the `effect` argument. This way,
	 * the driver knows what side effect to cause based on the HTML string it just
	 * rendered.
	 *
	 * The HTML driver is useful only for that side effect in the `effect` callback.
	 * It can be considered a sink-only driver. However, in order to serve as a
	 * transparent replacement to the DOM Driver when rendering from the server, the
	 * HTML driver returns a source object that behaves just like the DOMSource.
	 * This helps reuse the same application that is written for the DOM Driver.
	 * This fake DOMSource returns empty streams when you query it, because there
	 * are no user events on the server.
	 *
	 * `DOMSource.select(selector)` returns a new DOMSource with scope restricted to
	 * the element(s) that matches the CSS `selector` given.
	 *
	 * `DOMSource.events(eventType, options)` returns an empty stream. The returned
	 * stream is an *xstream* Stream if you use `@cycle/xstream-run` to run your app
	 * with this driver, or it is an RxJS Observable if you use `@cycle/rxjs-run`,
	 * and so forth.
	 *
	 * `DOMSource.elements()` returns the stream of HTML string rendered from your
	 * sink virtual DOM stream.
	 *
	 * @param {Function} effect a callback function that takes a string of rendered
	 * HTML as input and should run a side effect, returning nothing.
	 * @param {HTMLDriverOptions} options an object with one optional field:
	 * `transposition: boolean` enables/disables transposition of inner streams in
	 * the virtual DOM tree.
	 * @return {Function} the HTML driver function. The function expects a stream of
	 * of VNode as input, and outputs the DOMSource object.
	 * @function makeHTMLDriver
	 */
	var makeHTMLDriver_1 = __webpack_require__(106);
	exports.makeHTMLDriver = makeHTMLDriver_1.makeHTMLDriver;
	/**
	 * A factory function to create mocked DOMSource objects, for testing purposes.
	 *
	 * Takes a `streamAdapter` and a `mockConfig` object as arguments, and returns
	 * a DOMSource that can be given to any Cycle.js app that expects a DOMSource in
	 * the sources, for testing.
	 *
	 * The `streamAdapter` parameter is a package such as `@cycle/xstream-adapter`,
	 * `@cycle/rxjs-adapter`, etc. Import it as `import a from '@cycle/rx-adapter`,
	 * then provide it to `mockDOMSource. This is important so the DOMSource created
	 * knows which stream library should it use to export its streams when you call
	 * `DOMSource.events()` for instance.
	 *
	 * The `mockConfig` parameter is an object specifying selectors, eventTypes and
	 * their streams. Example:
	 *
	 * ```js
	 * const domSource = mockDOMSource(RxAdapter, {
	 *   '.foo': {
	 *     'click': Rx.Observable.of({target: {}}),
	 *     'mouseover': Rx.Observable.of({target: {}}),
	 *   },
	 *   '.bar': {
	 *     'scroll': Rx.Observable.of({target: {}}),
	 *     elements: Rx.Observable.of({tagName: 'div'}),
	 *   }
	 * });
	 *
	 * // Usage
	 * const click$ = domSource.select('.foo').events('click');
	 * const element$ = domSource.select('.bar').elements();
	 * ```
	 *
	 * The mocked DOM Source supports isolation. It has the functions `isolateSink`
	 * and `isolateSource` attached to it, and performs simple isolation using
	 * classNames. *isolateSink* with scope `foo` will append the class `___foo` to
	 * the stream of virtual DOM nodes, and *isolateSource* with scope `foo` will
	 * perform a conventional `mockedDOMSource.select('.__foo')` call.
	 *
	 * @param {Object} mockConfig an object where keys are selector strings
	 * and values are objects. Those nested objects have `eventType` strings as keys
	 * and values are streams you created.
	 * @return {Object} fake DOM source object, with an API containing `select()`
	 * and `events()` and `elements()` which can be used just like the DOM Driver's
	 * DOMSource.
	 *
	 * @function mockDOMSource
	 */
	var mockDOMSource_1 = __webpack_require__(107);
	exports.mockDOMSource = mockDOMSource_1.mockDOMSource;
	/**
	 * The hyperscript function `h()` is a function to create virtual DOM objects,
	 * also known as VNodes. Call
	 *
	 * ```js
	 * h('div.myClass', {style: {color: 'red'}}, [])
	 * ```
	 *
	 * to create a VNode that represents a `DIV` element with className `myClass`,
	 * styled with red color, and no children because the `[]` array was passed. The
	 * API is `h(tagOrSelector, optionalData, optionalChildrenOrText)`.
	 *
	 * However, usually you should use "hyperscript helpers", which are shortcut
	 * functions based on hyperscript. There is one hyperscript helper function for
	 * each DOM tagName, such as `h1()`, `h2()`, `div()`, `span()`, `label()`,
	 * `input()`. For instance, the previous example could have been written
	 * as:
	 *
	 * ```js
	 * div('.myClass', {style: {color: 'red'}}, [])
	 * ```
	 *
	 * There are also SVG helper functions, which apply the appropriate SVG
	 * namespace to the resulting elements. `svg()` function creates the top-most
	 * SVG element, and `svg.g`, `svg.polygon`, `svg.circle`, `svg.path` are for
	 * SVG-specific child elements. Example:
	 *
	 * ```js
	 * svg({width: 150, height: 150}, [
	 *   svg.polygon({
	 *     attrs: {
	 *       class: 'triangle',
	 *       points: '20 0 20 150 150 20'
	 *     }
	 *   })
	 * ])
	 * ```
	 *
	 * @function h
	 */
	var hyperscript_1 = __webpack_require__(25);
	exports.h = hyperscript_1.h;
	var hyperscript_helpers_1 = __webpack_require__(101);
	exports.svg = hyperscript_helpers_1.default.svg;
	exports.a = hyperscript_helpers_1.default.a;
	exports.abbr = hyperscript_helpers_1.default.abbr;
	exports.address = hyperscript_helpers_1.default.address;
	exports.area = hyperscript_helpers_1.default.area;
	exports.article = hyperscript_helpers_1.default.article;
	exports.aside = hyperscript_helpers_1.default.aside;
	exports.audio = hyperscript_helpers_1.default.audio;
	exports.b = hyperscript_helpers_1.default.b;
	exports.base = hyperscript_helpers_1.default.base;
	exports.bdi = hyperscript_helpers_1.default.bdi;
	exports.bdo = hyperscript_helpers_1.default.bdo;
	exports.blockquote = hyperscript_helpers_1.default.blockquote;
	exports.body = hyperscript_helpers_1.default.body;
	exports.br = hyperscript_helpers_1.default.br;
	exports.button = hyperscript_helpers_1.default.button;
	exports.canvas = hyperscript_helpers_1.default.canvas;
	exports.caption = hyperscript_helpers_1.default.caption;
	exports.cite = hyperscript_helpers_1.default.cite;
	exports.code = hyperscript_helpers_1.default.code;
	exports.col = hyperscript_helpers_1.default.col;
	exports.colgroup = hyperscript_helpers_1.default.colgroup;
	exports.dd = hyperscript_helpers_1.default.dd;
	exports.del = hyperscript_helpers_1.default.del;
	exports.dfn = hyperscript_helpers_1.default.dfn;
	exports.dir = hyperscript_helpers_1.default.dir;
	exports.div = hyperscript_helpers_1.default.div;
	exports.dl = hyperscript_helpers_1.default.dl;
	exports.dt = hyperscript_helpers_1.default.dt;
	exports.em = hyperscript_helpers_1.default.em;
	exports.embed = hyperscript_helpers_1.default.embed;
	exports.fieldset = hyperscript_helpers_1.default.fieldset;
	exports.figcaption = hyperscript_helpers_1.default.figcaption;
	exports.figure = hyperscript_helpers_1.default.figure;
	exports.footer = hyperscript_helpers_1.default.footer;
	exports.form = hyperscript_helpers_1.default.form;
	exports.h1 = hyperscript_helpers_1.default.h1;
	exports.h2 = hyperscript_helpers_1.default.h2;
	exports.h3 = hyperscript_helpers_1.default.h3;
	exports.h4 = hyperscript_helpers_1.default.h4;
	exports.h5 = hyperscript_helpers_1.default.h5;
	exports.h6 = hyperscript_helpers_1.default.h6;
	exports.head = hyperscript_helpers_1.default.head;
	exports.header = hyperscript_helpers_1.default.header;
	exports.hgroup = hyperscript_helpers_1.default.hgroup;
	exports.hr = hyperscript_helpers_1.default.hr;
	exports.html = hyperscript_helpers_1.default.html;
	exports.i = hyperscript_helpers_1.default.i;
	exports.iframe = hyperscript_helpers_1.default.iframe;
	exports.img = hyperscript_helpers_1.default.img;
	exports.input = hyperscript_helpers_1.default.input;
	exports.ins = hyperscript_helpers_1.default.ins;
	exports.kbd = hyperscript_helpers_1.default.kbd;
	exports.keygen = hyperscript_helpers_1.default.keygen;
	exports.label = hyperscript_helpers_1.default.label;
	exports.legend = hyperscript_helpers_1.default.legend;
	exports.li = hyperscript_helpers_1.default.li;
	exports.link = hyperscript_helpers_1.default.link;
	exports.main = hyperscript_helpers_1.default.main;
	exports.map = hyperscript_helpers_1.default.map;
	exports.mark = hyperscript_helpers_1.default.mark;
	exports.menu = hyperscript_helpers_1.default.menu;
	exports.meta = hyperscript_helpers_1.default.meta;
	exports.nav = hyperscript_helpers_1.default.nav;
	exports.noscript = hyperscript_helpers_1.default.noscript;
	exports.object = hyperscript_helpers_1.default.object;
	exports.ol = hyperscript_helpers_1.default.ol;
	exports.optgroup = hyperscript_helpers_1.default.optgroup;
	exports.option = hyperscript_helpers_1.default.option;
	exports.p = hyperscript_helpers_1.default.p;
	exports.param = hyperscript_helpers_1.default.param;
	exports.pre = hyperscript_helpers_1.default.pre;
	exports.progress = hyperscript_helpers_1.default.progress;
	exports.q = hyperscript_helpers_1.default.q;
	exports.rp = hyperscript_helpers_1.default.rp;
	exports.rt = hyperscript_helpers_1.default.rt;
	exports.ruby = hyperscript_helpers_1.default.ruby;
	exports.s = hyperscript_helpers_1.default.s;
	exports.samp = hyperscript_helpers_1.default.samp;
	exports.script = hyperscript_helpers_1.default.script;
	exports.section = hyperscript_helpers_1.default.section;
	exports.select = hyperscript_helpers_1.default.select;
	exports.small = hyperscript_helpers_1.default.small;
	exports.source = hyperscript_helpers_1.default.source;
	exports.span = hyperscript_helpers_1.default.span;
	exports.strong = hyperscript_helpers_1.default.strong;
	exports.style = hyperscript_helpers_1.default.style;
	exports.sub = hyperscript_helpers_1.default.sub;
	exports.sup = hyperscript_helpers_1.default.sup;
	exports.table = hyperscript_helpers_1.default.table;
	exports.tbody = hyperscript_helpers_1.default.tbody;
	exports.td = hyperscript_helpers_1.default.td;
	exports.textarea = hyperscript_helpers_1.default.textarea;
	exports.tfoot = hyperscript_helpers_1.default.tfoot;
	exports.th = hyperscript_helpers_1.default.th;
	exports.thead = hyperscript_helpers_1.default.thead;
	exports.title = hyperscript_helpers_1.default.title;
	exports.tr = hyperscript_helpers_1.default.tr;
	exports.u = hyperscript_helpers_1.default.u;
	exports.ul = hyperscript_helpers_1.default.ul;
	exports.video = hyperscript_helpers_1.default.video;
	//# sourceMappingURL=index.js.map

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_1 = __webpack_require__(13);
	function isolateSource(source, scope) {
	    return source.select(utils_1.SCOPE_PREFIX + scope);
	}
	exports.isolateSource = isolateSource;
	function isolateSink(sink, scope) {
	    return sink.map(function (vTree) {
	        if (vTree.data.isolate) {
	            var existingScope = parseInt(vTree.data.isolate.split(utils_1.SCOPE_PREFIX + 'cycle')[1]);
	            var _scope = parseInt(scope.split('cycle')[1]);
	            if (isNaN(existingScope) || isNaN(_scope) || existingScope > _scope) {
	                return vTree;
	            }
	        }
	        vTree.data.isolate = utils_1.SCOPE_PREFIX + scope;
	        if (typeof vTree.key === 'undefined') {
	            vTree.key = utils_1.SCOPE_PREFIX + scope;
	        }
	        return vTree;
	    });
	}
	exports.isolateSink = isolateSink;
	//# sourceMappingURL=isolate.js.map

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var MapPolyfill = __webpack_require__(59);
	var IsolateModule = (function () {
	    function IsolateModule(isolatedElements) {
	        this.isolatedElements = isolatedElements;
	        this.eventDelegators = new MapPolyfill();
	    }
	    IsolateModule.prototype.setScope = function (elm, scope) {
	        this.isolatedElements.set(scope, elm);
	    };
	    IsolateModule.prototype.removeScope = function (scope) {
	        this.isolatedElements.delete(scope);
	    };
	    IsolateModule.prototype.cleanupVNode = function (_a) {
	        var data = _a.data, elm = _a.elm;
	        data = data || {};
	        var scope = data.isolate;
	        var isCurrentElm = this.isolatedElements.get(scope) === elm;
	        if (scope && isCurrentElm) {
	            this.removeScope(scope);
	            if (this.eventDelegators.get(scope)) {
	                this.eventDelegators.set(scope, []);
	            }
	        }
	    };
	    IsolateModule.prototype.getIsolatedElement = function (scope) {
	        return this.isolatedElements.get(scope);
	    };
	    IsolateModule.prototype.isIsolatedElement = function (elm) {
	        var iterator = this.isolatedElements.entries();
	        for (var result = iterator.next(); !!result.value; result = iterator.next()) {
	            var _a = result.value, scope = _a[0], element = _a[1];
	            if (elm === element) {
	                return scope;
	            }
	        }
	        return false;
	    };
	    IsolateModule.prototype.addEventDelegator = function (scope, eventDelegator) {
	        var delegators = this.eventDelegators.get(scope);
	        if (!delegators) {
	            delegators = [];
	            this.eventDelegators.set(scope, delegators);
	        }
	        delegators[delegators.length] = eventDelegator;
	    };
	    IsolateModule.prototype.reset = function () {
	        this.isolatedElements.clear();
	    };
	    IsolateModule.prototype.createModule = function () {
	        var self = this;
	        return {
	            create: function (oldVNode, vNode) {
	                var _a = oldVNode.data, oldData = _a === void 0 ? {} : _a;
	                var elm = vNode.elm, _b = vNode.data, data = _b === void 0 ? {} : _b;
	                var oldScope = oldData.isolate || "";
	                var scope = data.isolate || "";
	                if (scope) {
	                    if (oldScope) {
	                        self.removeScope(oldScope);
	                    }
	                    self.setScope(elm, scope);
	                    var delegators = self.eventDelegators.get(scope);
	                    if (delegators) {
	                        for (var i = 0, len = delegators.length; i < len; ++i) {
	                            delegators[i].updateTopElement(elm);
	                        }
	                    }
	                    else if (delegators === void 0) {
	                        self.eventDelegators.set(scope, []);
	                    }
	                }
	                if (oldScope && !scope) {
	                    self.removeScope(scope);
	                }
	            },
	            update: function (oldVNode, vNode) {
	                var _a = oldVNode.data, oldData = _a === void 0 ? {} : _a;
	                var elm = vNode.elm, _b = vNode.data, data = _b === void 0 ? {} : _b;
	                var oldScope = oldData.isolate || "";
	                var scope = data.isolate || "";
	                if (scope && scope !== oldScope) {
	                    if (oldScope) {
	                        self.removeScope(oldScope);
	                    }
	                    self.setScope(elm, scope);
	                }
	                if (oldScope && !scope) {
	                    self.removeScope(scope);
	                }
	            },
	            remove: function (vNode, cb) {
	                self.cleanupVNode(vNode);
	                cb();
	            },
	            destroy: function (vNode) {
	                self.cleanupVNode(vNode);
	            }
	        };
	    };
	    return IsolateModule;
	}());
	exports.IsolateModule = IsolateModule;
	//# sourceMappingURL=isolateModule.js.map

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var snabbdom_1 = __webpack_require__(219);
	var xstream_1 = __webpack_require__(2);
	var MainDOMSource_1 = __webpack_require__(99);
	var VNodeWrapper_1 = __webpack_require__(100);
	var utils_1 = __webpack_require__(13);
	var modules_1 = __webpack_require__(108);
	var isolateModule_1 = __webpack_require__(104);
	var transposition_1 = __webpack_require__(42);
	var xstream_adapter_1 = __webpack_require__(6);
	var MapPolyfill = __webpack_require__(59);
	function makeDOMDriverInputGuard(modules) {
	    if (!Array.isArray(modules)) {
	        throw new Error("Optional modules option must be " +
	            "an array for snabbdom modules");
	    }
	}
	function domDriverInputGuard(view$) {
	    if (!view$
	        || typeof view$.addListener !== "function"
	        || typeof view$.fold !== "function") {
	        throw new Error("The DOM driver function expects as input a Stream of " +
	            "virtual DOM elements");
	    }
	}
	function makeDOMDriver(container, options) {
	    if (!options) {
	        options = {};
	    }
	    var transposition = options.transposition || false;
	    var modules = options.modules || modules_1.default;
	    var isolateModule = new isolateModule_1.IsolateModule((new MapPolyfill()));
	    var patch = snabbdom_1.init([isolateModule.createModule()].concat(modules));
	    var rootElement = utils_1.getElement(container);
	    var vnodeWrapper = new VNodeWrapper_1.VNodeWrapper(rootElement);
	    var delegators = new MapPolyfill();
	    makeDOMDriverInputGuard(modules);
	    function DOMDriver(vnode$, runStreamAdapter, name) {
	        domDriverInputGuard(vnode$);
	        var transposeVNode = transposition_1.makeTransposeVNode(runStreamAdapter);
	        var preprocessedVNode$ = (transposition ? vnode$.map(transposeVNode).flatten() : vnode$);
	        var rootElement$ = preprocessedVNode$
	            .map(function (vnode) { return vnodeWrapper.call(vnode); })
	            .fold(patch, rootElement)
	            .drop(1)
	            .map(function unwrapElementFromVNode(vnode) { return vnode.elm; })
	            .compose(function (stream) { return xstream_1.default.merge(stream, xstream_1.default.never()); }) // don't complete this stream
	            .startWith(rootElement);
	        /* tslint:disable:no-empty */
	        rootElement$.addListener({ next: function () { }, error: function () { }, complete: function () { } });
	        /* tslint:enable:no-empty */
	        return new MainDOMSource_1.MainDOMSource(rootElement$, runStreamAdapter, [], isolateModule, delegators, name);
	    }
	    ;
	    DOMDriver.streamAdapter = xstream_adapter_1.default;
	    return DOMDriver;
	}
	exports.makeDOMDriver = makeDOMDriver;
	//# sourceMappingURL=makeDOMDriver.js.map

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_adapter_1 = __webpack_require__(6);
	var transposition_1 = __webpack_require__(42);
	var HTMLSource_1 = __webpack_require__(98);
	var toHTML = __webpack_require__(211);
	/* tslint:disable:no-empty */
	var noop = function () { };
	/* tslint:enable:no-empty */
	function makeHTMLDriver(effect, options) {
	    if (!options) {
	        options = {};
	    }
	    var transposition = options.transposition || false;
	    function htmlDriver(vnode$, runStreamAdapter, name) {
	        var transposeVNode = transposition_1.makeTransposeVNode(runStreamAdapter);
	        var preprocessedVNode$ = (transposition ? vnode$.map(transposeVNode).flatten() : vnode$);
	        var html$ = preprocessedVNode$.map(toHTML);
	        html$.addListener({
	            next: effect || noop,
	            error: noop,
	            complete: noop,
	        });
	        return new HTMLSource_1.HTMLSource(html$, runStreamAdapter, name);
	    }
	    ;
	    htmlDriver.streamAdapter = xstream_adapter_1.default;
	    return htmlDriver;
	}
	exports.makeHTMLDriver = makeHTMLDriver;
	//# sourceMappingURL=makeHTMLDriver.js.map

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_adapter_1 = __webpack_require__(6);
	var xstream_1 = __webpack_require__(2);
	var SCOPE_PREFIX = '___';
	var MockedDOMSource = (function () {
	    function MockedDOMSource(_streamAdapter, _mockConfig) {
	        this._streamAdapter = _streamAdapter;
	        this._mockConfig = _mockConfig;
	        if (_mockConfig.elements) {
	            this._elements = _mockConfig.elements;
	        }
	        else {
	            this._elements = _streamAdapter.adapt(xstream_1.default.empty(), xstream_adapter_1.default.streamSubscribe);
	        }
	    }
	    MockedDOMSource.prototype.elements = function () {
	        var out = this._elements;
	        out._isCycleSource = 'MockedDOM';
	        return out;
	    };
	    MockedDOMSource.prototype.events = function (eventType, options) {
	        var mockConfig = this._mockConfig;
	        var keys = Object.keys(mockConfig);
	        var keysLen = keys.length;
	        for (var i = 0; i < keysLen; i++) {
	            var key = keys[i];
	            if (key === eventType) {
	                var out_1 = mockConfig[key];
	                out_1._isCycleSource = 'MockedDOM';
	                return out_1;
	            }
	        }
	        var out = this._streamAdapter.adapt(xstream_1.default.empty(), xstream_adapter_1.default.streamSubscribe);
	        out._isCycleSource = 'MockedDOM';
	        return out;
	    };
	    MockedDOMSource.prototype.select = function (selector) {
	        var mockConfig = this._mockConfig;
	        var keys = Object.keys(mockConfig);
	        var keysLen = keys.length;
	        for (var i = 0; i < keysLen; i++) {
	            var key = keys[i];
	            if (key === selector) {
	                return new MockedDOMSource(this._streamAdapter, mockConfig[key]);
	            }
	        }
	        return new MockedDOMSource(this._streamAdapter, {});
	    };
	    MockedDOMSource.prototype.isolateSource = function (source, scope) {
	        return source.select('.' + SCOPE_PREFIX + scope);
	    };
	    MockedDOMSource.prototype.isolateSink = function (sink, scope) {
	        return sink.map(function (vnode) {
	            if (vnode.sel.indexOf(SCOPE_PREFIX + scope) !== -1) {
	                return vnode;
	            }
	            else {
	                vnode.sel += "." + SCOPE_PREFIX + scope;
	                return vnode;
	            }
	        });
	    };
	    return MockedDOMSource;
	}());
	exports.MockedDOMSource = MockedDOMSource;
	function mockDOMSource(streamAdapter, mockConfig) {
	    return new MockedDOMSource(streamAdapter, mockConfig);
	}
	exports.mockDOMSource = mockDOMSource;
	//# sourceMappingURL=mockDOMSource.js.map

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ClassModule = __webpack_require__(73);
	exports.ClassModule = ClassModule;
	var PropsModule = __webpack_require__(76);
	exports.PropsModule = PropsModule;
	var AttrsModule = __webpack_require__(72);
	exports.AttrsModule = AttrsModule;
	var EventsModule = __webpack_require__(74);
	exports.EventsModule = EventsModule;
	var StyleModule = __webpack_require__(77);
	exports.StyleModule = StyleModule;
	var HeroModule = __webpack_require__(75);
	exports.HeroModule = HeroModule;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = [StyleModule, ClassModule, PropsModule, AttrsModule];
	//# sourceMappingURL=modules.js.map

/***/ },
/* 109 */
/***/ function(module, exports) {

	"use strict";
	var clickEvent = 'undefined' !== typeof document && document.ontouchstart ?
	    'touchstart' : 'click';
	function which(ev) {
	    if (typeof window === 'undefined') {
	        return false;
	    }
	    var e = ev || window.event;
	    return e.which === null ? e.button : e.which;
	}
	function sameOrigin(href) {
	    if (typeof window === 'undefined') {
	        return false;
	    }
	    return href && href.indexOf(window.location.origin) === 0;
	}
	function makeClickListener(push) {
	    return function clickListener(event) {
	        if (which(event) !== 1) {
	            return;
	        }
	        if (event.metaKey || event.ctrlKey || event.shiftKey) {
	            return;
	        }
	        if (event.defaultPrevented) {
	            return;
	        }
	        var element = event.target;
	        while (element && element.nodeName !== 'A') {
	            element = element.parentNode;
	        }
	        if (!element || element.nodeName !== 'A') {
	            return;
	        }
	        if (element.hasAttribute('download') ||
	            element.getAttribute('rel') === 'external') {
	            return;
	        }
	        if (element.target) {
	            return;
	        }
	        var link = element.getAttribute('href');
	        if (link && link.indexOf('mailto:') > -1 || link.charAt(0) === '#') {
	            return;
	        }
	        if (!sameOrigin(element.href)) {
	            return;
	        }
	        event.preventDefault();
	        var pathname = element.pathname, search = element.search, _a = element.hash, hash = _a === void 0 ? '' : _a;
	        push(pathname + search + hash);
	    };
	}
	function captureClicks(push) {
	    var listener = makeClickListener(push);
	    if (typeof window !== 'undefined') {
	        document.addEventListener(clickEvent, listener, false);
	    }
	}
	exports.captureClicks = captureClicks;
	//# sourceMappingURL=captureClicks.js.map

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var captureClicks_1 = __webpack_require__(109);
	function makeUpdateHistory(history) {
	    return function updateHistory(location) {
	        if ('string' === typeof location) {
	            history.push(history.createLocation(location));
	        }
	        else if ('object' === typeof location) {
	            // suport things like history.replace()
	            var _a = location.type, type = _a === void 0 ? 'push' : _a;
	            if (type === 'go') {
	                history[type](location);
	            }
	            else {
	                history[type](location);
	            }
	        }
	        else {
	            throw new Error('History Driver input must be a string or an ' +
	                'object but received ${typeof url}');
	        }
	    };
	}
	function defaultOnErrorFn(err) {
	    if (console && console.error !== void 0) {
	        console.error(err);
	    }
	}
	function makeHistoryDriver(history, options) {
	    if (!history || typeof history !== 'object'
	        || typeof history.createLocation !== 'function'
	        || typeof history.createHref !== 'function'
	        || typeof history.listen !== 'function'
	        || typeof history.push !== 'function') {
	        throw new TypeError('makeHistoryDriver requires an valid history object ' +
	            'containing createLocation(), createHref(), push(), and listen() methods');
	    }
	    var capture = options && options.capture || false;
	    var onError = options && options.onError || defaultOnErrorFn;
	    return function historyDriver(sink$, runSA) {
	        var _a = runSA.makeSubject(), observer = _a.observer, stream = _a.stream;
	        var history$ = runSA.remember(stream
	            .startWith(history.getCurrentLocation())
	            .filter(Boolean));
	        var unlisten = history.listen(function (location) {
	            observer.next(location);
	        });
	        if (typeof history.addCompleteCallback === 'function'
	            && typeof history.complete === 'function') {
	            history.addCompleteCallback(function () {
	                observer.complete();
	            });
	        }
	        runSA.streamSubscribe(sink$, {
	            next: makeUpdateHistory(history),
	            error: onError,
	            complete: function () {
	                unlisten();
	                observer.complete();
	            }
	        });
	        if (capture) {
	            captureClicks_1.captureClicks(function (pathname) {
	                var location = history.createLocation(pathname);
	                history.push(location);
	            });
	        }
	        history$.createHref = function (href) { return history.createHref(href); };
	        history$.createLocation = function (location) { return history.createLocation(location); };
	        return history$;
	    };
	}
	exports.makeHistoryDriver = makeHistoryDriver;
	//# sourceMappingURL=makeHistoryDriver.js.map

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(44);
	var ServerHistory = (function () {
	    function ServerHistory(currentLocation) {
	        this.currentLocation = currentLocation;
	        this.listeners = [];
	    }
	    ServerHistory.prototype.listen = function (listener) {
	        this.listeners.push(listener);
	        return function noop() { return void 0; };
	    };
	    ServerHistory.prototype.push = function (location) {
	        var length = this.listeners.length;
	        if (length === 0) {
	            throw new Error('Must be given at least one listener before pushing');
	        }
	        for (var i = 0; i < length; ++i) {
	            this.listeners[i](util_1.createLocation(location));
	        }
	    };
	    ServerHistory.prototype.replace = function (location) {
	        this.push(location);
	    };
	    ServerHistory.prototype.createHref = function (path) {
	        return path;
	    };
	    ServerHistory.prototype.createLocation = function (location) {
	        return util_1.createLocation(location);
	    };
	    ServerHistory.prototype.getCurrentLocation = function () {
	        return this.currentLocation;
	    };
	    ServerHistory.prototype.addCompleteCallback = function (complete) {
	        this._completeCallback = complete;
	    };
	    ServerHistory.prototype.complete = function () {
	        this._completeCallback();
	    };
	    return ServerHistory;
	}());
	function createServerHistory(loc) {
	    return new ServerHistory(loc ? util_1.createLocation(loc) : null);
	}
	exports.createServerHistory = createServerHistory;
	//# sourceMappingURL=serverHistory.js.map

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_1 = __webpack_require__(2);
	var MainHTTPSource_1 = __webpack_require__(45);
	var xstream_adapter_1 = __webpack_require__(6);
	var superagent = __webpack_require__(221);
	function preprocessReqOptions(reqOptions) {
	    reqOptions.withCredentials = reqOptions.withCredentials || false;
	    reqOptions.redirects = typeof reqOptions.redirects === 'number' ? reqOptions.redirects : 5;
	    reqOptions.method = reqOptions.method || "get";
	    return reqOptions;
	}
	function optionsToSuperagent(rawReqOptions) {
	    var reqOptions = preprocessReqOptions(rawReqOptions);
	    if (typeof reqOptions.url !== "string") {
	        throw new Error("Please provide a `url` property in the request options.");
	    }
	    var lowerCaseMethod = reqOptions.method.toLowerCase();
	    var sanitizedMethod = lowerCaseMethod === "delete" ? "del" : lowerCaseMethod;
	    var request = superagent[sanitizedMethod](reqOptions.url);
	    if (typeof request.redirects === "function") {
	        request = request.redirects(reqOptions.redirects);
	    }
	    if (reqOptions.type) {
	        request = request.type(reqOptions.type);
	    }
	    if (reqOptions.send) {
	        request = request.send(reqOptions.send);
	    }
	    if (reqOptions.accept) {
	        request = request.accept(reqOptions.accept);
	    }
	    if (reqOptions.query) {
	        request = request.query(reqOptions.query);
	    }
	    if (reqOptions.withCredentials) {
	        request = request.withCredentials();
	    }
	    if (typeof reqOptions.user === 'string' && typeof reqOptions.password === 'string') {
	        request = request.auth(reqOptions.user, reqOptions.password);
	    }
	    if (reqOptions.headers) {
	        for (var key in reqOptions.headers) {
	            if (reqOptions.headers.hasOwnProperty(key)) {
	                request = request.set(key, reqOptions.headers[key]);
	            }
	        }
	    }
	    if (reqOptions.field) {
	        for (var key in reqOptions.field) {
	            if (reqOptions.field.hasOwnProperty(key)) {
	                request = request.field(key, reqOptions.field[key]);
	            }
	        }
	    }
	    if (reqOptions.attach) {
	        for (var i = reqOptions.attach.length - 1; i >= 0; i--) {
	            var a = reqOptions.attach[i];
	            request = request.attach(a.name, a.path, a.filename);
	        }
	    }
	    return request;
	}
	exports.optionsToSuperagent = optionsToSuperagent;
	function createResponse$(reqInput) {
	    return xstream_1.default.create({
	        start: function startResponseStream(listener) {
	            try {
	                var reqOptions_1 = normalizeRequestInput(reqInput);
	                this.request = optionsToSuperagent(reqOptions_1);
	                if (reqOptions_1.progress) {
	                    this.request = this.request.on('progress', function (res) {
	                        res.request = reqOptions_1;
	                        listener.next(res);
	                    });
	                }
	                this.request.end(function (err, res) {
	                    if (err) {
	                        listener.error(err);
	                    }
	                    else {
	                        res.request = reqOptions_1;
	                        listener.next(res);
	                        listener.complete();
	                    }
	                });
	            }
	            catch (err) {
	                listener.error(err);
	            }
	        },
	        stop: function stopResponseStream() {
	            if (this.request && this.request.abort) {
	                this.request.abort();
	            }
	        },
	    });
	}
	exports.createResponse$ = createResponse$;
	function softNormalizeRequestInput(reqInput) {
	    var reqOptions;
	    try {
	        reqOptions = normalizeRequestInput(reqInput);
	    }
	    catch (err) {
	        reqOptions = { url: 'Error', _error: err };
	    }
	    return reqOptions;
	}
	function normalizeRequestInput(reqOptions) {
	    if (typeof reqOptions === 'string') {
	        return { url: reqOptions };
	    }
	    else if (typeof reqOptions === 'object') {
	        return reqOptions;
	    }
	    else {
	        throw new Error("Observable of requests given to HTTP Driver must emit " +
	            "either URL strings or objects with parameters.");
	    }
	}
	function makeRequestInputToResponse$(runStreamAdapter) {
	    return function requestInputToResponse$(reqInput) {
	        var response$ = createResponse$(reqInput).remember();
	        var reqOptions = softNormalizeRequestInput(reqInput);
	        if (!reqOptions.lazy) {
	            /* tslint:disable:no-empty */
	            response$.addListener({ next: function () { }, error: function () { }, complete: function () { } });
	        }
	        response$ = (runStreamAdapter) ?
	            runStreamAdapter.adapt(response$, xstream_adapter_1.default.streamSubscribe) :
	            response$;
	        Object.defineProperty(response$, 'request', {
	            value: reqOptions,
	            writable: false,
	        });
	        return response$;
	    };
	}
	function makeHTTPDriver() {
	    function httpDriver(request$, runSA, name) {
	        var response$$ = request$
	            .map(makeRequestInputToResponse$(runSA));
	        var httpSource = new MainHTTPSource_1.MainHTTPSource(response$$, runSA, name, []);
	        /* tslint:disable:no-empty */
	        response$$.addListener({ next: function () { }, error: function () { }, complete: function () { } });
	        /* tslint:enable:no-empty */
	        return httpSource;
	    }
	    httpDriver.streamAdapter = xstream_adapter_1.default;
	    return httpDriver;
	}
	exports.makeHTTPDriver = makeHTTPDriver;
	//# sourceMappingURL=http-driver.js.map


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * HTTP Driver factory.
	 *
	 * This is a function which, when called, returns a HTTP Driver for Cycle.js
	 * apps. The driver is also a function, and it takes a stream of requests as
	 * input, and outputs an HTTP Source, an object with some functions to query for
	 * response streams.
	 *
	 * **Requests**. The stream of requests should emit either strings or objects.
	 * If the stream emits strings, those should be the URL of the remote resource
	 * over HTTP. If the stream emits objects, these should be instructions how
	 * superagent should execute the request. These objects follow a structure
	 * similar to superagent's request API itself. `request` object properties:
	 *
	 * - `url` *(String)*: the remote resource path. **required**
	 * - `method` *(String)*: HTTP Method for the request (GET, POST, PUT, etc).
	 * - `category` *(String)*: an optional and arbitrary key that may be used in
	 * the HTTP Source when querying for the response. E.g.
	 * `sources.http.select(category)`
	 * - `query` *(Object)*: an object with the payload for `GET` or `POST`.
	 * - `send` *(Object)*: an object with the payload for `POST`.
	 * - `headers` *(Object)*: object specifying HTTP headers.
	 * - `accept` *(String)*: the Accept header.
	 * - `type` *(String)*: a short-hand for setting Content-Type.
	 * - `user` *(String)*: username for authentication.
	 * - `password` *(String)*: password for authentication.
	 * - `field` *(Object)*: object where key/values are Form fields.
	 * - `progress` *(Boolean)*: whether or not to detect and emit progress events
	 * on the response Observable.
	 * - `attach` *(Array)*: array of objects, where each object specifies `name`,
	 * `path`, and `filename` of a resource to upload.
	 * - `withCredentials` *(Boolean)*: enables the ability to send cookies from the
	 * origin.
	 * - `redirects` *(Number)*: number of redirects to follow.
	 * - `lazy` *(Boolean)*: whether or not this request runs lazily, which means
	 * the request happens if and only if its corresponding response stream from the
	 * HTTP Source is subscribed to. By default this value is false: requests run
	 * eagerly, even if their response is ignored by the application.
	 *
	 * **Responses**. A metastream is a stream that emits streams. The HTTP Source
	 * manages response metastreams. These streams of responses have a `request`
	 * field attached to them (to the stream object itself) indicating which request
	 * (from the driver input) generated this response streams. The HTTP Source has
	 * functions `filter()` and `select()`, but is not itself a stream. So you can
	 * call `sources.HTTP.filter(request => request.url === X)` to get a new HTTP
	 * Source object which is filtered for response streams that match the condition
	 * given, and may call `sources.HTTP.select(category)` to get a metastream of
	 * response that match the category key. With an HTTP Source, you can also call
	 * `httpSource.select()` with no param to get the metastream. You should flatten
	 * the metastream before consuming it, then the resulting response stream will
	 * emit the response object received through superagent.
	 *
	 * @return {Function} the HTTP Driver function
	 * @function makeHTTPDriver
	 */
	var http_driver_1 = __webpack_require__(112);
	exports.makeHTTPDriver = http_driver_1.makeHTTPDriver;
	//# sourceMappingURL=index.js.map

/***/ },
/* 114 */
/***/ function(module, exports) {

	"use strict";
	function isolateSource(httpSource, scope) {
	    return httpSource.filter(function (request) {
	        return Array.isArray(request._namespace) &&
	            request._namespace.indexOf(scope) !== -1;
	    });
	}
	exports.isolateSource = isolateSource;
	function isolateSink(request$, scope) {
	    return request$.map(function (req) {
	        if (typeof req === "string") {
	            return { url: req, _namespace: [scope] };
	        }
	        var reqOptions = req;
	        reqOptions._namespace = reqOptions._namespace || [];
	        reqOptions._namespace.push(scope);
	        return reqOptions;
	    });
	}
	exports.isolateSink = isolateSink;
	//# sourceMappingURL=isolate.js.map

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var base_1 = __webpack_require__(93);
	var xstream_adapter_1 = __webpack_require__(6);
	/**
	 * Takes a `main` function and circularly connects it to the given collection
	 * of driver functions.
	 *
	 * **Example:**
	 * ```js
	 * import {run} from '@cycle/xstream-run';
	 * const dispose = run(main, drivers);
	 * // ...
	 * dispose();
	 * ```
	 *
	 * The `main` function expects a collection of "source" streams (returned from
	 * drivers) as input, and should return a collection of "sink" streams (to be
	 * given to drivers). A "collection of streams" is a JavaScript object where
	 * keys match the driver names registered by the `drivers` object, and values
	 * are the streams. Refer to the documentation of each driver to see more
	 * details on what types of sources it outputs and sinks it receives.
	 *
	 * @param {Function} main a function that takes `sources` as input and outputs
	 * `sinks`.
	 * @param {Object} drivers an object where keys are driver names and values
	 * are driver functions.
	 * @return {Function} a dispose function, used to terminate the execution of the
	 * Cycle.js program, cleaning up resources used.
	 * @function run
	 */
	function run(main, drivers) {
	    var _a = base_1.default(main, drivers, { streamAdapter: xstream_adapter_1.default }), run = _a.run, sinks = _a.sinks;
	    if (typeof window !== 'undefined' && window['CyclejsDevTool_startGraphSerializer']) {
	        window['CyclejsDevTool_startGraphSerializer'](sinks);
	    }
	    return run();
	}
	exports.run = run;
	/**
	 * A function that prepares the Cycle application to be executed. Takes a `main`
	 * function and prepares to circularly connects it to the given collection of
	 * driver functions. As an output, `Cycle()` returns an object with three
	 * properties: `sources`, `sinks` and `run`. Only when `run()` is called will
	 * the application actually execute. Refer to the documentation of `run()` for
	 * more details.
	 *
	 * **Example:**
	 * ```js
	 * import Cycle from '@cycle/xstream-run';
	 * const {sources, sinks, run} = Cycle(main, drivers);
	 * // ...
	 * const dispose = run(); // Executes the application
	 * // ...
	 * dispose();
	 * ```
	 *
	 * @param {Function} main a function that takes `sources` as input and outputs
	 * `sinks`.
	 * @param {Object} drivers an object where keys are driver names and values
	 * are driver functions.
	 * @return {Object} an object with three properties: `sources`, `sinks` and
	 * `run`. `sources` is the collection of driver sources, `sinks` is the
	 * collection of driver sinks, these can be used for debugging or testing. `run`
	 * is the function that once called will execute the application.
	 * @function Cycle
	 */
	var Cycle = function (main, drivers) {
	    var out = base_1.default(main, drivers, { streamAdapter: xstream_adapter_1.default });
	    if (typeof window !== 'undefined' && window['CyclejsDevTool_startGraphSerializer']) {
	        window['CyclejsDevTool_startGraphSerializer'](out.sinks);
	    }
	    return out;
	};
	Cycle.run = run;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Cycle;
	//# sourceMappingURL=index.js.map

/***/ },
/* 116 */,
/* 117 */
/***/ function(module, exports) {

	"use strict";
	
	function updateProps(oldVnode, vnode) {
	  var key,
	      cur,
	      old,
	      elm = vnode.elm,
	      props = vnode.data.liveProps || {};
	  for (key in props) {
	    cur = props[key];
	    old = elm[key];
	    if (old !== cur) elm[key] = cur;
	  }
	}
	
	module.exports = { create: updateProps, update: updateProps };

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _dialog = __webpack_require__(120);
	
	var _dialog2 = _interopRequireDefault(_dialog);
	
	var _loginForm = __webpack_require__(46);
	
	var _loginForm2 = _interopRequireDefault(_loginForm);
	
	var _mergeSinks = __webpack_require__(11);
	
	var _mergeSinks2 = _interopRequireDefault(_mergeSinks);
	
	var _snabbdomJsx = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function provideRelogin(Component) {
	    return function (sources) {
	        var errorResponse$ = sources.HTTP.select().flatten().filter(function (o) {
	            return o.response.statusCode == 401;
	        });
	        var loginDialog$ = errorResponse$.map(function (_ref) {
	            var request = _ref.request;
	
	            var loginForm = (0, _loginForm2.default)(_extends({ renderActions$: _xstream2.default.of(false) }, sources));
	            var modal = (0, _dialog2.default)({
	                DOM: sources.DOM,
	                open$: _xstream2.default.of(true),
	                close$: loginForm.afterSubmit$.filter(function (_ref2) {
	                    var response = _ref2.response;
	                    return response.ok;
	                }),
	                modal$: _xstream2.default.of(true),
	                header$: _xstream2.default.of('Kirjaudu'),
	                content$: loginForm.DOM,
	                footer$: loginForm.actions$.map(function (actions) {
	                    return actions.submit.DOM;
	                }).flatten()
	            });
	            return {
	                sinks: (0, _mergeSinks2.default)({ DOM: modal.DOM }, loginForm, modal),
	                request: request
	            };
	        }).remember();
	        var sinks = {
	            DOM: loginDialog$.map(function (loginDialog) {
	                return loginDialog.sinks.DOM;
	            }).flatten(),
	            HTTP: loginDialog$.map(function (loginDialog) {
	                return _xstream2.default.merge(loginDialog.sinks.HTTP, loginDialog.sinks.afterSubmit$.filter(function (_ref3) {
	                    var response = _ref3.response;
	                    return response.ok;
	                }).mapTo(loginDialog.request));
	            }).flatten(),
	            preventDefault: loginDialog$.map(function (loginDialog) {
	                return loginDialog.sinks.preventDefault;
	            }).flatten(),
	            user$: _xstream2.default.merge(errorResponse$.mapTo(null), loginDialog$.map(function (loginDialog) {
	                return loginDialog.sinks.user$;
	            }).flatten())
	        };
	
	        var cSinks = Component(sources);
	        return (0, _mergeSinks2.default)({
	            DOM: _xstream2.default.combine(sinks.DOM.startWith(''), cSinks.DOM).map(function (_ref4) {
	                var _ref5 = _slicedToArray(_ref4, 2);
	
	                var dialog = _ref5[0];
	                var dom = _ref5[1];
	                return (0, _snabbdomJsx.html)(
	                    'div',
	                    null,
	                    dialog,
	                    dom
	                );
	            })
	        }, sinks, cSinks);
	    };
	}
	
	exports.default = provideRelogin;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _classes = __webpack_require__(14);
	
	var _classes2 = _interopRequireDefault(_classes);
	
	var _alerts = __webpack_require__(181);
	
	var _alerts2 = _interopRequireDefault(_alerts);
	
	var _isolate = __webpack_require__(4);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function intent(_ref) {
	    var DOM = _ref.DOM;
	    var close$ = _ref.close$;
	
	    return {
	        close$: _xstream2.default.merge(close$, DOM.select('.' + _alerts2.default.closeButton).events('click'))
	    };
	}
	
	function model(actions) {
	    return {
	        open$: actions.close$.mapTo(false).startWith(true)
	    };
	}
	
	function view(_ref2) {
	    var state = _ref2.state;
	    var props$ = _ref2.props$;
	    var header$ = _ref2.header$;
	    var content$ = _ref2.content$;
	    var type$ = _ref2.type$;
	    var closable$ = _ref2.closable$;
	
	    return _xstream2.default.combine(state.open$, props$, header$, content$, type$, closable$).map(function (_ref3) {
	        var _ref4 = _slicedToArray(_ref3, 6);
	
	        var open = _ref4[0];
	        var props = _ref4[1];
	        var header = _ref4[2];
	        var content = _ref4[3];
	        var type = _ref4[4];
	        var closable = _ref4[5];
	
	        var newProps = (0, _classes2.default)(props).add(_alerts2.default.alert);
	        if (type) {
	            newProps.add(_alerts2.default[type]);
	        }
	        props = newProps.normalize();
	        return (0, _snabbdomJsx.html)(
	            'div',
	            _extends({}, props, { hidden: !open }),
	            header ? (0, _snabbdomJsx.html)(
	                'h1',
	                null,
	                header
	            ) : '',
	            closable ? (0, _snabbdomJsx.html)(
	                'button',
	                { type: 'button', className: _alerts2.default.closeButton },
	                (0, _snabbdomJsx.html)('i', { className: 'fa fa-times' })
	            ) : '',
	            content ? content : ''
	        );
	    });
	}
	
	function Alert(_ref5) {
	    var DOM = _ref5.DOM;
	    var _ref5$props$ = _ref5.props$;
	    var props$ = _ref5$props$ === undefined ? _xstream2.default.of({}) : _ref5$props$;
	    var _ref5$header$ = _ref5.header$;
	    var header$ = _ref5$header$ === undefined ? _xstream2.default.of(false) : _ref5$header$;
	    var _ref5$content$ = _ref5.content$;
	    var content$ = _ref5$content$ === undefined ? _xstream2.default.of(false) : _ref5$content$;
	    var _ref5$type$ = _ref5.type$;
	    var type$ = _ref5$type$ === undefined ? _xstream2.default.of(null) : _ref5$type$;
	    var _ref5$close$ = _ref5.close$;
	    var close$ = _ref5$close$ === undefined ? _xstream2.default.never() : _ref5$close$;
	    var _ref5$closable$ = _ref5.closable$;
	    var closable$ = _ref5$closable$ === undefined ? _xstream2.default.of(true) : _ref5$closable$;
	
	    var actions = intent({ DOM: DOM, close$: close$ });
	    var state = model(actions);
	    var vdom$ = view({ state: state, props$: props$, header$: header$, content$: content$, type$: type$, closable$: closable$ });
	    return {
	        DOM: vdom$
	    };
	}
	
	exports.default = function (sources) {
	    return (0, _isolate2.default)(Alert)(sources);
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _isolate = __webpack_require__(4);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _dialog = __webpack_require__(183);
	
	var _dialog2 = _interopRequireDefault(_dialog);
	
	var _classes = __webpack_require__(14);
	
	var _classes2 = _interopRequireDefault(_classes);
	
	var _button = __webpack_require__(18);
	
	var _button2 = _interopRequireDefault(_button);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createComponents(DOM) {
	    var closeButton = (0, _button2.default)({
	        DOM: DOM,
	        props$: _xstream2.default.of({
	            content: (0, _snabbdomJsx.html)('i', { className: 'fa fa-times' }),
	            type: 'button',
	            look: 'plain',
	            className: _dialog2.default.closeButton
	        })
	    });
	    return {
	        closeButton: closeButton
	    };
	}
	
	function intent(DOM, open$, closeWhen$, components) {
	    var outsideClick$ = DOM.select('.' + _dialog2.default.backdrop).events('click');
	    var close$ = _xstream2.default.merge(closeWhen$, components.closeButton.click$);
	    return {
	        open$: open$,
	        close$: close$,
	        outsideClick$: outsideClick$
	    };
	}
	
	function model(_ref, modal$) {
	    var open$ = _ref.open$;
	    var close$ = _ref.close$;
	    var outsideClick$ = _ref.outsideClick$;
	
	    var state = {
	        open$: _xstream2.default.merge(open$.mapTo(true), close$.mapTo(false), modal$.map(function (isModal) {
	            return isModal ? _xstream2.default.never() : outsideClick$.mapTo(false);
	        }).flatten()).startWith(false)
	    };
	    return state;
	}
	
	function view(_ref2, props$, header$, content$, footer$, components) {
	    var open$ = _ref2.open$;
	
	    return _xstream2.default.combine(open$, props$, header$, content$, footer$, components.closeButton.DOM).map(function (_ref3) {
	        var _ref4 = _slicedToArray(_ref3, 6);
	
	        var isOpen = _ref4[0];
	        var props = _ref4[1];
	        var header = _ref4[2];
	        var content = _ref4[3];
	        var footer = _ref4[4];
	        var closeButton = _ref4[5];
	
	        props = (0, _classes2.default)(props).add(_dialog2.default.dialog).normalize();
	        return (0, _snabbdomJsx.html)(
	            'div',
	            { 'attrs-hidden': !isOpen },
	            (0, _snabbdomJsx.html)('div', { className: _dialog2.default.backdrop }),
	            (0, _snabbdomJsx.html)(
	                'div',
	                _extends({}, props, { 'style-display': isOpen ? 'block' : 'none' }),
	                header ? (0, _snabbdomJsx.html)(
	                    'header',
	                    null,
	                    header,
	                    closeButton
	                ) : '',
	                (0, _snabbdomJsx.html)(
	                    'main',
	                    null,
	                    content
	                ),
	                footer ? (footer = Array.isArray(footer) ? footer : [footer], (0, _snabbdomJsx.html)(
	                    'footer',
	                    null,
	                    (0, _snabbdomJsx.html)(
	                        'ul',
	                        null,
	                        footer.map(function (elem) {
	                            return (0, _snabbdomJsx.html)(
	                                'li',
	                                null,
	                                elem
	                            );
	                        })
	                    )
	                )) : ''
	            )
	        );
	    });
	}
	
	function Dialog(_ref5) {
	    var DOM = _ref5.DOM;
	    var _ref5$props$ = _ref5.props$;
	    var props$ = _ref5$props$ === undefined ? _xstream2.default.of({}) : _ref5$props$;
	    var open$ = _ref5.open$;
	    var _ref5$close$ = _ref5.close$;
	    var close$ = _ref5$close$ === undefined ? _xstream2.default.never() : _ref5$close$;
	    var _ref5$modal$ = _ref5.modal$;
	    var modal$ = _ref5$modal$ === undefined ? _xstream2.default.of(false) : _ref5$modal$;
	    var _ref5$header$ = _ref5.header$;
	    var header$ = _ref5$header$ === undefined ? _xstream2.default.of(false) : _ref5$header$;
	    var content$ = _ref5.content$;
	    var _ref5$footer$ = _ref5.footer$;
	    var footer$ = _ref5$footer$ === undefined ? _xstream2.default.of(false) : _ref5$footer$;
	
	    var components = createComponents(DOM);
	    var actions = intent(DOM, open$, close$, components);
	    var state = model(actions, modal$);
	    var vdom$ = view(state, props$, header$, content$, footer$, components);
	    return {
	        DOM: vdom$
	    };
	}
	
	exports.default = function (sources) {
	    return (0, _isolate2.default)(Dialog)(sources);
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _isolate = __webpack_require__(4);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _formField = __webpack_require__(10);
	
	var _formField2 = _interopRequireDefault(_formField);
	
	var _addDecField = __webpack_require__(184);
	
	var _addDecField2 = _interopRequireDefault(_addDecField);
	
	var _ramda = __webpack_require__(5);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function AddDecField(_ref) {
	    var DOM = _ref.DOM;
	    var _ref$props$ = _ref.props$;
	    var props$ = _ref$props$ === undefined ? _xstream2.default.of({}) : _ref$props$;
	    var _ref$min$ = _ref.min$;
	    var min$ = _ref$min$ === undefined ? _xstream2.default.of(null) : _ref$min$;
	    var _ref$max$ = _ref.max$;
	    var max$ = _ref$max$ === undefined ? _xstream2.default.of(null) : _ref$max$;
	
	    var dec$ = _xstream2.default.create();
	    var add$ = _xstream2.default.create();
	    var initialValue$ = props$.map(function (props) {
	        return _ramda2.default.propOr(0, 'value', props);
	    });
	    var value$ = _xstream2.default.combine(_xstream2.default.merge(initialValue$, dec$, add$, DOM.select('input').events('change').map(function (e) {
	        var value = parseInt(e.target.value);
	        if (isNaN(value)) {
	            return 0;
	        }
	        return value;
	    })), min$, max$).map(function (_ref2) {
	        var _ref3 = _slicedToArray(_ref2, 3);
	
	        var value = _ref3[0];
	        var min = _ref3[1];
	        var max = _ref3[2];
	
	        if (min !== null && _ramda2.default.lt(value, min)) {
	            value = min;
	        }
	        if (max !== null && _ramda2.default.gt(value, max)) {
	            value = max;
	        }
	        return value;
	    }).remember();
	    dec$.imitate(value$.map(function (value) {
	        return DOM.select('.addButton').events('click').mapTo(value - 1);
	    }).flatten());
	    add$.imitate(value$.map(function (value) {
	        return DOM.select('.decButton').events('click').mapTo(value + 1);
	    }).flatten());
	
	    var vdom$ = _xstream2.default.combine(props$, value$).map(function (_ref4) {
	        var _ref5 = _slicedToArray(_ref4, 2);
	
	        var props = _ref5[0];
	        var value = _ref5[1];
	
	        return (0, _snabbdomJsx.html)(
	            'div',
	            { className: _addDecField2.default.addDecField },
	            (0, _snabbdomJsx.html)(
	                'button',
	                { type: 'button', classNames: [_addDecField2.default.button, 'addButton'] },
	                (0, _snabbdomJsx.html)('i', { className: 'fa fa-minus-circle' })
	            ),
	            (0, _snabbdomJsx.html)('input', _extends({ type: 'number' }, _ramda2.default.omit(['value'], props), { 'liveProps-value': value })),
	            (0, _snabbdomJsx.html)(
	                'button',
	                { type: 'button', classNames: [_addDecField2.default.button, 'decButton'] },
	                (0, _snabbdomJsx.html)('i', { className: 'fa fa-plus-circle' })
	            )
	        );
	    });
	    return {
	        DOM: vdom$,
	        value$: value$
	    };
	}
	var FormAddDecField = function FormAddDecField(sources) {
	    return (0, _isolate2.default)((0, _formField2.default)(AddDecField))(sources);
	};
	exports.default = FormAddDecField;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _isolate = __webpack_require__(4);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _formField = __webpack_require__(10);
	
	var _formField2 = _interopRequireDefault(_formField);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Checkbox(_ref) {
	    var DOM = _ref.DOM;
	    var props$ = _ref.props$;
	
	    var value$ = DOM.select('input').events('change').map(function (event) {
	        return { checked: event.target.checked, value: event.target.value };
	    });
	    var state$ = props$.map(function (props) {
	        return value$.map(function (newProps) {
	            return Object.assign({}, props, newProps);
	        }).startWith(props);
	    }).flatten().remember();
	
	    var vdom$ = state$.map(function (state) {
	        return (0, _snabbdomJsx.html)('input', _extends({ type: 'checkbox' }, state));
	    });
	    return {
	        DOM: vdom$,
	        value$: state$.map(function (state) {
	            return state.checked ? state.value : '';
	        })
	    };
	}
	var FormCheckbox = function FormCheckbox(sources) {
	    return (0, _isolate2.default)((0, _formField2.default)(Checkbox))(sources);
	};
	exports.default = FormCheckbox;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _ramda = __webpack_require__(5);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	var _button = __webpack_require__(18);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _dropRepeats = __webpack_require__(92);
	
	var _dropRepeats2 = _interopRequireDefault(_dropRepeats);
	
	var _xsCombineObj = __webpack_require__(135);
	
	var _xsCombineObj2 = _interopRequireDefault(_xsCombineObj);
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _alert = __webpack_require__(119);
	
	var _alert2 = _interopRequireDefault(_alert);
	
	var _form = __webpack_require__(16);
	
	var _form2 = _interopRequireDefault(_form);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function pluckCombineNestedObject(prop) {
	    return function (stream$) {
	        return stream$.map(function (object) {
	            return (0, _xsCombineObj2.default)(_ramda2.default.map(function combine(element) {
	                if (element.hasOwnProperty(prop)) {
	                    return element[prop] instanceof _xstream2.default ? element[prop] : _xstream2.default.of(element[prop]);
	                }
	                if (element instanceof _xstream2.default) {
	                    return element.map(function (inner) {
	                        return combine(inner);
	                    }).flatten();
	                }
	                if (Array.isArray(element)) {
	                    return _xstream2.default.combine.apply(_xstream2.default, _toConsumableArray(element.map(function (inner) {
	                        return combine(inner);
	                    })));
	                }
	                return (0, _xsCombineObj2.default)(_ramda2.default.map(function (inner) {
	                    return combine(inner);
	                }, element));
	            }, object));
	        }).flatten();
	    };
	}
	
	function Form(FormConfigComponent) {
	    return function (_ref) {
	        var _ref$renderActions$ = _ref.renderActions$;
	        var renderActions$ = _ref$renderActions$ === undefined ? _xstream2.default.of(true) : _ref$renderActions$;
	
	        var sources = _objectWithoutProperties(_ref, ['renderActions$']);
	
	        var alerts$ = sources.HTTP.select().flatten().map(function (_ref2) {
	            var response = _ref2.response;
	            return response.body.alerts;
	        }).startWith([]);
	        var submitting$ = _xstream2.default.create();
	        var submitTried$ = _xstream2.default.create();
	        var FormComponent = function FormComponent(Component, cSources) {
	            return Component(_extends({
	                DOM: sources.DOM,
	                submitTried$: submitTried$.startWith(false),
	                submitting$: submitting$.startWith(false)
	            }, cSources));
	        };
	        var elementsProxy$ = _xstream2.default.create();
	        var values$ = elementsProxy$.compose(pluckCombineNestedObject('value$'));
	        var valid$ = elementsProxy$.compose(pluckCombineNestedObject('error$')).map(function (elements) {
	            var error = _ramda2.default.find(function hasError(value) {
	                if (Array.isArray(value)) {
	                    return _ramda2.default.find(hasError, value);
	                }
	                if (value === Object(value)) {
	                    return _ramda2.default.find(hasError, _ramda2.default.values(value));
	                }
	                return value !== false;
	            }, _ramda2.default.values(elements));
	            return error === undefined;
	        });
	
	        var submitOn$ = _xstream2.default.create();
	        var validatedValuesAfterSubmit$ = _xstream2.default.combine(valid$, values$).map(function (_ref3) {
	            var _ref4 = _slicedToArray(_ref3, 2);
	
	            var valid = _ref4[0];
	            var values = _ref4[1];
	            return submitOn$.map(function () {
	                return [valid, values];
	            });
	        }).flatten().filter(function (_ref5) {
	            var _ref6 = _slicedToArray(_ref5, 2);
	
	            var valid = _ref6[0];
	            var values = _ref6[1];
	            return valid;
	        }).map(function (_ref7) {
	            var _ref8 = _slicedToArray(_ref7, 2);
	
	            var valid = _ref8[0];
	            var values = _ref8[1];
	            return values;
	        });
	
	        var _FormConfigComponent = FormConfigComponent(_extends({ FormComponent: FormComponent, validatedValuesAfterSubmit$: validatedValuesAfterSubmit$ }, sources));
	
	        var render$ = _FormConfigComponent.render$;
	
	        var sinks = _objectWithoutProperties(_FormConfigComponent, ['render$']);
	
	        submitOn$.imitate(sinks.submitOn$);
	        submitTried$.imitate(sinks.submitOn$.take(1));
	        delete sinks.submitOn$;
	        elementsProxy$.imitate(sinks.elements$);
	        submitting$.imitate(_xstream2.default.merge(validatedValuesAfterSubmit$.mapTo(true), sinks.afterSubmit$.mapTo(false)));
	        sinks.DOM = _xstream2.default.combine(alerts$.map(function (alerts) {
	            return _xstream2.default.combine.apply(_xstream2.default, _toConsumableArray(alerts.map(function (msg) {
	                var alert = (0, _alert2.default)({
	                    DOM: sources.DOM,
	                    content$: _xstream2.default.of(msg),
	                    type$: _xstream2.default.of('error'),
	                    close$: submitOn$
	                });
	                return alert.DOM;
	            })));
	        }).flatten(), render$, renderActions$, sinks.actions$.map(function (actions) {
	            return (0, _xsCombineObj2.default)(_ramda2.default.map(function (elem) {
	                return elem.DOM;
	            }, actions));
	        }).flatten(), elementsProxy$.compose(pluckCombineNestedObject('DOM'))).map(function (_ref9) {
	            var _ref10 = _slicedToArray(_ref9, 5);
	
	            var alerts = _ref10[0];
	            var render = _ref10[1];
	            var renderActions = _ref10[2];
	            var actions = _ref10[3];
	            var elements = _ref10[4];
	            return render(alerts, elements, renderActions ? actions : false, _form2.default);
	        });
	        sinks.preventDefault = _xstream2.default.merge(sources.DOM.select('form').events('submit'), sinks.preventDefault ? sinks.preventDefault : _xstream2.default.never());
	        return sinks;
	    };
	}
	
	exports.default = Form;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _isolate = __webpack_require__(4);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _formField = __webpack_require__(10);
	
	var _formField2 = _interopRequireDefault(_formField);
	
	var _form = __webpack_require__(16);
	
	var _form2 = _interopRequireDefault(_form);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function RadioButtonGroup(_ref) {
	    var DOM = _ref.DOM;
	    var props$ = _ref.props$;
	    var options$ = _ref.options$;
	
	    var value$ = DOM.select('input').events('change').map(function (event) {
	        return event.target.value;
	    });
	    var state$ = props$.map(function (props) {
	        return value$.map(function (value) {
	            return Object.assign({}, props, { value: value });
	        }).startWith(props);
	    }).flatten().remember();
	    var vdom$ = _xstream2.default.combine(state$, options$).map(function (_ref2) {
	        var _ref3 = _slicedToArray(_ref2, 2);
	
	        var state = _ref3[0];
	        var options = _ref3[1];
	
	        return (0, _snabbdomJsx.html)(
	            'span',
	            null,
	            options.map(function (option) {
	                var text = option.text;
	
	                var others = _objectWithoutProperties(option, ['text']);
	
	                if (others.name === undefined) {
	                    others.name = state.name;
	                }
	                if (state.value !== undefined && others.value == state.value) {
	                    others.checked = true;
	                }
	                return (0, _snabbdomJsx.html)(
	                    'label',
	                    { className: _form2.default.radio },
	                    (0, _snabbdomJsx.html)('input', _extends({ type: 'radio' }, others)),
	                    text
	                );
	            })
	        );
	    });
	    return {
	        DOM: vdom$,
	        value$: state$.map(function (state) {
	            return state.value;
	        })
	    };
	}
	var FormRadioButtonGroup = function FormRadioButtonGroup(sources) {
	    return (0, _isolate2.default)((0, _formField2.default)(RadioButtonGroup))(sources);
	};
	exports.default = FormRadioButtonGroup;

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _isolate = __webpack_require__(4);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _formField = __webpack_require__(10);
	
	var _formField2 = _interopRequireDefault(_formField);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function Select(_ref) {
	    var DOM = _ref.DOM;
	    var props$ = _ref.props$;
	    var options$ = _ref.options$;
	
	    var value$ = DOM.select('select').events('change').map(function (event) {
	        return event.target.value;
	    });
	    var state$ = props$.map(function (props) {
	        return value$.map(function (value) {
	            return Object.assign({}, props, { value: value });
	        }).startWith(Object.assign({ value: '' }, props));
	    }).flatten().remember();
	
	    var vdom$ = _xstream2.default.combine(state$, options$).map(function (_ref2) {
	        var _ref3 = _slicedToArray(_ref2, 2);
	
	        var state = _ref3[0];
	        var options = _ref3[1];
	        var value = state.value;
	        var props = state.props;
	
	        return (0, _snabbdomJsx.html)(
	            'select',
	            props,
	            options.map(function (_ref4) {
	                var text = _ref4.text;
	
	                var others = _objectWithoutProperties(_ref4, ['text']);
	
	                if (value == others.value) {
	                    others.selected = true;
	                }
	                return (0, _snabbdomJsx.html)(
	                    'option',
	                    others,
	                    text
	                );
	            })
	        );
	    });
	    return {
	        DOM: vdom$,
	        value$: state$.map(function (state) {
	            return state.value;
	        })
	    };
	}
	var FormSelect = function FormSelect(sources) {
	    return (0, _isolate2.default)((0, _formField2.default)(Select))(sources);
	};
	exports.default = FormSelect;

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _isolate = __webpack_require__(4);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _formField = __webpack_require__(10);
	
	var _formField2 = _interopRequireDefault(_formField);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function TextArea(_ref) {
	    var DOM = _ref.DOM;
	    var props$ = _ref.props$;
	
	    var value$ = DOM.select('textarea').events('input').map(function (event) {
	        return event.target.value;
	    });
	    var state$ = props$.map(function (props) {
	        return value$.map(function (value) {
	            return Object.assign({}, props, { value: value });
	        }).startWith(props);
	    }).flatten().remember();
	
	    var vdom$ = state$.map(function (_ref2) {
	        var value = _ref2.value;
	
	        var state = _objectWithoutProperties(_ref2, ['value']);
	
	        return (0, _snabbdomJsx.html)(
	            'textarea',
	            state,
	            value
	        );
	    });
	    return {
	        DOM: vdom$,
	        value$: state$.map(function (state) {
	            return state.value;
	        })
	    };
	}
	var FormTextArea = function FormTextArea(sources) {
	    return (0, _isolate2.default)((0, _formField2.default)(TextArea))(sources);
	};
	exports.default = FormTextArea;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _isolate = __webpack_require__(4);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _formField = __webpack_require__(10);
	
	var _formField2 = _interopRequireDefault(_formField);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function measureInputValueWidth(vnode) {
	    var span = document.createElement('span');
	    span.appendChild(document.createTextNode(vnode.elm.value));
	    var style = window.getComputedStyle(vnode.elm);
	    span.style.font = style.font;
	    span.style.position = 'absolute';
	    span.style.visibility = 'hidden';
	    document.body.insertBefore(span, document.body.childNodes[0]);
	    var width = span.offsetWidth;
	    var padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
	    document.body.removeChild(span);
	    return { width: width, padding: padding };
	}
	
	function updateWidth(vnode) {
	    var _measureInputValueWid = measureInputValueWidth(vnode);
	
	    var width = _measureInputValueWid.width;
	    var padding = _measureInputValueWid.padding;
	
	    vnode.elm.style.width = width + padding + 'px';
	    vnode.elm.style.minWidth = 'calc(1em + ' + padding + 'px)';
	};
	
	function TextField(_ref) {
	    var DOM = _ref.DOM;
	    var props$ = _ref.props$;
	    var _ref$autoWidth$ = _ref.autoWidth$;
	    var autoWidth$ = _ref$autoWidth$ === undefined ? _xstream2.default.of(false) : _ref$autoWidth$;
	
	    var value$ = DOM.select('input').events('input').map(function (event) {
	        return event.target.value;
	    });
	    var state$ = props$.map(function (props) {
	        return value$.map(function (value) {
	            return Object.assign({}, props, { value: value });
	        }).startWith(Object.assign({ value: '' }, props));
	    }).flatten().remember();
	
	    var vdom$ = _xstream2.default.combine(autoWidth$, state$).map(function (_ref2) {
	        var _ref3 = _slicedToArray(_ref2, 2);
	
	        var autoWidth = _ref3[0];
	        var props = _ref3[1];
	
	        if (!props.type) {
	            props.type = 'text';
	        }
	        var hooks = autoWidth ? {
	            insert: updateWidth,
	            update: updateWidth
	        } : {};
	        return (0, _snabbdomJsx.html)('input', _extends({}, props, { hook: hooks }));
	    });
	    return {
	        DOM: vdom$,
	        value$: state$.map(function (state) {
	            return state.value;
	        })
	    };
	}
	var FormTextField = function FormTextField(sources) {
	    return (0, _isolate2.default)((0, _formField2.default)(TextField))(sources);
	};
	exports.default = FormTextField;

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _ramda = __webpack_require__(5);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	var _validator = __webpack_require__(79);
	
	var _validator2 = _interopRequireDefault(_validator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function validate(value, validators) {
	    value = _ramda2.default.trim(typeof value == 'string' ? value : _ramda2.default.toString(value));
	    for (var i = 0; i < validators.length; ++i) {
	        var type = validators[i][0];
	        var params = validators[i].length > 1 ? validators[i][1] : null;
	        if (typeof type == 'function') {
	            return type(value);
	        } else {
	            switch (type) {
	                case 'required':
	                    if (!_validator2.default.isLength(value, { min: 1 })) {
	                        return 'Pakollinen';
	                    }
	                    break;
	                case 'length':
	                    if (!_validator2.default.isLength(value, params)) {
	                        return 'Kirjoita ' + params.min + ' - ' + params.max + ' merkkiä';
	                    }
	                    break;
	            }
	        }
	    }
	    return true;
	}
	exports.default = validate;

/***/ },
/* 129 */,
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _isolate = __webpack_require__(4);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _navbar = __webpack_require__(187);
	
	var _navbar2 = _interopRequireDefault(_navbar);
	
	var _ramda = __webpack_require__(5);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	var _routes = __webpack_require__(12);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function NavItem(link, location) {
	    var active = false;
	    if (location.state && location.state.navPath) {
	        (function () {
	            var path = location.state.navPath.split('.');
	            var base = [];
	            active = path.some(function (fragment) {
	                var url = _ramda2.default.path([].concat(base, [fragment]), _routes2.default);
	                if (typeof url !== 'string') {
	                    url = url.base;
	                }
	                base.push(fragment);
	                return url == link.url;
	            });
	        })();
	    }
	    return (0, _snabbdomJsx.html)(
	        'li',
	        null,
	        (0, _snabbdomJsx.html)(
	            'a',
	            { 'dataset-link': JSON.stringify(link), href: link.url, 'class': _defineProperty({}, _navbar2.default.active, active) },
	            link.title
	        )
	    );
	}
	
	function view(location$, primaryLinks$, secondaryLinks$) {
	    return _xstream2.default.combine(location$, primaryLinks$, secondaryLinks$).map(function (_ref2) {
	        var _ref3 = _slicedToArray(_ref2, 3);
	
	        var location = _ref3[0];
	        var primaryLinks = _ref3[1];
	        var secondaryLinks = _ref3[2];
	        return (0, _snabbdomJsx.html)(
	            'div',
	            { className: _navbar2.default.navbar },
	            (0, _snabbdomJsx.html)(
	                'nav',
	                null,
	                (0, _snabbdomJsx.html)(
	                    'ul',
	                    null,
	                    primaryLinks.map(function (link) {
	                        return NavItem(link, location);
	                    })
	                ),
	                secondaryLinks.map(function (link) {
	                    if (link === false) {
	                        return false;
	                    }
	                    return NavItem(link, location);
	                }).filter(function (dom) {
	                    return dom !== false;
	                }).map(function (dom) {
	                    return (0, _snabbdomJsx.html)(
	                        'ul',
	                        null,
	                        dom
	                    );
	                })
	            )
	        );
	    });
	}
	
	function Navbar(_ref4) {
	    var DOM = _ref4.DOM;
	    var location$ = _ref4.location$;
	    var _ref4$primaryLinks$ = _ref4.primaryLinks$;
	    var primaryLinks$ = _ref4$primaryLinks$ === undefined ? _xstream2.default.of([]) : _ref4$primaryLinks$;
	    var _ref4$secondaryLinks$ = _ref4.secondaryLinks$;
	    var secondaryLinks$ = _ref4$secondaryLinks$ === undefined ? _xstream2.default.of(false) : _ref4$secondaryLinks$;
	
	    var vdom$ = view(location$, primaryLinks$, secondaryLinks$);
	    var click$ = DOM.select('a').events('click');
	    var navigate$ = click$.map(function (event) {
	        return JSON.parse(event.target.dataset.link);
	    });
	    return {
	        DOM: vdom$,
	        preventDefault: click$,
	        navigate$: navigate$
	    };
	}
	
	exports.default = function (sources) {
	    return (0, _isolate2.default)(Navbar)(sources);
	};

/***/ },
/* 131 */,
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _dexie = __webpack_require__(143);
	
	var _dexie2 = _interopRequireDefault(_dexie);
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// db: xs.of({
	//     category: 'query',
	//     table: 'courses',
	//     get: 1
	// }),
	// db: xs.of({
	//     category: 'query',
	//     table: 'courses',
	//     add: {name: 'foo', location: 'goo'}
	// }),
	// db: xs.of({
	//     category: 'query',
	//     table: 'courses',
	//     update: {id: 4, name: 'foo', location: 'goo'}
	// }),
	// db: xs.of({
	//     category: 'query',
	//     table: 'courses',
	//     delete: 5
	// }),
	// db: xs.of({
	//     category: 'query',
	//     select: 'count',
	//     table: 'courses',
	//     where: ':id',
	//     above: 1,
	//     or: ':id',
	//     below: 5,
	//     and: course => course.location == 'Mukkula',
	//     filter: course => course.location == 'Mukkula',
	//     offset: 1,
	//     limit: 2,
	//     sortBy: ':id DESC',
	//     // sortBy: ':id'
	// })
	
	function eventProducer(obj, event) {
	    return {
	        start: function start(listener) {
	            obj.on(event, function () {
	                listener.next.apply(listener, [obj].concat(Array.prototype.slice.call(arguments)));
	            });
	        },
	        stop: function stop() {}
	    };
	}
	
	function makeDexieDriver(dbName, versions) {
	    var config = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    var db = new _dexie2.default(dbName, { autoOpen: false });
	    versions.forEach(function (_ref, index) {
	        var schema = _ref.schema;
	        var upgrade = _ref.upgrade;
	
	        var version = db.version(index + 1).stores(schema);
	        if (typeof upgrade == 'function') {
	            version.upgrade(upgrade);
	        }
	    });
	    db.open().catch(function (err) {
	        console.error('Failed to open db: ' + (err.stack || err));
	    });
	    if (config.populate) {
	        db.on('populate', function () {
	            config.populate(db);
	        });
	    }
	    return function (query$) {
	        var stream$$ = query$.map(function (query) {
	            var params = ['get', 'add', 'put', 'delete', 'where', 'or', 'and', 'filter', 'offset', 'limit', 'orderBy', 'sortBy'];
	            var q = db[query.table];
	            params.forEach(function (method) {
	                /**
	                 * TODO: handle
	                 *     sortby ':id DESC'
	                 *     between [1,2]
	                 */
	                if (query.hasOwnProperty(method)) {
	                    if (method == 'where' || method == 'or') {
	                        q = q[method].call(q, query[method].index);
	                        var conditions = ['above', 'below'];
	                        conditions.forEach(function (cond) {
	                            if (query[method].hasOwnProperty(cond)) {
	                                q = q[cond].call(q, query[method][cond]);
	                            }
	                        });
	                    } else {
	                        q = q[method].call(q, query[method]);
	                    }
	                }
	            });
	            if (query.hasOwnProperty('select')) {
	                q = q[query.select].call(q);
	            }
	            if (!(q instanceof _dexie2.default.Promise)) {
	                q = q.toArray();
	            }
	
	            var out$ = _xstream2.default.fromPromise(q);
	            out$.category = query.category;
	            return out$;
	        });
	        stream$$.addListener({
	            next: function next() {},
	            error: function error(e) {
	                console.log(e);
	            },
	            complete: function complete() {}
	        });
	        return Object.assign({}, {
	            events: function events(event) {
	                return _xstream2.default.create(eventProducer(db, event));
	            },
	            select: function select(category) {
	                return category === undefined ? stream$$ : stream$$.filter(function (result$) {
	                    return result$.category === category;
	                });
	            }
	        });
	    };
	}
	
	exports.default = makeDexieDriver;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function preventDefaultDriver(prevented$) {
	    prevented$.addListener({
	        next: function next(event) {
	            event.preventDefault();
	            if (event.type === 'blur') {
	                event.target.focus();
	            }
	        },
	        error: function error() {},
	        complete: function complete() {}
	    });
	    return _xstream2.default.empty();
	}
	
	exports.default = preventDefaultDriver;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function userDriver(user$) {
	    var out$ = user$.remember();
	    out$.addListener({
	        next: function next() {},
	        error: function error() {},
	        complete: function complete() {}
	    });
	    return out$;
	}
	
	exports.default = userDriver;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = xsCombineObj;
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function xsCombineObj(obj) {
	    var sources = [];
	    var keys = [];
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            keys.push(key.replace(/\$$/, ''));
	            sources.push(obj[key]);
	        }
	    }
	    return _xstream2.default.combine.apply(_xstream2.default, sources).map(function () {
	        var args = arguments[0];
	        var argsLength = args.length;
	        var combination = {};
	        for (var i = argsLength - 1; i >= 0; --i) {
	            combination[keys[i]] = args[i];
	        }
	
	        return combination;
	    });
	}

/***/ },
/* 136 */,
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	if (true) {
	  module.exports = Emitter;
	}
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util = __webpack_require__(141);
	function isStrictlyInScope(namespace, path) {
	    var pathParts = util.splitPath(path);
	    return namespace.every(function (v, i) {
	        return pathParts[i] === v;
	    });
	}
	function getFilteredPath(namespace, path) {
	    var pathParts = util.splitPath(path);
	    return '/' + util.filterPath(pathParts, namespace);
	}
	var RouterSource = (function () {
	    function RouterSource(history$, _namespace, _createHref, _runSA, _routeMatcher) {
	        this.history$ = history$;
	        this._namespace = _namespace;
	        this._createHref = _createHref;
	        this._runSA = _runSA;
	        this._routeMatcher = _routeMatcher;
	    }
	    RouterSource.prototype.path = function (pathname) {
	        var scopedNamespace = this._namespace.concat(util.splitPath(pathname));
	        var scopedHistory$ = this._runSA.remember(this.history$
	            .filter(function (_a) {
	            var _path = _a.pathname;
	            return isStrictlyInScope(scopedNamespace, _path);
	        }));
	        var createHref = this._createHref;
	        return new RouterSource(scopedHistory$, scopedNamespace, createHref, this._runSA, this._routeMatcher);
	    };
	    RouterSource.prototype.define = function (routes, routeMatcher) {
	        var _this = this;
	        var namespace = this._namespace;
	        var _createHref = this._createHref;
	        var createHref = util.makeCreateHref(namespace, _createHref);
	        var match$ = this._runSA.remember(this.history$
	            .map(function (location) {
	            var matcher = routeMatcher || _this._routeMatcher;
	            var filteredPath = getFilteredPath(namespace, location.pathname);
	            var _a = matcher(filteredPath, routes), path = _a.path, value = _a.value;
	            return { path: path, value: value, location: location, createHref: createHref };
	        }));
	        match$.createHref = createHref;
	        return match$;
	    };
	    RouterSource.prototype.createHref = function (path) {
	        return util.makeCreateHref(this._namespace, this._createHref)(path);
	    };
	    return RouterSource;
	}());
	exports.RouterSource = RouterSource;
	//# sourceMappingURL=RouterSource.js.map

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var makeRouterDriver_1 = __webpack_require__(140);
	exports.makeRouterDriver = makeRouterDriver_1.makeRouterDriver;
	var history_1 = __webpack_require__(43);
	exports.supportsHistory = history_1.supportsHistory;
	exports.createLocation = history_1.createLocation;
	exports.createServerHistory = history_1.createServerHistory;
	//# sourceMappingURL=index.js.map

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var history_1 = __webpack_require__(43);
	var RouterSource_1 = __webpack_require__(138);
	/**
	 * Instantiates an new router driver function using the same arguments required
	 * by @cycle/history.
	 * @public
	 * @method makeRouterDriver
	 * @return {routerDriver} The router driver function
	 */
	function makeRouterDriver(history, routeMatcher, options) {
	    var historyDriver = history_1.makeHistoryDriver(history, options);
	    /**
	     * The actual router driver.
	     * @public
	     * @typedef {routerDriver}
	     * @name routerDriver
	     * @method routerDriver
	     * @param  {Stream<string|Location>} sink$ - This is the same input that the
	     * history driver would expect.
	     * @return {routerAPI}
	     */
	    return function routerDriver(sink$, runSA) {
	        var history$ = runSA.remember(historyDriver(sink$, runSA));
	        return new RouterSource_1.RouterSource(history$, [], history.createHref, runSA, routeMatcher);
	    };
	}
	exports.makeRouterDriver = makeRouterDriver;
	//# sourceMappingURL=makeRouterDriver.js.map

/***/ },
/* 141 */
/***/ function(module, exports) {

	"use strict";
	function splitPath(path) {
	    return path.split('/').filter(function (p) { return p.length > 0; });
	}
	exports.splitPath = splitPath;
	function filterPath(pathParts, namespace) {
	    return pathParts.filter(function (part) { return namespace.indexOf(part) < 0; }).join('/');
	}
	exports.filterPath = filterPath;
	var startsWith = function (param, value) { return param[0] === value; };
	var startsWith2 = function (param, value1, value2) {
	    return param[0] === value1 && param[1] === value2;
	};
	function makeCreateHref(namespace, _createHref) {
	    /**
	     * Function used to create HREFs that are properly namespaced
	     * @typedef {createHref}
	     * @name createHref
	     * @method createHref
	     * @param  {string} path - the HREF that will be appended to the current
	     * namespace
	     * @return {string} a fully qualified HREF composed from the current
	     * namespace and the path provided
	     */
	    return function createHref(path) {
	        var fullPath = "" + namespace.join('/') + path;
	        return startsWith(fullPath, '/') || startsWith2(fullPath, '#', '/')
	            ? _createHref(fullPath)
	            : _createHref('/' + fullPath);
	    };
	}
	exports.makeCreateHref = makeCreateHref;
	//# sourceMappingURL=util.js.map

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var copy       = __webpack_require__(153)
	  , map        = __webpack_require__(161)
	  , callable   = __webpack_require__(9)
	  , validValue = __webpack_require__(7)
	
	  , bind = Function.prototype.bind, defineProperty = Object.defineProperty
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , define;
	
	define = function (name, desc, bindTo) {
		var value = validValue(desc) && callable(desc.value), dgs;
		dgs = copy(desc);
		delete dgs.writable;
		delete dgs.value;
		dgs.get = function () {
			if (hasOwnProperty.call(this, name)) return value;
			desc.value = bind.call(value, (bindTo == null) ? this : this[bindTo]);
			defineProperty(this, name, desc);
			return this[name];
		};
		return dgs;
	};
	
	module.exports = function (props/*, bindTo*/) {
		var bindTo = arguments[1];
		return map(props, function (desc, name) {
			return define(name, desc, bindTo);
		});
	};


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, setImmediate) {(function (global, factory) {
	    true ? module.exports = factory() :
	   typeof define === 'function' && define.amd ? define(factory) :
	   global.Dexie = factory();
	}(this, function () { 'use strict';
	
	   // By default, debug will be true only if platform is a web platform and its page is served from localhost.
	   // When debug = true, error's stacks will contain asyncronic long stacks.
	   var debug = typeof location !== 'undefined' &&
	   // By default, use debug mode if served from localhost.
	   /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
	
	   function setDebug(value, filter) {
	       debug = value;
	       libraryFilter = filter;
	   }
	
	   var libraryFilter = function () {
	       return true;
	   };
	
	   var NEEDS_THROW_FOR_STACK = !new Error("").stack;
	
	   function getErrorWithStack() {
	       "use strict";
	
	       if (NEEDS_THROW_FOR_STACK) try {
	           // Doing something naughty in strict mode here to trigger a specific error
	           // that can be explicitely ignored in debugger's exception settings.
	           // If we'd just throw new Error() here, IE's debugger's exception settings
	           // will just consider it as "exception thrown by javascript code" which is
	           // something you wouldn't want it to ignore.
	           getErrorWithStack.arguments;
	           throw new Error(); // Fallback if above line don't throw.
	       } catch (e) {
	           return e;
	       }
	       return new Error();
	   }
	
	   function prettyStack(exception, numIgnoredFrames) {
	       var stack = exception.stack;
	       if (!stack) return "";
	       numIgnoredFrames = numIgnoredFrames || 0;
	       if (stack.indexOf(exception.name) === 0) numIgnoredFrames += (exception.name + exception.message).split('\n').length;
	       return stack.split('\n').slice(numIgnoredFrames).filter(libraryFilter).map(function (frame) {
	           return "\n" + frame;
	       }).join('');
	   }
	
	   function nop() {}
	   function mirror(val) {
	       return val;
	   }
	   function pureFunctionChain(f1, f2) {
	       // Enables chained events that takes ONE argument and returns it to the next function in chain.
	       // This pattern is used in the hook("reading") event.
	       if (f1 == null || f1 === mirror) return f2;
	       return function (val) {
	           return f2(f1(val));
	       };
	   }
	
	   function callBoth(on1, on2) {
	       return function () {
	           on1.apply(this, arguments);
	           on2.apply(this, arguments);
	       };
	   }
	
	   function hookCreatingChain(f1, f2) {
	       // Enables chained events that takes several arguments and may modify first argument by making a modification and then returning the same instance.
	       // This pattern is used in the hook("creating") event.
	       if (f1 === nop) return f2;
	       return function () {
	           var res = f1.apply(this, arguments);
	           if (res !== undefined) arguments[0] = res;
	           var onsuccess = this.onsuccess,
	               // In case event listener has set this.onsuccess
	           onerror = this.onerror; // In case event listener has set this.onerror
	           this.onsuccess = null;
	           this.onerror = null;
	           var res2 = f2.apply(this, arguments);
	           if (onsuccess) this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
	           if (onerror) this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
	           return res2 !== undefined ? res2 : res;
	       };
	   }
	
	   function hookDeletingChain(f1, f2) {
	       if (f1 === nop) return f2;
	       return function () {
	           f1.apply(this, arguments);
	           var onsuccess = this.onsuccess,
	               // In case event listener has set this.onsuccess
	           onerror = this.onerror; // In case event listener has set this.onerror
	           this.onsuccess = this.onerror = null;
	           f2.apply(this, arguments);
	           if (onsuccess) this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
	           if (onerror) this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
	       };
	   }
	
	   function hookUpdatingChain(f1, f2) {
	       if (f1 === nop) return f2;
	       return function (modifications) {
	           var res = f1.apply(this, arguments);
	           extend(modifications, res); // If f1 returns new modifications, extend caller's modifications with the result before calling next in chain.
	           var onsuccess = this.onsuccess,
	               // In case event listener has set this.onsuccess
	           onerror = this.onerror; // In case event listener has set this.onerror
	           this.onsuccess = null;
	           this.onerror = null;
	           var res2 = f2.apply(this, arguments);
	           if (onsuccess) this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
	           if (onerror) this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
	           return res === undefined ? res2 === undefined ? undefined : res2 : extend(res, res2);
	       };
	   }
	
	   function reverseStoppableEventChain(f1, f2) {
	       if (f1 === nop) return f2;
	       return function () {
	           if (f2.apply(this, arguments) === false) return false;
	           return f1.apply(this, arguments);
	       };
	   }
	
	   function promisableChain(f1, f2) {
	       if (f1 === nop) return f2;
	       return function () {
	           var res = f1.apply(this, arguments);
	           if (res && typeof res.then === 'function') {
	               var thiz = this,
	                   i = arguments.length,
	                   args = new Array(i);
	               while (i--) {
	                   args[i] = arguments[i];
	               }return res.then(function () {
	                   return f2.apply(thiz, args);
	               });
	           }
	           return f2.apply(this, arguments);
	       };
	   }
	
	   var keys = Object.keys;
	   var isArray = Array.isArray;
	   var _global = typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : global;
	
	   function extend(obj, extension) {
	       if (typeof extension !== 'object') return obj;
	       keys(extension).forEach(function (key) {
	           obj[key] = extension[key];
	       });
	       return obj;
	   }
	
	   var getProto = Object.getPrototypeOf;
	   var _hasOwn = {}.hasOwnProperty;
	   function hasOwn(obj, prop) {
	       return _hasOwn.call(obj, prop);
	   }
	
	   function props(proto, extension) {
	       if (typeof extension === 'function') extension = extension(getProto(proto));
	       keys(extension).forEach(function (key) {
	           setProp(proto, key, extension[key]);
	       });
	   }
	
	   function setProp(obj, prop, functionOrGetSet, options) {
	       Object.defineProperty(obj, prop, extend(functionOrGetSet && hasOwn(functionOrGetSet, "get") && typeof functionOrGetSet.get === 'function' ? { get: functionOrGetSet.get, set: functionOrGetSet.set, configurable: true } : { value: functionOrGetSet, configurable: true, writable: true }, options));
	   }
	
	   function derive(Child) {
	       return {
	           from: function (Parent) {
	               Child.prototype = Object.create(Parent.prototype);
	               setProp(Child.prototype, "constructor", Child);
	               return {
	                   extend: props.bind(null, Child.prototype)
	               };
	           }
	       };
	   }
	
	   var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	
	   function getPropertyDescriptor(obj, prop) {
	       var pd = getOwnPropertyDescriptor(obj, prop),
	           proto;
	       return pd || (proto = getProto(obj)) && getPropertyDescriptor(proto, prop);
	   }
	
	   var _slice = [].slice;
	   function slice(args, start, end) {
	       return _slice.call(args, start, end);
	   }
	
	   function override(origFunc, overridedFactory) {
	       return overridedFactory(origFunc);
	   }
	
	   function doFakeAutoComplete(fn) {
	       var to = setTimeout(fn, 1000);
	       clearTimeout(to);
	   }
	
	   function assert(b) {
	       if (!b) throw new exceptions.Internal("Assertion failed");
	   }
	
	   function asap(fn) {
	       if (_global.setImmediate) setImmediate(fn);else setTimeout(fn, 0);
	   }
	
	   /** Generate an object (hash map) based on given array.
	    * @param extractor Function taking an array item and its index and returning an array of 2 items ([key, value]) to
	    *        instert on the resulting object for each item in the array. If this function returns a falsy value, the
	    *        current item wont affect the resulting object.
	    */
	   function arrayToObject(array, extractor) {
	       return array.reduce(function (result, item, i) {
	           var nameAndValue = extractor(item, i);
	           if (nameAndValue) result[nameAndValue[0]] = nameAndValue[1];
	           return result;
	       }, {});
	   }
	
	   function trycatcher(fn, reject) {
	       return function () {
	           try {
	               fn.apply(this, arguments);
	           } catch (e) {
	               reject(e);
	           }
	       };
	   }
	
	   function tryCatch(fn, onerror, args) {
	       try {
	           fn.apply(null, args);
	       } catch (ex) {
	           onerror && onerror(ex);
	       }
	   }
	
	   function rejection(err, uncaughtHandler) {
	       // Get the call stack and return a rejected promise.
	       var rv = Promise.reject(err);
	       return uncaughtHandler ? rv.uncaught(uncaughtHandler) : rv;
	   }
	
	   function getByKeyPath(obj, keyPath) {
	       // http://www.w3.org/TR/IndexedDB/#steps-for-extracting-a-key-from-a-value-using-a-key-path
	       if (hasOwn(obj, keyPath)) return obj[keyPath]; // This line is moved from last to first for optimization purpose.
	       if (!keyPath) return obj;
	       if (typeof keyPath !== 'string') {
	           var rv = [];
	           for (var i = 0, l = keyPath.length; i < l; ++i) {
	               var val = getByKeyPath(obj, keyPath[i]);
	               rv.push(val);
	           }
	           return rv;
	       }
	       var period = keyPath.indexOf('.');
	       if (period !== -1) {
	           var innerObj = obj[keyPath.substr(0, period)];
	           return innerObj === undefined ? undefined : getByKeyPath(innerObj, keyPath.substr(period + 1));
	       }
	       return undefined;
	   }
	
	   function setByKeyPath(obj, keyPath, value) {
	       if (!obj || keyPath === undefined) return;
	       if ('isFrozen' in Object && Object.isFrozen(obj)) return;
	       if (typeof keyPath !== 'string' && 'length' in keyPath) {
	           assert(typeof value !== 'string' && 'length' in value);
	           for (var i = 0, l = keyPath.length; i < l; ++i) {
	               setByKeyPath(obj, keyPath[i], value[i]);
	           }
	       } else {
	           var period = keyPath.indexOf('.');
	           if (period !== -1) {
	               var currentKeyPath = keyPath.substr(0, period);
	               var remainingKeyPath = keyPath.substr(period + 1);
	               if (remainingKeyPath === "") {
	                   if (value === undefined) delete obj[currentKeyPath];else obj[currentKeyPath] = value;
	               } else {
	                   var innerObj = obj[currentKeyPath];
	                   if (!innerObj) innerObj = obj[currentKeyPath] = {};
	                   setByKeyPath(innerObj, remainingKeyPath, value);
	               }
	           } else {
	               if (value === undefined) delete obj[keyPath];else obj[keyPath] = value;
	           }
	       }
	   }
	
	   function delByKeyPath(obj, keyPath) {
	       if (typeof keyPath === 'string') setByKeyPath(obj, keyPath, undefined);else if ('length' in keyPath) [].map.call(keyPath, function (kp) {
	           setByKeyPath(obj, kp, undefined);
	       });
	   }
	
	   function shallowClone(obj) {
	       var rv = {};
	       for (var m in obj) {
	           if (hasOwn(obj, m)) rv[m] = obj[m];
	       }
	       return rv;
	   }
	
	   function deepClone(any) {
	       if (!any || typeof any !== 'object') return any;
	       var rv;
	       if (isArray(any)) {
	           rv = [];
	           for (var i = 0, l = any.length; i < l; ++i) {
	               rv.push(deepClone(any[i]));
	           }
	       } else if (any instanceof Date) {
	           rv = new Date();
	           rv.setTime(any.getTime());
	       } else {
	           rv = any.constructor ? Object.create(any.constructor.prototype) : {};
	           for (var prop in any) {
	               if (hasOwn(any, prop)) {
	                   rv[prop] = deepClone(any[prop]);
	               }
	           }
	       }
	       return rv;
	   }
	
	   function getObjectDiff(a, b, rv, prfx) {
	       // Compares objects a and b and produces a diff object.
	       rv = rv || {};
	       prfx = prfx || '';
	       keys(a).forEach(function (prop) {
	           if (!hasOwn(b, prop)) rv[prfx + prop] = undefined; // Property removed
	           else {
	                   var ap = a[prop],
	                       bp = b[prop];
	                   if (typeof ap === 'object' && typeof bp === 'object' && ap && bp && ap.constructor === bp.constructor)
	                       // Same type of object but its properties may have changed
	                       getObjectDiff(ap, bp, rv, prfx + prop + ".");else if (ap !== bp) rv[prfx + prop] = b[prop]; // Primitive value changed
	               }
	       });
	       keys(b).forEach(function (prop) {
	           if (!hasOwn(a, prop)) {
	               rv[prfx + prop] = b[prop]; // Property added
	           }
	       });
	       return rv;
	   }
	
	   // If first argument is iterable or array-like, return it as an array
	   var iteratorSymbol = typeof Symbol !== 'undefined' && Symbol.iterator;
	   var getIteratorOf = iteratorSymbol ? function (x) {
	       var i;
	       return x != null && (i = x[iteratorSymbol]) && i.apply(x);
	   } : function () {
	       return null;
	   };
	
	   var NO_CHAR_ARRAY = {};
	   // Takes one or several arguments and returns an array based on the following criteras:
	   // * If several arguments provided, return arguments converted to an array in a way that
	   //   still allows javascript engine to optimize the code.
	   // * If single argument is an array, return a clone of it.
	   // * If this-pointer equals NO_CHAR_ARRAY, don't accept strings as valid iterables as a special
	   //   case to the two bullets below.
	   // * If single argument is an iterable, convert it to an array and return the resulting array.
	   // * If single argument is array-like (has length of type number), convert it to an array.
	   function getArrayOf(arrayLike) {
	       var i, a, x, it;
	       if (arguments.length === 1) {
	           if (isArray(arrayLike)) return arrayLike.slice();
	           if (this === NO_CHAR_ARRAY && typeof arrayLike === 'string') return [arrayLike];
	           if (it = getIteratorOf(arrayLike)) {
	               a = [];
	               while (x = it.next(), !x.done) {
	                   a.push(x.value);
	               }return a;
	           }
	           if (arrayLike == null) return [arrayLike];
	           i = arrayLike.length;
	           if (typeof i === 'number') {
	               a = new Array(i);
	               while (i--) {
	                   a[i] = arrayLike[i];
	               }return a;
	           }
	           return [arrayLike];
	       }
	       i = arguments.length;
	       a = new Array(i);
	       while (i--) {
	           a[i] = arguments[i];
	       }return a;
	   }
	
	   var concat = [].concat;
	   function flatten(a) {
	       return concat.apply([], a);
	   }
	
	   var dexieErrorNames = ['Modify', 'Bulk', 'OpenFailed', 'VersionChange', 'Schema', 'Upgrade', 'InvalidTable', 'MissingAPI', 'NoSuchDatabase', 'InvalidArgument', 'SubTransaction', 'Unsupported', 'Internal', 'DatabaseClosed', 'IncompatiblePromise'];
	
	   var idbDomErrorNames = ['Unknown', 'Constraint', 'Data', 'TransactionInactive', 'ReadOnly', 'Version', 'NotFound', 'InvalidState', 'InvalidAccess', 'Abort', 'Timeout', 'QuotaExceeded', 'Syntax', 'DataClone'];
	
	   var errorList = dexieErrorNames.concat(idbDomErrorNames);
	
	   var defaultTexts = {
	       VersionChanged: "Database version changed by other database connection",
	       DatabaseClosed: "Database has been closed",
	       Abort: "Transaction aborted",
	       TransactionInactive: "Transaction has already completed or failed"
	   };
	
	   //
	   // DexieError - base class of all out exceptions.
	   //
	   function DexieError(name, msg) {
	       // Reason we don't use ES6 classes is because:
	       // 1. It bloats transpiled code and increases size of minified code.
	       // 2. It doesn't give us much in this case.
	       // 3. It would require sub classes to call super(), which
	       //    is not needed when deriving from Error.
	       this._e = getErrorWithStack();
	       this.name = name;
	       this.message = msg;
	   }
	
	   derive(DexieError).from(Error).extend({
	       stack: {
	           get: function () {
	               return this._stack || (this._stack = this.name + ": " + this.message + prettyStack(this._e, 2));
	           }
	       },
	       toString: function () {
	           return this.name + ": " + this.message;
	       }
	   });
	
	   function getMultiErrorMessage(msg, failures) {
	       return msg + ". Errors: " + failures.map(function (f) {
	           return f.toString();
	       }).filter(function (v, i, s) {
	           return s.indexOf(v) === i;
	       }) // Only unique error strings
	       .join('\n');
	   }
	
	   //
	   // ModifyError - thrown in WriteableCollection.modify()
	   // Specific constructor because it contains members failures and failedKeys.
	   //
	   function ModifyError(msg, failures, successCount, failedKeys) {
	       this._e = getErrorWithStack();
	       this.failures = failures;
	       this.failedKeys = failedKeys;
	       this.successCount = successCount;
	   }
	   derive(ModifyError).from(DexieError);
	
	   function BulkError(msg, failures) {
	       this._e = getErrorWithStack();
	       this.name = "BulkError";
	       this.failures = failures;
	       this.message = getMultiErrorMessage(msg, failures);
	   }
	   derive(BulkError).from(DexieError);
	
	   //
	   //
	   // Dynamically generate error names and exception classes based
	   // on the names in errorList.
	   //
	   //
	
	   // Map of {ErrorName -> ErrorName + "Error"}
	   var errnames = errorList.reduce(function (obj, name) {
	       return obj[name] = name + "Error", obj;
	   }, {});
	
	   // Need an alias for DexieError because we're gonna create subclasses with the same name.
	   var BaseException = DexieError;
	   // Map of {ErrorName -> exception constructor}
	   var exceptions = errorList.reduce(function (obj, name) {
	       // Let the name be "DexieError" because this name may
	       // be shown in call stack and when debugging. DexieError is
	       // the most true name because it derives from DexieError,
	       // and we cannot change Function.name programatically without
	       // dynamically create a Function object, which would be considered
	       // 'eval-evil'.
	       var fullName = name + "Error";
	       function DexieError(msgOrInner, inner) {
	           this._e = getErrorWithStack();
	           this.name = fullName;
	           if (!msgOrInner) {
	               this.message = defaultTexts[name] || fullName;
	               this.inner = null;
	           } else if (typeof msgOrInner === 'string') {
	               this.message = msgOrInner;
	               this.inner = inner || null;
	           } else if (typeof msgOrInner === 'object') {
	               this.message = msgOrInner.name + ' ' + msgOrInner.message;
	               this.inner = msgOrInner;
	           }
	       }
	       derive(DexieError).from(BaseException);
	       obj[name] = DexieError;
	       return obj;
	   }, {});
	
	   // Use ECMASCRIPT standard exceptions where applicable:
	   exceptions.Syntax = SyntaxError;
	   exceptions.Type = TypeError;
	   exceptions.Range = RangeError;
	
	   var exceptionMap = idbDomErrorNames.reduce(function (obj, name) {
	       obj[name + "Error"] = exceptions[name];
	       return obj;
	   }, {});
	
	   function mapError(domError, message) {
	       if (!domError || domError instanceof DexieError || domError instanceof TypeError || domError instanceof SyntaxError || !domError.name || !exceptionMap[domError.name]) return domError;
	       var rv = new exceptionMap[domError.name](message || domError.message, domError);
	       if ("stack" in domError) {
	           // Derive stack from inner exception if it has a stack
	           setProp(rv, "stack", { get: function () {
	                   return this.inner.stack;
	               } });
	       }
	       return rv;
	   }
	
	   var fullNameExceptions = errorList.reduce(function (obj, name) {
	       if (["Syntax", "Type", "Range"].indexOf(name) === -1) obj[name + "Error"] = exceptions[name];
	       return obj;
	   }, {});
	
	   fullNameExceptions.ModifyError = ModifyError;
	   fullNameExceptions.DexieError = DexieError;
	   fullNameExceptions.BulkError = BulkError;
	
	   function Events(ctx) {
	       var evs = {};
	       var rv = function (eventName, subscriber) {
	           if (subscriber) {
	               // Subscribe. If additional arguments than just the subscriber was provided, forward them as well.
	               var i = arguments.length,
	                   args = new Array(i - 1);
	               while (--i) {
	                   args[i - 1] = arguments[i];
	               }evs[eventName].subscribe.apply(null, args);
	               return ctx;
	           } else if (typeof eventName === 'string') {
	               // Return interface allowing to fire or unsubscribe from event
	               return evs[eventName];
	           }
	       };
	       rv.addEventType = add;
	
	       for (var i = 1, l = arguments.length; i < l; ++i) {
	           add(arguments[i]);
	       }
	
	       return rv;
	
	       function add(eventName, chainFunction, defaultFunction) {
	           if (typeof eventName === 'object') return addConfiguredEvents(eventName);
	           if (!chainFunction) chainFunction = reverseStoppableEventChain;
	           if (!defaultFunction) defaultFunction = nop;
	
	           var context = {
	               subscribers: [],
	               fire: defaultFunction,
	               subscribe: function (cb) {
	                   if (context.subscribers.indexOf(cb) === -1) {
	                       context.subscribers.push(cb);
	                       context.fire = chainFunction(context.fire, cb);
	                   }
	               },
	               unsubscribe: function (cb) {
	                   context.subscribers = context.subscribers.filter(function (fn) {
	                       return fn !== cb;
	                   });
	                   context.fire = context.subscribers.reduce(chainFunction, defaultFunction);
	               }
	           };
	           evs[eventName] = rv[eventName] = context;
	           return context;
	       }
	
	       function addConfiguredEvents(cfg) {
	           // events(this, {reading: [functionChain, nop]});
	           keys(cfg).forEach(function (eventName) {
	               var args = cfg[eventName];
	               if (isArray(args)) {
	                   add(eventName, cfg[eventName][0], cfg[eventName][1]);
	               } else if (args === 'asap') {
	                   // Rather than approaching event subscription using a functional approach, we here do it in a for-loop where subscriber is executed in its own stack
	                   // enabling that any exception that occur wont disturb the initiator and also not nescessary be catched and forgotten.
	                   var context = add(eventName, mirror, function fire() {
	                       // Optimazation-safe cloning of arguments into args.
	                       var i = arguments.length,
	                           args = new Array(i);
	                       while (i--) {
	                           args[i] = arguments[i];
	                       } // All each subscriber:
	                       context.subscribers.forEach(function (fn) {
	                           asap(function fireEvent() {
	                               fn.apply(null, args);
	                           });
	                       });
	                   });
	               } else throw new exceptions.InvalidArgument("Invalid event config");
	           });
	       }
	   }
	
	   //
	   // Promise Class for Dexie library
	   //
	   // I started out writing this Promise class by copying promise-light (https://github.com/taylorhakes/promise-light) by
	   // https://github.com/taylorhakes - an A+ and ECMASCRIPT 6 compliant Promise implementation.
	   //
	   // Modifications needed to be done to support indexedDB because it wont accept setTimeout()
	   // (See discussion: https://github.com/promises-aplus/promises-spec/issues/45) .
	   // This topic was also discussed in the following thread: https://github.com/promises-aplus/promises-spec/issues/45
	   //
	   // This implementation will not use setTimeout or setImmediate when it's not needed. The behavior is 100% Promise/A+ compliant since
	   // the caller of new Promise() can be certain that the promise wont be triggered the lines after constructing the promise.
	   //
	   // In previous versions this was fixed by not calling setTimeout when knowing that the resolve() or reject() came from another
	   // tick. In Dexie v1.4.0, I've rewritten the Promise class entirely. Just some fragments of promise-light is left. I use
	   // another strategy now that simplifies everything a lot: to always execute callbacks in a new tick, but have an own microTick
	   // engine that is used instead of setImmediate() or setTimeout().
	   // Promise class has also been optimized a lot with inspiration from bluebird - to avoid closures as much as possible.
	   // Also with inspiration from bluebird, asyncronic stacks in debug mode.
	   //
	   // Specific non-standard features of this Promise class:
	   // * Async static context support (Promise.PSD)
	   // * Promise.follow() method built upon PSD, that allows user to track all promises created from current stack frame
	   //   and below + all promises that those promises creates or awaits.
	   // * Detect any unhandled promise in a PSD-scope (PSD.onunhandled).
	   //
	   // David Fahlander, https://github.com/dfahlander
	   //
	
	   // Just a pointer that only this module knows about.
	   // Used in Promise constructor to emulate a private constructor.
	   var INTERNAL = {};
	
	   // Async stacks (long stacks) must not grow infinitely.
	   var LONG_STACKS_CLIP_LIMIT = 100;
	   var MAX_LONG_STACKS = 20;
	   var stack_being_generated = false;
	   /* The default "nextTick" function used only for the very first promise in a promise chain.
	      As soon as then promise is resolved or rejected, all next tasks will be executed in micro ticks
	      emulated in this module. For indexedDB compatibility, this means that every method needs to 
	      execute at least one promise before doing an indexedDB operation. Dexie will always call 
	      db.ready().then() for every operation to make sure the indexedDB event is started in an
	      emulated micro tick.
	   */
	   var schedulePhysicalTick = _global.setImmediate ?
	   // setImmediate supported. Those modern platforms also supports Function.bind().
	   setImmediate.bind(null, physicalTick) : _global.MutationObserver ?
	   // MutationObserver supported
	   function () {
	       var hiddenDiv = document.createElement("div");
	       new MutationObserver(function () {
	           physicalTick();
	           hiddenDiv = null;
	       }).observe(hiddenDiv, { attributes: true });
	       hiddenDiv.setAttribute('i', '1');
	   } :
	   // No support for setImmediate or MutationObserver. No worry, setTimeout is only called
	   // once time. Every tick that follows will be our emulated micro tick.
	   // Could have uses setTimeout.bind(null, 0, physicalTick) if it wasnt for that FF13 and below has a bug
	   function () {
	       setTimeout(physicalTick, 0);
	   };
	
	   // Confifurable through Promise.scheduler.
	   // Don't export because it would be unsafe to let unknown
	   // code call it unless they do try..catch within their callback.
	   // This function can be retrieved through getter of Promise.scheduler though,
	   // but users must not do Promise.scheduler (myFuncThatThrows exception)!
	   var asap$1 = function (callback, args) {
	       microtickQueue.push([callback, args]);
	       if (needsNewPhysicalTick) {
	           schedulePhysicalTick();
	           needsNewPhysicalTick = false;
	       }
	   };
	
	   var isOutsideMicroTick = true;
	   var needsNewPhysicalTick = true;
	   var unhandledErrors = [];
	   var rejectingErrors = [];
	   var currentFulfiller = null;
	   var rejectionMapper = mirror;
	   // Remove in next major when removing error mapping of DOMErrors and DOMExceptions
	
	   var globalPSD = {
	       global: true,
	       ref: 0,
	       unhandleds: [],
	       onunhandled: globalError,
	       //env: null, // Will be set whenever leaving a scope using wrappers.snapshot()
	       finalize: function () {
	           this.unhandleds.forEach(function (uh) {
	               try {
	                   globalError(uh[0], uh[1]);
	               } catch (e) {}
	           });
	       }
	   };
	
	   var PSD = globalPSD;
	
	   var microtickQueue = []; // Callbacks to call in this or next physical tick.
	   var numScheduledCalls = 0; // Number of listener-calls left to do in this physical tick.
	   var tickFinalizers = []; // Finalizers to call when there are no more async calls scheduled within current physical tick.
	
	   // Wrappers are not being used yet. Their framework is functioning and can be used
	   // to replace environment during a PSD scope (a.k.a. 'zone').
	   /* **KEEP** export var wrappers = (() => {
	       var wrappers = [];
	
	       return {
	           snapshot: () => {
	               var i = wrappers.length,
	                   result = new Array(i);
	               while (i--) result[i] = wrappers[i].snapshot();
	               return result;
	           },
	           restore: values => {
	               var i = wrappers.length;
	               while (i--) wrappers[i].restore(values[i]);
	           },
	           wrap: () => wrappers.map(w => w.wrap()),
	           add: wrapper => {
	               wrappers.push(wrapper);
	           }
	       };
	   })();
	   */
	
	   function Promise(fn) {
	       if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
	       this._listeners = [];
	       this.onuncatched = nop; // Deprecate in next major. Not needed. Better to use global error handler.
	
	       // A library may set `promise._lib = true;` after promise is created to make resolve() or reject()
	       // execute the microtask engine implicitely within the call to resolve() or reject().
	       // To remain A+ compliant, a library must only set `_lib=true` if it can guarantee that the stack
	       // only contains library code when calling resolve() or reject().
	       // RULE OF THUMB: ONLY set _lib = true for promises explicitely resolving/rejecting directly from
	       // global scope (event handler, timer etc)!
	       this._lib = false;
	       // Current async scope
	       var psd = this._PSD = PSD;
	
	       if (debug) {
	           this._stackHolder = getErrorWithStack();
	           this._prev = null;
	           this._numPrev = 0; // Number of previous promises (for long stacks)
	           linkToPreviousPromise(this, currentFulfiller);
	       }
	
	       if (typeof fn !== 'function') {
	           if (fn !== INTERNAL) throw new TypeError('Not a function');
	           // Private constructor (INTERNAL, state, value).
	           // Used internally by Promise.resolve() and Promise.reject().
	           this._state = arguments[1];
	           this._value = arguments[2];
	           if (this._state === false) handleRejection(this, this._value); // Map error, set stack and addPossiblyUnhandledError().
	           return;
	       }
	
	       this._state = null; // null (=pending), false (=rejected) or true (=resolved)
	       this._value = null; // error or result
	       ++psd.ref; // Refcounting current scope
	       executePromiseTask(this, fn);
	   }
	
	   props(Promise.prototype, {
	
	       then: function (onFulfilled, onRejected) {
	           var _this = this;
	
	           var rv = new Promise(function (resolve, reject) {
	               propagateToListener(_this, new Listener(onFulfilled, onRejected, resolve, reject));
	           });
	           debug && (!this._prev || this._state === null) && linkToPreviousPromise(rv, this);
	           return rv;
	       },
	
	       _then: function (onFulfilled, onRejected) {
	           // A little tinier version of then() that don't have to create a resulting promise.
	           propagateToListener(this, new Listener(null, null, onFulfilled, onRejected));
	       },
	
	       catch: function (onRejected) {
	           if (arguments.length === 1) return this.then(null, onRejected);
	           // First argument is the Error type to catch
	           var type = arguments[0],
	               handler = arguments[1];
	           return typeof type === 'function' ? this.then(null, function (err) {
	               return(
	                   // Catching errors by its constructor type (similar to java / c++ / c#)
	                   // Sample: promise.catch(TypeError, function (e) { ... });
	                   err instanceof type ? handler(err) : PromiseReject(err)
	               );
	           }) : this.then(null, function (err) {
	               return(
	                   // Catching errors by the error.name property. Makes sense for indexedDB where error type
	                   // is always DOMError but where e.name tells the actual error type.
	                   // Sample: promise.catch('ConstraintError', function (e) { ... });
	                   err && err.name === type ? handler(err) : PromiseReject(err)
	               );
	           });
	       },
	
	       finally: function (onFinally) {
	           return this.then(function (value) {
	               onFinally();
	               return value;
	           }, function (err) {
	               onFinally();
	               return PromiseReject(err);
	           });
	       },
	
	       // Deprecate in next major. Needed only for db.on.error.
	       uncaught: function (uncaughtHandler) {
	           var _this2 = this;
	
	           // Be backward compatible and use "onuncatched" as the event name on this.
	           // Handle multiple subscribers through reverseStoppableEventChain(). If a handler returns `false`, bubbling stops.
	           this.onuncatched = reverseStoppableEventChain(this.onuncatched, uncaughtHandler);
	           // In case caller does this on an already rejected promise, assume caller wants to point out the error to this promise and not
	           // a previous promise. Reason: the prevous promise may lack onuncatched handler.
	           if (this._state === false && unhandledErrors.indexOf(this) === -1) {
	               // Replace unhandled error's destinaion promise with this one!
	               unhandledErrors.some(function (p, i, l) {
	                   return p._value === _this2._value && (l[i] = _this2);
	               });
	               // Actually we do this shit because we need to support db.on.error() correctly during db.open(). If we deprecate db.on.error, we could
	               // take away this piece of code as well as the onuncatched and uncaught() method.
	           }
	           return this;
	       },
	
	       stack: {
	           get: function () {
	               if (this._stack) return this._stack;
	               try {
	                   stack_being_generated = true;
	                   var stacks = getStack(this, [], MAX_LONG_STACKS);
	                   var stack = stacks.join("\nFrom previous: ");
	                   if (this._state !== null) this._stack = stack; // Stack may be updated on reject.
	                   return stack;
	               } finally {
	                   stack_being_generated = false;
	               }
	           }
	       }
	   });
	
	   function Listener(onFulfilled, onRejected, resolve, reject) {
	       this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	       this.onRejected = typeof onRejected === 'function' ? onRejected : null;
	       this.resolve = resolve;
	       this.reject = reject;
	       this.psd = PSD;
	   }
	
	   // Promise Static Properties
	   props(Promise, {
	       all: function () {
	           var values = getArrayOf.apply(null, arguments); // Supports iterables, implicit arguments and array-like.
	           return new Promise(function (resolve, reject) {
	               if (values.length === 0) resolve([]);
	               var remaining = values.length;
	               values.forEach(function (a, i) {
	                   return Promise.resolve(a).then(function (x) {
	                       values[i] = x;
	                       if (! --remaining) resolve(values);
	                   }, reject);
	               });
	           });
	       },
	
	       resolve: function (value) {
	           if (value && typeof value.then === 'function') return value;
	           return new Promise(INTERNAL, true, value);
	       },
	
	       reject: PromiseReject,
	
	       race: function () {
	           var values = getArrayOf.apply(null, arguments);
	           return new Promise(function (resolve, reject) {
	               values.map(function (value) {
	                   return Promise.resolve(value).then(resolve, reject);
	               });
	           });
	       },
	
	       PSD: {
	           get: function () {
	               return PSD;
	           },
	           set: function (value) {
	               return PSD = value;
	           }
	       },
	
	       newPSD: newScope,
	
	       usePSD: usePSD,
	
	       scheduler: {
	           get: function () {
	               return asap$1;
	           },
	           set: function (value) {
	               asap$1 = value;
	           }
	       },
	
	       rejectionMapper: {
	           get: function () {
	               return rejectionMapper;
	           },
	           set: function (value) {
	               rejectionMapper = value;
	           } // Map reject failures
	       },
	
	       follow: function (fn) {
	           return new Promise(function (resolve, reject) {
	               return newScope(function (resolve, reject) {
	                   var psd = PSD;
	                   psd.unhandleds = []; // For unhandled standard- or 3rd party Promises. Checked at psd.finalize()
	                   psd.onunhandled = reject; // Triggered directly on unhandled promises of this library.
	                   psd.finalize = callBoth(function () {
	                       var _this3 = this;
	
	                       // Unhandled standard or 3rd part promises are put in PSD.unhandleds and
	                       // examined upon scope completion while unhandled rejections in this Promise
	                       // will trigger directly through psd.onunhandled
	                       run_at_end_of_this_or_next_physical_tick(function () {
	                           _this3.unhandleds.length === 0 ? resolve() : reject(_this3.unhandleds[0]);
	                       });
	                   }, psd.finalize);
	                   fn();
	               }, resolve, reject);
	           });
	       },
	
	       on: Events(null, { "error": [reverseStoppableEventChain, defaultErrorHandler] // Default to defaultErrorHandler
	       })
	
	   });
	
	   /**
	   * Take a potentially misbehaving resolver function and make sure
	   * onFulfilled and onRejected are only called once.
	   *
	   * Makes no guarantees about asynchrony.
	   */
	   function executePromiseTask(promise, fn) {
	       // Promise Resolution Procedure:
	       // https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	       try {
	           fn(function (value) {
	               if (promise._state !== null) return;
	               if (value === promise) throw new TypeError('A promise cannot be resolved with itself.');
	               var shouldExecuteTick = promise._lib && beginMicroTickScope();
	               if (value && typeof value.then === 'function') {
	                   executePromiseTask(promise, function (resolve, reject) {
	                       value instanceof Promise ? value._then(resolve, reject) : value.then(resolve, reject);
	                   });
	               } else {
	                   promise._state = true;
	                   promise._value = value;
	                   propagateAllListeners(promise);
	               }
	               if (shouldExecuteTick) endMicroTickScope();
	           }, handleRejection.bind(null, promise)); // If Function.bind is not supported. Exception is handled in catch below
	       } catch (ex) {
	           handleRejection(promise, ex);
	       }
	   }
	
	   function handleRejection(promise, reason) {
	       rejectingErrors.push(reason);
	       if (promise._state !== null) return;
	       var shouldExecuteTick = promise._lib && beginMicroTickScope();
	       reason = rejectionMapper(reason);
	       promise._state = false;
	       promise._value = reason;
	       debug && reason !== null && typeof reason === 'object' && !reason._promise && tryCatch(function () {
	           var origProp = getPropertyDescriptor(reason, "stack");
	           reason._promise = promise;
	           setProp(reason, "stack", {
	               get: function () {
	                   return stack_being_generated ? origProp && (origProp.get ? origProp.get.apply(reason) : origProp.value) : promise.stack;
	               }
	           });
	       });
	       // Add the failure to a list of possibly uncaught errors
	       addPossiblyUnhandledError(promise);
	       propagateAllListeners(promise);
	       if (shouldExecuteTick) endMicroTickScope();
	   }
	
	   function propagateAllListeners(promise) {
	       //debug && linkToPreviousPromise(promise);
	       var listeners = promise._listeners;
	       promise._listeners = [];
	       for (var i = 0, len = listeners.length; i < len; ++i) {
	           propagateToListener(promise, listeners[i]);
	       }
	       var psd = promise._PSD;
	       --psd.ref || psd.finalize(); // if psd.ref reaches zero, call psd.finalize();
	       if (numScheduledCalls === 0) {
	           // If numScheduledCalls is 0, it means that our stack is not in a callback of a scheduled call,
	           // and that no deferreds where listening to this rejection or success.
	           // Since there is a risk that our stack can contain application code that may
	           // do stuff after this code is finished that may generate new calls, we cannot
	           // call finalizers here.
	           ++numScheduledCalls;
	           asap$1(function () {
	               if (--numScheduledCalls === 0) finalizePhysicalTick(); // Will detect unhandled errors
	           }, []);
	       }
	   }
	
	   function propagateToListener(promise, listener) {
	       if (promise._state === null) {
	           promise._listeners.push(listener);
	           return;
	       }
	
	       var cb = promise._state ? listener.onFulfilled : listener.onRejected;
	       if (cb === null) {
	           // This Listener doesnt have a listener for the event being triggered (onFulfilled or onReject) so lets forward the event to any eventual listeners on the Promise instance returned by then() or catch()
	           return (promise._state ? listener.resolve : listener.reject)(promise._value);
	       }
	       var psd = listener.psd;
	       ++psd.ref;
	       ++numScheduledCalls;
	       asap$1(callListener, [cb, promise, listener]);
	   }
	
	   function callListener(cb, promise, listener) {
	       var outerScope = PSD;
	       var psd = listener.psd;
	       try {
	           if (psd !== outerScope) {
	               // **KEEP** outerScope.env = wrappers.snapshot(); // Snapshot outerScope's environment.
	               PSD = psd;
	               // **KEEP** wrappers.restore(psd.env); // Restore PSD's environment.
	           }
	
	           // Set static variable currentFulfiller to the promise that is being fullfilled,
	           // so that we connect the chain of promises (for long stacks support)
	           currentFulfiller = promise;
	
	           // Call callback and resolve our listener with it's return value.
	           var value = promise._value,
	               ret;
	           if (promise._state) {
	               ret = cb(value);
	           } else {
	               if (rejectingErrors.length) rejectingErrors = [];
	               ret = cb(value);
	               if (rejectingErrors.indexOf(value) === -1) markErrorAsHandled(promise); // Callback didnt do Promise.reject(err) nor reject(err) onto another promise.
	           }
	           listener.resolve(ret);
	       } catch (e) {
	           // Exception thrown in callback. Reject our listener.
	           listener.reject(e);
	       } finally {
	           // Restore PSD, env and currentFulfiller.
	           if (psd !== outerScope) {
	               PSD = outerScope;
	               // **KEEP** wrappers.restore(outerScope.env); // Restore outerScope's environment
	           }
	           currentFulfiller = null;
	           if (--numScheduledCalls === 0) finalizePhysicalTick();
	           --psd.ref || psd.finalize();
	       }
	   }
	
	   function getStack(promise, stacks, limit) {
	       if (stacks.length === limit) return stacks;
	       var stack = "";
	       if (promise._state === false) {
	           var failure = promise._value,
	               errorName,
	               message;
	
	           if (failure != null) {
	               errorName = failure.name || "Error";
	               message = failure.message || failure;
	               stack = prettyStack(failure, 0);
	           } else {
	               errorName = failure; // If error is undefined or null, show that.
	               message = "";
	           }
	           stacks.push(errorName + (message ? ": " + message : "") + stack);
	       }
	       if (debug) {
	           stack = prettyStack(promise._stackHolder, 2);
	           if (stack && stacks.indexOf(stack) === -1) stacks.push(stack);
	           if (promise._prev) getStack(promise._prev, stacks, limit);
	       }
	       return stacks;
	   }
	
	   function linkToPreviousPromise(promise, prev) {
	       // Support long stacks by linking to previous completed promise.
	       var numPrev = prev ? prev._numPrev + 1 : 0;
	       if (numPrev < LONG_STACKS_CLIP_LIMIT) {
	           // Prohibit infinite Promise loops to get an infinite long memory consuming "tail".
	           promise._prev = prev;
	           promise._numPrev = numPrev;
	       }
	   }
	
	   /* The callback to schedule with setImmediate() or setTimeout().
	      It runs a virtual microtick and executes any callback registered in microtickQueue.
	    */
	   function physicalTick() {
	       beginMicroTickScope() && endMicroTickScope();
	   }
	
	   function beginMicroTickScope() {
	       var wasRootExec = isOutsideMicroTick;
	       isOutsideMicroTick = false;
	       needsNewPhysicalTick = false;
	       return wasRootExec;
	   }
	
	   /* Executes micro-ticks without doing try..catch.
	      This can be possible because we only use this internally and
	      the registered functions are exception-safe (they do try..catch
	      internally before calling any external method). If registering
	      functions in the microtickQueue that are not exception-safe, this
	      would destroy the framework and make it instable. So we don't export
	      our asap method.
	   */
	   function endMicroTickScope() {
	       var callbacks, i, l;
	       do {
	           while (microtickQueue.length > 0) {
	               callbacks = microtickQueue;
	               microtickQueue = [];
	               l = callbacks.length;
	               for (i = 0; i < l; ++i) {
	                   var item = callbacks[i];
	                   item[0].apply(null, item[1]);
	               }
	           }
	       } while (microtickQueue.length > 0);
	       isOutsideMicroTick = true;
	       needsNewPhysicalTick = true;
	   }
	
	   function finalizePhysicalTick() {
	       var unhandledErrs = unhandledErrors;
	       unhandledErrors = [];
	       unhandledErrs.forEach(function (p) {
	           p._PSD.onunhandled.call(null, p._value, p);
	       });
	       var finalizers = tickFinalizers.slice(0); // Clone first because finalizer may remove itself from list.
	       var i = finalizers.length;
	       while (i) {
	           finalizers[--i]();
	       }
	   }
	
	   function run_at_end_of_this_or_next_physical_tick(fn) {
	       function finalizer() {
	           fn();
	           tickFinalizers.splice(tickFinalizers.indexOf(finalizer), 1);
	       }
	       tickFinalizers.push(finalizer);
	       ++numScheduledCalls;
	       asap$1(function () {
	           if (--numScheduledCalls === 0) finalizePhysicalTick();
	       }, []);
	   }
	
	   function addPossiblyUnhandledError(promise) {
	       // Only add to unhandledErrors if not already there. The first one to add to this list
	       // will be upon the first rejection so that the root cause (first promise in the
	       // rejection chain) is the one listed.
	       if (!unhandledErrors.some(function (p) {
	           return p._value === promise._value;
	       })) unhandledErrors.push(promise);
	   }
	
	   function markErrorAsHandled(promise) {
	       // Called when a reject handled is actually being called.
	       // Search in unhandledErrors for any promise whos _value is this promise_value (list
	       // contains only rejected promises, and only one item per error)
	       var i = unhandledErrors.length;
	       while (i) {
	           if (unhandledErrors[--i]._value === promise._value) {
	               // Found a promise that failed with this same error object pointer,
	               // Remove that since there is a listener that actually takes care of it.
	               unhandledErrors.splice(i, 1);
	               return;
	           }
	       }
	   }
	
	   // By default, log uncaught errors to the console
	   function defaultErrorHandler(e) {
	       console.warn('Unhandled rejection: ' + (e.stack || e));
	   }
	
	   function PromiseReject(reason) {
	       return new Promise(INTERNAL, false, reason);
	   }
	
	   function wrap(fn, errorCatcher) {
	       var psd = PSD;
	       return function () {
	           var wasRootExec = beginMicroTickScope(),
	               outerScope = PSD;
	
	           try {
	               if (outerScope !== psd) {
	                   // **KEEP** outerScope.env = wrappers.snapshot(); // Snapshot outerScope's environment
	                   PSD = psd;
	                   // **KEEP** wrappers.restore(psd.env); // Restore PSD's environment.
	               }
	               return fn.apply(this, arguments);
	           } catch (e) {
	               errorCatcher && errorCatcher(e);
	           } finally {
	               if (outerScope !== psd) {
	                   PSD = outerScope;
	                   // **KEEP** wrappers.restore(outerScope.env); // Restore outerScope's environment
	               }
	               if (wasRootExec) endMicroTickScope();
	           }
	       };
	   }
	
	   function newScope(fn, a1, a2, a3) {
	       var parent = PSD,
	           psd = Object.create(parent);
	       psd.parent = parent;
	       psd.ref = 0;
	       psd.global = false;
	       // **KEEP** psd.env = wrappers.wrap(psd);
	
	       // unhandleds and onunhandled should not be specifically set here.
	       // Leave them on parent prototype.
	       // unhandleds.push(err) will push to parent's prototype
	       // onunhandled() will call parents onunhandled (with this scope's this-pointer though!)
	       ++parent.ref;
	       psd.finalize = function () {
	           --this.parent.ref || this.parent.finalize();
	       };
	       var rv = usePSD(psd, fn, a1, a2, a3);
	       if (psd.ref === 0) psd.finalize();
	       return rv;
	   }
	
	   function usePSD(psd, fn, a1, a2, a3) {
	       var outerScope = PSD;
	       try {
	           if (psd !== outerScope) {
	               // **KEEP** outerScope.env = wrappers.snapshot(); // snapshot outerScope's environment.
	               PSD = psd;
	               // **KEEP** wrappers.restore(psd.env); // Restore PSD's environment.
	           }
	           return fn(a1, a2, a3);
	       } finally {
	           if (psd !== outerScope) {
	               PSD = outerScope;
	               // **KEEP** wrappers.restore(outerScope.env); // Restore outerScope's environment.
	           }
	       }
	   }
	
	   function globalError(err, promise) {
	       var rv;
	       try {
	           rv = promise.onuncatched(err);
	       } catch (e) {}
	       if (rv !== false) try {
	           Promise.on.error.fire(err, promise); // TODO: Deprecated and use same global handler as bluebird.
	       } catch (e) {}
	   }
	
	   /* **KEEP** 
	
	   export function wrapPromise(PromiseClass) {
	       var proto = PromiseClass.prototype;
	       var origThen = proto.then;
	       
	       wrappers.add({
	           snapshot: () => proto.then,
	           restore: value => {proto.then = value;},
	           wrap: () => patchedThen
	       });
	
	       function patchedThen (onFulfilled, onRejected) {
	           var promise = this;
	           var onFulfilledProxy = wrap(function(value){
	               var rv = value;
	               if (onFulfilled) {
	                   rv = onFulfilled(rv);
	                   if (rv && typeof rv.then === 'function') rv.then(); // Intercept that promise as well.
	               }
	               --PSD.ref || PSD.finalize();
	               return rv;
	           });
	           var onRejectedProxy = wrap(function(err){
	               promise._$err = err;
	               var unhandleds = PSD.unhandleds;
	               var idx = unhandleds.length,
	                   rv;
	               while (idx--) if (unhandleds[idx]._$err === err) break;
	               if (onRejected) {
	                   if (idx !== -1) unhandleds.splice(idx, 1); // Mark as handled.
	                   rv = onRejected(err);
	                   if (rv && typeof rv.then === 'function') rv.then(); // Intercept that promise as well.
	               } else {
	                   if (idx === -1) unhandleds.push(promise);
	                   rv = PromiseClass.reject(err);
	                   rv._$nointercept = true; // Prohibit eternal loop.
	               }
	               --PSD.ref || PSD.finalize();
	               return rv;
	           });
	           
	           if (this._$nointercept) return origThen.apply(this, arguments);
	           ++PSD.ref;
	           return origThen.call(this, onFulfilledProxy, onRejectedProxy);
	       }
	   }
	
	   // Global Promise wrapper
	   if (_global.Promise) wrapPromise(_global.Promise);
	
	   */
	
	   doFakeAutoComplete(function () {
	       // Simplify the job for VS Intellisense. This piece of code is one of the keys to the new marvellous intellisense support in Dexie.
	       asap$1 = function (fn, args) {
	           setTimeout(function () {
	               fn.apply(null, args);
	           }, 0);
	       };
	   });
	
	   var DEXIE_VERSION = '1.4.2';
	   var maxString = String.fromCharCode(65535);
	   var maxKey = function () {
	       try {
	           IDBKeyRange.only([[]]);return [[]];
	       } catch (e) {
	           return maxString;
	       }
	   }();
	   var INVALID_KEY_ARGUMENT = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.";
	   var STRING_EXPECTED = "String expected.";
	   var connections = [];
	   var isIEOrEdge = typeof navigator !== 'undefined' && /(MSIE|Trident|Edge)/.test(navigator.userAgent);
	   var hasIEDeleteObjectStoreBug = isIEOrEdge;
	   var hangsOnDeleteLargeKeyRange = isIEOrEdge;
	   var dexieStackFrameFilter = function (frame) {
	       return !/(dexie\.js|dexie\.min\.js)/.test(frame);
	   };
	   setDebug(debug, dexieStackFrameFilter);
	
	   function Dexie(dbName, options) {
	       /// <param name="options" type="Object" optional="true">Specify only if you wich to control which addons that should run on this instance</param>
	       var deps = Dexie.dependencies;
	       var opts = extend({
	           // Default Options
	           addons: Dexie.addons, // Pick statically registered addons by default
	           autoOpen: true, // Don't require db.open() explicitely.
	           indexedDB: deps.indexedDB, // Backend IndexedDB api. Default to IDBShim or browser env.
	           IDBKeyRange: deps.IDBKeyRange // Backend IDBKeyRange api. Default to IDBShim or browser env.
	       }, options);
	       var addons = opts.addons,
	           autoOpen = opts.autoOpen,
	           indexedDB = opts.indexedDB,
	           IDBKeyRange = opts.IDBKeyRange;
	
	       var globalSchema = this._dbSchema = {};
	       var versions = [];
	       var dbStoreNames = [];
	       var allTables = {};
	       ///<var type="IDBDatabase" />
	       var idbdb = null; // Instance of IDBDatabase
	       var dbOpenError = null;
	       var isBeingOpened = false;
	       var openComplete = false;
	       var READONLY = "readonly",
	           READWRITE = "readwrite";
	       var db = this;
	       var dbReadyResolve,
	           dbReadyPromise = new Promise(function (resolve) {
	           dbReadyResolve = resolve;
	       }),
	           cancelOpen,
	           openCanceller = new Promise(function (_, reject) {
	           cancelOpen = reject;
	       });
	       var autoSchema = true;
	       var hasNativeGetDatabaseNames = !!getNativeGetDatabaseNamesFn(indexedDB),
	           hasGetAll;
	
	       function init() {
	           // Default subscribers to "versionchange" and "blocked".
	           // Can be overridden by custom handlers. If custom handlers return false, these default
	           // behaviours will be prevented.
	           db.on("versionchange", function (ev) {
	               // Default behavior for versionchange event is to close database connection.
	               // Caller can override this behavior by doing db.on("versionchange", function(){ return false; });
	               // Let's not block the other window from making it's delete() or open() call.
	               // NOTE! This event is never fired in IE,Edge or Safari.
	               if (ev.newVersion > 0) console.warn('Another connection wants to upgrade database \'' + db.name + '\'. Closing db now to resume the upgrade.');else console.warn('Another connection wants to delete database \'' + db.name + '\'. Closing db now to resume the delete request.');
	               db.close();
	               // In many web applications, it would be recommended to force window.reload()
	               // when this event occurs. To do that, subscribe to the versionchange event
	               // and call window.location.reload(true) if ev.newVersion > 0 (not a deletion)
	               // The reason for this is that your current web app obviously has old schema code that needs
	               // to be updated. Another window got a newer version of the app and needs to upgrade DB but
	               // your window is blocking it unless we close it here.
	           });
	           db.on("blocked", function (ev) {
	               if (!ev.newVersion || ev.newVersion < ev.oldVersion) console.warn('Dexie.delete(\'' + db.name + '\') was blocked');else console.warn('Upgrade \'' + db.name + '\' blocked by other connection holding version ' + ev.oldVersion / 10);
	           });
	       }
	
	       //
	       //
	       //
	       // ------------------------- Versioning Framework---------------------------
	       //
	       //
	       //
	
	       this.version = function (versionNumber) {
	           /// <param name="versionNumber" type="Number"></param>
	           /// <returns type="Version"></returns>
	           if (idbdb || isBeingOpened) throw new exceptions.Schema("Cannot add version when database is open");
	           this.verno = Math.max(this.verno, versionNumber);
	           var versionInstance = versions.filter(function (v) {
	               return v._cfg.version === versionNumber;
	           })[0];
	           if (versionInstance) return versionInstance;
	           versionInstance = new Version(versionNumber);
	           versions.push(versionInstance);
	           versions.sort(lowerVersionFirst);
	           return versionInstance;
	       };
	
	       function Version(versionNumber) {
	           this._cfg = {
	               version: versionNumber,
	               storesSource: null,
	               dbschema: {},
	               tables: {},
	               contentUpgrade: null
	           };
	           this.stores({}); // Derive earlier schemas by default.
	       }
	
	       extend(Version.prototype, {
	           stores: function (stores) {
	               /// <summary>
	               ///   Defines the schema for a particular version
	               /// </summary>
	               /// <param name="stores" type="Object">
	               /// Example: <br/>
	               ///   {users: "id++,first,last,&amp;username,*email", <br/>
	               ///   passwords: "id++,&amp;username"}<br/>
	               /// <br/>
	               /// Syntax: {Table: "[primaryKey][++],[&amp;][*]index1,[&amp;][*]index2,..."}<br/><br/>
	               /// Special characters:<br/>
	               ///  "&amp;"  means unique key, <br/>
	               ///  "*"  means value is multiEntry, <br/>
	               ///  "++" means auto-increment and only applicable for primary key <br/>
	               /// </param>
	               this._cfg.storesSource = this._cfg.storesSource ? extend(this._cfg.storesSource, stores) : stores;
	
	               // Derive stores from earlier versions if they are not explicitely specified as null or a new syntax.
	               var storesSpec = {};
	               versions.forEach(function (version) {
	                   // 'versions' is always sorted by lowest version first.
	                   extend(storesSpec, version._cfg.storesSource);
	               });
	
	               var dbschema = this._cfg.dbschema = {};
	               this._parseStoresSpec(storesSpec, dbschema);
	               // Update the latest schema to this version
	               // Update API
	               globalSchema = db._dbSchema = dbschema;
	               removeTablesApi([allTables, db, Transaction.prototype]);
	               setApiOnPlace([allTables, db, Transaction.prototype, this._cfg.tables], keys(dbschema), READWRITE, dbschema);
	               dbStoreNames = keys(dbschema);
	               return this;
	           },
	           upgrade: function (upgradeFunction) {
	               /// <param name="upgradeFunction" optional="true">Function that performs upgrading actions.</param>
	               var self = this;
	               fakeAutoComplete(function () {
	                   upgradeFunction(db._createTransaction(READWRITE, keys(self._cfg.dbschema), self._cfg.dbschema)); // BUGBUG: No code completion for prev version's tables wont appear.
	               });
	               this._cfg.contentUpgrade = upgradeFunction;
	               return this;
	           },
	           _parseStoresSpec: function (stores, outSchema) {
	               keys(stores).forEach(function (tableName) {
	                   if (stores[tableName] !== null) {
	                       var instanceTemplate = {};
	                       var indexes = parseIndexSyntax(stores[tableName]);
	                       var primKey = indexes.shift();
	                       if (primKey.multi) throw new exceptions.Schema("Primary key cannot be multi-valued");
	                       if (primKey.keyPath) setByKeyPath(instanceTemplate, primKey.keyPath, primKey.auto ? 0 : primKey.keyPath);
	                       indexes.forEach(function (idx) {
	                           if (idx.auto) throw new exceptions.Schema("Only primary key can be marked as autoIncrement (++)");
	                           if (!idx.keyPath) throw new exceptions.Schema("Index must have a name and cannot be an empty string");
	                           setByKeyPath(instanceTemplate, idx.keyPath, idx.compound ? idx.keyPath.map(function () {
	                               return "";
	                           }) : "");
	                       });
	                       outSchema[tableName] = new TableSchema(tableName, primKey, indexes, instanceTemplate);
	                   }
	               });
	           }
	       });
	
	       function runUpgraders(oldVersion, idbtrans, reject) {
	           var trans = db._createTransaction(READWRITE, dbStoreNames, globalSchema);
	           trans.create(idbtrans);
	           trans._completion.catch(reject);
	           var rejectTransaction = trans._reject.bind(trans);
	           newScope(function () {
	               PSD.trans = trans;
	               if (oldVersion === 0) {
	                   // Create tables:
	                   keys(globalSchema).forEach(function (tableName) {
	                       createTable(idbtrans, tableName, globalSchema[tableName].primKey, globalSchema[tableName].indexes);
	                   });
	                   Promise.follow(function () {
	                       return db.on.populate.fire(trans);
	                   }).catch(rejectTransaction);
	               } else updateTablesAndIndexes(oldVersion, trans, idbtrans).catch(rejectTransaction);
	           });
	       }
	
	       function updateTablesAndIndexes(oldVersion, trans, idbtrans) {
	           // Upgrade version to version, step-by-step from oldest to newest version.
	           // Each transaction object will contain the table set that was current in that version (but also not-yet-deleted tables from its previous version)
	           var queue = [];
	           var oldVersionStruct = versions.filter(function (version) {
	               return version._cfg.version === oldVersion;
	           })[0];
	           if (!oldVersionStruct) throw new exceptions.Upgrade("Dexie specification of currently installed DB version is missing");
	           globalSchema = db._dbSchema = oldVersionStruct._cfg.dbschema;
	           var anyContentUpgraderHasRun = false;
	
	           var versToRun = versions.filter(function (v) {
	               return v._cfg.version > oldVersion;
	           });
	           versToRun.forEach(function (version) {
	               /// <param name="version" type="Version"></param>
	               queue.push(function () {
	                   var oldSchema = globalSchema;
	                   var newSchema = version._cfg.dbschema;
	                   adjustToExistingIndexNames(oldSchema, idbtrans);
	                   adjustToExistingIndexNames(newSchema, idbtrans);
	                   globalSchema = db._dbSchema = newSchema;
	                   var diff = getSchemaDiff(oldSchema, newSchema);
	                   // Add tables          
	                   diff.add.forEach(function (tuple) {
	                       createTable(idbtrans, tuple[0], tuple[1].primKey, tuple[1].indexes);
	                   });
	                   // Change tables
	                   diff.change.forEach(function (change) {
	                       if (change.recreate) {
	                           throw new exceptions.Upgrade("Not yet support for changing primary key");
	                       } else {
	                           var store = idbtrans.objectStore(change.name);
	                           // Add indexes
	                           change.add.forEach(function (idx) {
	                               addIndex(store, idx);
	                           });
	                           // Update indexes
	                           change.change.forEach(function (idx) {
	                               store.deleteIndex(idx.name);
	                               addIndex(store, idx);
	                           });
	                           // Delete indexes
	                           change.del.forEach(function (idxName) {
	                               store.deleteIndex(idxName);
	                           });
	                       }
	                   });
	                   if (version._cfg.contentUpgrade) {
	                       anyContentUpgraderHasRun = true;
	                       return Promise.follow(function () {
	                           version._cfg.contentUpgrade(trans);
	                       });
	                   }
	               });
	               queue.push(function (idbtrans) {
	                   if (!anyContentUpgraderHasRun || !hasIEDeleteObjectStoreBug) {
	                       // Dont delete old tables if ieBug is present and a content upgrader has run. Let tables be left in DB so far. This needs to be taken care of.
	                       var newSchema = version._cfg.dbschema;
	                       // Delete old tables
	                       deleteRemovedTables(newSchema, idbtrans);
	                   }
	               });
	           });
	
	           // Now, create a queue execution engine
	           function runQueue() {
	               return queue.length ? Promise.resolve(queue.shift()(trans.idbtrans)).then(runQueue) : Promise.resolve();
	           }
	
	           return runQueue().then(function () {
	               createMissingTables(globalSchema, idbtrans); // At last, make sure to create any missing tables. (Needed by addons that add stores to DB without specifying version)
	           });
	       }
	
	       function getSchemaDiff(oldSchema, newSchema) {
	           var diff = {
	               del: [], // Array of table names
	               add: [], // Array of [tableName, newDefinition]
	               change: [] // Array of {name: tableName, recreate: newDefinition, del: delIndexNames, add: newIndexDefs, change: changedIndexDefs}
	           };
	           for (var table in oldSchema) {
	               if (!newSchema[table]) diff.del.push(table);
	           }
	           for (table in newSchema) {
	               var oldDef = oldSchema[table],
	                   newDef = newSchema[table];
	               if (!oldDef) {
	                   diff.add.push([table, newDef]);
	               } else {
	                   var change = {
	                       name: table,
	                       def: newDef,
	                       recreate: false,
	                       del: [],
	                       add: [],
	                       change: []
	                   };
	                   if (oldDef.primKey.src !== newDef.primKey.src) {
	                       // Primary key has changed. Remove and re-add table.
	                       change.recreate = true;
	                       diff.change.push(change);
	                   } else {
	                       // Same primary key. Just find out what differs:
	                       var oldIndexes = oldDef.idxByName;
	                       var newIndexes = newDef.idxByName;
	                       for (var idxName in oldIndexes) {
	                           if (!newIndexes[idxName]) change.del.push(idxName);
	                       }
	                       for (idxName in newIndexes) {
	                           var oldIdx = oldIndexes[idxName],
	                               newIdx = newIndexes[idxName];
	                           if (!oldIdx) change.add.push(newIdx);else if (oldIdx.src !== newIdx.src) change.change.push(newIdx);
	                       }
	                       if (change.del.length > 0 || change.add.length > 0 || change.change.length > 0) {
	                           diff.change.push(change);
	                       }
	                   }
	               }
	           }
	           return diff;
	       }
	
	       function createTable(idbtrans, tableName, primKey, indexes) {
	           /// <param name="idbtrans" type="IDBTransaction"></param>
	           var store = idbtrans.db.createObjectStore(tableName, primKey.keyPath ? { keyPath: primKey.keyPath, autoIncrement: primKey.auto } : { autoIncrement: primKey.auto });
	           indexes.forEach(function (idx) {
	               addIndex(store, idx);
	           });
	           return store;
	       }
	
	       function createMissingTables(newSchema, idbtrans) {
	           keys(newSchema).forEach(function (tableName) {
	               if (!idbtrans.db.objectStoreNames.contains(tableName)) {
	                   createTable(idbtrans, tableName, newSchema[tableName].primKey, newSchema[tableName].indexes);
	               }
	           });
	       }
	
	       function deleteRemovedTables(newSchema, idbtrans) {
	           for (var i = 0; i < idbtrans.db.objectStoreNames.length; ++i) {
	               var storeName = idbtrans.db.objectStoreNames[i];
	               if (newSchema[storeName] == null) {
	                   idbtrans.db.deleteObjectStore(storeName);
	               }
	           }
	       }
	
	       function addIndex(store, idx) {
	           store.createIndex(idx.name, idx.keyPath, { unique: idx.unique, multiEntry: idx.multi });
	       }
	
	       function dbUncaught(err) {
	           return db.on.error.fire(err);
	       }
	
	       //
	       //
	       //      Dexie Protected API
	       //
	       //
	
	       this._allTables = allTables;
	
	       this._tableFactory = function createTable(mode, tableSchema) {
	           /// <param name="tableSchema" type="TableSchema"></param>
	           if (mode === READONLY) return new Table(tableSchema.name, tableSchema, Collection);else return new WriteableTable(tableSchema.name, tableSchema);
	       };
	
	       this._createTransaction = function (mode, storeNames, dbschema, parentTransaction) {
	           return new Transaction(mode, storeNames, dbschema, parentTransaction);
	       };
	
	       /* Generate a temporary transaction when db operations are done outside a transactino scope.
	       */
	       function tempTransaction(mode, storeNames, fn) {
	           // Last argument is "writeLocked". But this doesnt apply to oneshot direct db operations, so we ignore it.
	           if (!openComplete && !PSD.letThrough) {
	               if (!isBeingOpened) {
	                   if (!autoOpen) return rejection(new exceptions.DatabaseClosed(), dbUncaught);
	                   db.open().catch(nop); // Open in background. If if fails, it will be catched by the final promise anyway.
	               }
	               return dbReadyPromise.then(function () {
	                   return tempTransaction(mode, storeNames, fn);
	               });
	           } else {
	               var trans = db._createTransaction(mode, storeNames, globalSchema);
	               return trans._promise(mode, function (resolve, reject) {
	                   newScope(function () {
	                       // OPTIMIZATION POSSIBLE? newScope() not needed because it's already done in _promise.
	                       PSD.trans = trans;
	                       fn(resolve, reject, trans);
	                   });
	               }).then(function (result) {
	                   // Instead of resolving value directly, wait with resolving it until transaction has completed.
	                   // Otherwise the data would not be in the DB if requesting it in the then() operation.
	                   // Specifically, to ensure that the following expression will work:
	                   //
	                   //   db.friends.put({name: "Arne"}).then(function () {
	                   //       db.friends.where("name").equals("Arne").count(function(count) {
	                   //           assert (count === 1);
	                   //       });
	                   //   });
	                   //
	                   return trans._completion.then(function () {
	                       return result;
	                   });
	               }); /*.catch(err => { // Don't do this as of now. If would affect bulk- and modify methods in a way that could be more intuitive. But wait! Maybe change in next major.
	                    trans._reject(err);
	                    return rejection(err);
	                   });*/
	           }
	       }
	
	       this._whenReady = function (fn) {
	           return new Promise(fake || openComplete || PSD.letThrough ? fn : function (resolve, reject) {
	               if (!isBeingOpened) {
	                   if (!autoOpen) {
	                       reject(new exceptions.DatabaseClosed());
	                       return;
	                   }
	                   db.open().catch(nop); // Open in background. If if fails, it will be catched by the final promise anyway.
	               }
	               dbReadyPromise.then(function () {
	                   fn(resolve, reject);
	               });
	           }).uncaught(dbUncaught);
	       };
	
	       //
	       //
	       //
	       //
	       //      Dexie API
	       //
	       //
	       //
	
	       this.verno = 0;
	
	       this.open = function () {
	           if (isBeingOpened || idbdb) return dbReadyPromise.then(function () {
	               return dbOpenError ? rejection(dbOpenError, dbUncaught) : db;
	           });
	           debug && (openCanceller._stackHolder = getErrorWithStack()); // Let stacks point to when open() was called rather than where new Dexie() was called.
	           isBeingOpened = true;
	           dbOpenError = null;
	           openComplete = false;
	
	           // Function pointers to call when the core opening process completes.
	           var resolveDbReady = dbReadyResolve,
	
	           // upgradeTransaction to abort on failure.
	           upgradeTransaction = null;
	
	           return Promise.race([openCanceller, new Promise(function (resolve, reject) {
	               doFakeAutoComplete(function () {
	                   return resolve();
	               });
	
	               // Make sure caller has specified at least one version
	               if (versions.length > 0) autoSchema = false;
	
	               // Multiply db.verno with 10 will be needed to workaround upgrading bug in IE:
	               // IE fails when deleting objectStore after reading from it.
	               // A future version of Dexie.js will stopover an intermediate version to workaround this.
	               // At that point, we want to be backward compatible. Could have been multiplied with 2, but by using 10, it is easier to map the number to the real version number.
	
	               // If no API, throw!
	               if (!indexedDB) throw new exceptions.MissingAPI("indexedDB API not found. If using IE10+, make sure to run your code on a server URL " + "(not locally). If using old Safari versions, make sure to include indexedDB polyfill.");
	
	               var req = autoSchema ? indexedDB.open(dbName) : indexedDB.open(dbName, Math.round(db.verno * 10));
	               if (!req) throw new exceptions.MissingAPI("IndexedDB API not available"); // May happen in Safari private mode, see https://github.com/dfahlander/Dexie.js/issues/134
	               req.onerror = wrap(eventRejectHandler(reject));
	               req.onblocked = wrap(fireOnBlocked);
	               req.onupgradeneeded = wrap(function (e) {
	                   upgradeTransaction = req.transaction;
	                   if (autoSchema && !db._allowEmptyDB) {
	                       // Unless an addon has specified db._allowEmptyDB, lets make the call fail.
	                       // Caller did not specify a version or schema. Doing that is only acceptable for opening alread existing databases.
	                       // If onupgradeneeded is called it means database did not exist. Reject the open() promise and make sure that we
	                       // do not create a new database by accident here.
	                       req.onerror = preventDefault; // Prohibit onabort error from firing before we're done!
	                       upgradeTransaction.abort(); // Abort transaction (would hope that this would make DB disappear but it doesnt.)
	                       // Close database and delete it.
	                       req.result.close();
	                       var delreq = indexedDB.deleteDatabase(dbName); // The upgrade transaction is atomic, and javascript is single threaded - meaning that there is no risk that we delete someone elses database here!
	                       delreq.onsuccess = delreq.onerror = wrap(function () {
	                           reject(new exceptions.NoSuchDatabase('Database ' + dbName + ' doesnt exist'));
	                       });
	                   } else {
	                       upgradeTransaction.onerror = wrap(eventRejectHandler(reject));
	                       var oldVer = e.oldVersion > Math.pow(2, 62) ? 0 : e.oldVersion; // Safari 8 fix.
	                       runUpgraders(oldVer / 10, upgradeTransaction, reject, req);
	                   }
	               }, reject);
	
	               req.onsuccess = wrap(function () {
	                   // Core opening procedure complete. Now let's just record some stuff.
	                   upgradeTransaction = null;
	                   idbdb = req.result;
	                   connections.push(db); // Used for emulating versionchange event on IE/Edge/Safari.
	
	                   if (autoSchema) readGlobalSchema();else if (idbdb.objectStoreNames.length > 0) {
	                       try {
	                           adjustToExistingIndexNames(globalSchema, idbdb.transaction(safariMultiStoreFix(idbdb.objectStoreNames), READONLY));
	                       } catch (e) {
	                           // Safari may bail out if > 1 store names. However, this shouldnt be a showstopper. Issue #120.
	                       }
	                   }
	
	                   idbdb.onversionchange = wrap(function (ev) {
	                       db._vcFired = true; // detect implementations that not support versionchange (IE/Edge/Safari)
	                       db.on("versionchange").fire(ev);
	                   });
	
	                   if (!hasNativeGetDatabaseNames) {
	                       // Update localStorage with list of database names
	                       globalDatabaseList(function (databaseNames) {
	                           if (databaseNames.indexOf(dbName) === -1) return databaseNames.push(dbName);
	                       });
	                   }
	
	                   resolve();
	               }, reject);
	           })]).then(function () {
	               // Before finally resolving the dbReadyPromise and this promise,
	               // call and await all on('ready') subscribers:
	               // Dexie.vip() makes subscribers able to use the database while being opened.
	               // This is a must since these subscribers take part of the opening procedure.
	               return Dexie.vip(db.on.ready.fire);
	           }).then(function () {
	               // Resolve the db.open() with the db instance.
	               isBeingOpened = false;
	               return db;
	           }).catch(function (err) {
	               try {
	                   // Did we fail within onupgradeneeded? Make sure to abort the upgrade transaction so it doesnt commit.
	                   upgradeTransaction && upgradeTransaction.abort();
	               } catch (e) {}
	               isBeingOpened = false; // Set before calling db.close() so that it doesnt reject openCanceller again (leads to unhandled rejection event).
	               db.close(); // Closes and resets idbdb, removes connections, resets dbReadyPromise and openCanceller so that a later db.open() is fresh.
	               // A call to db.close() may have made on-ready subscribers fail. Use dbOpenError if set, since err could be a follow-up error on that.
	               dbOpenError = err; // Record the error. It will be used to reject further promises of db operations.
	               return rejection(dbOpenError, dbUncaught); // dbUncaught will make sure any error that happened in any operation before will now bubble to db.on.error() thanks to the special handling in Promise.uncaught().
	           }).finally(function () {
	               openComplete = true;
	               resolveDbReady(); // dbReadyPromise is resolved no matter if open() rejects or resolved. It's just to wake up waiters.
	           });
	       };
	
	       this.close = function () {
	           var idx = connections.indexOf(db);
	           if (idx >= 0) connections.splice(idx, 1);
	           if (idbdb) {
	               try {
	                   idbdb.close();
	               } catch (e) {}
	               idbdb = null;
	           }
	           autoOpen = false;
	           dbOpenError = new exceptions.DatabaseClosed();
	           if (isBeingOpened) cancelOpen(dbOpenError);
	           // Reset dbReadyPromise promise:
	           dbReadyPromise = new Promise(function (resolve) {
	               dbReadyResolve = resolve;
	           });
	           openCanceller = new Promise(function (_, reject) {
	               cancelOpen = reject;
	           });
	       };
	
	       this.delete = function () {
	           var hasArguments = arguments.length > 0;
	           return new Promise(function (resolve, reject) {
	               if (hasArguments) throw new exceptions.InvalidArgument("Arguments not allowed in db.delete()");
	               if (isBeingOpened) {
	                   dbReadyPromise.then(doDelete);
	               } else {
	                   doDelete();
	               }
	               function doDelete() {
	                   db.close();
	                   var req = indexedDB.deleteDatabase(dbName);
	                   req.onsuccess = wrap(function () {
	                       if (!hasNativeGetDatabaseNames) {
	                           globalDatabaseList(function (databaseNames) {
	                               var pos = databaseNames.indexOf(dbName);
	                               if (pos >= 0) return databaseNames.splice(pos, 1);
	                           });
	                       }
	                       resolve();
	                   });
	                   req.onerror = wrap(eventRejectHandler(reject));
	                   req.onblocked = fireOnBlocked;
	               }
	           }).uncaught(dbUncaught);
	       };
	
	       this.backendDB = function () {
	           return idbdb;
	       };
	
	       this.isOpen = function () {
	           return idbdb !== null;
	       };
	       this.hasFailed = function () {
	           return dbOpenError !== null;
	       };
	       this.dynamicallyOpened = function () {
	           return autoSchema;
	       };
	
	       //
	       // Properties
	       //
	       this.name = dbName;
	
	       // db.tables - an array of all Table instances.
	       setProp(this, "tables", {
	           get: function () {
	               /// <returns type="Array" elementType="WriteableTable" />
	               return keys(allTables).map(function (name) {
	                   return allTables[name];
	               });
	           }
	       });
	
	       //
	       // Events
	       //
	       this.on = Events(this, "error", "populate", "blocked", "versionchange", { ready: [promisableChain, nop] });
	
	       this.on.ready.subscribe = override(this.on.ready.subscribe, function (subscribe) {
	           return function (subscriber, bSticky) {
	               Dexie.vip(function () {
	                   if (openComplete) {
	                       // Database already open. Call subscriber asap.
	                       Promise.resolve().then(subscriber);
	                       // bSticky: Also subscribe to future open sucesses (after close / reopen)
	                       if (bSticky) subscribe(subscriber);
	                   } else {
	                       // Database not yet open. Subscribe to it.
	                       subscribe(subscriber);
	                       // If bSticky is falsy, make sure to unsubscribe subscriber when fired once.
	                       if (!bSticky) subscribe(function unsubscribe() {
	                           db.on.ready.unsubscribe(subscriber);
	                           db.on.ready.unsubscribe(unsubscribe);
	                       });
	                   }
	               });
	           };
	       });
	
	       fakeAutoComplete(function () {
	           db.on("populate").fire(db._createTransaction(READWRITE, dbStoreNames, globalSchema));
	           db.on("error").fire(new Error());
	       });
	
	       this.transaction = function (mode, tableInstances, scopeFunc) {
	           /// <summary>
	           ///
	           /// </summary>
	           /// <param name="mode" type="String">"r" for readonly, or "rw" for readwrite</param>
	           /// <param name="tableInstances">Table instance, Array of Table instances, String or String Array of object stores to include in the transaction</param>
	           /// <param name="scopeFunc" type="Function">Function to execute with transaction</param>
	
	           // Let table arguments be all arguments between mode and last argument.
	           var i = arguments.length;
	           if (i < 2) throw new exceptions.InvalidArgument("Too few arguments");
	           // Prevent optimzation killer (https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments)
	           // and clone arguments except the first one into local var 'args'.
	           var args = new Array(i - 1);
	           while (--i) {
	               args[i - 1] = arguments[i];
	           } // Let scopeFunc be the last argument and pop it so that args now only contain the table arguments.
	           scopeFunc = args.pop();
	           var tables = flatten(args); // Support using array as middle argument, or a mix of arrays and non-arrays.
	           var parentTransaction = PSD.trans;
	           // Check if parent transactions is bound to this db instance, and if caller wants to reuse it
	           if (!parentTransaction || parentTransaction.db !== db || mode.indexOf('!') !== -1) parentTransaction = null;
	           var onlyIfCompatible = mode.indexOf('?') !== -1;
	           mode = mode.replace('!', '').replace('?', ''); // Ok. Will change arguments[0] as well but we wont touch arguments henceforth.
	
	           try {
	               //
	               // Get storeNames from arguments. Either through given table instances, or through given table names.
	               //
	               var storeNames = tables.map(function (table) {
	                   var storeName = table instanceof Table ? table.name : table;
	                   if (typeof storeName !== 'string') throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
	                   return storeName;
	               });
	
	               //
	               // Resolve mode. Allow shortcuts "r" and "rw".
	               //
	               if (mode == "r" || mode == READONLY) mode = READONLY;else if (mode == "rw" || mode == READWRITE) mode = READWRITE;else throw new exceptions.InvalidArgument("Invalid transaction mode: " + mode);
	
	               if (parentTransaction) {
	                   // Basic checks
	                   if (parentTransaction.mode === READONLY && mode === READWRITE) {
	                       if (onlyIfCompatible) {
	                           // Spawn new transaction instead.
	                           parentTransaction = null;
	                       } else throw new exceptions.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
	                   }
	                   if (parentTransaction) {
	                       storeNames.forEach(function (storeName) {
	                           if (!hasOwn(parentTransaction.tables, storeName)) {
	                               if (onlyIfCompatible) {
	                                   // Spawn new transaction instead.
	                                   parentTransaction = null;
	                               } else throw new exceptions.SubTransaction("Table " + storeName + " not included in parent transaction.");
	                           }
	                       });
	                   }
	               }
	           } catch (e) {
	               return parentTransaction ? parentTransaction._promise(null, function (_, reject) {
	                   reject(e);
	               }) : rejection(e, dbUncaught);
	           }
	           // If this is a sub-transaction, lock the parent and then launch the sub-transaction.
	           return parentTransaction ? parentTransaction._promise(mode, enterTransactionScope, "lock") : db._whenReady(enterTransactionScope);
	
	           function enterTransactionScope(resolve) {
	               var parentPSD = PSD;
	               resolve(Promise.resolve().then(function () {
	                   return newScope(function () {
	                       // Keep a pointer to last non-transactional PSD to use if someone calls Dexie.ignoreTransaction().
	                       PSD.transless = PSD.transless || parentPSD;
	                       // Our transaction.
	                       //return new Promise((resolve, reject) => {
	                       var trans = db._createTransaction(mode, storeNames, globalSchema, parentTransaction);
	                       // Let the transaction instance be part of a Promise-specific data (PSD) value.
	                       PSD.trans = trans;
	
	                       if (parentTransaction) {
	                           // Emulate transaction commit awareness for inner transaction (must 'commit' when the inner transaction has no more operations ongoing)
	                           trans.idbtrans = parentTransaction.idbtrans;
	                       } else {
	                           trans.create(); // Create the backend transaction so that complete() or error() will trigger even if no operation is made upon it.
	                       }
	
	                       // Provide arguments to the scope function (for backward compatibility)
	                       var tableArgs = storeNames.map(function (name) {
	                           return trans.tables[name];
	                       });
	                       tableArgs.push(trans);
	
	                       var returnValue;
	                       return Promise.follow(function () {
	                           // Finally, call the scope function with our table and transaction arguments.
	                           returnValue = scopeFunc.apply(trans, tableArgs); // NOTE: returnValue is used in trans.on.complete() not as a returnValue to this func.
	                           if (returnValue) {
	                               if (typeof returnValue.next === 'function' && typeof returnValue.throw === 'function') {
	                                   // scopeFunc returned an iterator with throw-support. Handle yield as await.
	                                   returnValue = awaitIterator(returnValue);
	                               } else if (typeof returnValue.then === 'function' && !hasOwn(returnValue, '_PSD')) {
	                                   throw new exceptions.IncompatiblePromise("Incompatible Promise returned from transaction scope (read more at http://tinyurl.com/znyqjqc). Transaction scope: " + scopeFunc.toString());
	                               }
	                           }
	                       }).uncaught(dbUncaught).then(function () {
	                           if (parentTransaction) trans._resolve(); // sub transactions don't react to idbtrans.oncomplete. We must trigger a acompletion.
	                           return trans._completion; // Even if WE believe everything is fine. Await IDBTransaction's oncomplete or onerror as well.
	                       }).then(function () {
	                           return returnValue;
	                       }).catch(function (e) {
	                           //reject(e);
	                           trans._reject(e); // Yes, above then-handler were maybe not called because of an unhandled rejection in scopeFunc!
	                           return rejection(e);
	                       });
	                       //});
	                   });
	               }));
	           }
	       };
	
	       this.table = function (tableName) {
	           /// <returns type="WriteableTable"></returns>
	           if (fake && autoSchema) return new WriteableTable(tableName);
	           if (!hasOwn(allTables, tableName)) {
	               throw new exceptions.InvalidTable('Table ' + tableName + ' does not exist');
	           }
	           return allTables[tableName];
	       };
	
	       //
	       //
	       //
	       // Table Class
	       //
	       //
	       //
	       function Table(name, tableSchema, collClass) {
	           /// <param name="name" type="String"></param>
	           this.name = name;
	           this.schema = tableSchema;
	           this.hook = allTables[name] ? allTables[name].hook : Events(null, {
	               "creating": [hookCreatingChain, nop],
	               "reading": [pureFunctionChain, mirror],
	               "updating": [hookUpdatingChain, nop],
	               "deleting": [hookDeletingChain, nop]
	           });
	           this._collClass = collClass || Collection;
	       }
	
	       props(Table.prototype, {
	
	           //
	           // Table Protected Methods
	           //
	
	           _trans: function getTransaction(mode, fn, writeLocked) {
	               var trans = PSD.trans;
	               return trans && trans.db === db ? trans._promise(mode, fn, writeLocked) : tempTransaction(mode, [this.name], fn);
	           },
	           _idbstore: function getIDBObjectStore(mode, fn, writeLocked) {
	               if (fake) return new Promise(fn); // Simplify the work for Intellisense/Code completion.
	               var trans = PSD.trans,
	                   tableName = this.name;
	               function supplyIdbStore(resolve, reject, trans) {
	                   fn(resolve, reject, trans.idbtrans.objectStore(tableName), trans);
	               }
	               return trans && trans.db === db ? trans._promise(mode, supplyIdbStore, writeLocked) : tempTransaction(mode, [this.name], supplyIdbStore);
	           },
	
	           //
	           // Table Public Methods
	           //
	           get: function (key, cb) {
	               var self = this;
	               return this._idbstore(READONLY, function (resolve, reject, idbstore) {
	                   fake && resolve(self.schema.instanceTemplate);
	                   var req = idbstore.get(key);
	                   req.onerror = eventRejectHandler(reject);
	                   req.onsuccess = function () {
	                       resolve(self.hook.reading.fire(req.result));
	                   };
	               }).then(cb);
	           },
	           where: function (indexName) {
	               return new WhereClause(this, indexName);
	           },
	           count: function (cb) {
	               return this.toCollection().count(cb);
	           },
	           offset: function (offset) {
	               return this.toCollection().offset(offset);
	           },
	           limit: function (numRows) {
	               return this.toCollection().limit(numRows);
	           },
	           reverse: function () {
	               return this.toCollection().reverse();
	           },
	           filter: function (filterFunction) {
	               return this.toCollection().and(filterFunction);
	           },
	           each: function (fn) {
	               return this.toCollection().each(fn);
	           },
	           toArray: function (cb) {
	               return this.toCollection().toArray(cb);
	           },
	           orderBy: function (index) {
	               return new this._collClass(new WhereClause(this, index));
	           },
	
	           toCollection: function () {
	               return new this._collClass(new WhereClause(this));
	           },
	
	           mapToClass: function (constructor, structure) {
	               /// <summary>
	               ///     Map table to a javascript constructor function. Objects returned from the database will be instances of this class, making
	               ///     it possible to the instanceOf operator as well as extending the class using constructor.prototype.method = function(){...}.
	               /// </summary>
	               /// <param name="constructor">Constructor function representing the class.</param>
	               /// <param name="structure" optional="true">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
	               /// know what type each member has. Example: {name: String, emailAddresses: [String], password}</param>
	               this.schema.mappedClass = constructor;
	               var instanceTemplate = Object.create(constructor.prototype);
	               if (structure) {
	                   // structure and instanceTemplate is for IDE code competion only while constructor.prototype is for actual inheritance.
	                   applyStructure(instanceTemplate, structure);
	               }
	               this.schema.instanceTemplate = instanceTemplate;
	
	               // Now, subscribe to the when("reading") event to make all objects that come out from this table inherit from given class
	               // no matter which method to use for reading (Table.get() or Table.where(...)... )
	               var readHook = function (obj) {
	                   if (!obj) return obj; // No valid object. (Value is null). Return as is.
	                   // Create a new object that derives from constructor:
	                   var res = Object.create(constructor.prototype);
	                   // Clone members:
	                   for (var m in obj) {
	                       if (hasOwn(obj, m)) res[m] = obj[m];
	                   }return res;
	               };
	
	               if (this.schema.readHook) {
	                   this.hook.reading.unsubscribe(this.schema.readHook);
	               }
	               this.schema.readHook = readHook;
	               this.hook("reading", readHook);
	               return constructor;
	           },
	           defineClass: function (structure) {
	               /// <summary>
	               ///     Define all members of the class that represents the table. This will help code completion of when objects are read from the database
	               ///     as well as making it possible to extend the prototype of the returned constructor function.
	               /// </summary>
	               /// <param name="structure">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
	               /// know what type each member has. Example: {name: String, emailAddresses: [String], properties: {shoeSize: Number}}</param>
	               return this.mapToClass(Dexie.defineClass(structure), structure);
	           }
	       });
	
	       //
	       //
	       //
	       // WriteableTable Class (extends Table)
	       //
	       //
	       //
	       function WriteableTable(name, tableSchema, collClass) {
	           Table.call(this, name, tableSchema, collClass || WriteableCollection);
	       }
	
	       function BulkErrorHandlerCatchAll(errorList, done, supportHooks) {
	           return (supportHooks ? hookedEventRejectHandler : eventRejectHandler)(function (e) {
	               errorList.push(e);
	               done && done();
	           });
	       }
	
	       function bulkDelete(idbstore, trans, keysOrTuples, hasDeleteHook, deletingHook) {
	           // If hasDeleteHook, keysOrTuples must be an array of tuples: [[key1, value2],[key2,value2],...],
	           // else keysOrTuples must be just an array of keys: [key1, key2, ...].
	           return new Promise(function (resolve, reject) {
	               var len = keysOrTuples.length,
	                   lastItem = len - 1;
	               if (len === 0) return resolve();
	               if (!hasDeleteHook) {
	                   for (var i = 0; i < len; ++i) {
	                       var req = idbstore.delete(keysOrTuples[i]);
	                       req.onerror = wrap(eventRejectHandler(reject));
	                       if (i === lastItem) req.onsuccess = wrap(function () {
	                           return resolve();
	                       });
	                   }
	               } else {
	                   var hookCtx,
	                       errorHandler = hookedEventRejectHandler(reject),
	                       successHandler = hookedEventSuccessHandler(null);
	                   tryCatch(function () {
	                       for (var i = 0; i < len; ++i) {
	                           hookCtx = { onsuccess: null, onerror: null };
	                           var tuple = keysOrTuples[i];
	                           deletingHook.call(hookCtx, tuple[0], tuple[1], trans);
	                           var req = idbstore.delete(tuple[0]);
	                           req._hookCtx = hookCtx;
	                           req.onerror = errorHandler;
	                           if (i === lastItem) req.onsuccess = hookedEventSuccessHandler(resolve);else req.onsuccess = successHandler;
	                       }
	                   }, function (err) {
	                       hookCtx.onerror && hookCtx.onerror(err);
	                       throw err;
	                   });
	               }
	           }).uncaught(dbUncaught);
	       }
	
	       derive(WriteableTable).from(Table).extend({
	           bulkDelete: function (keys) {
	               if (this.hook.deleting.fire === nop) {
	                   return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
	                       resolve(bulkDelete(idbstore, trans, keys, false, nop));
	                   });
	               } else {
	                   return this.where(':id').anyOf(keys).delete().then(function () {}); // Resolve with undefined.
	               }
	           },
	           bulkPut: function (objects, keys) {
	               var _this = this;
	
	               return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
	                   if (!idbstore.keyPath && !_this.schema.primKey.auto && !keys) throw new exceptions.InvalidArgument("bulkPut() with non-inbound keys requires keys array in second argument");
	                   if (idbstore.keyPath && keys) throw new exceptions.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
	                   if (keys && keys.length !== objects.length) throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
	                   if (objects.length === 0) return resolve(); // Caller provided empty list.
	                   var done = function (result) {
	                       if (errorList.length === 0) resolve(result);else reject(new BulkError(_this.name + '.bulkPut(): ' + errorList.length + ' of ' + numObjs + ' operations failed', errorList));
	                   };
	                   var req,
	                       errorList = [],
	                       errorHandler,
	                       numObjs = objects.length,
	                       table = _this;
	                   if (_this.hook.creating.fire === nop && _this.hook.updating.fire === nop) {
	                       //
	                       // Standard Bulk (no 'creating' or 'updating' hooks to care about)
	                       //
	                       errorHandler = BulkErrorHandlerCatchAll(errorList);
	                       for (var i = 0, l = objects.length; i < l; ++i) {
	                           req = keys ? idbstore.put(objects[i], keys[i]) : idbstore.put(objects[i]);
	                           req.onerror = errorHandler;
	                       }
	                       // Only need to catch success or error on the last operation
	                       // according to the IDB spec.
	                       req.onerror = BulkErrorHandlerCatchAll(errorList, done);
	                       req.onsuccess = eventSuccessHandler(done);
	                   } else {
	                       var effectiveKeys = keys || idbstore.keyPath && objects.map(function (o) {
	                           return getByKeyPath(o, idbstore.keyPath);
	                       });
	                       // Generate map of {[key]: object}
	                       var objectLookup = effectiveKeys && arrayToObject(effectiveKeys, function (key, i) {
	                           return key != null && [key, objects[i]];
	                       });
	                       var promise = !effectiveKeys ?
	
	                       // Auto-incremented key-less objects only without any keys argument.
	                       table.bulkAdd(objects) :
	
	                       // Keys provided. Either as inbound in provided objects, or as a keys argument.
	                       // Begin with updating those that exists in DB:
	                       table.where(':id').anyOf(effectiveKeys.filter(function (key) {
	                           return key != null;
	                       })).modify(function () {
	                           this.value = objectLookup[this.primKey];
	                           objectLookup[this.primKey] = null; // Mark as "don't add this"
	                       }).catch(ModifyError, function (e) {
	                           errorList = e.failures; // No need to concat here. These are the first errors added.
	                       }).then(function () {
	                           // Now, let's examine which items didnt exist so we can add them:
	                           var objsToAdd = [],
	                               keysToAdd = keys && [];
	                           // Iterate backwards. Why? Because if same key was used twice, just add the last one.
	                           for (var i = effectiveKeys.length - 1; i >= 0; --i) {
	                               var key = effectiveKeys[i];
	                               if (key == null || objectLookup[key]) {
	                                   objsToAdd.push(objects[i]);
	                                   keys && keysToAdd.push(key);
	                                   if (key != null) objectLookup[key] = null; // Mark as "dont add again"
	                               }
	                           }
	                           // The items are in reverse order so reverse them before adding.
	                           // Could be important in order to get auto-incremented keys the way the caller
	                           // would expect. Could have used unshift instead of push()/reverse(),
	                           // but: http://jsperf.com/unshift-vs-reverse
	                           objsToAdd.reverse();
	                           keys && keysToAdd.reverse();
	                           return table.bulkAdd(objsToAdd, keysToAdd);
	                       }).then(function (lastAddedKey) {
	                           // Resolve with key of the last object in given arguments to bulkPut():
	                           var lastEffectiveKey = effectiveKeys[effectiveKeys.length - 1]; // Key was provided.
	                           return lastEffectiveKey != null ? lastEffectiveKey : lastAddedKey;
	                       });
	
	                       promise.then(done).catch(BulkError, function (e) {
	                           // Concat failure from ModifyError and reject using our 'done' method.
	                           errorList = errorList.concat(e.failures);
	                           done();
	                       }).catch(reject);
	                   }
	               }, "locked"); // If called from transaction scope, lock transaction til all steps are done.
	           },
	           bulkAdd: function (objects, keys) {
	               var self = this,
	                   creatingHook = this.hook.creating.fire;
	               return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
	                   if (!idbstore.keyPath && !self.schema.primKey.auto && !keys) throw new exceptions.InvalidArgument("bulkAdd() with non-inbound keys requires keys array in second argument");
	                   if (idbstore.keyPath && keys) throw new exceptions.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
	                   if (keys && keys.length !== objects.length) throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
	                   if (objects.length === 0) return resolve(); // Caller provided empty list.
	                   function done(result) {
	                       if (errorList.length === 0) resolve(result);else reject(new BulkError(self.name + '.bulkAdd(): ' + errorList.length + ' of ' + numObjs + ' operations failed', errorList));
	                   }
	                   var req,
	                       errorList = [],
	                       errorHandler,
	                       successHandler,
	                       numObjs = objects.length;
	                   if (creatingHook !== nop) {
	                       //
	                       // There are subscribers to hook('creating')
	                       // Must behave as documented.
	                       //
	                       var keyPath = idbstore.keyPath,
	                           hookCtx;
	                       errorHandler = BulkErrorHandlerCatchAll(errorList, null, true);
	                       successHandler = hookedEventSuccessHandler(null);
	
	                       tryCatch(function () {
	                           for (var i = 0, l = objects.length; i < l; ++i) {
	                               hookCtx = { onerror: null, onsuccess: null };
	                               var key = keys && keys[i];
	                               var obj = objects[i],
	                                   effectiveKey = keys ? key : keyPath ? getByKeyPath(obj, keyPath) : undefined,
	                                   keyToUse = creatingHook.call(hookCtx, effectiveKey, obj, trans);
	                               if (effectiveKey == null && keyToUse != null) {
	                                   if (keyPath) {
	                                       obj = deepClone(obj);
	                                       setByKeyPath(obj, keyPath, keyToUse);
	                                   } else {
	                                       key = keyToUse;
	                                   }
	                               }
	                               req = key != null ? idbstore.add(obj, key) : idbstore.add(obj);
	                               req._hookCtx = hookCtx;
	                               if (i < l - 1) {
	                                   req.onerror = errorHandler;
	                                   if (hookCtx.onsuccess) req.onsuccess = successHandler;
	                               }
	                           }
	                       }, function (err) {
	                           hookCtx.onerror && hookCtx.onerror(err);
	                           throw err;
	                       });
	
	                       req.onerror = BulkErrorHandlerCatchAll(errorList, done, true);
	                       req.onsuccess = hookedEventSuccessHandler(done);
	                   } else {
	                       //
	                       // Standard Bulk (no 'creating' hook to care about)
	                       //
	                       errorHandler = BulkErrorHandlerCatchAll(errorList);
	                       for (var i = 0, l = objects.length; i < l; ++i) {
	                           req = keys ? idbstore.add(objects[i], keys[i]) : idbstore.add(objects[i]);
	                           req.onerror = errorHandler;
	                       }
	                       // Only need to catch success or error on the last operation
	                       // according to the IDB spec.
	                       req.onerror = BulkErrorHandlerCatchAll(errorList, done);
	                       req.onsuccess = eventSuccessHandler(done);
	                   }
	               });
	           },
	           add: function (obj, key) {
	               /// <summary>
	               ///   Add an object to the database. In case an object with same primary key already exists, the object will not be added.
	               /// </summary>
	               /// <param name="obj" type="Object">A javascript object to insert</param>
	               /// <param name="key" optional="true">Primary key</param>
	               var creatingHook = this.hook.creating.fire;
	               return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
	                   var hookCtx = { onsuccess: null, onerror: null };
	                   if (creatingHook !== nop) {
	                       var effectiveKey = key != null ? key : idbstore.keyPath ? getByKeyPath(obj, idbstore.keyPath) : undefined;
	                       var keyToUse = creatingHook.call(hookCtx, effectiveKey, obj, trans); // Allow subscribers to when("creating") to generate the key.
	                       if (effectiveKey == null && keyToUse != null) {
	                           // Using "==" and "!=" to check for either null or undefined!
	                           if (idbstore.keyPath) setByKeyPath(obj, idbstore.keyPath, keyToUse);else key = keyToUse;
	                       }
	                   }
	                   try {
	                       var req = key != null ? idbstore.add(obj, key) : idbstore.add(obj);
	                       req._hookCtx = hookCtx;
	                       req.onerror = hookedEventRejectHandler(reject);
	                       req.onsuccess = hookedEventSuccessHandler(function (result) {
	                           // TODO: Remove these two lines in next major release (2.0?)
	                           // It's no good practice to have side effects on provided parameters
	                           var keyPath = idbstore.keyPath;
	                           if (keyPath) setByKeyPath(obj, keyPath, result);
	                           resolve(result);
	                       });
	                   } catch (e) {
	                       if (hookCtx.onerror) hookCtx.onerror(e);
	                       throw e;
	                   }
	               });
	           },
	
	           put: function (obj, key) {
	               /// <summary>
	               ///   Add an object to the database but in case an object with same primary key alread exists, the existing one will get updated.
	               /// </summary>
	               /// <param name="obj" type="Object">A javascript object to insert or update</param>
	               /// <param name="key" optional="true">Primary key</param>
	               var self = this,
	                   creatingHook = this.hook.creating.fire,
	                   updatingHook = this.hook.updating.fire;
	               if (creatingHook !== nop || updatingHook !== nop) {
	                   //
	                   // People listens to when("creating") or when("updating") events!
	                   // We must know whether the put operation results in an CREATE or UPDATE.
	                   //
	                   return this._trans(READWRITE, function (resolve, reject, trans) {
	                       // Since key is optional, make sure we get it from obj if not provided
	                       var effectiveKey = key !== undefined ? key : self.schema.primKey.keyPath && getByKeyPath(obj, self.schema.primKey.keyPath);
	                       if (effectiveKey == null) {
	                           // "== null" means checking for either null or undefined.
	                           // No primary key. Must use add().
	                           trans.tables[self.name].add(obj).then(resolve, reject);
	                       } else {
	                           // Primary key exist. Lock transaction and try modifying existing. If nothing modified, call add().
	                           trans._lock(); // Needed because operation is splitted into modify() and add().
	                           // clone obj before this async call. If caller modifies obj the line after put(), the IDB spec requires that it should not affect operation.
	                           obj = deepClone(obj);
	                           trans.tables[self.name].where(":id").equals(effectiveKey).modify(function () {
	                               // Replace extisting value with our object
	                               // CRUD event firing handled in WriteableCollection.modify()
	                               this.value = obj;
	                           }).then(function (count) {
	                               if (count === 0) {
	                                   // Object's key was not found. Add the object instead.
	                                   // CRUD event firing will be done in add()
	                                   return trans.tables[self.name].add(obj, key); // Resolving with another Promise. Returned Promise will then resolve with the new key.
	                               } else {
	                                       return effectiveKey; // Resolve with the provided key.
	                                   }
	                           }).finally(function () {
	                               trans._unlock();
	                           }).then(resolve, reject);
	                       }
	                   });
	               } else {
	                   // Use the standard IDB put() method.
	                   return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
	                       var req = key !== undefined ? idbstore.put(obj, key) : idbstore.put(obj);
	                       req.onerror = eventRejectHandler(reject);
	                       req.onsuccess = function (ev) {
	                           var keyPath = idbstore.keyPath;
	                           if (keyPath) setByKeyPath(obj, keyPath, ev.target.result);
	                           resolve(req.result);
	                       };
	                   });
	               }
	           },
	
	           'delete': function (key) {
	               /// <param name="key">Primary key of the object to delete</param>
	               if (this.hook.deleting.subscribers.length) {
	                   // People listens to when("deleting") event. Must implement delete using WriteableCollection.delete() that will
	                   // call the CRUD event. Only WriteableCollection.delete() will know whether an object was actually deleted.
	                   return this.where(":id").equals(key).delete();
	               } else {
	                   // No one listens. Use standard IDB delete() method.
	                   return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
	                       var req = idbstore.delete(key);
	                       req.onerror = eventRejectHandler(reject);
	                       req.onsuccess = function () {
	                           resolve(req.result);
	                       };
	                   });
	               }
	           },
	
	           clear: function () {
	               if (this.hook.deleting.subscribers.length) {
	                   // People listens to when("deleting") event. Must implement delete using WriteableCollection.delete() that will
	                   // call the CRUD event. Only WriteableCollection.delete() will knows which objects that are actually deleted.
	                   return this.toCollection().delete();
	               } else {
	                   return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
	                       var req = idbstore.clear();
	                       req.onerror = eventRejectHandler(reject);
	                       req.onsuccess = function () {
	                           resolve(req.result);
	                       };
	                   });
	               }
	           },
	
	           update: function (keyOrObject, modifications) {
	               if (typeof modifications !== 'object' || isArray(modifications)) throw new exceptions.InvalidArgument("Modifications must be an object.");
	               if (typeof keyOrObject === 'object' && !isArray(keyOrObject)) {
	                   // object to modify. Also modify given object with the modifications:
	                   keys(modifications).forEach(function (keyPath) {
	                       setByKeyPath(keyOrObject, keyPath, modifications[keyPath]);
	                   });
	                   var key = getByKeyPath(keyOrObject, this.schema.primKey.keyPath);
	                   if (key === undefined) return rejection(new exceptions.InvalidArgument("Given object does not contain its primary key"), dbUncaught);
	                   return this.where(":id").equals(key).modify(modifications);
	               } else {
	                   // key to modify
	                   return this.where(":id").equals(keyOrObject).modify(modifications);
	               }
	           }
	       });
	
	       //
	       //
	       //
	       // Transaction Class
	       //
	       //
	       //
	       function Transaction(mode, storeNames, dbschema, parent) {
	           var _this2 = this;
	
	           /// <summary>
	           ///    Transaction class. Represents a database transaction. All operations on db goes through a Transaction.
	           /// </summary>
	           /// <param name="mode" type="String">Any of "readwrite" or "readonly"</param>
	           /// <param name="storeNames" type="Array">Array of table names to operate on</param>
	           this.db = db;
	           this.mode = mode;
	           this.storeNames = storeNames;
	           this.idbtrans = null;
	           this.on = Events(this, "complete", "error", "abort");
	           this.parent = parent || null;
	           this.active = true;
	           this._tables = null;
	           this._reculock = 0;
	           this._blockedFuncs = [];
	           this._psd = null;
	           this._dbschema = dbschema;
	           this._resolve = null;
	           this._reject = null;
	           this._completion = new Promise(function (resolve, reject) {
	               _this2._resolve = resolve;
	               _this2._reject = reject;
	           }).uncaught(dbUncaught);
	
	           this._completion.then(function () {
	               _this2.on.complete.fire();
	           }, function (e) {
	               _this2.on.error.fire(e);
	               _this2.parent ? _this2.parent._reject(e) : _this2.active && _this2.idbtrans && _this2.idbtrans.abort();
	               _this2.active = false;
	               return rejection(e); // Indicate we actually DO NOT catch this error.
	           });
	       }
	
	       props(Transaction.prototype, {
	           //
	           // Transaction Protected Methods (not required by API users, but needed internally and eventually by dexie extensions)
	           //
	           _lock: function () {
	               assert(!PSD.global); // Locking and unlocking reuires to be within a PSD scope.
	               // Temporary set all requests into a pending queue if they are called before database is ready.
	               ++this._reculock; // Recursive read/write lock pattern using PSD (Promise Specific Data) instead of TLS (Thread Local Storage)
	               if (this._reculock === 1 && !PSD.global) PSD.lockOwnerFor = this;
	               return this;
	           },
	           _unlock: function () {
	               assert(!PSD.global); // Locking and unlocking reuires to be within a PSD scope.
	               if (--this._reculock === 0) {
	                   if (!PSD.global) PSD.lockOwnerFor = null;
	                   while (this._blockedFuncs.length > 0 && !this._locked()) {
	                       var fn = this._blockedFuncs.shift();
	                       try {
	                           fn();
	                       } catch (e) {}
	                   }
	               }
	               return this;
	           },
	           _locked: function () {
	               // Checks if any write-lock is applied on this transaction.
	               // To simplify the Dexie API for extension implementations, we support recursive locks.
	               // This is accomplished by using "Promise Specific Data" (PSD).
	               // PSD data is bound to a Promise and any child Promise emitted through then() or resolve( new Promise() ).
	               // PSD is local to code executing on top of the call stacks of any of any code executed by Promise():
	               //         * callback given to the Promise() constructor  (function (resolve, reject){...})
	               //         * callbacks given to then()/catch()/finally() methods (function (value){...})
	               // If creating a new independant Promise instance from within a Promise call stack, the new Promise will derive the PSD from the call stack of the parent Promise.
	               // Derivation is done so that the inner PSD __proto__ points to the outer PSD.
	               // PSD.lockOwnerFor will point to current transaction object if the currently executing PSD scope owns the lock.
	               return this._reculock && PSD.lockOwnerFor !== this;
	           },
	           create: function (idbtrans) {
	               var _this3 = this;
	
	               assert(!this.idbtrans);
	               if (!idbtrans && !idbdb) {
	                   switch (dbOpenError && dbOpenError.name) {
	                       case "DatabaseClosedError":
	                           // Errors where it is no difference whether it was caused by the user operation or an earlier call to db.open()
	                           throw new exceptions.DatabaseClosed(dbOpenError);
	                       case "MissingAPIError":
	                           // Errors where it is no difference whether it was caused by the user operation or an earlier call to db.open()
	                           throw new exceptions.MissingAPI(dbOpenError.message, dbOpenError);
	                       default:
	                           // Make it clear that the user operation was not what caused the error - the error had occurred earlier on db.open()!
	                           throw new exceptions.OpenFailed(dbOpenError);
	                   }
	               }
	               if (!this.active) throw new exceptions.TransactionInactive();
	               assert(this._completion._state === null);
	
	               idbtrans = this.idbtrans = idbtrans || idbdb.transaction(safariMultiStoreFix(this.storeNames), this.mode);
	               idbtrans.onerror = wrap(function (ev) {
	                   preventDefault(ev); // Prohibit default bubbling to window.error
	                   _this3._reject(idbtrans.error);
	               });
	               idbtrans.onabort = wrap(function (ev) {
	                   preventDefault(ev);
	                   _this3.active && _this3._reject(new exceptions.Abort());
	                   _this3.active = false;
	                   _this3.on("abort").fire(ev);
	               });
	               idbtrans.oncomplete = wrap(function () {
	                   _this3.active = false;
	                   _this3._resolve();
	               });
	               return this;
	           },
	           _promise: function (mode, fn, bWriteLock) {
	               var self = this;
	               return newScope(function () {
	                   var p;
	                   // Read lock always
	                   if (!self._locked()) {
	                       p = self.active ? new Promise(function (resolve, reject) {
	                           if (mode === READWRITE && self.mode !== READWRITE) throw new exceptions.ReadOnly("Transaction is readonly");
	                           if (!self.idbtrans && mode) self.create();
	                           if (bWriteLock) self._lock(); // Write lock if write operation is requested
	                           fn(resolve, reject, self);
	                       }) : rejection(new exceptions.TransactionInactive());
	                       if (self.active && bWriteLock) p.finally(function () {
	                           self._unlock();
	                       });
	                   } else {
	                       // Transaction is write-locked. Wait for mutex.
	                       p = new Promise(function (resolve, reject) {
	                           self._blockedFuncs.push(function () {
	                               self._promise(mode, fn, bWriteLock).then(resolve, reject);
	                           });
	                       });
	                   }
	                   p._lib = true;
	                   return p.uncaught(dbUncaught);
	               });
	           },
	
	           //
	           // Transaction Public Properties and Methods
	           //
	           abort: function () {
	               this.active && this._reject(new exceptions.Abort());
	               this.active = false;
	           },
	
	           // Deprecate:
	           tables: {
	               get: function () {
	                   if (this._tables) return this._tables;
	                   return this._tables = arrayToObject(this.storeNames, function (name) {
	                       return [name, allTables[name]];
	                   });
	               }
	           },
	
	           // Deprecate:
	           complete: function (cb) {
	               return this.on("complete", cb);
	           },
	
	           // Deprecate:
	           error: function (cb) {
	               return this.on("error", cb);
	           },
	
	           // Deprecate
	           table: function (name) {
	               if (this.storeNames.indexOf(name) === -1) throw new exceptions.InvalidTable("Table " + name + " not in transaction");
	               return allTables[name];
	           }
	       });
	
	       //
	       //
	       //
	       // WhereClause
	       //
	       //
	       //
	       function WhereClause(table, index, orCollection) {
	           /// <param name="table" type="Table"></param>
	           /// <param name="index" type="String" optional="true"></param>
	           /// <param name="orCollection" type="Collection" optional="true"></param>
	           this._ctx = {
	               table: table,
	               index: index === ":id" ? null : index,
	               collClass: table._collClass,
	               or: orCollection
	           };
	       }
	
	       props(WhereClause.prototype, function () {
	
	           // WhereClause private methods
	
	           function fail(collectionOrWhereClause, err, T) {
	               var collection = collectionOrWhereClause instanceof WhereClause ? new collectionOrWhereClause._ctx.collClass(collectionOrWhereClause) : collectionOrWhereClause;
	
	               collection._ctx.error = T ? new T(err) : new TypeError(err);
	               return collection;
	           }
	
	           function emptyCollection(whereClause) {
	               return new whereClause._ctx.collClass(whereClause, function () {
	                   return IDBKeyRange.only("");
	               }).limit(0);
	           }
	
	           function upperFactory(dir) {
	               return dir === "next" ? function (s) {
	                   return s.toUpperCase();
	               } : function (s) {
	                   return s.toLowerCase();
	               };
	           }
	           function lowerFactory(dir) {
	               return dir === "next" ? function (s) {
	                   return s.toLowerCase();
	               } : function (s) {
	                   return s.toUpperCase();
	               };
	           }
	           function nextCasing(key, lowerKey, upperNeedle, lowerNeedle, cmp, dir) {
	               var length = Math.min(key.length, lowerNeedle.length);
	               var llp = -1;
	               for (var i = 0; i < length; ++i) {
	                   var lwrKeyChar = lowerKey[i];
	                   if (lwrKeyChar !== lowerNeedle[i]) {
	                       if (cmp(key[i], upperNeedle[i]) < 0) return key.substr(0, i) + upperNeedle[i] + upperNeedle.substr(i + 1);
	                       if (cmp(key[i], lowerNeedle[i]) < 0) return key.substr(0, i) + lowerNeedle[i] + upperNeedle.substr(i + 1);
	                       if (llp >= 0) return key.substr(0, llp) + lowerKey[llp] + upperNeedle.substr(llp + 1);
	                       return null;
	                   }
	                   if (cmp(key[i], lwrKeyChar) < 0) llp = i;
	               }
	               if (length < lowerNeedle.length && dir === "next") return key + upperNeedle.substr(key.length);
	               if (length < key.length && dir === "prev") return key.substr(0, upperNeedle.length);
	               return llp < 0 ? null : key.substr(0, llp) + lowerNeedle[llp] + upperNeedle.substr(llp + 1);
	           }
	
	           function addIgnoreCaseAlgorithm(whereClause, match, needles, suffix) {
	               /// <param name="needles" type="Array" elementType="String"></param>
	               var upper,
	                   lower,
	                   compare,
	                   upperNeedles,
	                   lowerNeedles,
	                   direction,
	                   nextKeySuffix,
	                   needlesLen = needles.length;
	               if (!needles.every(function (s) {
	                   return typeof s === 'string';
	               })) {
	                   return fail(whereClause, STRING_EXPECTED);
	               }
	               function initDirection(dir) {
	                   upper = upperFactory(dir);
	                   lower = lowerFactory(dir);
	                   compare = dir === "next" ? simpleCompare : simpleCompareReverse;
	                   var needleBounds = needles.map(function (needle) {
	                       return { lower: lower(needle), upper: upper(needle) };
	                   }).sort(function (a, b) {
	                       return compare(a.lower, b.lower);
	                   });
	                   upperNeedles = needleBounds.map(function (nb) {
	                       return nb.upper;
	                   });
	                   lowerNeedles = needleBounds.map(function (nb) {
	                       return nb.lower;
	                   });
	                   direction = dir;
	                   nextKeySuffix = dir === "next" ? "" : suffix;
	               }
	               initDirection("next");
	
	               var c = new whereClause._ctx.collClass(whereClause, function () {
	                   return IDBKeyRange.bound(upperNeedles[0], lowerNeedles[needlesLen - 1] + suffix);
	               });
	
	               c._ondirectionchange = function (direction) {
	                   // This event onlys occur before filter is called the first time.
	                   initDirection(direction);
	               };
	
	               var firstPossibleNeedle = 0;
	
	               c._addAlgorithm(function (cursor, advance, resolve) {
	                   /// <param name="cursor" type="IDBCursor"></param>
	                   /// <param name="advance" type="Function"></param>
	                   /// <param name="resolve" type="Function"></param>
	                   var key = cursor.key;
	                   if (typeof key !== 'string') return false;
	                   var lowerKey = lower(key);
	                   if (match(lowerKey, lowerNeedles, firstPossibleNeedle)) {
	                       return true;
	                   } else {
	                       var lowestPossibleCasing = null;
	                       for (var i = firstPossibleNeedle; i < needlesLen; ++i) {
	                           var casing = nextCasing(key, lowerKey, upperNeedles[i], lowerNeedles[i], compare, direction);
	                           if (casing === null && lowestPossibleCasing === null) firstPossibleNeedle = i + 1;else if (lowestPossibleCasing === null || compare(lowestPossibleCasing, casing) > 0) {
	                               lowestPossibleCasing = casing;
	                           }
	                       }
	                       if (lowestPossibleCasing !== null) {
	                           advance(function () {
	                               cursor.continue(lowestPossibleCasing + nextKeySuffix);
	                           });
	                       } else {
	                           advance(resolve);
	                       }
	                       return false;
	                   }
	               });
	               return c;
	           }
	
	           //
	           // WhereClause public methods
	           //
	           return {
	               between: function (lower, upper, includeLower, includeUpper) {
	                   /// <summary>
	                   ///     Filter out records whose where-field lays between given lower and upper values. Applies to Strings, Numbers and Dates.
	                   /// </summary>
	                   /// <param name="lower"></param>
	                   /// <param name="upper"></param>
	                   /// <param name="includeLower" optional="true">Whether items that equals lower should be included. Default true.</param>
	                   /// <param name="includeUpper" optional="true">Whether items that equals upper should be included. Default false.</param>
	                   /// <returns type="Collection"></returns>
	                   includeLower = includeLower !== false; // Default to true
	                   includeUpper = includeUpper === true; // Default to false
	                   try {
	                       if (cmp(lower, upper) > 0 || cmp(lower, upper) === 0 && (includeLower || includeUpper) && !(includeLower && includeUpper)) return emptyCollection(this); // Workaround for idiotic W3C Specification that DataError must be thrown if lower > upper. The natural result would be to return an empty collection.
	                       return new this._ctx.collClass(this, function () {
	                           return IDBKeyRange.bound(lower, upper, !includeLower, !includeUpper);
	                       });
	                   } catch (e) {
	                       return fail(this, INVALID_KEY_ARGUMENT);
	                   }
	               },
	               equals: function (value) {
	                   return new this._ctx.collClass(this, function () {
	                       return IDBKeyRange.only(value);
	                   });
	               },
	               above: function (value) {
	                   return new this._ctx.collClass(this, function () {
	                       return IDBKeyRange.lowerBound(value, true);
	                   });
	               },
	               aboveOrEqual: function (value) {
	                   return new this._ctx.collClass(this, function () {
	                       return IDBKeyRange.lowerBound(value);
	                   });
	               },
	               below: function (value) {
	                   return new this._ctx.collClass(this, function () {
	                       return IDBKeyRange.upperBound(value, true);
	                   });
	               },
	               belowOrEqual: function (value) {
	                   return new this._ctx.collClass(this, function () {
	                       return IDBKeyRange.upperBound(value);
	                   });
	               },
	               startsWith: function (str) {
	                   /// <param name="str" type="String"></param>
	                   if (typeof str !== 'string') return fail(this, STRING_EXPECTED);
	                   return this.between(str, str + maxString, true, true);
	               },
	               startsWithIgnoreCase: function (str) {
	                   /// <param name="str" type="String"></param>
	                   if (str === "") return this.startsWith(str);
	                   return addIgnoreCaseAlgorithm(this, function (x, a) {
	                       return x.indexOf(a[0]) === 0;
	                   }, [str], maxString);
	               },
	               equalsIgnoreCase: function (str) {
	                   /// <param name="str" type="String"></param>
	                   return addIgnoreCaseAlgorithm(this, function (x, a) {
	                       return x === a[0];
	                   }, [str], "");
	               },
	               anyOfIgnoreCase: function () {
	                   var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
	                   if (set.length === 0) return emptyCollection(this);
	                   return addIgnoreCaseAlgorithm(this, function (x, a) {
	                       return a.indexOf(x) !== -1;
	                   }, set, "");
	               },
	               startsWithAnyOfIgnoreCase: function () {
	                   var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
	                   if (set.length === 0) return emptyCollection(this);
	                   return addIgnoreCaseAlgorithm(this, function (x, a) {
	                       return a.some(function (n) {
	                           return x.indexOf(n) === 0;
	                       });
	                   }, set, maxString);
	               },
	               anyOf: function () {
	                   var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
	                   var compare = ascending;
	                   try {
	                       set.sort(compare);
	                   } catch (e) {
	                       return fail(this, INVALID_KEY_ARGUMENT);
	                   }
	                   if (set.length === 0) return emptyCollection(this);
	                   var c = new this._ctx.collClass(this, function () {
	                       return IDBKeyRange.bound(set[0], set[set.length - 1]);
	                   });
	
	                   c._ondirectionchange = function (direction) {
	                       compare = direction === "next" ? ascending : descending;
	                       set.sort(compare);
	                   };
	                   var i = 0;
	                   c._addAlgorithm(function (cursor, advance, resolve) {
	                       var key = cursor.key;
	                       while (compare(key, set[i]) > 0) {
	                           // The cursor has passed beyond this key. Check next.
	                           ++i;
	                           if (i === set.length) {
	                               // There is no next. Stop searching.
	                               advance(resolve);
	                               return false;
	                           }
	                       }
	                       if (compare(key, set[i]) === 0) {
	                           // The current cursor value should be included and we should continue a single step in case next item has the same key or possibly our next key in set.
	                           return true;
	                       } else {
	                           // cursor.key not yet at set[i]. Forward cursor to the next key to hunt for.
	                           advance(function () {
	                               cursor.continue(set[i]);
	                           });
	                           return false;
	                       }
	                   });
	                   return c;
	               },
	
	               notEqual: function (value) {
	                   return this.inAnyRange([[-Infinity, value], [value, maxKey]], { includeLowers: false, includeUppers: false });
	               },
	
	               noneOf: function () {
	                   var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
	                   if (set.length === 0) return new this._ctx.collClass(this); // Return entire collection.
	                   try {
	                       set.sort(ascending);
	                   } catch (e) {
	                       return fail(this, INVALID_KEY_ARGUMENT);
	                   }
	                   // Transform ["a","b","c"] to a set of ranges for between/above/below: [[-Infinity,"a"], ["a","b"], ["b","c"], ["c",maxKey]]
	                   var ranges = set.reduce(function (res, val) {
	                       return res ? res.concat([[res[res.length - 1][1], val]]) : [[-Infinity, val]];
	                   }, null);
	                   ranges.push([set[set.length - 1], maxKey]);
	                   return this.inAnyRange(ranges, { includeLowers: false, includeUppers: false });
	               },
	
	               /** Filter out values withing given set of ranges.
	               * Example, give children and elders a rebate of 50%:
	               *
	               *   db.friends.where('age').inAnyRange([[0,18],[65,Infinity]]).modify({Rebate: 1/2});
	               *
	               * @param {(string|number|Date|Array)[][]} ranges
	               * @param {{includeLowers: boolean, includeUppers: boolean}} options
	               */
	               inAnyRange: function (ranges, options) {
	                   var ctx = this._ctx;
	                   if (ranges.length === 0) return emptyCollection(this);
	                   if (!ranges.every(function (range) {
	                       return range[0] !== undefined && range[1] !== undefined && ascending(range[0], range[1]) <= 0;
	                   })) {
	                       return fail(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", exceptions.InvalidArgument);
	                   }
	                   var includeLowers = !options || options.includeLowers !== false; // Default to true
	                   var includeUppers = options && options.includeUppers === true; // Default to false
	
	                   function addRange(ranges, newRange) {
	                       for (var i = 0, l = ranges.length; i < l; ++i) {
	                           var range = ranges[i];
	                           if (cmp(newRange[0], range[1]) < 0 && cmp(newRange[1], range[0]) > 0) {
	                               range[0] = min(range[0], newRange[0]);
	                               range[1] = max(range[1], newRange[1]);
	                               break;
	                           }
	                       }
	                       if (i === l) ranges.push(newRange);
	                       return ranges;
	                   }
	
	                   var sortDirection = ascending;
	                   function rangeSorter(a, b) {
	                       return sortDirection(a[0], b[0]);
	                   }
	
	                   // Join overlapping ranges
	                   var set;
	                   try {
	                       set = ranges.reduce(addRange, []);
	                       set.sort(rangeSorter);
	                   } catch (ex) {
	                       return fail(this, INVALID_KEY_ARGUMENT);
	                   }
	
	                   var i = 0;
	                   var keyIsBeyondCurrentEntry = includeUppers ? function (key) {
	                       return ascending(key, set[i][1]) > 0;
	                   } : function (key) {
	                       return ascending(key, set[i][1]) >= 0;
	                   };
	
	                   var keyIsBeforeCurrentEntry = includeLowers ? function (key) {
	                       return descending(key, set[i][0]) > 0;
	                   } : function (key) {
	                       return descending(key, set[i][0]) >= 0;
	                   };
	
	                   function keyWithinCurrentRange(key) {
	                       return !keyIsBeyondCurrentEntry(key) && !keyIsBeforeCurrentEntry(key);
	                   }
	
	                   var checkKey = keyIsBeyondCurrentEntry;
	
	                   var c = new ctx.collClass(this, function () {
	                       return IDBKeyRange.bound(set[0][0], set[set.length - 1][1], !includeLowers, !includeUppers);
	                   });
	
	                   c._ondirectionchange = function (direction) {
	                       if (direction === "next") {
	                           checkKey = keyIsBeyondCurrentEntry;
	                           sortDirection = ascending;
	                       } else {
	                           checkKey = keyIsBeforeCurrentEntry;
	                           sortDirection = descending;
	                       }
	                       set.sort(rangeSorter);
	                   };
	
	                   c._addAlgorithm(function (cursor, advance, resolve) {
	                       var key = cursor.key;
	                       while (checkKey(key)) {
	                           // The cursor has passed beyond this key. Check next.
	                           ++i;
	                           if (i === set.length) {
	                               // There is no next. Stop searching.
	                               advance(resolve);
	                               return false;
	                           }
	                       }
	                       if (keyWithinCurrentRange(key)) {
	                           // The current cursor value should be included and we should continue a single step in case next item has the same key or possibly our next key in set.
	                           return true;
	                       } else if (cmp(key, set[i][1]) === 0 || cmp(key, set[i][0]) === 0) {
	                           // includeUpper or includeLower is false so keyWithinCurrentRange() returns false even though we are at range border.
	                           // Continue to next key but don't include this one.
	                           return false;
	                       } else {
	                           // cursor.key not yet at set[i]. Forward cursor to the next key to hunt for.
	                           advance(function () {
	                               if (sortDirection === ascending) cursor.continue(set[i][0]);else cursor.continue(set[i][1]);
	                           });
	                           return false;
	                       }
	                   });
	                   return c;
	               },
	               startsWithAnyOf: function () {
	                   var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
	
	                   if (!set.every(function (s) {
	                       return typeof s === 'string';
	                   })) {
	                       return fail(this, "startsWithAnyOf() only works with strings");
	                   }
	                   if (set.length === 0) return emptyCollection(this);
	
	                   return this.inAnyRange(set.map(function (str) {
	                       return [str, str + maxString];
	                   }));
	               }
	           };
	       });
	
	       //
	       //
	       //
	       // Collection Class
	       //
	       //
	       //
	       function Collection(whereClause, keyRangeGenerator) {
	           /// <summary>
	           ///
	           /// </summary>
	           /// <param name="whereClause" type="WhereClause">Where clause instance</param>
	           /// <param name="keyRangeGenerator" value="function(){ return IDBKeyRange.bound(0,1);}" optional="true"></param>
	           var keyRange = null,
	               error = null;
	           if (keyRangeGenerator) try {
	               keyRange = keyRangeGenerator();
	           } catch (ex) {
	               error = ex;
	           }
	
	           var whereCtx = whereClause._ctx,
	               table = whereCtx.table;
	           this._ctx = {
	               table: table,
	               index: whereCtx.index,
	               isPrimKey: !whereCtx.index || table.schema.primKey.keyPath && whereCtx.index === table.schema.primKey.name,
	               range: keyRange,
	               keysOnly: false,
	               dir: "next",
	               unique: "",
	               algorithm: null,
	               filter: null,
	               replayFilter: null,
	               justLimit: true, // True if a replayFilter is just a filter that performs a "limit" operation (or none at all)
	               isMatch: null,
	               offset: 0,
	               limit: Infinity,
	               error: error, // If set, any promise must be rejected with this error
	               or: whereCtx.or,
	               valueMapper: table.hook.reading.fire
	           };
	       }
	
	       function isPlainKeyRange(ctx, ignoreLimitFilter) {
	           return !(ctx.filter || ctx.algorithm || ctx.or) && (ignoreLimitFilter ? ctx.justLimit : !ctx.replayFilter);
	       }
	
	       props(Collection.prototype, function () {
	
	           //
	           // Collection Private Functions
	           //
	
	           function addFilter(ctx, fn) {
	               ctx.filter = combine(ctx.filter, fn);
	           }
	
	           function addReplayFilter(ctx, factory, isLimitFilter) {
	               var curr = ctx.replayFilter;
	               ctx.replayFilter = curr ? function () {
	                   return combine(curr(), factory());
	               } : factory;
	               ctx.justLimit = isLimitFilter && !curr;
	           }
	
	           function addMatchFilter(ctx, fn) {
	               ctx.isMatch = combine(ctx.isMatch, fn);
	           }
	
	           /** @param ctx {
	            *      isPrimKey: boolean,
	            *      table: Table,
	            *      index: string
	            * }
	            * @param store IDBObjectStore
	            **/
	           function getIndexOrStore(ctx, store) {
	               if (ctx.isPrimKey) return store;
	               var indexSpec = ctx.table.schema.idxByName[ctx.index];
	               if (!indexSpec) throw new exceptions.Schema("KeyPath " + ctx.index + " on object store " + store.name + " is not indexed");
	               return store.index(indexSpec.name);
	           }
	
	           /** @param ctx {
	            *      isPrimKey: boolean,
	            *      table: Table,
	            *      index: string,
	            *      keysOnly: boolean,
	            *      range?: IDBKeyRange,
	            *      dir: "next" | "prev"
	            * }
	            */
	           function openCursor(ctx, store) {
	               var idxOrStore = getIndexOrStore(ctx, store);
	               return ctx.keysOnly && 'openKeyCursor' in idxOrStore ? idxOrStore.openKeyCursor(ctx.range || null, ctx.dir + ctx.unique) : idxOrStore.openCursor(ctx.range || null, ctx.dir + ctx.unique);
	           }
	
	           function iter(ctx, fn, resolve, reject, idbstore) {
	               var filter = ctx.replayFilter ? combine(ctx.filter, ctx.replayFilter()) : ctx.filter;
	               if (!ctx.or) {
	                   iterate(openCursor(ctx, idbstore), combine(ctx.algorithm, filter), fn, resolve, reject, !ctx.keysOnly && ctx.valueMapper);
	               } else (function () {
	                   var set = {};
	                   var resolved = 0;
	
	                   function resolveboth() {
	                       if (++resolved === 2) resolve(); // Seems like we just support or btwn max 2 expressions, but there are no limit because we do recursion.
	                   }
	
	                   function union(item, cursor, advance) {
	                       if (!filter || filter(cursor, advance, resolveboth, reject)) {
	                           var key = cursor.primaryKey.toString(); // Converts any Date to String, String to String, Number to String and Array to comma-separated string
	                           if (!hasOwn(set, key)) {
	                               set[key] = true;
	                               fn(item, cursor, advance);
	                           }
	                       }
	                   }
	
	                   ctx.or._iterate(union, resolveboth, reject, idbstore);
	                   iterate(openCursor(ctx, idbstore), ctx.algorithm, union, resolveboth, reject, !ctx.keysOnly && ctx.valueMapper);
	               })();
	           }
	           function getInstanceTemplate(ctx) {
	               return ctx.table.schema.instanceTemplate;
	           }
	
	           return {
	
	               //
	               // Collection Protected Functions
	               //
	
	               _read: function (fn, cb) {
	                   var ctx = this._ctx;
	                   if (ctx.error) return ctx.table._trans(null, function rejector(resolve, reject) {
	                       reject(ctx.error);
	                   });else return ctx.table._idbstore(READONLY, fn).then(cb);
	               },
	               _write: function (fn) {
	                   var ctx = this._ctx;
	                   if (ctx.error) return ctx.table._trans(null, function rejector(resolve, reject) {
	                       reject(ctx.error);
	                   });else return ctx.table._idbstore(READWRITE, fn, "locked"); // When doing write operations on collections, always lock the operation so that upcoming operations gets queued.
	               },
	               _addAlgorithm: function (fn) {
	                   var ctx = this._ctx;
	                   ctx.algorithm = combine(ctx.algorithm, fn);
	               },
	
	               _iterate: function (fn, resolve, reject, idbstore) {
	                   return iter(this._ctx, fn, resolve, reject, idbstore);
	               },
	
	               clone: function (props) {
	                   var rv = Object.create(this.constructor.prototype),
	                       ctx = Object.create(this._ctx);
	                   if (props) extend(ctx, props);
	                   rv._ctx = ctx;
	                   return rv;
	               },
	
	               raw: function () {
	                   this._ctx.valueMapper = null;
	                   return this;
	               },
	
	               //
	               // Collection Public methods
	               //
	
	               each: function (fn) {
	                   var ctx = this._ctx;
	
	                   if (fake) {
	                       var item = getInstanceTemplate(ctx),
	                           primKeyPath = ctx.table.schema.primKey.keyPath,
	                           key = getByKeyPath(item, ctx.index ? ctx.table.schema.idxByName[ctx.index].keyPath : primKeyPath),
	                           primaryKey = getByKeyPath(item, primKeyPath);
	                       fn(item, { key: key, primaryKey: primaryKey });
	                   }
	
	                   return this._read(function (resolve, reject, idbstore) {
	                       iter(ctx, fn, resolve, reject, idbstore);
	                   });
	               },
	
	               count: function (cb) {
	                   if (fake) return Promise.resolve(0).then(cb);
	                   var ctx = this._ctx;
	
	                   if (isPlainKeyRange(ctx, true)) {
	                       // This is a plain key range. We can use the count() method if the index.
	                       return this._read(function (resolve, reject, idbstore) {
	                           var idx = getIndexOrStore(ctx, idbstore);
	                           var req = ctx.range ? idx.count(ctx.range) : idx.count();
	                           req.onerror = eventRejectHandler(reject);
	                           req.onsuccess = function (e) {
	                               resolve(Math.min(e.target.result, ctx.limit));
	                           };
	                       }, cb);
	                   } else {
	                       // Algorithms, filters or expressions are applied. Need to count manually.
	                       var count = 0;
	                       return this._read(function (resolve, reject, idbstore) {
	                           iter(ctx, function () {
	                               ++count;return false;
	                           }, function () {
	                               resolve(count);
	                           }, reject, idbstore);
	                       }, cb);
	                   }
	               },
	
	               sortBy: function (keyPath, cb) {
	                   /// <param name="keyPath" type="String"></param>
	                   var parts = keyPath.split('.').reverse(),
	                       lastPart = parts[0],
	                       lastIndex = parts.length - 1;
	                   function getval(obj, i) {
	                       if (i) return getval(obj[parts[i]], i - 1);
	                       return obj[lastPart];
	                   }
	                   var order = this._ctx.dir === "next" ? 1 : -1;
	
	                   function sorter(a, b) {
	                       var aVal = getval(a, lastIndex),
	                           bVal = getval(b, lastIndex);
	                       return aVal < bVal ? -order : aVal > bVal ? order : 0;
	                   }
	                   return this.toArray(function (a) {
	                       return a.sort(sorter);
	                   }).then(cb);
	               },
	
	               toArray: function (cb) {
	                   var ctx = this._ctx;
	                   return this._read(function (resolve, reject, idbstore) {
	                       fake && resolve([getInstanceTemplate(ctx)]);
	                       if (hasGetAll && ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
	                           // Special optimation if we could use IDBObjectStore.getAll() or
	                           // IDBKeyRange.getAll():
	                           var readingHook = ctx.table.hook.reading.fire;
	                           var idxOrStore = getIndexOrStore(ctx, idbstore);
	                           var req = ctx.limit < Infinity ? idxOrStore.getAll(ctx.range, ctx.limit) : idxOrStore.getAll(ctx.range);
	                           req.onerror = eventRejectHandler(reject);
	                           req.onsuccess = readingHook === mirror ? eventSuccessHandler(resolve) : wrap(eventSuccessHandler(function (res) {
	                               resolve(res.map(readingHook));
	                           }));
	                       } else {
	                           // Getting array through a cursor.
	                           var a = [];
	                           iter(ctx, function (item) {
	                               a.push(item);
	                           }, function arrayComplete() {
	                               resolve(a);
	                           }, reject, idbstore);
	                       }
	                   }, cb);
	               },
	
	               offset: function (offset) {
	                   var ctx = this._ctx;
	                   if (offset <= 0) return this;
	                   ctx.offset += offset; // For count()
	                   if (isPlainKeyRange(ctx)) {
	                       addReplayFilter(ctx, function () {
	                           var offsetLeft = offset;
	                           return function (cursor, advance) {
	                               if (offsetLeft === 0) return true;
	                               if (offsetLeft === 1) {
	                                   --offsetLeft;return false;
	                               }
	                               advance(function () {
	                                   cursor.advance(offsetLeft);
	                                   offsetLeft = 0;
	                               });
	                               return false;
	                           };
	                       });
	                   } else {
	                       addReplayFilter(ctx, function () {
	                           var offsetLeft = offset;
	                           return function () {
	                               return --offsetLeft < 0;
	                           };
	                       });
	                   }
	                   return this;
	               },
	
	               limit: function (numRows) {
	                   this._ctx.limit = Math.min(this._ctx.limit, numRows); // For count()
	                   addReplayFilter(this._ctx, function () {
	                       var rowsLeft = numRows;
	                       return function (cursor, advance, resolve) {
	                           if (--rowsLeft <= 0) advance(resolve); // Stop after this item has been included
	                           return rowsLeft >= 0; // If numRows is already below 0, return false because then 0 was passed to numRows initially. Otherwise we wouldnt come here.
	                       };
	                   }, true);
	                   return this;
	               },
	
	               until: function (filterFunction, bIncludeStopEntry) {
	                   var ctx = this._ctx;
	                   fake && filterFunction(getInstanceTemplate(ctx));
	                   addFilter(this._ctx, function (cursor, advance, resolve) {
	                       if (filterFunction(cursor.value)) {
	                           advance(resolve);
	                           return bIncludeStopEntry;
	                       } else {
	                           return true;
	                       }
	                   });
	                   return this;
	               },
	
	               first: function (cb) {
	                   return this.limit(1).toArray(function (a) {
	                       return a[0];
	                   }).then(cb);
	               },
	
	               last: function (cb) {
	                   return this.reverse().first(cb);
	               },
	
	               filter: function (filterFunction) {
	                   /// <param name="jsFunctionFilter" type="Function">function(val){return true/false}</param>
	                   fake && filterFunction(getInstanceTemplate(this._ctx));
	                   addFilter(this._ctx, function (cursor) {
	                       return filterFunction(cursor.value);
	                   });
	                   // match filters not used in Dexie.js but can be used by 3rd part libraries to test a
	                   // collection for a match without querying DB. Used by Dexie.Observable.
	                   addMatchFilter(this._ctx, filterFunction);
	                   return this;
	               },
	
	               and: function (filterFunction) {
	                   return this.filter(filterFunction);
	               },
	
	               or: function (indexName) {
	                   return new WhereClause(this._ctx.table, indexName, this);
	               },
	
	               reverse: function () {
	                   this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev";
	                   if (this._ondirectionchange) this._ondirectionchange(this._ctx.dir);
	                   return this;
	               },
	
	               desc: function () {
	                   return this.reverse();
	               },
	
	               eachKey: function (cb) {
	                   var ctx = this._ctx;
	                   ctx.keysOnly = !ctx.isMatch;
	                   return this.each(function (val, cursor) {
	                       cb(cursor.key, cursor);
	                   });
	               },
	
	               eachUniqueKey: function (cb) {
	                   this._ctx.unique = "unique";
	                   return this.eachKey(cb);
	               },
	
	               eachPrimaryKey: function (cb) {
	                   var ctx = this._ctx;
	                   ctx.keysOnly = !ctx.isMatch;
	                   return this.each(function (val, cursor) {
	                       cb(cursor.primaryKey, cursor);
	                   });
	               },
	
	               keys: function (cb) {
	                   var ctx = this._ctx;
	                   ctx.keysOnly = !ctx.isMatch;
	                   var a = [];
	                   return this.each(function (item, cursor) {
	                       a.push(cursor.key);
	                   }).then(function () {
	                       return a;
	                   }).then(cb);
	               },
	
	               primaryKeys: function (cb) {
	                   var ctx = this._ctx;
	                   if (hasGetAll && ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
	                       // Special optimation if we could use IDBObjectStore.getAllKeys() or
	                       // IDBKeyRange.getAllKeys():
	                       return this._read(function (resolve, reject, idbstore) {
	                           var idxOrStore = getIndexOrStore(ctx, idbstore);
	                           var req = ctx.limit < Infinity ? idxOrStore.getAllKeys(ctx.range, ctx.limit) : idxOrStore.getAllKeys(ctx.range);
	                           req.onerror = eventRejectHandler(reject);
	                           req.onsuccess = eventSuccessHandler(resolve);
	                       }).then(cb);
	                   }
	                   ctx.keysOnly = !ctx.isMatch;
	                   var a = [];
	                   return this.each(function (item, cursor) {
	                       a.push(cursor.primaryKey);
	                   }).then(function () {
	                       return a;
	                   }).then(cb);
	               },
	
	               uniqueKeys: function (cb) {
	                   this._ctx.unique = "unique";
	                   return this.keys(cb);
	               },
	
	               firstKey: function (cb) {
	                   return this.limit(1).keys(function (a) {
	                       return a[0];
	                   }).then(cb);
	               },
	
	               lastKey: function (cb) {
	                   return this.reverse().firstKey(cb);
	               },
	
	               distinct: function () {
	                   var ctx = this._ctx,
	                       idx = ctx.index && ctx.table.schema.idxByName[ctx.index];
	                   if (!idx || !idx.multi) return this; // distinct() only makes differencies on multiEntry indexes.
	                   var set = {};
	                   addFilter(this._ctx, function (cursor) {
	                       var strKey = cursor.primaryKey.toString(); // Converts any Date to String, String to String, Number to String and Array to comma-separated string
	                       var found = hasOwn(set, strKey);
	                       set[strKey] = true;
	                       return !found;
	                   });
	                   return this;
	               }
	           };
	       });
	
	       //
	       //
	       // WriteableCollection Class
	       //
	       //
	       function WriteableCollection() {
	           Collection.apply(this, arguments);
	       }
	
	       derive(WriteableCollection).from(Collection).extend({
	
	           //
	           // WriteableCollection Public Methods
	           //
	
	           modify: function (changes) {
	               var self = this,
	                   ctx = this._ctx,
	                   hook = ctx.table.hook,
	                   updatingHook = hook.updating.fire,
	                   deletingHook = hook.deleting.fire;
	
	               fake && typeof changes === 'function' && changes.call({ value: ctx.table.schema.instanceTemplate }, ctx.table.schema.instanceTemplate);
	
	               return this._write(function (resolve, reject, idbstore, trans) {
	                   var modifyer;
	                   if (typeof changes === 'function') {
	                       // Changes is a function that may update, add or delete propterties or even require a deletion the object itself (delete this.item)
	                       if (updatingHook === nop && deletingHook === nop) {
	                           // Noone cares about what is being changed. Just let the modifier function be the given argument as is.
	                           modifyer = changes;
	                       } else {
	                           // People want to know exactly what is being modified or deleted.
	                           // Let modifyer be a proxy function that finds out what changes the caller is actually doing
	                           // and call the hooks accordingly!
	                           modifyer = function (item) {
	                               var origItem = deepClone(item); // Clone the item first so we can compare laters.
	                               if (changes.call(this, item, this) === false) return false; // Call the real modifyer function (If it returns false explicitely, it means it dont want to modify anyting on this object)
	                               if (!hasOwn(this, "value")) {
	                                   // The real modifyer function requests a deletion of the object. Inform the deletingHook that a deletion is taking place.
	                                   deletingHook.call(this, this.primKey, item, trans);
	                               } else {
	                                   // No deletion. Check what was changed
	                                   var objectDiff = getObjectDiff(origItem, this.value);
	                                   var additionalChanges = updatingHook.call(this, objectDiff, this.primKey, origItem, trans);
	                                   if (additionalChanges) {
	                                       // Hook want to apply additional modifications. Make sure to fullfill the will of the hook.
	                                       item = this.value;
	                                       keys(additionalChanges).forEach(function (keyPath) {
	                                           setByKeyPath(item, keyPath, additionalChanges[keyPath]); // Adding {keyPath: undefined} means that the keyPath should be deleted. Handled by setByKeyPath
	                                       });
	                                   }
	                               }
	                           };
	                       }
	                   } else if (updatingHook === nop) {
	                           // changes is a set of {keyPath: value} and no one is listening to the updating hook.
	                           var keyPaths = keys(changes);
	                           var numKeys = keyPaths.length;
	                           modifyer = function (item) {
	                               var anythingModified = false;
	                               for (var i = 0; i < numKeys; ++i) {
	                                   var keyPath = keyPaths[i],
	                                       val = changes[keyPath];
	                                   if (getByKeyPath(item, keyPath) !== val) {
	                                       setByKeyPath(item, keyPath, val); // Adding {keyPath: undefined} means that the keyPath should be deleted. Handled by setByKeyPath
	                                       anythingModified = true;
	                                   }
	                               }
	                               return anythingModified;
	                           };
	                       } else {
	                           // changes is a set of {keyPath: value} and people are listening to the updating hook so we need to call it and
	                           // allow it to add additional modifications to make.
	                           var origChanges = changes;
	                           changes = shallowClone(origChanges); // Let's work with a clone of the changes keyPath/value set so that we can restore it in case a hook extends it.
	                           modifyer = function (item) {
	                               var anythingModified = false;
	                               var additionalChanges = updatingHook.call(this, changes, this.primKey, deepClone(item), trans);
	                               if (additionalChanges) extend(changes, additionalChanges);
	                               keys(changes).forEach(function (keyPath) {
	                                   var val = changes[keyPath];
	                                   if (getByKeyPath(item, keyPath) !== val) {
	                                       setByKeyPath(item, keyPath, val);
	                                       anythingModified = true;
	                                   }
	                               });
	                               if (additionalChanges) changes = shallowClone(origChanges); // Restore original changes for next iteration
	                               return anythingModified;
	                           };
	                       }
	
	                   var count = 0;
	                   var successCount = 0;
	                   var iterationComplete = false;
	                   var failures = [];
	                   var failKeys = [];
	                   var currentKey = null;
	
	                   function modifyItem(item, cursor) {
	                       currentKey = cursor.primaryKey;
	                       var thisContext = {
	                           primKey: cursor.primaryKey,
	                           value: item,
	                           onsuccess: null,
	                           onerror: null
	                       };
	
	                       function onerror(e) {
	                           failures.push(e);
	                           failKeys.push(thisContext.primKey);
	                           checkFinished();
	                           return true; // Catch these errors and let a final rejection decide whether or not to abort entire transaction
	                       }
	
	                       if (modifyer.call(thisContext, item, thisContext) !== false) {
	                           // If a callback explicitely returns false, do not perform the update!
	                           var bDelete = !hasOwn(thisContext, "value");
	                           ++count;
	                           tryCatch(function () {
	                               var req = bDelete ? cursor.delete() : cursor.update(thisContext.value);
	                               req._hookCtx = thisContext;
	                               req.onerror = hookedEventRejectHandler(onerror);
	                               req.onsuccess = hookedEventSuccessHandler(function () {
	                                   ++successCount;
	                                   checkFinished();
	                               });
	                           }, onerror);
	                       } else if (thisContext.onsuccess) {
	                           // Hook will expect either onerror or onsuccess to always be called!
	                           thisContext.onsuccess(thisContext.value);
	                       }
	                   }
	
	                   function doReject(e) {
	                       if (e) {
	                           failures.push(e);
	                           failKeys.push(currentKey);
	                       }
	                       return reject(new ModifyError("Error modifying one or more objects", failures, successCount, failKeys));
	                   }
	
	                   function checkFinished() {
	                       if (iterationComplete && successCount + failures.length === count) {
	                           if (failures.length > 0) doReject();else resolve(successCount);
	                       }
	                   }
	                   self.clone().raw()._iterate(modifyItem, function () {
	                       iterationComplete = true;
	                       checkFinished();
	                   }, doReject, idbstore);
	               });
	           },
	
	           'delete': function () {
	               var _this4 = this;
	
	               var ctx = this._ctx,
	                   range = ctx.range,
	                   deletingHook = ctx.table.hook.deleting.fire,
	                   hasDeleteHook = deletingHook !== nop;
	               if (!hasDeleteHook && isPlainKeyRange(ctx) && (ctx.isPrimKey && !hangsOnDeleteLargeKeyRange || !range)) // if no range, we'll use clear().
	                   {
	                       // May use IDBObjectStore.delete(IDBKeyRange) in this case (Issue #208)
	                       // For chromium, this is the way most optimized version.
	                       // For IE/Edge, this could hang the indexedDB engine and make operating system instable
	                       // (https://gist.github.com/dfahlander/5a39328f029de18222cf2125d56c38f7)
	                       return this._write(function (resolve, reject, idbstore) {
	                           // Our API contract is to return a count of deleted items, so we have to count() before delete().
	                           var onerror = eventRejectHandler(reject),
	                               countReq = range ? idbstore.count(range) : idbstore.count();
	                           countReq.onerror = onerror;
	                           countReq.onsuccess = function () {
	                               var count = countReq.result;
	                               tryCatch(function () {
	                                   var delReq = range ? idbstore.delete(range) : idbstore.clear();
	                                   delReq.onerror = onerror;
	                                   delReq.onsuccess = function () {
	                                       return resolve(count);
	                                   };
	                               }, function (err) {
	                                   return reject(err);
	                               });
	                           };
	                       });
	                   }
	
	               // Default version to use when collection is not a vanilla IDBKeyRange on the primary key.
	               // Divide into chunks to not starve RAM.
	               // If has delete hook, we will have to collect not just keys but also objects, so it will use
	               // more memory and need lower chunk size.
	               var CHUNKSIZE = hasDeleteHook ? 2000 : 10000;
	
	               return this._write(function (resolve, reject, idbstore, trans) {
	                   var totalCount = 0;
	                   // Clone collection and change its table and set a limit of CHUNKSIZE on the cloned Collection instance.
	                   var collection = _this4.clone({
	                       keysOnly: !ctx.isMatch && !hasDeleteHook }) // load just keys (unless filter() or and() or deleteHook has subscribers)
	                   .distinct() // In case multiEntry is used, never delete same key twice because resulting count
	                   // would become larger than actual delete count.
	                   .limit(CHUNKSIZE).raw(); // Don't filter through reading-hooks (like mapped classes etc)
	
	                   var keysOrTuples = [];
	
	                   // We're gonna do things on as many chunks that are needed.
	                   // Use recursion of nextChunk function:
	                   var nextChunk = function () {
	                       return collection.each(hasDeleteHook ? function (val, cursor) {
	                           // Somebody subscribes to hook('deleting'). Collect all primary keys and their values,
	                           // so that the hook can be called with its values in bulkDelete().
	                           keysOrTuples.push([cursor.primaryKey, cursor.value]);
	                       } : function (val, cursor) {
	                           // No one subscribes to hook('deleting'). Collect only primary keys:
	                           keysOrTuples.push(cursor.primaryKey);
	                       }).then(function () {
	                           // Chromium deletes faster when doing it in sort order.
	                           hasDeleteHook ? keysOrTuples.sort(function (a, b) {
	                               return ascending(a[0], b[0]);
	                           }) : keysOrTuples.sort(ascending);
	                           return bulkDelete(idbstore, trans, keysOrTuples, hasDeleteHook, deletingHook);
	                       }).then(function () {
	                           var count = keysOrTuples.length;
	                           totalCount += count;
	                           keysOrTuples = [];
	                           return count < CHUNKSIZE ? totalCount : nextChunk();
	                       });
	                   };
	
	                   resolve(nextChunk());
	               });
	           }
	       });
	
	       //
	       //
	       //
	       // ------------------------- Help functions ---------------------------
	       //
	       //
	       //
	
	       function lowerVersionFirst(a, b) {
	           return a._cfg.version - b._cfg.version;
	       }
	
	       function setApiOnPlace(objs, tableNames, mode, dbschema) {
	           tableNames.forEach(function (tableName) {
	               var tableInstance = db._tableFactory(mode, dbschema[tableName]);
	               objs.forEach(function (obj) {
	                   tableName in obj || (obj[tableName] = tableInstance);
	               });
	           });
	       }
	
	       function removeTablesApi(objs) {
	           objs.forEach(function (obj) {
	               for (var key in obj) {
	                   if (obj[key] instanceof Table) delete obj[key];
	               }
	           });
	       }
	
	       function iterate(req, filter, fn, resolve, reject, valueMapper) {
	
	           // Apply valueMapper (hook('reading') or mappped class)
	           var mappedFn = valueMapper ? function (x, c, a) {
	               return fn(valueMapper(x), c, a);
	           } : fn;
	           // Wrap fn with PSD and microtick stuff from Promise.
	           var wrappedFn = wrap(mappedFn, reject);
	
	           if (!req.onerror) req.onerror = eventRejectHandler(reject);
	           if (filter) {
	               req.onsuccess = trycatcher(function filter_record() {
	                   var cursor = req.result;
	                   if (cursor) {
	                       var c = function () {
	                           cursor.continue();
	                       };
	                       if (filter(cursor, function (advancer) {
	                           c = advancer;
	                       }, resolve, reject)) wrappedFn(cursor.value, cursor, function (advancer) {
	                           c = advancer;
	                       });
	                       c();
	                   } else {
	                       resolve();
	                   }
	               }, reject);
	           } else {
	               req.onsuccess = trycatcher(function filter_record() {
	                   var cursor = req.result;
	                   if (cursor) {
	                       var c = function () {
	                           cursor.continue();
	                       };
	                       wrappedFn(cursor.value, cursor, function (advancer) {
	                           c = advancer;
	                       });
	                       c();
	                   } else {
	                       resolve();
	                   }
	               }, reject);
	           }
	       }
	
	       function parseIndexSyntax(indexes) {
	           /// <param name="indexes" type="String"></param>
	           /// <returns type="Array" elementType="IndexSpec"></returns>
	           var rv = [];
	           indexes.split(',').forEach(function (index) {
	               index = index.trim();
	               var name = index.replace(/([&*]|\+\+)/g, ""); // Remove "&", "++" and "*"
	               // Let keyPath of "[a+b]" be ["a","b"]:
	               var keyPath = /^\[/.test(name) ? name.match(/^\[(.*)\]$/)[1].split('+') : name;
	
	               rv.push(new IndexSpec(name, keyPath || null, /\&/.test(index), /\*/.test(index), /\+\+/.test(index), isArray(keyPath), /\./.test(index)));
	           });
	           return rv;
	       }
	
	       function cmp(key1, key2) {
	           return indexedDB.cmp(key1, key2);
	       }
	
	       function min(a, b) {
	           return cmp(a, b) < 0 ? a : b;
	       }
	
	       function max(a, b) {
	           return cmp(a, b) > 0 ? a : b;
	       }
	
	       function ascending(a, b) {
	           return indexedDB.cmp(a, b);
	       }
	
	       function descending(a, b) {
	           return indexedDB.cmp(b, a);
	       }
	
	       function simpleCompare(a, b) {
	           return a < b ? -1 : a === b ? 0 : 1;
	       }
	
	       function simpleCompareReverse(a, b) {
	           return a > b ? -1 : a === b ? 0 : 1;
	       }
	
	       function combine(filter1, filter2) {
	           return filter1 ? filter2 ? function () {
	               return filter1.apply(this, arguments) && filter2.apply(this, arguments);
	           } : filter1 : filter2;
	       }
	
	       function readGlobalSchema() {
	           db.verno = idbdb.version / 10;
	           db._dbSchema = globalSchema = {};
	           dbStoreNames = slice(idbdb.objectStoreNames, 0);
	           if (dbStoreNames.length === 0) return; // Database contains no stores.
	           var trans = idbdb.transaction(safariMultiStoreFix(dbStoreNames), 'readonly');
	           dbStoreNames.forEach(function (storeName) {
	               var store = trans.objectStore(storeName),
	                   keyPath = store.keyPath,
	                   dotted = keyPath && typeof keyPath === 'string' && keyPath.indexOf('.') !== -1;
	               var primKey = new IndexSpec(keyPath, keyPath || "", false, false, !!store.autoIncrement, keyPath && typeof keyPath !== 'string', dotted);
	               var indexes = [];
	               for (var j = 0; j < store.indexNames.length; ++j) {
	                   var idbindex = store.index(store.indexNames[j]);
	                   keyPath = idbindex.keyPath;
	                   dotted = keyPath && typeof keyPath === 'string' && keyPath.indexOf('.') !== -1;
	                   var index = new IndexSpec(idbindex.name, keyPath, !!idbindex.unique, !!idbindex.multiEntry, false, keyPath && typeof keyPath !== 'string', dotted);
	                   indexes.push(index);
	               }
	               globalSchema[storeName] = new TableSchema(storeName, primKey, indexes, {});
	           });
	           setApiOnPlace([allTables, Transaction.prototype], keys(globalSchema), READWRITE, globalSchema);
	       }
	
	       function adjustToExistingIndexNames(schema, idbtrans) {
	           /// <summary>
	           /// Issue #30 Problem with existing db - adjust to existing index names when migrating from non-dexie db
	           /// </summary>
	           /// <param name="schema" type="Object">Map between name and TableSchema</param>
	           /// <param name="idbtrans" type="IDBTransaction"></param>
	           var storeNames = idbtrans.db.objectStoreNames;
	           for (var i = 0; i < storeNames.length; ++i) {
	               var storeName = storeNames[i];
	               var store = idbtrans.objectStore(storeName);
	               hasGetAll = 'getAll' in store;
	               for (var j = 0; j < store.indexNames.length; ++j) {
	                   var indexName = store.indexNames[j];
	                   var keyPath = store.index(indexName).keyPath;
	                   var dexieName = typeof keyPath === 'string' ? keyPath : "[" + slice(keyPath).join('+') + "]";
	                   if (schema[storeName]) {
	                       var indexSpec = schema[storeName].idxByName[dexieName];
	                       if (indexSpec) indexSpec.name = indexName;
	                   }
	               }
	           }
	       }
	
	       function fireOnBlocked(ev) {
	           db.on("blocked").fire(ev);
	           // Workaround (not fully*) for missing "versionchange" event in IE,Edge and Safari:
	           connections.filter(function (c) {
	               return c.name === db.name && c !== db && !c._vcFired;
	           }).map(function (c) {
	               return c.on("versionchange").fire(ev);
	           });
	       }
	
	       extend(this, {
	           Collection: Collection,
	           Table: Table,
	           Transaction: Transaction,
	           Version: Version,
	           WhereClause: WhereClause,
	           WriteableCollection: WriteableCollection,
	           WriteableTable: WriteableTable
	       });
	
	       init();
	
	       addons.forEach(function (fn) {
	           fn(db);
	       });
	   }
	
	   var fakeAutoComplete = function () {}; // Will never be changed. We just fake for the IDE that we change it (see doFakeAutoComplete())
	   var fake = false; // Will never be changed. We just fake for the IDE that we change it (see doFakeAutoComplete())
	
	   function parseType(type) {
	       if (typeof type === 'function') {
	           return new type();
	       } else if (isArray(type)) {
	           return [parseType(type[0])];
	       } else if (type && typeof type === 'object') {
	           var rv = {};
	           applyStructure(rv, type);
	           return rv;
	       } else {
	           return type;
	       }
	   }
	
	   function applyStructure(obj, structure) {
	       keys(structure).forEach(function (member) {
	           var value = parseType(structure[member]);
	           obj[member] = value;
	       });
	       return obj;
	   }
	
	   function eventSuccessHandler(done) {
	       return function (ev) {
	           done(ev.target.result);
	       };
	   }
	
	   function hookedEventSuccessHandler(resolve) {
	       // wrap() is needed when calling hooks because the rare scenario of:
	       //  * hook does a db operation that fails immediately (IDB throws exception)
	       //    For calling db operations on correct transaction, wrap makes sure to set PSD correctly.
	       //    wrap() will also execute in a virtual tick.
	       //  * If not wrapped in a virtual tick, direct exception will launch a new physical tick.
	       //  * If this was the last event in the bulk, the promise will resolve after a physical tick
	       //    and the transaction will have committed already.
	       // If no hook, the virtual tick will be executed in the reject()/resolve of the final promise,
	       // because it is always marked with _lib = true when created using Transaction._promise().
	       return wrap(function (event) {
	           var req = event.target,
	               result = req.result,
	               ctx = req._hookCtx,
	               // Contains the hook error handler. Put here instead of closure to boost performance.
	           hookSuccessHandler = ctx && ctx.onsuccess;
	           hookSuccessHandler && hookSuccessHandler(result);
	           resolve && resolve(result);
	       }, resolve);
	   }
	
	   function eventRejectHandler(reject) {
	       return function (event) {
	           preventDefault(event);
	           reject(event.target.error);
	           return false;
	       };
	   }
	
	   function hookedEventRejectHandler(reject) {
	       return wrap(function (event) {
	           // See comment on hookedEventSuccessHandler() why wrap() is needed only when supporting hooks.
	
	           var req = event.target,
	               err = req.error,
	               ctx = req._hookCtx,
	               // Contains the hook error handler. Put here instead of closure to boost performance.
	           hookErrorHandler = ctx && ctx.onerror;
	           hookErrorHandler && hookErrorHandler(err);
	           preventDefault(event);
	           reject(err);
	           return false;
	       });
	   }
	
	   function preventDefault(event) {
	       if (event.stopPropagation) // IndexedDBShim doesnt support this on Safari 8 and below.
	           event.stopPropagation();
	       if (event.preventDefault) // IndexedDBShim doesnt support this on Safari 8 and below.
	           event.preventDefault();
	   }
	
	   function globalDatabaseList(cb) {
	       var val,
	           localStorage = Dexie.dependencies.localStorage;
	       if (!localStorage) return cb([]); // Envs without localStorage support
	       try {
	           val = JSON.parse(localStorage.getItem('Dexie.DatabaseNames') || "[]");
	       } catch (e) {
	           val = [];
	       }
	       if (cb(val)) {
	           localStorage.setItem('Dexie.DatabaseNames', JSON.stringify(val));
	       }
	   }
	
	   function awaitIterator(iterator) {
	       var callNext = function (result) {
	           return iterator.next(result);
	       },
	           doThrow = function (error) {
	           return iterator.throw(error);
	       },
	           onSuccess = step(callNext),
	           onError = step(doThrow);
	
	       function step(getNext) {
	           return function (val) {
	               var next = getNext(val),
	                   value = next.value;
	
	               return next.done ? value : !value || typeof value.then !== 'function' ? isArray(value) ? Promise.all(value).then(onSuccess, onError) : onSuccess(value) : value.then(onSuccess, onError);
	           };
	       }
	
	       return step(callNext)();
	   }
	
	   //
	   // IndexSpec struct
	   //
	   function IndexSpec(name, keyPath, unique, multi, auto, compound, dotted) {
	       /// <param name="name" type="String"></param>
	       /// <param name="keyPath" type="String"></param>
	       /// <param name="unique" type="Boolean"></param>
	       /// <param name="multi" type="Boolean"></param>
	       /// <param name="auto" type="Boolean"></param>
	       /// <param name="compound" type="Boolean"></param>
	       /// <param name="dotted" type="Boolean"></param>
	       this.name = name;
	       this.keyPath = keyPath;
	       this.unique = unique;
	       this.multi = multi;
	       this.auto = auto;
	       this.compound = compound;
	       this.dotted = dotted;
	       var keyPathSrc = typeof keyPath === 'string' ? keyPath : keyPath && '[' + [].join.call(keyPath, '+') + ']';
	       this.src = (unique ? '&' : '') + (multi ? '*' : '') + (auto ? "++" : "") + keyPathSrc;
	   }
	
	   //
	   // TableSchema struct
	   //
	   function TableSchema(name, primKey, indexes, instanceTemplate) {
	       /// <param name="name" type="String"></param>
	       /// <param name="primKey" type="IndexSpec"></param>
	       /// <param name="indexes" type="Array" elementType="IndexSpec"></param>
	       /// <param name="instanceTemplate" type="Object"></param>
	       this.name = name;
	       this.primKey = primKey || new IndexSpec();
	       this.indexes = indexes || [new IndexSpec()];
	       this.instanceTemplate = instanceTemplate;
	       this.mappedClass = null;
	       this.idxByName = arrayToObject(indexes, function (index) {
	           return [index.name, index];
	       });
	   }
	
	   // Used in when defining dependencies later...
	   // (If IndexedDBShim is loaded, prefer it before standard indexedDB)
	   var idbshim = _global.idbModules && _global.idbModules.shimIndexedDB ? _global.idbModules : {};
	
	   function safariMultiStoreFix(storeNames) {
	       return storeNames.length === 1 ? storeNames[0] : storeNames;
	   }
	
	   function getNativeGetDatabaseNamesFn(indexedDB) {
	       var fn = indexedDB && (indexedDB.getDatabaseNames || indexedDB.webkitGetDatabaseNames);
	       return fn && fn.bind(indexedDB);
	   }
	
	   // Export Error classes
	   props(Dexie, fullNameExceptions); // Dexie.XXXError = class XXXError {...};
	
	   //
	   // Static methods and properties
	   //
	   props(Dexie, {
	
	       //
	       // Static delete() method.
	       //
	       delete: function (databaseName) {
	           var db = new Dexie(databaseName),
	               promise = db.delete();
	           promise.onblocked = function (fn) {
	               db.on("blocked", fn);
	               return this;
	           };
	           return promise;
	       },
	
	       //
	       // Static exists() method.
	       //
	       exists: function (name) {
	           return new Dexie(name).open().then(function (db) {
	               db.close();
	               return true;
	           }).catch(Dexie.NoSuchDatabaseError, function () {
	               return false;
	           });
	       },
	
	       //
	       // Static method for retrieving a list of all existing databases at current host.
	       //
	       getDatabaseNames: function (cb) {
	           return new Promise(function (resolve, reject) {
	               var getDatabaseNames = getNativeGetDatabaseNamesFn(indexedDB);
	               if (getDatabaseNames) {
	                   // In case getDatabaseNames() becomes standard, let's prepare to support it:
	                   var req = getDatabaseNames();
	                   req.onsuccess = function (event) {
	                       resolve(slice(event.target.result, 0)); // Converst DOMStringList to Array<String>
	                   };
	                   req.onerror = eventRejectHandler(reject);
	               } else {
	                   globalDatabaseList(function (val) {
	                       resolve(val);
	                       return false;
	                   });
	               }
	           }).then(cb);
	       },
	
	       defineClass: function (structure) {
	           /// <summary>
	           ///     Create a javascript constructor based on given template for which properties to expect in the class.
	           ///     Any property that is a constructor function will act as a type. So {name: String} will be equal to {name: new String()}.
	           /// </summary>
	           /// <param name="structure">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
	           /// know what type each member has. Example: {name: String, emailAddresses: [String], properties: {shoeSize: Number}}</param>
	
	           // Default constructor able to copy given properties into this object.
	           function Class(properties) {
	               /// <param name="properties" type="Object" optional="true">Properties to initialize object with.
	               /// </param>
	               properties ? extend(this, properties) : fake && applyStructure(this, structure);
	           }
	           return Class;
	       },
	
	       applyStructure: applyStructure,
	
	       ignoreTransaction: function (scopeFunc) {
	           // In case caller is within a transaction but needs to create a separate transaction.
	           // Example of usage:
	           //
	           // Let's say we have a logger function in our app. Other application-logic should be unaware of the
	           // logger function and not need to include the 'logentries' table in all transaction it performs.
	           // The logging should always be done in a separate transaction and not be dependant on the current
	           // running transaction context. Then you could use Dexie.ignoreTransaction() to run code that starts a new transaction.
	           //
	           //     Dexie.ignoreTransaction(function() {
	           //         db.logentries.add(newLogEntry);
	           //     });
	           //
	           // Unless using Dexie.ignoreTransaction(), the above example would try to reuse the current transaction
	           // in current Promise-scope.
	           //
	           // An alternative to Dexie.ignoreTransaction() would be setImmediate() or setTimeout(). The reason we still provide an
	           // API for this because
	           //  1) The intention of writing the statement could be unclear if using setImmediate() or setTimeout().
	           //  2) setTimeout() would wait unnescessary until firing. This is however not the case with setImmediate().
	           //  3) setImmediate() is not supported in the ES standard.
	           //  4) You might want to keep other PSD state that was set in a parent PSD, such as PSD.letThrough.
	           return PSD.trans ? usePSD(PSD.transless, scopeFunc) : // Use the closest parent that was non-transactional.
	           scopeFunc(); // No need to change scope because there is no ongoing transaction.
	       },
	
	       vip: function (fn) {
	           // To be used by subscribers to the on('ready') event.
	           // This will let caller through to access DB even when it is blocked while the db.ready() subscribers are firing.
	           // This would have worked automatically if we were certain that the Provider was using Dexie.Promise for all asyncronic operations. The promise PSD
	           // from the provider.connect() call would then be derived all the way to when provider would call localDatabase.applyChanges(). But since
	           // the provider more likely is using non-promise async APIs or other thenable implementations, we cannot assume that.
	           // Note that this method is only useful for on('ready') subscribers that is returning a Promise from the event. If not using vip()
	           // the database could deadlock since it wont open until the returned Promise is resolved, and any non-VIPed operation started by
	           // the caller will not resolve until database is opened.
	           return newScope(function () {
	               PSD.letThrough = true; // Make sure we are let through if still blocking db due to onready is firing.
	               return fn();
	           });
	       },
	
	       async: function (generatorFn) {
	           return function () {
	               try {
	                   var rv = awaitIterator(generatorFn.apply(this, arguments));
	                   if (!rv || typeof rv.then !== 'function') return Promise.resolve(rv);
	                   return rv;
	               } catch (e) {
	                   return rejection(e);
	               }
	           };
	       },
	
	       spawn: function (generatorFn, args, thiz) {
	           try {
	               var rv = awaitIterator(generatorFn.apply(thiz, args || []));
	               if (!rv || typeof rv.then !== 'function') return Promise.resolve(rv);
	               return rv;
	           } catch (e) {
	               return rejection(e);
	           }
	       },
	
	       // Dexie.currentTransaction property
	       currentTransaction: {
	           get: function () {
	               return PSD.trans || null;
	           }
	       },
	
	       // Export our Promise implementation since it can be handy as a standalone Promise implementation
	       Promise: Promise,
	
	       // Dexie.debug proptery:
	       // Dexie.debug = false
	       // Dexie.debug = true
	       // Dexie.debug = "dexie" - don't hide dexie's stack frames.
	       debug: {
	           get: function () {
	               return debug;
	           },
	           set: function (value) {
	               setDebug(value, value === 'dexie' ? function () {
	                   return true;
	               } : dexieStackFrameFilter);
	           }
	       },
	
	       // Export our derive/extend/override methodology
	       derive: derive,
	       extend: extend,
	       props: props,
	       override: override,
	       // Export our Events() function - can be handy as a toolkit
	       Events: Events,
	       events: Events, // Backward compatible lowercase version. Deprecate.
	       // Utilities
	       getByKeyPath: getByKeyPath,
	       setByKeyPath: setByKeyPath,
	       delByKeyPath: delByKeyPath,
	       shallowClone: shallowClone,
	       deepClone: deepClone,
	       getObjectDiff: getObjectDiff,
	       asap: asap,
	       maxKey: maxKey,
	       // Addon registry
	       addons: [],
	       // Global DB connection list
	       connections: connections,
	
	       MultiModifyError: exceptions.Modify, // Backward compatibility 0.9.8. Deprecate.
	       errnames: errnames,
	
	       // Export other static classes
	       IndexSpec: IndexSpec,
	       TableSchema: TableSchema,
	
	       //
	       // Dependencies
	       //
	       // These will automatically work in browsers with indexedDB support, or where an indexedDB polyfill has been included.
	       //
	       // In node.js, however, these properties must be set "manually" before instansiating a new Dexie().
	       // For node.js, you need to require indexeddb-js or similar and then set these deps.
	       //
	       dependencies: {
	           // Required:
	           indexedDB: idbshim.shimIndexedDB || _global.indexedDB || _global.mozIndexedDB || _global.webkitIndexedDB || _global.msIndexedDB,
	           IDBKeyRange: idbshim.IDBKeyRange || _global.IDBKeyRange || _global.webkitIDBKeyRange
	       },
	
	       // API Version Number: Type Number, make sure to always set a version number that can be comparable correctly. Example: 0.9, 0.91, 0.92, 1.0, 1.01, 1.1, 1.2, 1.21, etc.
	       semVer: DEXIE_VERSION,
	       version: DEXIE_VERSION.split('.').map(function (n) {
	           return parseInt(n);
	       }).reduce(function (p, c, i) {
	           return p + c / Math.pow(10, i * 2);
	       }),
	       fakeAutoComplete: fakeAutoComplete,
	
	       // https://github.com/dfahlander/Dexie.js/issues/186
	       // typescript compiler tsc in mode ts-->es5 & commonJS, will expect require() to return
	       // x.default. Workaround: Set Dexie.default = Dexie.
	       default: Dexie
	   });
	
	   tryCatch(function () {
	       // Optional dependencies
	       // localStorage
	       Dexie.dependencies.localStorage = (typeof chrome !== "undefined" && chrome !== null ? chrome.storage : void 0) != null ? null : _global.localStorage;
	   });
	
	   // Map DOMErrors and DOMExceptions to corresponding Dexie errors. May change in Dexie v2.0.
	   Promise.rejectionMapper = mapError;
	
	   // Fool IDE to improve autocomplete. Tested with Visual Studio 2013 and 2015.
	   doFakeAutoComplete(function () {
	       Dexie.fakeAutoComplete = fakeAutoComplete = doFakeAutoComplete;
	       Dexie.fake = fake = true;
	   });
	
	   return Dexie;
	
	}));
	//# sourceMappingURL=dexie.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(36).setImmediate))

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toPosInt = __webpack_require__(149)
	  , value    = __webpack_require__(7)
	
	  , indexOf = Array.prototype.indexOf
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , abs = Math.abs, floor = Math.floor;
	
	module.exports = function (searchElement/*, fromIndex*/) {
		var i, l, fromIndex, val;
		if (searchElement === searchElement) { //jslint: ignore
			return indexOf.apply(this, arguments);
		}
	
		l = toPosInt(value(this).length);
		fromIndex = arguments[1];
		if (isNaN(fromIndex)) fromIndex = 0;
		else if (fromIndex >= 0) fromIndex = floor(fromIndex);
		else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));
	
		for (i = fromIndex; i < l; ++i) {
			if (hasOwnProperty.call(this, i)) {
				val = this[i];
				if (val !== val) return i; //jslint: ignore
			}
		}
		return -1;
	};


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(146)()
		? Math.sign
		: __webpack_require__(147);


/***/ },
/* 146 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		var sign = Math.sign;
		if (typeof sign !== 'function') return false;
		return ((sign(10) === 1) && (sign(-20) === -1));
	};


/***/ },
/* 147 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (value) {
		value = Number(value);
		if (isNaN(value) || (value === 0)) return value;
		return (value > 0) ? 1 : -1;
	};


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var sign = __webpack_require__(145)
	
	  , abs = Math.abs, floor = Math.floor;
	
	module.exports = function (value) {
		if (isNaN(value)) return 0;
		value = Number(value);
		if ((value === 0) || !isFinite(value)) return value;
		return sign(value) * floor(abs(value));
	};


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toInteger = __webpack_require__(148)
	
	  , max = Math.max;
	
	module.exports = function (value) { return max(0, toInteger(value)); };


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	// Internal method, used by iteration functions.
	// Calls a function for each key-value pair found in object
	// Optionally takes compareFn to iterate object in specific order
	
	'use strict';
	
	var callable = __webpack_require__(9)
	  , value    = __webpack_require__(7)
	
	  , bind = Function.prototype.bind, call = Function.prototype.call, keys = Object.keys
	  , propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	module.exports = function (method, defVal) {
		return function (obj, cb/*, thisArg, compareFn*/) {
			var list, thisArg = arguments[2], compareFn = arguments[3];
			obj = Object(value(obj));
			callable(cb);
	
			list = keys(obj);
			if (compareFn) {
				list.sort((typeof compareFn === 'function') ? bind.call(compareFn, obj) : undefined);
			}
			if (typeof method !== 'function') method = list[method];
			return call.call(method, list, function (key, index) {
				if (!propertyIsEnumerable.call(obj, key)) return defVal;
				return call.call(cb, thisArg, obj[key], key, obj, index);
			});
		};
	};


/***/ },
/* 151 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== 'function') return false;
		obj = { foo: 'raz' };
		assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
		return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
	};


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var keys  = __webpack_require__(158)
	  , value = __webpack_require__(7)
	
	  , max = Math.max;
	
	module.exports = function (dest, src/*, …srcn*/) {
		var error, i, l = max(arguments.length, 2), assign;
		dest = Object(value(dest));
		assign = function (key) {
			try { dest[key] = src[key]; } catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < l; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var assign = __webpack_require__(29)
	  , value  = __webpack_require__(7);
	
	module.exports = function (obj) {
		var copy = Object(value(obj));
		if (copy !== obj) return copy;
		return assign({}, obj);
	};


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	// Workaround for http://code.google.com/p/v8/issues/detail?id=2804
	
	'use strict';
	
	var create = Object.create, shim;
	
	if (!__webpack_require__(55)()) {
		shim = __webpack_require__(56);
	}
	
	module.exports = (function () {
		var nullObject, props, desc;
		if (!shim) return create;
		if (shim.level !== 1) return create;
	
		nullObject = {};
		props = {};
		desc = { configurable: false, enumerable: false, writable: true,
			value: undefined };
		Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
			if (name === '__proto__') {
				props[name] = { configurable: true, enumerable: false, writable: true,
					value: undefined };
				return;
			}
			props[name] = desc;
		});
		Object.defineProperties(nullObject, props);
	
		Object.defineProperty(shim, 'nullPolyfill', { configurable: false,
			enumerable: false, writable: false, value: nullObject });
	
		return function (prototype, props) {
			return create((prototype === null) ? nullObject : prototype, props);
		};
	}());


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(150)('forEach');


/***/ },
/* 156 */
/***/ function(module, exports) {

	// Deprecated
	
	'use strict';
	
	module.exports = function (obj) { return typeof obj === 'function'; };


/***/ },
/* 157 */
/***/ function(module, exports) {

	'use strict';
	
	var map = { function: true, object: true };
	
	module.exports = function (x) {
		return ((x != null) && map[typeof x]) || false;
	};


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(159)()
		? Object.keys
		: __webpack_require__(160);


/***/ },
/* 159 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		try {
			Object.keys('primitive');
			return true;
		} catch (e) { return false; }
	};


/***/ },
/* 160 */
/***/ function(module, exports) {

	'use strict';
	
	var keys = Object.keys;
	
	module.exports = function (object) {
		return keys(object == null ? object : Object(object));
	};


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var callable = __webpack_require__(9)
	  , forEach  = __webpack_require__(155)
	
	  , call = Function.prototype.call;
	
	module.exports = function (obj, cb/*, thisArg*/) {
		var o = {}, thisArg = arguments[2];
		callable(cb);
		forEach(obj, function (value, key, obj, index) {
			o[key] = call.call(cb, thisArg, value, key, obj, index);
		});
		return o;
	};


/***/ },
/* 162 */
/***/ function(module, exports) {

	'use strict';
	
	var forEach = Array.prototype.forEach, create = Object.create;
	
	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};
	
	module.exports = function (options/*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (options == null) return;
			process(Object(options), result);
		});
		return result;
	};


/***/ },
/* 163 */
/***/ function(module, exports) {

	'use strict';
	
	var forEach = Array.prototype.forEach, create = Object.create;
	
	module.exports = function (arg/*, …args*/) {
		var set = create(null);
		forEach.call(arguments, function (name) { set[name] = true; });
		return set;
	};


/***/ },
/* 164 */
/***/ function(module, exports) {

	'use strict';
	
	var str = 'razdwatrzy';
	
	module.exports = function () {
		if (typeof str.contains !== 'function') return false;
		return ((str.contains('dwa') === true) && (str.contains('foo') === false));
	};


/***/ },
/* 165 */
/***/ function(module, exports) {

	'use strict';
	
	var indexOf = String.prototype.indexOf;
	
	module.exports = function (searchString/*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var setPrototypeOf = __webpack_require__(20)
	  , contains       = __webpack_require__(57)
	  , d              = __webpack_require__(8)
	  , Iterator       = __webpack_require__(31)
	
	  , defineProperty = Object.defineProperty
	  , ArrayIterator;
	
	ArrayIterator = module.exports = function (arr, kind) {
		if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
		Iterator.call(this, arr);
		if (!kind) kind = 'value';
		else if (contains.call(kind, 'key+value')) kind = 'key+value';
		else if (contains.call(kind, 'key')) kind = 'key';
		else kind = 'value';
		defineProperty(this, '__kind__', d('', kind));
	};
	if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);
	
	ArrayIterator.prototype = Object.create(Iterator.prototype, {
		constructor: d(ArrayIterator),
		_resolve: d(function (i) {
			if (this.__kind__ === 'value') return this.__list__[i];
			if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
			return i;
		}),
		toString: d(function () { return '[object Array Iterator]'; })
	});


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isArguments = __webpack_require__(28)
	  , callable    = __webpack_require__(9)
	  , isString    = __webpack_require__(30)
	  , get         = __webpack_require__(168)
	
	  , isArray = Array.isArray, call = Function.prototype.call
	  , some = Array.prototype.some;
	
	module.exports = function (iterable, cb/*, thisArg*/) {
		var mode, thisArg = arguments[2], result, doBreak, broken, i, l, char, code;
		if (isArray(iterable) || isArguments(iterable)) mode = 'array';
		else if (isString(iterable)) mode = 'string';
		else iterable = get(iterable);
	
		callable(cb);
		doBreak = function () { broken = true; };
		if (mode === 'array') {
			some.call(iterable, function (value) {
				call.call(cb, thisArg, value, doBreak);
				if (broken) return true;
			});
			return;
		}
		if (mode === 'string') {
			l = iterable.length;
			for (i = 0; i < l; ++i) {
				char = iterable[i];
				if ((i + 1) < l) {
					code = char.charCodeAt(0);
					if ((code >= 0xD800) && (code <= 0xDBFF)) char += iterable[++i];
				}
				call.call(cb, thisArg, char, doBreak);
				if (broken) break;
			}
			return;
		}
		result = iterable.next();
	
		while (!result.done) {
			call.call(cb, thisArg, result.value, doBreak);
			if (broken) return;
			result = iterable.next();
		}
	};


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isArguments    = __webpack_require__(28)
	  , isString       = __webpack_require__(30)
	  , ArrayIterator  = __webpack_require__(166)
	  , StringIterator = __webpack_require__(170)
	  , iterable       = __webpack_require__(58)
	  , iteratorSymbol = __webpack_require__(15).iterator;
	
	module.exports = function (obj) {
		if (typeof iterable(obj)[iteratorSymbol] === 'function') return obj[iteratorSymbol]();
		if (isArguments(obj)) return new ArrayIterator(obj);
		if (isString(obj)) return new StringIterator(obj);
		return new ArrayIterator(obj);
	};


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isArguments    = __webpack_require__(28)
	  , isString       = __webpack_require__(30)
	  , iteratorSymbol = __webpack_require__(15).iterator
	
	  , isArray = Array.isArray;
	
	module.exports = function (value) {
		if (value == null) return false;
		if (isArray(value)) return true;
		if (isString(value)) return true;
		if (isArguments(value)) return true;
		return (typeof value[iteratorSymbol] === 'function');
	};


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	// Thanks @mathiasbynens
	// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols
	
	'use strict';
	
	var setPrototypeOf = __webpack_require__(20)
	  , d              = __webpack_require__(8)
	  , Iterator       = __webpack_require__(31)
	
	  , defineProperty = Object.defineProperty
	  , StringIterator;
	
	StringIterator = module.exports = function (str) {
		if (!(this instanceof StringIterator)) return new StringIterator(str);
		str = String(str);
		Iterator.call(this, str);
		defineProperty(this, '__length__', d('', str.length));
	
	};
	if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);
	
	StringIterator.prototype = Object.create(Iterator.prototype, {
		constructor: d(StringIterator),
		_next: d(function () {
			if (!this.__list__) return;
			if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
			this._unBind();
		}),
		_resolve: d(function (i) {
			var char = this.__list__[i], code;
			if (this.__nextIndex__ === this.__length__) return char;
			code = char.charCodeAt(0);
			if ((code >= 0xD800) && (code <= 0xDBFF)) return char + this.__list__[this.__nextIndex__++];
			return char;
		}),
		toString: d(function () { return '[object String Iterator]'; })
	});


/***/ },
/* 171 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		var map, iterator, result;
		if (typeof Map !== 'function') return false;
		try {
			// WebKit doesn't support arguments and crashes
			map = new Map([['raz', 'one'], ['dwa', 'two'], ['trzy', 'three']]);
		} catch (e) {
			return false;
		}
		if (String(map) !== '[object Map]') return false;
		if (map.size !== 3) return false;
		if (typeof map.clear !== 'function') return false;
		if (typeof map.delete !== 'function') return false;
		if (typeof map.entries !== 'function') return false;
		if (typeof map.forEach !== 'function') return false;
		if (typeof map.get !== 'function') return false;
		if (typeof map.has !== 'function') return false;
		if (typeof map.keys !== 'function') return false;
		if (typeof map.set !== 'function') return false;
		if (typeof map.values !== 'function') return false;
	
		iterator = map.entries();
		result = iterator.next();
		if (result.done !== false) return false;
		if (!result.value) return false;
		if (result.value[0] !== 'raz') return false;
		if (result.value[1] !== 'one') return false;
	
		return true;
	};


/***/ },
/* 172 */
/***/ function(module, exports) {

	// Exports true if environment provides native `Map` implementation,
	// whatever that is.
	
	'use strict';
	
	module.exports = (function () {
		if (typeof Map === 'undefined') return false;
		return (Object.prototype.toString.call(new Map()) === '[object Map]');
	}());


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(163)('key',
		'value', 'key+value');


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var setPrototypeOf    = __webpack_require__(20)
	  , d                 = __webpack_require__(8)
	  , Iterator          = __webpack_require__(31)
	  , toStringTagSymbol = __webpack_require__(15).toStringTag
	  , kinds             = __webpack_require__(173)
	
	  , defineProperties = Object.defineProperties
	  , unBind = Iterator.prototype._unBind
	  , MapIterator;
	
	MapIterator = module.exports = function (map, kind) {
		if (!(this instanceof MapIterator)) return new MapIterator(map, kind);
		Iterator.call(this, map.__mapKeysData__, map);
		if (!kind || !kinds[kind]) kind = 'key+value';
		defineProperties(this, {
			__kind__: d('', kind),
			__values__: d('w', map.__mapValuesData__)
		});
	};
	if (setPrototypeOf) setPrototypeOf(MapIterator, Iterator);
	
	MapIterator.prototype = Object.create(Iterator.prototype, {
		constructor: d(MapIterator),
		_resolve: d(function (i) {
			if (this.__kind__ === 'value') return this.__values__[i];
			if (this.__kind__ === 'key') return this.__list__[i];
			return [this.__list__[i], this.__values__[i]];
		}),
		_unBind: d(function () {
			this.__values__ = null;
			unBind.call(this);
		}),
		toString: d(function () { return '[object Map Iterator]'; })
	});
	Object.defineProperty(MapIterator.prototype, toStringTagSymbol,
		d('c', 'Map Iterator'));


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var clear          = __webpack_require__(54)
	  , eIndexOf       = __webpack_require__(144)
	  , setPrototypeOf = __webpack_require__(20)
	  , callable       = __webpack_require__(9)
	  , validValue     = __webpack_require__(7)
	  , d              = __webpack_require__(8)
	  , ee             = __webpack_require__(180)
	  , Symbol         = __webpack_require__(15)
	  , iterator       = __webpack_require__(58)
	  , forOf          = __webpack_require__(167)
	  , Iterator       = __webpack_require__(174)
	  , isNative       = __webpack_require__(172)
	
	  , call = Function.prototype.call
	  , defineProperties = Object.defineProperties, getPrototypeOf = Object.getPrototypeOf
	  , MapPoly;
	
	module.exports = MapPoly = function (/*iterable*/) {
		var iterable = arguments[0], keys, values, self;
		if (!(this instanceof MapPoly)) throw new TypeError('Constructor requires \'new\'');
		if (isNative && setPrototypeOf && (Map !== MapPoly)) {
			self = setPrototypeOf(new Map(), getPrototypeOf(this));
		} else {
			self = this;
		}
		if (iterable != null) iterator(iterable);
		defineProperties(self, {
			__mapKeysData__: d('c', keys = []),
			__mapValuesData__: d('c', values = [])
		});
		if (!iterable) return self;
		forOf(iterable, function (value) {
			var key = validValue(value)[0];
			value = value[1];
			if (eIndexOf.call(keys, key) !== -1) return;
			keys.push(key);
			values.push(value);
		}, self);
		return self;
	};
	
	if (isNative) {
		if (setPrototypeOf) setPrototypeOf(MapPoly, Map);
		MapPoly.prototype = Object.create(Map.prototype, {
			constructor: d(MapPoly)
		});
	}
	
	ee(defineProperties(MapPoly.prototype, {
		clear: d(function () {
			if (!this.__mapKeysData__.length) return;
			clear.call(this.__mapKeysData__);
			clear.call(this.__mapValuesData__);
			this.emit('_clear');
		}),
		delete: d(function (key) {
			var index = eIndexOf.call(this.__mapKeysData__, key);
			if (index === -1) return false;
			this.__mapKeysData__.splice(index, 1);
			this.__mapValuesData__.splice(index, 1);
			this.emit('_delete', index, key);
			return true;
		}),
		entries: d(function () { return new Iterator(this, 'key+value'); }),
		forEach: d(function (cb/*, thisArg*/) {
			var thisArg = arguments[1], iterator, result;
			callable(cb);
			iterator = this.entries();
			result = iterator._next();
			while (result !== undefined) {
				call.call(cb, thisArg, this.__mapValuesData__[result],
					this.__mapKeysData__[result], this);
				result = iterator._next();
			}
		}),
		get: d(function (key) {
			var index = eIndexOf.call(this.__mapKeysData__, key);
			if (index === -1) return;
			return this.__mapValuesData__[index];
		}),
		has: d(function (key) {
			return (eIndexOf.call(this.__mapKeysData__, key) !== -1);
		}),
		keys: d(function () { return new Iterator(this, 'key'); }),
		set: d(function (key, value) {
			var index = eIndexOf.call(this.__mapKeysData__, key), emit;
			if (index === -1) {
				index = this.__mapKeysData__.push(key) - 1;
				emit = true;
			}
			this.__mapValuesData__[index] = value;
			if (emit) this.emit('_add', index, key);
			return this;
		}),
		size: d.gs(function () { return this.__mapKeysData__.length; }),
		values: d(function () { return new Iterator(this, 'value'); }),
		toString: d(function () { return '[object Map]'; })
	}));
	Object.defineProperty(MapPoly.prototype, Symbol.iterator, d(function () {
		return this.entries();
	}));
	Object.defineProperty(MapPoly.prototype, Symbol.toStringTag, d('c', 'Map'));


/***/ },
/* 176 */
/***/ function(module, exports) {

	'use strict';
	
	var validTypes = { object: true, symbol: true };
	
	module.exports = function () {
		var symbol;
		if (typeof Symbol !== 'function') return false;
		symbol = Symbol('test symbol');
		try { String(symbol); } catch (e) { return false; }
	
		// Return 'true' also for polyfills
		if (!validTypes[typeof Symbol.iterator]) return false;
		if (!validTypes[typeof Symbol.toPrimitive]) return false;
		if (!validTypes[typeof Symbol.toStringTag]) return false;
	
		return true;
	};


/***/ },
/* 177 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (x) {
		if (!x) return false;
		if (typeof x === 'symbol') return true;
		if (!x.constructor) return false;
		if (x.constructor.name !== 'Symbol') return false;
		return (x[x.constructor.toStringTag] === 'Symbol');
	};


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	// ES2015 Symbol polyfill for environments that do not support it (or partially support it)
	
	'use strict';
	
	var d              = __webpack_require__(8)
	  , validateSymbol = __webpack_require__(179)
	
	  , create = Object.create, defineProperties = Object.defineProperties
	  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
	  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
	  , isNativeSafe;
	
	if (typeof Symbol === 'function') {
		NativeSymbol = Symbol;
		try {
			String(NativeSymbol());
			isNativeSafe = true;
		} catch (ignore) {}
	}
	
	var generateName = (function () {
		var created = create(null);
		return function (desc) {
			var postfix = 0, name, ie11BugWorkaround;
			while (created[desc + (postfix || '')]) ++postfix;
			desc += (postfix || '');
			created[desc] = true;
			name = '@@' + desc;
			defineProperty(objPrototype, name, d.gs(null, function (value) {
				// For IE11 issue see:
				// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
				//    ie11-broken-getters-on-dom-objects
				// https://github.com/medikoo/es6-symbol/issues/12
				if (ie11BugWorkaround) return;
				ie11BugWorkaround = true;
				defineProperty(this, name, d(value));
				ie11BugWorkaround = false;
			}));
			return name;
		};
	}());
	
	// Internal constructor (not one exposed) for creating Symbol instances.
	// This one is used to ensure that `someSymbol instanceof Symbol` always return false
	HiddenSymbol = function Symbol(description) {
		if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
		return SymbolPolyfill(description);
	};
	
	// Exposed `Symbol` constructor
	// (returns instances of HiddenSymbol)
	module.exports = SymbolPolyfill = function Symbol(description) {
		var symbol;
		if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
		if (isNativeSafe) return NativeSymbol(description);
		symbol = create(HiddenSymbol.prototype);
		description = (description === undefined ? '' : String(description));
		return defineProperties(symbol, {
			__description__: d('', description),
			__name__: d('', generateName(description))
		});
	};
	defineProperties(SymbolPolyfill, {
		for: d(function (key) {
			if (globalSymbols[key]) return globalSymbols[key];
			return (globalSymbols[key] = SymbolPolyfill(String(key)));
		}),
		keyFor: d(function (s) {
			var key;
			validateSymbol(s);
			for (key in globalSymbols) if (globalSymbols[key] === s) return key;
		}),
	
		// If there's native implementation of given symbol, let's fallback to it
		// to ensure proper interoperability with other native functions e.g. Array.from
		hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
		isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
			SymbolPolyfill('isConcatSpreadable')),
		iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
		match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
		replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
		search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
		species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
		split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
		toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
		toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
		unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
	});
	
	// Internal tweaks for real symbol producer
	defineProperties(HiddenSymbol.prototype, {
		constructor: d(SymbolPolyfill),
		toString: d('', function () { return this.__name__; })
	});
	
	// Proper implementation of methods exposed on Symbol.prototype
	// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
	defineProperties(SymbolPolyfill.prototype, {
		toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
		valueOf: d(function () { return validateSymbol(this); })
	});
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
		var symbol = validateSymbol(this);
		if (typeof symbol === 'symbol') return symbol;
		return symbol.toString();
	}));
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));
	
	// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
		d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));
	
	// Note: It's important to define `toPrimitive` as last one, as some implementations
	// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
	// And that may invoke error in definition flow:
	// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
		d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isSymbol = __webpack_require__(177);
	
	module.exports = function (value) {
		if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
		return value;
	};


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var d        = __webpack_require__(8)
	  , callable = __webpack_require__(9)
	
	  , apply = Function.prototype.apply, call = Function.prototype.call
	  , create = Object.create, defineProperty = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , descriptor = { configurable: true, enumerable: false, writable: true }
	
	  , on, once, off, emit, methods, descriptors, base;
	
	on = function (type, listener) {
		var data;
	
		callable(listener);
	
		if (!hasOwnProperty.call(this, '__ee__')) {
			data = descriptor.value = create(null);
			defineProperty(this, '__ee__', descriptor);
			descriptor.value = null;
		} else {
			data = this.__ee__;
		}
		if (!data[type]) data[type] = listener;
		else if (typeof data[type] === 'object') data[type].push(listener);
		else data[type] = [data[type], listener];
	
		return this;
	};
	
	once = function (type, listener) {
		var once, self;
	
		callable(listener);
		self = this;
		on.call(this, type, once = function () {
			off.call(self, type, once);
			apply.call(listener, this, arguments);
		});
	
		once.__eeOnceListener__ = listener;
		return this;
	};
	
	off = function (type, listener) {
		var data, listeners, candidate, i;
	
		callable(listener);
	
		if (!hasOwnProperty.call(this, '__ee__')) return this;
		data = this.__ee__;
		if (!data[type]) return this;
		listeners = data[type];
	
		if (typeof listeners === 'object') {
			for (i = 0; (candidate = listeners[i]); ++i) {
				if ((candidate === listener) ||
						(candidate.__eeOnceListener__ === listener)) {
					if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
					else listeners.splice(i, 1);
				}
			}
		} else {
			if ((listeners === listener) ||
					(listeners.__eeOnceListener__ === listener)) {
				delete data[type];
			}
		}
	
		return this;
	};
	
	emit = function (type) {
		var i, l, listener, listeners, args;
	
		if (!hasOwnProperty.call(this, '__ee__')) return;
		listeners = this.__ee__[type];
		if (!listeners) return;
	
		if (typeof listeners === 'object') {
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) args[i - 1] = arguments[i];
	
			listeners = listeners.slice();
			for (i = 0; (listener = listeners[i]); ++i) {
				apply.call(listener, this, args);
			}
		} else {
			switch (arguments.length) {
			case 1:
				call.call(listeners, this);
				break;
			case 2:
				call.call(listeners, this, arguments[1]);
				break;
			case 3:
				call.call(listeners, this, arguments[1], arguments[2]);
				break;
			default:
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) {
					args[i - 1] = arguments[i];
				}
				apply.call(listeners, this, args);
			}
		}
	};
	
	methods = {
		on: on,
		once: once,
		off: off,
		emit: emit
	};
	
	descriptors = {
		on: d(on),
		once: d(once),
		off: d(off),
		emit: d(emit)
	};
	
	base = defineProperties({}, descriptors);
	
	module.exports = exports = function (o) {
		return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
	};
	exports.methods = methods;


/***/ },
/* 181 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"menu-item":"menu-item-3O-c8dTXIqSBJT7I3RwREt","open":"open-2HpBHV6ehBjbhE2FMIkokY","button-dropdown":"button-dropdown-3yU-UQavUy4xVgOu8kvtsZ","dismiss-modal":"dismiss-modal-Fq72gX8aFwS6K4QfWJi7K","errors":"errors-3vYYxFY7rgSVA-Hl57Jv8h","warnings":"warnings-R_UHjygOBcWZAeWYNnFdA","successes":"successes-1t_VzeGm-4aUpRkUf7qhj3","error":"error-18mZLW_SKivs7a1WO9qiw-","warning":"warning-23m6etBJlRBFd-HnO5Gx-v","success":"success-36ZWZXfqvvUR5bsPxD1jeg","growl_container":"growl_container-3mCAfymE10trOxhemBMZjh","growl":"growl-3LkOaAPOV-JVv0gPCNioaK","show":"show-18RYq_1qstc3to2E1Yjtl3","hide":"hide-3lra_BT1WWcfu5U8vcxslu","fadeInDown":"fadeInDown-pFHustFAbN43dhz8z0rW4","status_bar":"status_bar-1SUelCh5CsJETMDbEJzkiO","status_bar-status":"status_bar-status-1mSK-4r9NpBG8PEwYbksBe","tooltip":"tooltip-3CMGAcw41twmEgtJ5a099x","tooltip-bottom":"tooltip-bottom-1hm6yJRlZY5YbgMeD4XZeI","tooltip-left":"tooltip-left-2utogYskgdltlcOQ8uMKld","tooltip-right":"tooltip-right-1ap5s5XcORQdn3xgVecF4T","tooltip-red":"tooltip-red-1Ps3W5DF1aJjx48GJBqmOE","tooltip-orange":"tooltip-orange--EWnD1M6ylfE1rMrt41KO","tooltip-yellow":"tooltip-yellow-3a-6NwFU-FjZ-vKAcJR1bB","tooltip-green":"tooltip-green-3bv4Ka5zgz6pqfE97yF_1c","tooltip-blue":"tooltip-blue-3nVklUqSqfS1C5RYmrfEdv","tooltip-violet":"tooltip-violet-2BamgqtJaUma_y8nISwkUM","tooltip-primary":"tooltip-primary-1jn9-W7x3sqxLK9fHj8kHU","tooltip-secondary":"tooltip-secondary-236tWMfei-vgEnV-ZmU0Ps","alert":"alert-2w81z0oLPluLh36V63UvCz","closeButton":"closeButton-1HZ7VcqMiBZl5gJJK6g4x9"};

/***/ },
/* 182 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"menu-item":"menu-item-13Q7Y8UtGiz8-06DO7WVOe","open":"open-37j7cbJtWV93n5RBVq-tCH","button-dropdown":"button-dropdown-HZl49p-SqOEo5TdU0LlDd","dismiss-modal":"dismiss-modal-1QFSFLXhyGIFyqQlyi3QjY","errors":"errors-1XpkBeIlxozwgOfvGxIER8","warnings":"warnings-3knszsd5nXkAQsGsM2mvjc","successes":"successes-h-h0Y1mIFwEw5RpELP-rt","error":"error-19vo0y0-2OToZsmm97x9Gl","warning":"warning-1dnMHNKjcRPut_d1sfzsiz","success":"success-2EfNElz7k-u2v4MFo7q0gL","growl_container":"growl_container-1c6y_L_1zGQUy_7csVidRr","growl":"growl-2YTv7y71o1hCYOrmGLfva8","show":"show-3wKX98A7j6eD4l6Ye8WULN","hide":"hide-24a-m9nRYEst1dlZw68oUj","fadeInDown":"fadeInDown-2_FZFOEsSMpuQ7HqjO4dpu","status_bar":"status_bar-258nC_kzyUnYkeGChCt9aP","status_bar-status":"status_bar-status-AyqHlBrNuK4fPiw3H6is1","tooltip":"tooltip-1Ns3k43ndrgcWF03eGCIIf","tooltip-bottom":"tooltip-bottom-2lgDPY9EfUWOnhTPrx1MDN","tooltip-left":"tooltip-left-1f-2NKGU4C2Lfh1wtyZHTs","tooltip-right":"tooltip-right-YyzzZXim8p1uJhUxGeEOj","tooltip-red":"tooltip-red-__gDIwBSnrNu0hqqpbGkI","tooltip-orange":"tooltip-orange-kE8FkTDr5EBH3l5apZsAW","tooltip-yellow":"tooltip-yellow-3F3mU_6NXbIgYSeak073PL","tooltip-green":"tooltip-green-1C7UIAT5iZAWieKJR2wcDZ","tooltip-blue":"tooltip-blue-6YwT1c1L1rC-Dajo03YXk","tooltip-violet":"tooltip-violet-jfQvg_ZtgV373xYsJPHTr","tooltip-primary":"tooltip-primary-xntFPzdxyXEXpKj6_PyfN","tooltip-secondary":"tooltip-secondary-2EUPGgYTdr8xKl4jghdJqu","default":"default-11YURvskoNtSJdLloTR5eB","primary":"primary-_a8Du-alL6DCKk-pTBYIY","plain":"plain-VDgR4cK7QFOglJXECZGed"};

/***/ },
/* 183 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"menu-item":"menu-item-DqNAc9PkyXV_IgAAJqAZ5","open":"open-1XcltmVZAG7Mf8DjZFx3sG","button-dropdown":"button-dropdown-2--Rdwgu34UAg620QffpPd","dismiss-modal":"dismiss-modal-1JyQj0HeXfPbelfL6HVM3A","errors":"errors-2ZNk05CISYnRosd_ZoApIr","warnings":"warnings-3UEwR0MZHut1dp7hw1SCda","successes":"successes-2WhEexHAXDo9ZDjdcfQ008","error":"error-1c7vL7rKC-Uqh4q5ch24SQ","warning":"warning-3d-qOAp2_7mdbEDqPg_6N","success":"success-ndOX1ErwYISRYpfY7zP1r","growl_container":"growl_container-1sQLcMoK5SnfFtum3sOe4_","growl":"growl-3OtJ7NYEPQipBGxvvIE7z_","show":"show-1SZeXRX3_HKsPcYYgoSjzP","hide":"hide-PFGo3ItkBkalsM4EivMzA","fadeInDown":"fadeInDown-33IamQO0ISKd2RD_Low74E","status_bar":"status_bar-3YDKXCEMpKVJeewfmi6R5J","status_bar-status":"status_bar-status-5iNVHjtM5mUhi6GmslJuO","tooltip":"tooltip-13pMlgIfhhnCsQst1k4JRE","tooltip-bottom":"tooltip-bottom-Ypp1YhVZi-z384yBZUv2X","tooltip-left":"tooltip-left-2WMxWsKdiZQ3li1SDI_14h","tooltip-right":"tooltip-right-28SWHVOysFwkAf_1zaBqaR","tooltip-red":"tooltip-red-eFRA7O7tPoxhJbjRLwwzb","tooltip-orange":"tooltip-orange-1-RmQfzzuV0P1EL8Omg0en","tooltip-yellow":"tooltip-yellow-JFGJYMXCa5yB5zTwp5XIN","tooltip-green":"tooltip-green-3U_E4WzQ4TyUktmU0kCwAb","tooltip-blue":"tooltip-blue-UdCmbPMIR4PESLxHYLEpa","tooltip-violet":"tooltip-violet-3nX5Q3TVNiexxvny6-hHmn","tooltip-primary":"tooltip-primary-3asRlppAuwCdJqkD2K5hry","tooltip-secondary":"tooltip-secondary-19Swk_Q5ooJm0gg-mbpQGq","dialog":"dialog-3tjyS7QeDQLfX3mOGqFd7H","closeButton":"closeButton-J-xeYbXxXvVQIt8ZB6h6p","backdrop":"backdrop-3Bse76K2f8iiJOKVFfrXzq","shaker":"shaker-1gQy9Qp6ivXkxE45mhO1PT","shake":"shake-RgvufTFvEiH0baIpGX2ES"};

/***/ },
/* 184 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"addDecField":"addDecField-30Iu43vYHLuYwhfau3VuOG","button":"button-sdbRwDFM6eHdpPeCJyyE0"};

/***/ },
/* 185 */,
/* 186 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"menu-item":"menu-item-3Pi-XziLHaYzft6P3mvF5l","open":"open-7PQfH_ttizuWtfbz810ux","button-dropdown":"button-dropdown-3AfjF-GqW8hz279yU2JPM_","dismiss-modal":"dismiss-modal-2HPI8kwyVlOCtizKPC12FF","errors":"errors-1Fo88ZyAkmckS_y4xQ90hI","warnings":"warnings-Iwfmye13VyOAweLAfy5Kt","successes":"successes-3G5jc9WLaZGhRq6fQr77QT","error":"error-2L3p6ioxtp2DkT6EBFxz73","warning":"warning-2badHJlFbSviZJIlk_JN-1","success":"success-1IyPIsc_jQMQjXXLfDd--l","growl_container":"growl_container-ztNSgKbkI8VaiktIx29NJ","growl":"growl-m0fysUiwQmf0dhuRiQzxl","show":"show-jp0tC49oXSjUfFN8WmQ4i","hide":"hide-1lo87812LM_yJNlbyZ4ILS","fadeInDown":"fadeInDown-1h8CZ60VWfac_Larbx3GsD","status_bar":"status_bar-115p_78BcRxHBx86CMcmdE","status_bar-status":"status_bar-status-zOYCa1ySg-zTQhQkIVf33","tooltip":"tooltip-15FxzRnSUk8Fy7FBAJTKZ1","tooltip-bottom":"tooltip-bottom-k0qqYZq87VM9FjyDpyKOF","tooltip-left":"tooltip-left-3jtoCeVeya_GYravMlYsUl","tooltip-right":"tooltip-right-2-cIOOt4lreG6znN2OcZ-0","tooltip-red":"tooltip-red-LKizXKn4bfpmjp8nialgN","tooltip-orange":"tooltip-orange-RQH3AN2WoPqudUfmhr9F4","tooltip-yellow":"tooltip-yellow-eyHbMMGeqkgGNtdQFY8-K","tooltip-green":"tooltip-green-2h69v4Thc82SfJhfsubEbA","tooltip-blue":"tooltip-blue-hNi31jZLARqy0VEZS9k3M","tooltip-violet":"tooltip-violet-2w0yidCYEsfsOwpRVhc3Kn","tooltip-primary":"tooltip-primary-XIP_BzjwRoiBX1p86-Hj0","tooltip-secondary":"tooltip-secondary-2idLgHZGGX502xeTZBHc7s","fluid":"fluid-VZ7o9pPa6qkvYmJy4TTbm","fluidFixed":"fluidFixed-2AukGEB_pRmti-aBYurmkG","row":"row-1pefQb51Ua-26IysbzERHT","column1":"column1-1DTrg9z4FS_jFLkGuic_tv","column2":"column2-3iFkpEi1x3v-Rdh2xdJem6","column3":"column3-2vm2xMZJIoNkqSFeE_xGi7","column4":"column4-1P9SEq8ZLNnv5-X9Rd5pBe","column5":"column5-2-ZIpLDvjm0U9diKJe5EN","column6":"column6-3bQLSByDovrhzj4NAgNFPZ","column7":"column7-1QsOXUl16K3PmRNF25Ypv_","column8":"column8-4BzIFSLxyRszasSqXczFg","column9":"column9-1DRjR63tZYexQ29zXeZ0Oc","column10":"column10-F040SUobymOJ5IsuEq7Mh","column11":"column11-2e9jr3IOXA3GlnZ7GenTBS","column12":"column12-3QHdB1En2X-apq8ZLeS2xD","left1":"left1-2GmALSK83sgN0j3d9UjFsX","left2":"left2-1DOv8-YaPT3atrmeoaBH1P","left3":"left3-1JgassuiXqx7nZin4Jf7UX","left4":"left4-2ZCsAy0e1FcruX2Gfxw93Q","left5":"left5-3s09Ywux6HPhPrlhHSFaHS","left6":"left6-3KZjEtGBWYxROomkWEQFGN","left7":"left7-2sBey6bACciJ_KvqVkDe0n","left8":"left8-Af5L-RtFwMWGKPJ_qCuig","left9":"left9-3wV2el89gOx_Av0e--Kqu9","left10":"left10-3ueBBY8IoMFbUD3uUu-yn2","left11":"left11-F2BY5-YHUqVVdwz2J7wn0","right1":"right1-2QsSIk2A6bbtGtA5xqGW_r","right2":"right2-2kvK-vTIqOPtYHVLYmMQcK","right3":"right3-3B9fMzFqAHgZRJ_nZ_J93e","right4":"right4-rY6l-p_CdOFV9C5CUzP49","right5":"right5-3Ss11RcErguYG3tsg-ftoE","right6":"right6-15KpxloijvqACKB2ivQAXR","right7":"right7-26UhH0jyJ_XSdPrBX-c86z","right8":"right8-2DzD5sHcCzOD1oGvGzWvqG","right9":"right9-s1EilHihz_fDfoUKjzAWi","right10":"right10-2zAVSOYq90NX_OA2ICDm3y","right11":"right11-1ul7i6ppYHTuMJyFx7yA3_"};

/***/ },
/* 187 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"menu-item":"menu-item-1B41YInmX6Shzh44VMU5kd","open":"open-O-XK3h7d3P9MmC8dSuN9t","button-dropdown":"button-dropdown-23W1nZSRmAbWqF-jtcysPP","dismiss-modal":"dismiss-modal-6CrCHeWT4406amAprZxq7","errors":"errors-2IpXg_lBJ3xMrozpIWi5Dt","warnings":"warnings-3Dm8JKCdVu_Sfxvf3y5PS0","successes":"successes-1z3MSlI42oqXD3L4L0Vf1a","error":"error-3xChCo34bNXkIwkz1Ho9Ce","warning":"warning-25LTzDIwNfZSms4tavBSy5","success":"success-F53-VKI6IonsNoYN1kg3a","growl_container":"growl_container-qprsyAUwhmn-MaHJDR9H","growl":"growl-2WDd1tlEmD1vbl_IYTcYDx","show":"show-1_PnVKJvoONX44qN4yhOUp","hide":"hide-1UGl3_iQ3Qr1pruiW9xP3e","fadeInDown":"fadeInDown-2NBXtkWlG0eHEWKJK0xAht","status_bar":"status_bar-wPxKc2IJgEa0dN3qGN51e","status_bar-status":"status_bar-status-3qcvtbXeUVK-6_4rU2Ewvo","tooltip":"tooltip-1jXt6hfU5XhCrggIB2949I","tooltip-bottom":"tooltip-bottom-7OB6Gj16U74RB6d7bqa8p","tooltip-left":"tooltip-left-2tHGXEWTr2_cWkXxnHNaLc","tooltip-right":"tooltip-right-2idGVKlMbg6SByLyy3zJdM","tooltip-red":"tooltip-red-32cz1fjv9Mt01mr82yqZRL","tooltip-orange":"tooltip-orange-2p92sEk8VUjS_tmK0q29YI","tooltip-yellow":"tooltip-yellow-jPGhUgQn8xVCgSHS2KWEk","tooltip-green":"tooltip-green-3gEcyyDzU-j5AuXw8ENxd3","tooltip-blue":"tooltip-blue-16aJD10M_gTZI1V51SIlIh","tooltip-violet":"tooltip-violet-spWwrSrHJ74Mgqf0vNXre","tooltip-primary":"tooltip-primary-1oJ3___aK2Jf7W6LgVAC5r","tooltip-secondary":"tooltip-secondary-f1z-TefrzCiyofazhsleq","navbar":"navbar-1x32-S2Jdwh7nGllunvYps","navbar-title":"navbar-title-1HDpoFp1_jn8gO4eH5qq3M","active":"active-3fczsTOMeCbVjAFhVY_ElN"};

/***/ },
/* 188 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"menu-item":"menu-item-1bRoDYkjyT3AZn-Pc6CZPU","open":"open-K7D08RFWNRx8MH2EdxQTP","button-dropdown":"button-dropdown-1DE_7oaAURgndujT6El27p","dismiss-modal":"dismiss-modal-3tqbSVkAIySaOxSNabQUiY","errors":"errors-l5dueXJnQcVzOsedTvfD4","warnings":"warnings-3mLj3Lz__R5WEUs_b5N_KQ","successes":"successes-CFbdbW40ex2HoNVl75Mxn","error":"error-1sVNly1p-WRPj3jyU27_F5","warning":"warning-1t90A1qd8hS8BUjRvoBXZE","success":"success-_stPtrQ3UnHfEeR3VXHMo","growl_container":"growl_container-exoBREDR-dKWb6TPzWO2W","growl":"growl-26IirubhblrOLKtgkqsrLo","show":"show-1_FbouJuzXT6HYPNV6x-5Q","hide":"hide-3Bp_sbZ6I55_2nQqYzOfIi","fadeInDown":"fadeInDown-3Q91ptjgqwUehHMZj6mcgB","status_bar":"status_bar-tgxdU3DCNZXAr8kBJFlfc","status_bar-status":"status_bar-status-1dxT9rLOecTOo_TfB0nadZ","tooltip":"tooltip-1YFhobStFizc8QZsozUsB0","tooltip-bottom":"tooltip-bottom-1vTiCsk1R5S0RHXi4FEtSC","tooltip-left":"tooltip-left-1-X2ddQI1_Z_ssgXNTE0zR","tooltip-right":"tooltip-right-3ea_s1oF1I7DCUOAK4_RPb","tooltip-red":"tooltip-red-3SQSKkUOi56OYihtQvcNc9","tooltip-orange":"tooltip-orange-XeVqLi_nMluG4smfMi9n","tooltip-yellow":"tooltip-yellow-1KZP0rfQroy3DkMwNk8ozc","tooltip-green":"tooltip-green-1_EPH0dftBW-NK_4k5-GC","tooltip-blue":"tooltip-blue-LsSW4i5f8CmTSp0ZRyW9D","tooltip-violet":"tooltip-violet-3UyjlwIoQwGiRYPrCCWP3N","tooltip-primary":"tooltip-primary-3EO_ohgkzuEE3sdcOIqtXA","tooltip-secondary":"tooltip-secondary-1YEL818F8rDKm4n7N7_W0O","layout":"layout-23dCOFki3RiQbLBVAHFbpk"};

/***/ },
/* 189 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	var loopAsync = exports.loopAsync = function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	  var isSync = false,
	      hasNext = false,
	      doneArgs = void 0;
	
	  var done = function done() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    isDone = true;
	
	    if (isSync) {
	      // Iterate instead of recursing if possible.
	      doneArgs = args;
	      return;
	    }
	
	    callback.apply(undefined, args);
	  };
	
	  var next = function next() {
	    if (isDone) return;
	
	    hasNext = true;
	
	    if (isSync) return; // Iterate instead of recursing if possible.
	
	    isSync = true;
	
	    while (!isDone && currentTurn < turns && hasNext) {
	      hasNext = false;
	      work(currentTurn++, next, done);
	    }
	
	    isSync = false;
	
	    if (isDone) {
	      // This means the loop finished synchronously.
	      callback.apply(undefined, doneArgs);
	      return;
	    }
	
	    if (currentTurn >= turns && hasNext) {
	      isDone = true;
	      callback();
	    }
	  };
	
	  next();
	};

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.readState = exports.saveState = undefined;
	
	var _warning = __webpack_require__(23);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var QuotaExceededErrors = {
	  QuotaExceededError: true,
	  QUOTA_EXCEEDED_ERR: true
	};
	
	var SecurityErrors = {
	  SecurityError: true
	};
	
	var KeyPrefix = '@@History/';
	
	var createKey = function createKey(key) {
	  return KeyPrefix + key;
	};
	
	var saveState = exports.saveState = function saveState(key, state) {
	  if (!window.sessionStorage) {
	    // Session storage is not available or hidden.
	    // sessionStorage is undefined in Internet Explorer when served via file protocol.
	    (undefined) !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available') : void 0;
	
	    return;
	  }
	
	  try {
	    if (state == null) {
	      window.sessionStorage.removeItem(createKey(key));
	    } else {
	      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	    }
	  } catch (error) {
	    if (SecurityErrors[error.name]) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      (undefined) !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available due to security settings') : void 0;
	
	      return;
	    }
	
	    if (QuotaExceededErrors[error.name] && window.sessionStorage.length === 0) {
	      // Safari "private mode" throws QuotaExceededError.
	      (undefined) !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : void 0;
	
	      return;
	    }
	
	    throw error;
	  }
	};
	
	var readState = exports.readState = function readState(key) {
	  var json = void 0;
	  try {
	    json = window.sessionStorage.getItem(createKey(key));
	  } catch (error) {
	    if (SecurityErrors[error.name]) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      (undefined) !== 'production' ? (0, _warning2.default)(false, '[history] Unable to read state; sessionStorage is not available due to security settings') : void 0;
	
	      return undefined;
	    }
	  }
	
	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }
	
	  return undefined;
	};

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.replaceLocation = exports.pushLocation = exports.getCurrentLocation = exports.go = exports.getUserConfirmation = undefined;
	
	var _BrowserProtocol = __webpack_require__(61);
	
	Object.defineProperty(exports, 'getUserConfirmation', {
	  enumerable: true,
	  get: function get() {
	    return _BrowserProtocol.getUserConfirmation;
	  }
	});
	Object.defineProperty(exports, 'go', {
	  enumerable: true,
	  get: function get() {
	    return _BrowserProtocol.go;
	  }
	});
	
	var _LocationUtils = __webpack_require__(32);
	
	var _PathUtils = __webpack_require__(21);
	
	var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation() {
	  return (0, _LocationUtils.createLocation)(window.location);
	};
	
	var pushLocation = exports.pushLocation = function pushLocation(location) {
	  window.location.href = (0, _PathUtils.createPath)(location);
	  return false; // Don't update location
	};
	
	var replaceLocation = exports.replaceLocation = function replaceLocation(location) {
	  window.location.replace((0, _PathUtils.createPath)(location));
	  return false; // Don't update location
	};

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _invariant = __webpack_require__(64);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _ExecutionEnvironment = __webpack_require__(63);
	
	var _BrowserProtocol = __webpack_require__(61);
	
	var BrowserProtocol = _interopRequireWildcard(_BrowserProtocol);
	
	var _RefreshProtocol = __webpack_require__(191);
	
	var RefreshProtocol = _interopRequireWildcard(_RefreshProtocol);
	
	var _DOMUtils = __webpack_require__(62);
	
	var _createHistory = __webpack_require__(193);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Creates and returns a history object that uses HTML5's history API
	 * (pushState, replaceState, and the popstate event) to manage history.
	 * This is the recommended method of managing history in browsers because
	 * it provides the cleanest URLs.
	 *
	 * Note: In browsers that do not support the HTML5 history API full
	 * page reloads will be used to preserve clean URLs. You can force this
	 * behavior using { forceRefresh: true } in options.
	 */
	var createBrowserHistory = function createBrowserHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  !_ExecutionEnvironment.canUseDOM ? (undefined) !== 'production' ? (0, _invariant2.default)(false, 'Browser history needs a DOM') : (0, _invariant2.default)(false) : void 0;
	
	  var useRefresh = options.forceRefresh || !(0, _DOMUtils.supportsHistory)();
	  var Protocol = useRefresh ? RefreshProtocol : BrowserProtocol;
	
	  var getUserConfirmation = Protocol.getUserConfirmation;
	  var getCurrentLocation = Protocol.getCurrentLocation;
	  var pushLocation = Protocol.pushLocation;
	  var replaceLocation = Protocol.replaceLocation;
	  var go = Protocol.go;
	
	
	  var history = (0, _createHistory2.default)(_extends({
	    getUserConfirmation: getUserConfirmation }, options, {
	    getCurrentLocation: getCurrentLocation,
	    pushLocation: pushLocation,
	    replaceLocation: replaceLocation,
	    go: go
	  }));
	
	  var listenerCount = 0,
	      stopListener = void 0;
	
	  var startListener = function startListener(listener, before) {
	    if (++listenerCount === 1) stopListener = BrowserProtocol.startListener(history.transitionTo);
	
	    var unlisten = before ? history.listenBefore(listener) : history.listen(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopListener();
	    };
	  };
	
	  var listenBefore = function listenBefore(listener) {
	    return startListener(listener, true);
	  };
	
	  var listen = function listen(listener) {
	    return startListener(listener, false);
	  };
	
	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen
	  });
	};
	
	exports.default = createBrowserHistory;


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _AsyncUtils = __webpack_require__(189);
	
	var _PathUtils = __webpack_require__(21);
	
	var _runTransitionHook = __webpack_require__(194);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _Actions = __webpack_require__(60);
	
	var _LocationUtils = __webpack_require__(32);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createHistory = function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var getUserConfirmation = options.getUserConfirmation;
	  var pushLocation = options.pushLocation;
	  var replaceLocation = options.replaceLocation;
	  var go = options.go;
	  var keyLength = options.keyLength;
	
	
	  var currentLocation = void 0;
	  var pendingLocation = void 0;
	  var beforeListeners = [];
	  var listeners = [];
	  var allKeys = [];
	
	  var getCurrentIndex = function getCurrentIndex() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) return allKeys.indexOf(pendingLocation.key);
	
	    if (currentLocation) return allKeys.indexOf(currentLocation.key);
	
	    return -1;
	  };
	
	  var updateLocation = function updateLocation(nextLocation) {
	    var currentIndex = getCurrentIndex();
	
	    currentLocation = nextLocation;
	
	    if (currentLocation.action === _Actions.PUSH) {
	      allKeys = [].concat(allKeys.slice(0, currentIndex + 1), [currentLocation.key]);
	    } else if (currentLocation.action === _Actions.REPLACE) {
	      allKeys[currentIndex] = currentLocation.key;
	    }
	
	    listeners.forEach(function (listener) {
	      return listener(currentLocation);
	    });
	  };
	
	  var listenBefore = function listenBefore(listener) {
	    beforeListeners.push(listener);
	
	    return function () {
	      return beforeListeners = beforeListeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  };
	
	  var listen = function listen(listener) {
	    listeners.push(listener);
	
	    return function () {
	      return listeners = listeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  };
	
	  var confirmTransitionTo = function confirmTransitionTo(location, callback) {
	    (0, _AsyncUtils.loopAsync)(beforeListeners.length, function (index, next, done) {
	      (0, _runTransitionHook2.default)(beforeListeners[index], location, function (result) {
	        return result != null ? done(result) : next();
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          return callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  };
	
	  var transitionTo = function transitionTo(nextLocation) {
	    if (currentLocation && (0, _LocationUtils.locationsAreEqual)(currentLocation, nextLocation) || pendingLocation && (0, _LocationUtils.locationsAreEqual)(pendingLocation, nextLocation)) return; // Nothing to do
	
	    pendingLocation = nextLocation;
	
	    confirmTransitionTo(nextLocation, function (ok) {
	      if (pendingLocation !== nextLocation) return; // Transition was interrupted during confirmation
	
	      pendingLocation = null;
	
	      if (ok) {
	        // Treat PUSH to same path like REPLACE to be consistent with browsers
	        if (nextLocation.action === _Actions.PUSH) {
	          var prevPath = (0, _PathUtils.createPath)(currentLocation);
	          var nextPath = (0, _PathUtils.createPath)(nextLocation);
	
	          if (nextPath === prevPath && (0, _LocationUtils.statesAreEqual)(currentLocation.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;
	        }
	
	        if (nextLocation.action === _Actions.POP) {
	          updateLocation(nextLocation);
	        } else if (nextLocation.action === _Actions.PUSH) {
	          if (pushLocation(nextLocation) !== false) updateLocation(nextLocation);
	        } else if (nextLocation.action === _Actions.REPLACE) {
	          if (replaceLocation(nextLocation) !== false) updateLocation(nextLocation);
	        }
	      } else if (currentLocation && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(currentLocation.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);
	
	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL
	      }
	    });
	  };
	
	  var push = function push(input) {
	    return transitionTo(createLocation(input, _Actions.PUSH));
	  };
	
	  var replace = function replace(input) {
	    return transitionTo(createLocation(input, _Actions.REPLACE));
	  };
	
	  var goBack = function goBack() {
	    return go(-1);
	  };
	
	  var goForward = function goForward() {
	    return go(1);
	  };
	
	  var createKey = function createKey() {
	    return Math.random().toString(36).substr(2, keyLength || 6);
	  };
	
	  var createHref = function createHref(location) {
	    return (0, _PathUtils.createPath)(location);
	  };
	
	  var createLocation = function createLocation(location, action) {
	    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];
	    return (0, _LocationUtils.createLocation)(location, action, key);
	  };
	
	  return {
	    getCurrentLocation: getCurrentLocation,
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: _PathUtils.createPath,
	    createHref: createHref,
	    createLocation: createLocation
	  };
	};
	
	exports.default = createHistory;

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _warning = __webpack_require__(23);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var runTransitionHook = function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);
	
	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	    (undefined) !== 'production' ? (0, _warning2.default)(result === undefined, 'You should not "return" in a transition hook with a callback argument; ' + 'call the callback instead') : void 0;
	  }
	};
	
	exports.default = runTransitionHook;

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var isArguments = __webpack_require__(68),
	    isArray = __webpack_require__(69);
	
	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;
	
	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}
	
	/**
	 * The base implementation of `_.flatten` with added support for restricting
	 * flattening and specifying the start index.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, isDeep, isStrict, result) {
	  result || (result = []);
	
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    var value = array[index];
	    if (isObjectLike(value) && isArrayLike(value) &&
	        (isStrict || isArray(value) || isArguments(value))) {
	      if (isDeep) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, isDeep, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = baseFlatten;


/***/ },
/* 196 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();
	
	/**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;
	
	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	module.exports = baseFor;


/***/ },
/* 197 */
/***/ function(module, exports) {

	/**
	 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * The base implementation of `_.indexOf` without support for binary searches.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return indexOfNaN(array, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;
	
	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	/**
	 * Gets the index at which the first occurrence of `NaN` is found in `array`.
	 * If `fromRight` is provided elements of `array` are iterated from right to left.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	 */
	function indexOfNaN(array, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 0 : -1);
	
	  while ((fromRight ? index-- : ++index < length)) {
	    var other = array[index];
	    if (other !== other) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = baseIndexOf;


/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseIndexOf = __webpack_require__(197),
	    cacheIndexOf = __webpack_require__(200),
	    createCache = __webpack_require__(201);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * The base implementation of `_.uniq` without support for callback shorthands
	 * and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The function invoked per iteration.
	 * @returns {Array} Returns the new duplicate-value-free array.
	 */
	function baseUniq(array, iteratee) {
	  var index = -1,
	      indexOf = baseIndexOf,
	      length = array.length,
	      isCommon = true,
	      isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
	      seen = isLarge ? createCache() : null,
	      result = [];
	
	  if (seen) {
	    indexOf = cacheIndexOf;
	    isCommon = false;
	  } else {
	    isLarge = false;
	    seen = iteratee ? [] : result;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value, index, array) : value;
	
	    if (isCommon && value === value) {
	      var seenIndex = seen.length;
	      while (seenIndex--) {
	        if (seen[seenIndex] === computed) {
	          continue outer;
	        }
	      }
	      if (iteratee) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	    else if (indexOf(seen, computed, 0) < 0) {
	      if (iteratee || isLarge) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}
	
	module.exports = baseUniq;


/***/ },
/* 199 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}
	
	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = bindCallback;


/***/ },
/* 200 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/**
	 * Checks if `value` is in `cache` mimicking the return signature of
	 * `_.indexOf` by returning `0` if the value is found, else `-1`.
	 *
	 * @private
	 * @param {Object} cache The cache to search.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `0` if `value` is found, else `-1`.
	 */
	function cacheIndexOf(cache, value) {
	  var data = cache.data,
	      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];
	
	  return result ? 0 : -1;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = cacheIndexOf;


/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var getNative = __webpack_require__(65);
	
	/** Native method references. */
	var Set = getNative(global, 'Set');
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCreate = getNative(Object, 'create');
	
	/**
	 *
	 * Creates a cache object to store unique values.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var length = values ? values.length : 0;
	
	  this.data = { 'hash': nativeCreate(null), 'set': new Set };
	  while (length--) {
	    this.push(values[length]);
	  }
	}
	
	/**
	 * Adds `value` to the cache.
	 *
	 * @private
	 * @name push
	 * @memberOf SetCache
	 * @param {*} value The value to cache.
	 */
	function cachePush(value) {
	  var data = this.data;
	  if (typeof value == 'string' || isObject(value)) {
	    data.set.add(value);
	  } else {
	    data.hash[value] = true;
	  }
	}
	
	/**
	 * Creates a `Set` cache object to optimize linear searches of large arrays.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
	 */
	function createCache(values) {
	  return (nativeCreate && Set) ? new SetCache(values) : null;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	// Add functions to the `Set` cache.
	SetCache.prototype.push = cachePush;
	
	module.exports = createCache;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var root = __webpack_require__(33);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used to match latin-1 supplementary letters (excluding mathematical operators). */
	var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;
	
	/** Used to compose unicode character classes. */
	var rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0';
	
	/** Used to compose unicode capture groups. */
	var rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']';
	
	/**
	 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
	 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
	 */
	var reComboMark = RegExp(rsCombo, 'g');
	
	/** Used to map latin-1 supplementary letters to basic latin letters. */
	var deburredLetters = {
	  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	  '\xc7': 'C',  '\xe7': 'c',
	  '\xd0': 'D',  '\xf0': 'd',
	  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	  '\xcC': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	  '\xeC': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
	  '\xd1': 'N',  '\xf1': 'n',
	  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
	  '\xc6': 'Ae', '\xe6': 'ae',
	  '\xde': 'Th', '\xfe': 'th',
	  '\xdf': 'ss'
	};
	
	/**
	 * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
	 *
	 * @private
	 * @param {string} letter The matched letter to deburr.
	 * @returns {string} Returns the deburred letter.
	 */
	function deburrLetter(letter) {
	  return deburredLetters[letter];
	}
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = Symbol ? symbolProto.toString : undefined;
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return Symbol ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	/**
	 * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	 * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to deburr.
	 * @returns {string} Returns the deburred string.
	 * @example
	 *
	 * _.deburr('déjà vu');
	 * // => 'deja vu'
	 */
	function deburr(string) {
	  string = toString(string);
	  return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
	}
	
	module.exports = deburr;


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var deburr = __webpack_require__(202),
	    words = __webpack_require__(207);
	
	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array.length;
	
	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}
	
	/**
	 * Creates a function like `_.camelCase`.
	 *
	 * @private
	 * @param {Function} callback The function to combine each word.
	 * @returns {Function} Returns the new compounder function.
	 */
	function createCompounder(callback) {
	  return function(string) {
	    return arrayReduce(words(deburr(string)), callback, '');
	  };
	}
	
	/**
	 * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the kebab cased string.
	 * @example
	 *
	 * _.kebabCase('Foo Bar');
	 * // => 'foo-bar'
	 *
	 * _.kebabCase('fooBar');
	 * // => 'foo-bar'
	 *
	 * _.kebabCase('__foo_bar__');
	 * // => 'foo-bar'
	 */
	var kebabCase = createCompounder(function(result, word, index) {
	  return result + (index ? '-' : '') + word.toLowerCase();
	});
	
	module.exports = kebabCase;


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var getNative = __webpack_require__(65),
	    isArguments = __webpack_require__(68),
	    isArray = __webpack_require__(69);
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;
	
	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));
	
	  var index = -1,
	      result = [];
	
	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;
	
	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;
	
	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keys;


/***/ },
/* 205 */
/***/ function(module, exports) {

	/**
	 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);
	
	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}
	
	module.exports = restParam;


/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseFlatten = __webpack_require__(195),
	    baseUniq = __webpack_require__(198),
	    restParam = __webpack_require__(205);
	
	/**
	 * Creates an array of unique values, in order, of the provided arrays using
	 * `SameValueZero` for equality comparisons.
	 *
	 * **Note:** [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
	 * comparisons are like strict equality comparisons, e.g. `===`, except that
	 * `NaN` matches `NaN`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @returns {Array} Returns the new array of combined values.
	 * @example
	 *
	 * _.union([1, 2], [4, 2], [2, 1]);
	 * // => [1, 2, 4]
	 */
	var union = restParam(function(arrays) {
	  return baseUniq(baseFlatten(arrays, false, true));
	});
	
	module.exports = union;


/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var root = __webpack_require__(33);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0',
	    rsDingbatRange = '\\u2700-\\u27bf',
	    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
	    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
	    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
	    rsQuoteRange = '\\u2018\\u2019\\u201c\\u201d',
	    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
	    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
	    rsVarRange = '\\ufe0e\\ufe0f',
	    rsBreakRange = rsMathOpRange + rsNonCharRange + rsQuoteRange + rsSpaceRange;
	
	/** Used to compose unicode capture groups. */
	var rsBreak = '[' + rsBreakRange + ']',
	    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
	    rsDigits = '\\d+',
	    rsDingbat = '[' + rsDingbatRange + ']',
	    rsLower = '[' + rsLowerRange + ']',
	    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsUpper = '[' + rsUpperRange + ']',
	    rsZWJ = '\\u200d';
	
	/** Used to compose unicode regexes. */
	var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
	    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
	    reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;
	
	/** Used to match non-compound words composed of alphanumeric characters. */
	var reBasicWord = /[a-zA-Z0-9]+/g;
	
	/** Used to match complex or compound words. */
	var reComplexWord = RegExp([
	  rsUpper + '?' + rsLower + '+(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
	  rsUpperMisc + '+(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
	  rsUpper + '?' + rsLowerMisc + '+',
	  rsUpper + '+',
	  rsDigits,
	  rsEmoji
	].join('|'), 'g');
	
	/** Used to detect strings that need a more robust regexp to match words. */
	var reHasComplexWord = /[a-z][A-Z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = Symbol ? symbolProto.toString : undefined;
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return Symbol ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	/**
	 * Splits `string` into an array of its words.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to inspect.
	 * @param {RegExp|string} [pattern] The pattern to match words.
	 * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	 * @returns {Array} Returns the words of `string`.
	 * @example
	 *
	 * _.words('fred, barney, & pebbles');
	 * // => ['fred', 'barney', 'pebbles']
	 *
	 * _.words('fred, barney, & pebbles', /[^, ]+/g);
	 * // => ['fred', 'barney', '&', 'pebbles']
	 */
	function words(string, pattern, guard) {
	  string = toString(string);
	  pattern = guard ? undefined : pattern;
	
	  if (pattern === undefined) {
	    pattern = reHasComplexWord.test(string) ? reComplexWord : reBasicWord;
	  }
	  return string.match(pattern) || [];
	}
	
	module.exports = words;


/***/ },
/* 208 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function () {
	            throw new Error('setTimeout is not defined');
	        }
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function () {
	            throw new Error('clearTimeout is not defined');
	        }
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = classNameFromVNode;
	
	var _selectorParser2 = __webpack_require__(70);
	
	var _selectorParser3 = _interopRequireDefault(_selectorParser2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function classNameFromVNode(vNode) {
	  var _selectorParser = (0, _selectorParser3.default)(vNode.sel);
	
	  var cn = _selectorParser.className;
	
	
	  if (!vNode.data) {
	    return cn;
	  }
	
	  var _vNode$data = vNode.data;
	  var dataClass = _vNode$data.class;
	  var props = _vNode$data.props;
	
	
	  if (dataClass) {
	    var c = Object.keys(vNode.data.class).filter(function (cl) {
	      return vNode.data.class[cl];
	    });
	    cn += ' ' + c.join(' ');
	  }
	
	  if (props && props.className) {
	    cn += ' ' + props.className;
	  }
	
	  return cn.trim();
	}

/***/ },
/* 210 */
/***/ function(module, exports) {

	
	// All SVG children elements, not in this list, should self-close
	
	module.exports = {
	  // http://www.w3.org/TR/SVG/intro.html#TermContainerElement
	  'a': true,
	  'defs': true,
	  'glyph': true,
	  'g': true,
	  'marker': true,
	  'mask': true,
	  'missing-glyph': true,
	  'pattern': true,
	  'svg': true,
	  'switch': true,
	  'symbol': true,
	
	  // http://www.w3.org/TR/SVG/intro.html#TermDescriptiveElement
	  'desc': true,
	  'metadata': true,
	  'title': true
	};

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	
	var init = __webpack_require__(212);
	
	module.exports = init([__webpack_require__(213), __webpack_require__(214)]);

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	
	var parseSelector = __webpack_require__(71);
	var VOID_ELEMENTS = __webpack_require__(215);
	var CONTAINER_ELEMENTS = __webpack_require__(210);
	
	module.exports = function init(modules) {
	  function parse(data) {
	    return modules.reduce(function (arr, fn) {
	      arr.push(fn(data));
	      return arr;
	    }, []).filter(function (result) {
	      return result !== '';
	    });
	  }
	
	  return function renderToString(vnode) {
	    if (!vnode.sel && vnode.text) {
	      return vnode.text;
	    }
	
	    vnode.data = vnode.data || {};
	
	    // Support thunks
	    if (typeof vnode.sel === 'string' && vnode.sel.slice(0, 5) === 'thunk') {
	      vnode = vnode.data.fn.apply(null, vnode.data.args);
	    }
	
	    var tagName = parseSelector(vnode.sel).tagName;
	    var attributes = parse(vnode);
	    var svg = vnode.data.ns === 'http://www.w3.org/2000/svg';
	    var tag = [];
	
	    // Open tag
	    tag.push('<' + tagName);
	    if (attributes.length) {
	      tag.push(' ' + attributes.join(' '));
	    }
	    if (svg && CONTAINER_ELEMENTS[tagName] !== true) {
	      tag.push(' /');
	    }
	    tag.push('>');
	
	    // Close tag, if needed
	    if (VOID_ELEMENTS[tagName] !== true && !svg || svg && CONTAINER_ELEMENTS[tagName] === true) {
	      if (vnode.data.props && vnode.data.props.innerHTML) {
	        tag.push(vnode.data.props.innerHTML);
	      } else if (vnode.text) {
	        tag.push(vnode.text);
	      } else if (vnode.children) {
	        vnode.children.forEach(function (child) {
	          tag.push(renderToString(child));
	        });
	      }
	      tag.push('</' + tagName + '>');
	    }
	
	    return tag.join('');
	  };
	};

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	
	var forOwn = __webpack_require__(67);
	var escape = __webpack_require__(66);
	var union = __webpack_require__(206);
	
	var parseSelector = __webpack_require__(71);
	
	// data.attrs, data.props, data.class
	
	module.exports = function attributes(vnode) {
	  var selector = parseSelector(vnode.sel);
	  var parsedClasses = selector.className.split(' ');
	
	  var attributes = [];
	  var classes = [];
	  var values = {};
	
	  if (selector.id) {
	    values.id = selector.id;
	  }
	
	  setAttributes(vnode.data.props, values);
	  setAttributes(vnode.data.attrs, values); // `attrs` override `props`, not sure if this is good so
	
	  if (vnode.data.class) {
	    // Omit `className` attribute if `class` is set on vnode
	    values.class = undefined;
	  }
	  forOwn(vnode.data.class, function (value, key) {
	    if (value === true) {
	      classes.push(key);
	    }
	  });
	  classes = union(classes, values.class, parsedClasses).filter(function (x) {
	    return x !== '';
	  });
	
	  if (classes.length) {
	    values.class = classes.join(' ');
	  }
	
	  forOwn(values, function (value, key) {
	    attributes.push(value === true ? key : key + '="' + escape(value) + '"');
	  });
	
	  return attributes.length ? attributes.join(' ') : '';
	};
	
	function setAttributes(values, target) {
	  forOwn(values, function (value, key) {
	    if (key === 'htmlFor') {
	      target['for'] = value;
	      return;
	    }
	    if (key === 'className') {
	      target['class'] = value.split(' ');
	      return;
	    }
	    if (key === 'innerHTML') {
	      return;
	    }
	    target[key] = value;
	  });
	}

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var forOwn = __webpack_require__(67);
	var escape = __webpack_require__(66);
	var kebabCase = __webpack_require__(203);
	
	// data.style
	
	module.exports = function style(vnode) {
	  var styles = [];
	  var style = vnode.data.style || {};
	
	  // merge in `delayed` properties
	  if (style.delayed) {
	    _extends(style, style.delayed);
	  }
	
	  forOwn(style, function (value, key) {
	    // omit hook objects
	    if (typeof value === 'string') {
	      styles.push(kebabCase(key) + ': ' + escape(value));
	    }
	  });
	
	  return styles.length ? 'style="' + styles.join('; ') + '"' : '';
	};

/***/ },
/* 215 */
/***/ function(module, exports) {

	
	// http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
	
	module.exports = {
	  area: true,
	  base: true,
	  br: true,
	  col: true,
	  embed: true,
	  hr: true,
	  img: true,
	  input: true,
	  keygen: true,
	  link: true,
	  meta: true,
	  param: true,
	  source: true,
	  track: true,
	  wbr: true
	};

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	var VNode = __webpack_require__(35);
	var is = __webpack_require__(22);
	
	function addNS(data, children) {
	  data.ns = 'http://www.w3.org/2000/svg';
	  if (children !== undefined) {
	    for (var i = 0; i < children.length; ++i) {
	      addNS(children[i].data, children[i].children);
	    }
	  }
	}
	
	module.exports = function h(sel, b, c) {
	  var data = {}, children, text, i;
	  if (c !== undefined) {
	    data = b;
	    if (is.array(c)) { children = c; }
	    else if (is.primitive(c)) { text = c; }
	  } else if (b !== undefined) {
	    if (is.array(b)) { children = b; }
	    else if (is.primitive(b)) { text = b; }
	    else { data = b; }
	  }
	  if (is.array(children)) {
	    for (i = 0; i < children.length; ++i) {
	      if (is.primitive(children[i])) children[i] = VNode(undefined, undefined, undefined, children[i]);
	    }
	  }
	  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
	    addNS(data, children);
	  }
	  return VNode(sel, data, children, text, undefined);
	};


/***/ },
/* 217 */
/***/ function(module, exports) {

	function createElement(tagName){
	  return document.createElement(tagName);
	}
	
	function createElementNS(namespaceURI, qualifiedName){
	  return document.createElementNS(namespaceURI, qualifiedName);
	}
	
	function createTextNode(text){
	  return document.createTextNode(text);
	}
	
	
	function insertBefore(parentNode, newNode, referenceNode){
	  parentNode.insertBefore(newNode, referenceNode);
	}
	
	
	function removeChild(node, child){
	  node.removeChild(child);
	}
	
	function appendChild(node, child){
	  node.appendChild(child);
	}
	
	function parentNode(node){
	  return node.parentElement;
	}
	
	function nextSibling(node){
	  return node.nextSibling;
	}
	
	function tagName(node){
	  return node.tagName;
	}
	
	function setTextContent(node, text){
	  node.textContent = text;
	}
	
	module.exports = {
	  createElement: createElement,
	  createElementNS: createElementNS,
	  createTextNode: createTextNode,
	  appendChild: appendChild,
	  removeChild: removeChild,
	  insertBefore: insertBefore,
	  parentNode: parentNode,
	  nextSibling: nextSibling,
	  tagName: tagName,
	  setTextContent: setTextContent
	};


/***/ },
/* 218 */
/***/ function(module, exports) {

	function updateDataset(oldVnode, vnode) {
	  var elm = vnode.elm,
	    oldDataset = oldVnode.data.dataset || {},
	    dataset = vnode.data.dataset || {},
	    key
	
	  for (key in oldDataset) {
	    if (!dataset[key]) {
	      delete elm.dataset[key];
	    }
	  }
	  for (key in dataset) {
	    if (oldDataset[key] !== dataset[key]) {
	      elm.dataset[key] = dataset[key];
	    }
	  }
	}
	
	module.exports = {create: updateDataset, update: updateDataset}


/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	// jshint newcap: false
	/* global require, module, document, Node */
	'use strict';
	
	var VNode = __webpack_require__(35);
	var is = __webpack_require__(22);
	var domApi = __webpack_require__(217);
	
	function isUndef(s) { return s === undefined; }
	function isDef(s) { return s !== undefined; }
	
	var emptyNode = VNode('', {}, [], undefined, undefined);
	
	function sameVnode(vnode1, vnode2) {
	  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
	}
	
	function createKeyToOldIdx(children, beginIdx, endIdx) {
	  var i, map = {}, key;
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) map[key] = i;
	  }
	  return map;
	}
	
	var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
	
	function init(modules, api) {
	  var i, j, cbs = {};
	
	  if (isUndef(api)) api = domApi;
	
	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
	    }
	  }
	
	  function emptyNodeAt(elm) {
	    return VNode(api.tagName(elm).toLowerCase(), {}, [], undefined, elm);
	  }
	
	  function createRmCb(childElm, listeners) {
	    return function() {
	      if (--listeners === 0) {
	        var parent = api.parentNode(childElm);
	        api.removeChild(parent, childElm);
	      }
	    };
	  }
	
	  function createElm(vnode, insertedVnodeQueue) {
	    var i, data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) {
	        i(vnode);
	        data = vnode.data;
	      }
	    }
	    var elm, children = vnode.children, sel = vnode.sel;
	    if (isDef(sel)) {
	      // Parse selector
	      var hashIdx = sel.indexOf('#');
	      var dotIdx = sel.indexOf('.', hashIdx);
	      var hash = hashIdx > 0 ? hashIdx : sel.length;
	      var dot = dotIdx > 0 ? dotIdx : sel.length;
	      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
	      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
	                                                          : api.createElement(tag);
	      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
	      if (dotIdx > 0) elm.className = sel.slice(dot+1).replace(/\./g, ' ');
	      if (is.array(children)) {
	        for (i = 0; i < children.length; ++i) {
	          api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
	        }
	      } else if (is.primitive(vnode.text)) {
	        api.appendChild(elm, api.createTextNode(vnode.text));
	      }
	      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
	      i = vnode.data.hook; // Reuse variable
	      if (isDef(i)) {
	        if (i.create) i.create(emptyNode, vnode);
	        if (i.insert) insertedVnodeQueue.push(vnode);
	      }
	    } else {
	      elm = vnode.elm = api.createTextNode(vnode.text);
	    }
	    return vnode.elm;
	  }
	
	  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
	    }
	  }
	
	  function invokeDestroyHook(vnode) {
	    var i, j, data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
	      for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
	      if (isDef(i = vnode.children)) {
	        for (j = 0; j < vnode.children.length; ++j) {
	          invokeDestroyHook(vnode.children[j]);
	        }
	      }
	    }
	  }
	
	  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var i, listeners, rm, ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.sel)) {
	          invokeDestroyHook(ch);
	          listeners = cbs.remove.length + 1;
	          rm = createRmCb(ch.elm, listeners);
	          for (i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
	          if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
	            i(ch, rm);
	          } else {
	            rm();
	          }
	        } else { // Text node
	          api.removeChild(parentElm, ch.elm);
	        }
	      }
	    }
	  }
	
	  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
	    var oldStartIdx = 0, newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, before;
	
	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
	        idxInOld = oldKeyToIdx[newStartVnode.key];
	        if (isUndef(idxInOld)) { // New element
	          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	          oldCh[idxInOld] = undefined;
	          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      before = isUndef(newCh[newEndIdx+1]) ? null : newCh[newEndIdx+1].elm;
	      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }
	
	  function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
	    var i, hook;
	    if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm, oldCh = oldVnode.children, ch = vnode.children;
	    if (oldVnode === vnode) return;
	    if (!sameVnode(oldVnode, vnode)) {
	      var parentElm = api.parentNode(oldVnode.elm);
	      elm = createElm(vnode, insertedVnodeQueue);
	      api.insertBefore(parentElm, elm, oldVnode.elm);
	      removeVnodes(parentElm, [oldVnode], 0, 0);
	      return;
	    }
	    if (isDef(vnode.data)) {
	      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
	      i = vnode.data.hook;
	      if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) api.setTextContent(elm, '');
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        api.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      api.setTextContent(elm, vnode.text);
	    }
	    if (isDef(hook) && isDef(i = hook.postpatch)) {
	      i(oldVnode, vnode);
	    }
	  }
	
	  return function(oldVnode, vnode) {
	    var i, elm, parent;
	    var insertedVnodeQueue = [];
	    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();
	
	    if (isUndef(oldVnode.sel)) {
	      oldVnode = emptyNodeAt(oldVnode);
	    }
	
	    if (sameVnode(oldVnode, vnode)) {
	      patchVnode(oldVnode, vnode, insertedVnodeQueue);
	    } else {
	      elm = oldVnode.elm;
	      parent = api.parentNode(elm);
	
	      createElm(vnode, insertedVnodeQueue);
	
	      if (parent !== null) {
	        api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
	        removeVnodes(parent, [oldVnode], 0, 0);
	      }
	    }
	
	    for (i = 0; i < insertedVnodeQueue.length; ++i) {
	      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
	    }
	    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
	    return vnode;
	  };
	}
	
	module.exports = {init: init};


/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	var h = __webpack_require__(216);
	
	function copyToThunk(vnode, thunk) {
	  thunk.elm = vnode.elm;
	  vnode.data.fn = thunk.data.fn;
	  vnode.data.args = thunk.data.args;
	  thunk.data = vnode.data;
	  thunk.children = vnode.children;
	  thunk.text = vnode.text;
	  thunk.elm = vnode.elm;
	}
	
	function init(thunk) {
	  var i, cur = thunk.data;
	  var vnode = cur.fn.apply(undefined, cur.args);
	  copyToThunk(vnode, thunk);
	}
	
	function prepatch(oldVnode, thunk) {
	  var i, old = oldVnode.data, cur = thunk.data, vnode;
	  var oldArgs = old.args, args = cur.args;
	  if (old.fn !== cur.fn || oldArgs.length !== args.length) {
	    copyToThunk(cur.fn.apply(undefined, args), thunk);
	  }
	  for (i = 0; i < args.length; ++i) {
	    if (oldArgs[i] !== args[i]) {
	      copyToThunk(cur.fn.apply(undefined, args), thunk);
	      return;
	    }
	  }
	  copyToThunk(oldVnode, thunk);
	}
	
	module.exports = function(sel, key, fn, args) {
	  if (args === undefined) {
	    args = fn;
	    fn = key;
	    key = undefined;
	  }
	  return h(sel, {
	    key: key,
	    hook: {init: init, prepatch: prepatch},
	    fn: fn,
	    args: args
	  });
	};


/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Root reference for iframes.
	 */
	
	var root;
	if (typeof window !== 'undefined') { // Browser window
	  root = window;
	} else if (typeof self !== 'undefined') { // Web Worker
	  root = self;
	} else { // Other environments
	  console.warn("Using browser-only version of superagent in non-browser environment");
	  root = this;
	}
	
	var Emitter = __webpack_require__(137);
	var requestBase = __webpack_require__(222);
	var isObject = __webpack_require__(78);
	
	/**
	 * Noop.
	 */
	
	function noop(){};
	
	/**
	 * Expose `request`.
	 */
	
	var request = module.exports = __webpack_require__(223).bind(null, Request);
	
	/**
	 * Determine XHR.
	 */
	
	request.getXHR = function () {
	  if (root.XMLHttpRequest
	      && (!root.location || 'file:' != root.location.protocol
	          || !root.ActiveXObject)) {
	    return new XMLHttpRequest;
	  } else {
	    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
	  }
	  throw Error("Browser-only verison of superagent could not find XHR");
	};
	
	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */
	
	var trim = ''.trim
	  ? function(s) { return s.trim(); }
	  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };
	
	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */
	
	function serialize(obj) {
	  if (!isObject(obj)) return obj;
	  var pairs = [];
	  for (var key in obj) {
	    if (null != obj[key]) {
	      pushEncodedKeyValuePair(pairs, key, obj[key]);
	    }
	  }
	  return pairs.join('&');
	}
	
	/**
	 * Helps 'serialize' with serializing arrays.
	 * Mutates the pairs array.
	 *
	 * @param {Array} pairs
	 * @param {String} key
	 * @param {Mixed} val
	 */
	
	function pushEncodedKeyValuePair(pairs, key, val) {
	  if (Array.isArray(val)) {
	    return val.forEach(function(v) {
	      pushEncodedKeyValuePair(pairs, key, v);
	    });
	  } else if (isObject(val)) {
	    for(var subkey in val) {
	      pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
	    }
	    return;
	  }
	  pairs.push(encodeURIComponent(key)
	    + '=' + encodeURIComponent(val));
	}
	
	/**
	 * Expose serialization method.
	 */
	
	 request.serializeObject = serialize;
	
	 /**
	  * Parse the given x-www-form-urlencoded `str`.
	  *
	  * @param {String} str
	  * @return {Object}
	  * @api private
	  */
	
	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var pair;
	  var pos;
	
	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    pos = pair.indexOf('=');
	    if (pos == -1) {
	      obj[decodeURIComponent(pair)] = '';
	    } else {
	      obj[decodeURIComponent(pair.slice(0, pos))] =
	        decodeURIComponent(pair.slice(pos + 1));
	    }
	  }
	
	  return obj;
	}
	
	/**
	 * Expose parser.
	 */
	
	request.parseString = parseString;
	
	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */
	
	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'application/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  'form': 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};
	
	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */
	
	 request.serialize = {
	   'application/x-www-form-urlencoded': serialize,
	   'application/json': JSON.stringify
	 };
	
	 /**
	  * Default parsers.
	  *
	  *     superagent.parse['application/xml'] = function(str){
	  *       return { object parsed from str };
	  *     };
	  *
	  */
	
	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};
	
	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */
	
	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;
	
	  lines.pop(); // trailing CRLF
	
	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');
	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }
	
	  return fields;
	}
	
	/**
	 * Check if `mime` is json or has +json structured syntax suffix.
	 *
	 * @param {String} mime
	 * @return {Boolean}
	 * @api private
	 */
	
	function isJSON(mime) {
	  return /[\/+]json\b/.test(mime);
	}
	
	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */
	
	function type(str){
	  return str.split(/ *; */).shift();
	};
	
	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */
	
	function params(str){
	  return str.split(/ *; */).reduce(function(obj, str){
	    var parts = str.split(/ *= */),
	        key = parts.shift(),
	        val = parts.shift();
	
	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};
	
	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */
	
	function Response(req, options) {
	  options = options || {};
	  this.req = req;
	  this.xhr = this.req.xhr;
	  // responseText is accessible only if responseType is '' or 'text' and on older browsers
	  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
	     ? this.xhr.responseText
	     : null;
	  this.statusText = this.req.xhr.statusText;
	  this._setStatusProperties(this.xhr.status);
	  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.
	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
	  this._setHeaderProperties(this.header);
	  this.body = this.req.method != 'HEAD'
	    ? this._parseBody(this.text ? this.text : this.xhr.response)
	    : null;
	}
	
	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */
	
	Response.prototype.get = function(field){
	  return this.header[field.toLowerCase()];
	};
	
	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */
	
	Response.prototype._setHeaderProperties = function(header){
	  // content-type
	  var ct = this.header['content-type'] || '';
	  this.type = type(ct);
	
	  // params
	  var obj = params(ct);
	  for (var key in obj) this[key] = obj[key];
	};
	
	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */
	
	Response.prototype._parseBody = function(str){
	  var parse = request.parse[this.type];
	  if (!parse && isJSON(this.type)) {
	    parse = request.parse['application/json'];
	  }
	  return parse && str && (str.length || str instanceof Object)
	    ? parse(str)
	    : null;
	};
	
	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */
	
	Response.prototype._setStatusProperties = function(status){
	  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	  if (status === 1223) {
	    status = 204;
	  }
	
	  var type = status / 100 | 0;
	
	  // status / class
	  this.status = this.statusCode = status;
	  this.statusType = type;
	
	  // basics
	  this.info = 1 == type;
	  this.ok = 2 == type;
	  this.clientError = 4 == type;
	  this.serverError = 5 == type;
	  this.error = (4 == type || 5 == type)
	    ? this.toError()
	    : false;
	
	  // sugar
	  this.accepted = 202 == status;
	  this.noContent = 204 == status;
	  this.badRequest = 400 == status;
	  this.unauthorized = 401 == status;
	  this.notAcceptable = 406 == status;
	  this.notFound = 404 == status;
	  this.forbidden = 403 == status;
	};
	
	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */
	
	Response.prototype.toError = function(){
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;
	
	  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;
	
	  return err;
	};
	
	/**
	 * Expose `Response`.
	 */
	
	request.Response = Response;
	
	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */
	
	function Request(method, url) {
	  var self = this;
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {}; // preserves header name case
	  this._header = {}; // coerces header names to lowercase
	  this.on('end', function(){
	    var err = null;
	    var res = null;
	
	    try {
	      res = new Response(self);
	    } catch(e) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = e;
	      // issue #675: return the raw response if the response parsing fails
	      err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
	      // issue #876: return the http status code if the response parsing fails
	      err.statusCode = self.xhr && self.xhr.status ? self.xhr.status : null;
	      return self.callback(err);
	    }
	
	    self.emit('response', res);
	
	    var new_err;
	    try {
	      if (res.status < 200 || res.status >= 300) {
	        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
	        new_err.original = err;
	        new_err.response = res;
	        new_err.status = res.status;
	      }
	    } catch(e) {
	      new_err = e; // #985 touching res may cause INVALID_STATE_ERR on old Android
	    }
	
	    // #1000 don't catch errors from the callback to avoid double calling it
	    if (new_err) {
	      self.callback(new_err, res);
	    } else {
	      self.callback(null, res);
	    }
	  });
	}
	
	/**
	 * Mixin `Emitter` and `requestBase`.
	 */
	
	Emitter(Request.prototype);
	for (var key in requestBase) {
	  Request.prototype[key] = requestBase[key];
	}
	
	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.type = function(type){
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};
	
	/**
	 * Set responseType to `val`. Presently valid responseTypes are 'blob' and
	 * 'arraybuffer'.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .responseType('blob')
	 *        .end(callback);
	 *
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.responseType = function(val){
	  this._responseType = val;
	  return this;
	};
	
	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.accept = function(type){
	  this.set('Accept', request.types[type] || type);
	  return this;
	};
	
	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} pass
	 * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.auth = function(user, pass, options){
	  if (!options) {
	    options = {
	      type: 'basic'
	    }
	  }
	
	  switch (options.type) {
	    case 'basic':
	      var str = btoa(user + ':' + pass);
	      this.set('Authorization', 'Basic ' + str);
	    break;
	
	    case 'auto':
	      this.username = user;
	      this.password = pass;
	    break;
	  }
	  return this;
	};
	
	/**
	* Add query-string `val`.
	*
	* Examples:
	*
	*   request.get('/shoes')
	*     .query('size=10')
	*     .query({ color: 'blue' })
	*
	* @param {Object|String} val
	* @return {Request} for chaining
	* @api public
	*/
	
	Request.prototype.query = function(val){
	  if ('string' != typeof val) val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};
	
	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `filename`.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String} filename
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.attach = function(field, file, filename){
	  this._getFormData().append(field, file, filename || file.name);
	  return this;
	};
	
	Request.prototype._getFormData = function(){
	  if (!this._formData) {
	    this._formData = new root.FormData();
	  }
	  return this._formData;
	};
	
	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */
	
	Request.prototype.callback = function(err, res){
	  var fn = this._callback;
	  this.clearTimeout();
	  fn(err, res);
	};
	
	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */
	
	Request.prototype.crossDomainError = function(){
	  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
	  err.crossDomain = true;
	
	  err.status = this.status;
	  err.method = this.method;
	  err.url = this.url;
	
	  this.callback(err);
	};
	
	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */
	
	Request.prototype._timeoutError = function(){
	  var timeout = this._timeout;
	  var err = new Error('timeout of ' + timeout + 'ms exceeded');
	  err.timeout = timeout;
	  this.callback(err);
	};
	
	/**
	 * Compose querystring to append to req.url
	 *
	 * @api private
	 */
	
	Request.prototype._appendQueryString = function(){
	  var query = this._query.join('&');
	  if (query) {
	    this.url += ~this.url.indexOf('?')
	      ? '&' + query
	      : '?' + query;
	  }
	};
	
	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.end = function(fn){
	  var self = this;
	  var xhr = this.xhr = request.getXHR();
	  var timeout = this._timeout;
	  var data = this._formData || this._data;
	
	  // store callback
	  this._callback = fn || noop;
	
	  // state change
	  xhr.onreadystatechange = function(){
	    if (4 != xhr.readyState) return;
	
	    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
	    // result in the error "Could not complete the operation due to error c00c023f"
	    var status;
	    try { status = xhr.status } catch(e) { status = 0; }
	
	    if (0 == status) {
	      if (self.timedout) return self._timeoutError();
	      if (self._aborted) return;
	      return self.crossDomainError();
	    }
	    self.emit('end');
	  };
	
	  // progress
	  var handleProgress = function(e){
	    if (e.total > 0) {
	      e.percent = e.loaded / e.total * 100;
	    }
	    e.direction = 'download';
	    self.emit('progress', e);
	  };
	  if (this.hasListeners('progress')) {
	    xhr.onprogress = handleProgress;
	  }
	  try {
	    if (xhr.upload && this.hasListeners('progress')) {
	      xhr.upload.onprogress = handleProgress;
	    }
	  } catch(e) {
	    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
	    // Reported here:
	    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
	  }
	
	  // timeout
	  if (timeout && !this._timer) {
	    this._timer = setTimeout(function(){
	      self.timedout = true;
	      self.abort();
	    }, timeout);
	  }
	
	  // querystring
	  this._appendQueryString();
	
	  // initiate request
	  if (this.username && this.password) {
	    xhr.open(this.method, this.url, true, this.username, this.password);
	  } else {
	    xhr.open(this.method, this.url, true);
	  }
	
	  // CORS
	  if (this._withCredentials) xhr.withCredentials = true;
	
	  // body
	  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
	    // serialize stuff
	    var contentType = this._header['content-type'];
	    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
	    if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
	    if (serialize) data = serialize(data);
	  }
	
	  // set header fields
	  for (var field in this.header) {
	    if (null == this.header[field]) continue;
	    xhr.setRequestHeader(field, this.header[field]);
	  }
	
	  if (this._responseType) {
	    xhr.responseType = this._responseType;
	  }
	
	  // send stuff
	  this.emit('request', this);
	
	  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
	  // We need null here if data is undefined
	  xhr.send(typeof data !== 'undefined' ? data : null);
	  return this;
	};
	
	
	/**
	 * Expose `Request`.
	 */
	
	request.Request = Request;
	
	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	request.get = function(url, data, fn){
	  var req = request('GET', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	request.head = function(url, data, fn){
	  var req = request('HEAD', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * OPTIONS query to `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	request.options = function(url, data, fn){
	  var req = request('OPTIONS', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * DELETE `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	function del(url, fn){
	  var req = request('DELETE', url);
	  if (fn) req.end(fn);
	  return req;
	};
	
	request['del'] = del;
	request['delete'] = del;
	
	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} [data]
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	request.patch = function(url, data, fn){
	  var req = request('PATCH', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} [data]
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	request.post = function(url, data, fn){
	  var req = request('POST', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	request.put = function(url, data, fn){
	  var req = request('PUT', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};


/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module of mixed-in functions shared between node and client code
	 */
	var isObject = __webpack_require__(78);
	
	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.clearTimeout = function _clearTimeout(){
	  this._timeout = 0;
	  clearTimeout(this._timer);
	  return this;
	};
	
	/**
	 * Override default response body parser
	 *
	 * This function will be called to convert incoming data into request.body
	 *
	 * @param {Function}
	 * @api public
	 */
	
	exports.parse = function parse(fn){
	  this._parser = fn;
	  return this;
	};
	
	/**
	 * Override default request body serializer
	 *
	 * This function will be called to convert data set via .send or .attach into payload to send
	 *
	 * @param {Function}
	 * @api public
	 */
	
	exports.serialize = function serialize(fn){
	  this._serializer = fn;
	  return this;
	};
	
	/**
	 * Set timeout to `ms`.
	 *
	 * @param {Number} ms
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.timeout = function timeout(ms){
	  this._timeout = ms;
	  return this;
	};
	
	/**
	 * Promise support
	 *
	 * @param {Function} resolve
	 * @param {Function} reject
	 * @return {Request}
	 */
	
	exports.then = function then(resolve, reject) {
	  if (!this._fullfilledPromise) {
	    var self = this;
	    this._fullfilledPromise = new Promise(function(innerResolve, innerReject){
	      self.end(function(err, res){
	        if (err) innerReject(err); else innerResolve(res);
	      });
	    });
	  }
	  return this._fullfilledPromise.then(resolve, reject);
	}
	
	/**
	 * Allow for extension
	 */
	
	exports.use = function use(fn) {
	  fn(this);
	  return this;
	}
	
	
	/**
	 * Get request header `field`.
	 * Case-insensitive.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */
	
	exports.get = function(field){
	  return this._header[field.toLowerCase()];
	};
	
	/**
	 * Get case-insensitive header `field` value.
	 * This is a deprecated internal API. Use `.get(field)` instead.
	 *
	 * (getHeader is no longer used internally by the superagent code base)
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 * @deprecated
	 */
	
	exports.getHeader = exports.get;
	
	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 * Case-insensitive.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.set = function(field, val){
	  if (isObject(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }
	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};
	
	/**
	 * Remove header `field`.
	 * Case-insensitive.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 */
	exports.unset = function(field){
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};
	
	/**
	 * Write the field `name` and `val` for "multipart/form-data"
	 * request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} name
	 * @param {String|Blob|File|Buffer|fs.ReadStream} val
	 * @return {Request} for chaining
	 * @api public
	 */
	exports.field = function(name, val) {
	  this._getFormData().append(name, val);
	  return this;
	};
	
	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request}
	 * @api public
	 */
	exports.abort = function(){
	  if (this._aborted) {
	    return this;
	  }
	  this._aborted = true;
	  this.xhr && this.xhr.abort(); // browser
	  this.req && this.req.abort(); // node
	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};
	
	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */
	
	exports.withCredentials = function(){
	  // This is browser-only functionality. Node side is no-op.
	  this._withCredentials = true;
	  return this;
	};
	
	/**
	 * Set the max redirects to `n`. Does noting in browser XHR implementation.
	 *
	 * @param {Number} n
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.redirects = function(n){
	  this._maxRedirects = n;
	  return this;
	};
	
	/**
	 * Convert to a plain javascript object (not JSON string) of scalar properties.
	 * Note as this method is designed to return a useful non-this value,
	 * it cannot be chained.
	 *
	 * @return {Object} describing method, url, and data of this request
	 * @api public
	 */
	
	exports.toJSON = function(){
	  return {
	    method: this.method,
	    url: this.url,
	    data: this._data,
	    headers: this._header
	  };
	};
	
	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * TODO: future proof, move to compoent land
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */
	
	exports._isHost = function _isHost(obj) {
	  var str = {}.toString.call(obj);
	
	  switch (str) {
	    case '[object File]':
	    case '[object Blob]':
	    case '[object FormData]':
	      return true;
	    default:
	      return false;
	  }
	}
	
	/**
	 * Send `data` as the request body, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"}')
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	 *      request.post('/user')
	 *        .send('name=tobi')
	 *        .send('species=ferret')
	 *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.send = function(data){
	  var obj = isObject(data);
	  var type = this._header['content-type'];
	
	  // merge
	  if (obj && isObject(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  } else if ('string' == typeof data) {
	    // default to x-www-form-urlencoded
	    if (!type) this.type('form');
	    type = this._header['content-type'];
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data
	        ? this._data + '&' + data
	        : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }
	
	  if (!obj || this._isHost(data)) return this;
	
	  // default to json
	  if (!type) this.type('json');
	  return this;
	};


/***/ },
/* 223 */
/***/ function(module, exports) {

	// The node and browser modules expose versions of this with the
	// appropriate constructor function bound as first argument
	/**
	 * Issue a request:
	 *
	 * Examples:
	 *
	 *    request('GET', '/users').end(callback)
	 *    request('/users').end(callback)
	 *    request('/users', callback)
	 *
	 * @param {String} method
	 * @param {String|Function} url or callback
	 * @return {Request}
	 * @api public
	 */
	
	function request(RequestConstructor, method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new RequestConstructor('GET', method).end(url);
	  }
	
	  // url first
	  if (2 == arguments.length) {
	    return new RequestConstructor('GET', method);
	  }
	
	  return new RequestConstructor(method, url);
	}
	
	module.exports = request;


/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _util = __webpack_require__(225);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function switchPathInputGuard(path, routes) {
	  if (!(0, _util.isPattern)(path)) {
	    throw new Error('First parameter to switchPath must be a route path.');
	  }
	  if (!(0, _util.isRouteDefinition)(routes)) {
	    throw new Error('Second parameter to switchPath must be an object ' + 'containing route patterns.');
	  }
	}
	
	function validatePath(sourcePath, matchedPath) {
	  var sourceParts = (0, _util.splitPath)(sourcePath);
	  var matchedParts = (0, _util.splitPath)(matchedPath);
	
	  for (var i = 0; i < matchedParts.length; ++i) {
	    if (matchedParts[i] !== sourceParts[i]) {
	      return null;
	    }
	  }
	
	  return '/' + (0, _util.extractPartial)(sourcePath, matchedPath);
	}
	
	function betterMatch(candidate, reference) {
	  if (!(0, _util.isNotNull)(candidate)) {
	    return false;
	  }
	  if (!(0, _util.isNotNull)(reference)) {
	    return true;
	  }
	  if (!validatePath(candidate, reference)) {
	    return false;
	  }
	  return candidate.length >= reference.length;
	}
	
	function matchesWithParams(sourcePath, pattern) {
	  var sourceParts = (0, _util.splitPath)(sourcePath);
	  var patternParts = (0, _util.splitPath)(pattern);
	
	  var params = patternParts.map(function (part, i) {
	    return (0, _util.isParam)(part) ? sourceParts[i] : null;
	  }).filter(_util.isNotNull);
	
	  var matched = patternParts.every(function (part, i) {
	    return (0, _util.isParam)(part) || part === sourceParts[i];
	  });
	
	  return matched ? params : [];
	}
	
	function getParamFnValue(paramFn, params) {
	  var _paramFn = (0, _util.isRouteDefinition)(paramFn) ? paramFn['/'] : paramFn;
	  return typeof _paramFn === 'function' ? _paramFn.apply(undefined, _toConsumableArray(params)) : _paramFn;
	}
	
	function validate(_ref) {
	  var sourcePath = _ref.sourcePath;
	  var matchedPath = _ref.matchedPath;
	  var matchedValue = _ref.matchedValue;
	  var routes = _ref.routes;
	
	  var path = matchedPath ? validatePath(sourcePath, matchedPath) : null;
	  var value = matchedValue;
	  if (!path) {
	    path = routes['*'] ? sourcePath : null;
	    value = path ? routes['*'] : null;
	  }
	  return { path: path, value: value };
	}
	
	function switchPath(sourcePath, routes) {
	  switchPathInputGuard(sourcePath, routes);
	  var matchedPath = null;
	  var matchedValue = null;
	
	  (0, _util.traverseRoutes)(routes, function matchPattern(pattern) {
	    if (sourcePath.search(pattern) === 0 && betterMatch(pattern, matchedPath)) {
	      matchedPath = pattern;
	      matchedValue = routes[pattern];
	    }
	
	    var params = matchesWithParams(sourcePath, pattern).filter(Boolean);
	
	    if (params.length > 0 && betterMatch(sourcePath, matchedPath)) {
	      matchedPath = (0, _util.extractPartial)(sourcePath, pattern);
	      matchedValue = getParamFnValue(routes[pattern], params);
	    }
	
	    if ((0, _util.isRouteDefinition)(routes[pattern]) && params.length === 0) {
	      if (sourcePath !== '/') {
	        var child = switchPath((0, _util.unprefixed)(sourcePath, pattern) || '/', routes[pattern]);
	        var nestedPath = pattern + child.path;
	        if (child.path !== null && betterMatch(nestedPath, matchedPath)) {
	          matchedPath = nestedPath;
	          matchedValue = child.value;
	        }
	      }
	    }
	  });
	
	  return validate({ sourcePath: sourcePath, matchedPath: matchedPath, matchedValue: matchedValue, routes: routes });
	}
	
	exports.default = switchPath;

/***/ },
/* 225 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isPattern = isPattern;
	exports.isRouteDefinition = isRouteDefinition;
	exports.traverseRoutes = traverseRoutes;
	exports.isNotNull = isNotNull;
	exports.splitPath = splitPath;
	exports.isParam = isParam;
	exports.extractPartial = extractPartial;
	exports.unprefixed = unprefixed;
	function isPattern(candidate) {
	  return typeof candidate === "string" && (candidate.charAt(0) === "/" || candidate === "*");
	}
	
	function isRouteDefinition(candidate) {
	  return !candidate || typeof candidate !== "object" ? false : isPattern(Object.keys(candidate)[0]);
	}
	
	function traverseRoutes(routes, callback) {
	  var keys = Object.keys(routes);
	  for (var i = 0; i < keys.length; ++i) {
	    var pattern = keys[i];
	    if (pattern === "*") {
	      continue;
	    }
	    callback(pattern);
	  }
	}
	
	function isNotNull(candidate) {
	  return candidate !== null;
	}
	
	function splitPath(path) {
	  return path.split("/").filter(function (s) {
	    return !!s;
	  });
	}
	
	function isParam(candidate) {
	  return candidate.match(/:\w+/) !== null;
	}
	
	function extractPartial(sourcePath, pattern) {
	  var patternParts = splitPath(pattern);
	  var sourceParts = splitPath(sourcePath);
	
	  var matchedParts = [];
	
	  for (var i = 0; i < patternParts.length; ++i) {
	    matchedParts.push(sourceParts[i]);
	  }
	
	  return matchedParts.filter(isNotNull).join("/");
	}
	
	function unprefixed(fullString, prefix) {
	  return fullString.split(prefix)[1];
	}

/***/ },
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
]);
//# sourceMappingURL=app.js.map