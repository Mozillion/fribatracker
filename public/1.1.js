webpackJsonp([1],{

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _mergeSinks = __webpack_require__(11);
	
	var _mergeSinks2 = _interopRequireDefault(_mergeSinks);
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _ramda = __webpack_require__(5);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	var _routes = __webpack_require__(12);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function requireLogin(Component) {
	    return function (sources) {
	        var user$ = sources.user$.take(1);
	        var sinks = {
	            /**
	             * Ohjataan loginiin, ja loginin jälkeen ohjataan tälle sivulle uudestaan
	             */
	            router: _xstream2.default.combine(sources.location$, user$.filter(function (user) {
	                return !user;
	            })).map(function (_ref) {
	                var _ref2 = _slicedToArray(_ref, 2);
	
	                var location = _ref2[0];
	                var user = _ref2[1];
	                return { pathname: _routes2.default.login, state: { redirect: location.pathname } };
	            })
	        };
	        var cSinks = Component(sources);
	        var guardedSinks = _ramda2.default.map(function (sink) {
	            return user$.filter(function (user) {
	                return user;
	            }).mapTo(sink).flatten();
	        }, cSinks);
	        return (0, _mergeSinks2.default)({}, sinks, guardedSinks);
	    };
	}
	
	exports.default = requireLogin;

/***/ },

/***/ 49:
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
	
	var _requireLogin = __webpack_require__(26);
	
	var _requireLogin2 = _interopRequireDefault(_requireLogin);
	
	var _goBackable = __webpack_require__(129);
	
	var _goBackable2 = _interopRequireDefault(_goBackable);
	
	var _courseForm = __webpack_require__(116);
	
	var _courseForm2 = _interopRequireDefault(_courseForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function AddCourse(sources) {
	    var form = (0, _courseForm2.default)(sources);
	    return form;
	}
	
	exports.default = function (sources) {
	    return (0, _requireLogin2.default)((0, _isolate2.default)((0, _mainLayout2.default)((0, _goBackable2.default)(AddCourse))))(sources);
	};

/***/ },

/***/ 50:
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
	
	var _requireLogin = __webpack_require__(26);
	
	var _requireLogin2 = _interopRequireDefault(_requireLogin);
	
	var _routes = __webpack_require__(12);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Courses(sources) {
	    var vdom$ = _xstream2.default.of((0, _snabbdomJsx.html)(
	        'a',
	        { href: _routes2.default.courses.add },
	        'Lisää'
	    ));
	    var click$ = sources.DOM.select('a').events('click');
	    return {
	        DOM: vdom$,
	        router: click$.map(function (event) {
	            return event.target.getAttribute('href');
	        }),
	        preventDefault: click$
	    };
	}
	
	exports.default = function (sources) {
	    return (0, _requireLogin2.default)((0, _isolate2.default)((0, _mainLayout2.default)(Courses)))(sources);
	};

/***/ },

/***/ 51:
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
	
	var _requireLogin = __webpack_require__(26);
	
	var _requireLogin2 = _interopRequireDefault(_requireLogin);
	
	var _grid = __webpack_require__(48);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Home(sources) {
	    var vdom$ = _xstream2.default.of((0, _snabbdomJsx.html)(
	        _grid.Row,
	        null,
	        (0, _snabbdomJsx.html)(
	            _grid.Column,
	            { col: 3 },
	            'Homepage 1!'
	        ),
	        (0, _snabbdomJsx.html)(
	            _grid.Column,
	            { col: 3, left: 5 },
	            'Homepage 2!'
	        )
	    ));
	    return {
	        DOM: vdom$
	    };
	}
	
	exports.default = function (sources) {
	    return (0, _requireLogin2.default)((0, _isolate2.default)((0, _mainLayout2.default)(Home)))(sources);
	};

/***/ },

/***/ 52:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _isolate = __webpack_require__(4);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _plainLayout = __webpack_require__(136);
	
	var _plainLayout2 = _interopRequireDefault(_plainLayout);
	
	var _loginForm = __webpack_require__(46);
	
	var _loginForm2 = _interopRequireDefault(_loginForm);
	
	var _mergeSinks = __webpack_require__(11);
	
	var _mergeSinks2 = _interopRequireDefault(_mergeSinks);
	
	var _routes = __webpack_require__(12);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _ramda = __webpack_require__(5);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Login(sources) {
	    var loginForm = (0, _loginForm2.default)(sources);
	    var router = _xstream2.default.merge(sources.user$.take(1).filter(function (user) {
	        return user;
	    }).mapTo(_routes2.default.home), _xstream2.default.combine(sources.location$, loginForm.afterSubmit$.filter(function (_ref) {
	        var response = _ref.response;
	        return response.ok;
	    })).map(function (_ref2) {
	        var _ref3 = _slicedToArray(_ref2, 1);
	
	        var location = _ref3[0];
	        return _ramda2.default.pathOr(_routes2.default.home, ['state', 'redirect'], location);
	    }));
	    return (0, _mergeSinks2.default)({
	        router: router
	    }, loginForm);
	}
	
	exports.default = function (sources) {
	    return (0, _isolate2.default)((0, _plainLayout2.default)(Login))(sources);
	};

/***/ },

/***/ 116:
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
	
	var _form = __webpack_require__(47);
	
	var _constants = __webpack_require__(131);
	
	var _button = __webpack_require__(18);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _ramda = __webpack_require__(5);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	var _pairwise = __webpack_require__(276);
	
	var _pairwise2 = _interopRequireDefault(_pairwise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function fairway(idx, FormComponent) {
	    var name = FormComponent(_form.TextField, {
	        layout$: _xstream2.default.of('none'),
	        autoWidth$: _xstream2.default.of(true),
	        props$: _xstream2.default.of({
	            type: 'text',
	            placeholder: 'Nimi',
	            value: '#' + idx
	        }),
	        validators$: _xstream2.default.of([['required'], ['length', { min: 1, max: 100 }]])
	    });
	    var par = FormComponent(_form.TextField, {
	        layout$: _xstream2.default.of('none'),
	        prepend$: _xstream2.default.of('Par'),
	        props$: _xstream2.default.of({
	            type: 'number'
	        })
	    });
	    var length = FormComponent(_form.TextField, {
	        layout$: _xstream2.default.of('none'),
	        prepend$: _xstream2.default.of('Pituus'),
	        append$: _xstream2.default.of('m'),
	        props$: _xstream2.default.of({
	            type: 'number'
	        })
	    });
	    var relief = FormComponent(_form.TextField, {
	        layout$: _xstream2.default.of('none'),
	        prepend$: _xstream2.default.of('Korkeusero'),
	        append$: _xstream2.default.of('m'),
	        props$: _xstream2.default.of({
	            type: 'number',
	            step: 0.1
	            // placeholder: 'Pituus'
	        })
	    });
	    return { name: name, par: par, length: length, relief: relief };
	}
	
	function CourseForm(_ref) {
	    var DOM = _ref.DOM;
	    var FormComponent = _ref.FormComponent;
	    var validatedValuesAfterSubmit$ = _ref.validatedValuesAfterSubmit$;
	
	    var sources = _objectWithoutProperties(_ref, ['DOM', 'FormComponent', 'validatedValuesAfterSubmit$']);
	
	    var submitButton = FormComponent(_button2.default, {
	        props$: _xstream2.default.of({
	            content: 'Tallenna',
	            type: 'submit',
	            look: 'primary'
	        })
	    });
	    var fairwayButton = FormComponent(_form.AddDecField, {
	        label$: _xstream2.default.of('Väyliä'),
	        props$: _xstream2.default.of({
	            style: { width: '3.2rem' },
	            value: 18
	        }),
	        min$: _xstream2.default.of(1),
	        max$: _xstream2.default.of(100)
	    });
	
	    var change$ = fairwayButton.value$.compose(_pairwise2.default).map(function (_ref2) {
	        var _ref3 = _slicedToArray(_ref2, 2);
	
	        var prev = _ref3[0];
	        var next = _ref3[1];
	        return next - prev;
	    }).startWith(0);
	    // const response$ = sources.HTTP.select('login').flatten();
	    return {
	        elements$: _xstream2.default.of({
	            name: FormComponent(_form.TextField, {
	                label$: _xstream2.default.of('Nimi'),
	                props$: _xstream2.default.of({
	                    type: 'text'
	                }),
	                validators$: _xstream2.default.of([['required'], ['length', { min: 1, max: 100 }]])
	            }),
	            rating: FormComponent(_form.Select, {
	                label$: _xstream2.default.of('Luokitus'),
	                options$: _xstream2.default.of(_ramda2.default.zipWith(function (value, text) {
	                    return { value: value, text: text };
	                }, _constants.courseRatings, _constants.courseRatings))
	            }),
	            fairwayButton: fairwayButton,
	            fairways: fairwayButton.value$.fold(function (acc, value) {
	                var change = value - acc.length;
	                if (change > 0) {
	                    var fairways = _ramda2.default.range(acc.length, value).map(function (idx) {
	                        return fairway(idx + 1, FormComponent);
	                    });
	                    var remembered = fairways.map(function (obj) {
	                        return _ramda2.default.map(function (sinks) {
	                            return _ramda2.default.map(function (sink) {
	                                return sink.remember();
	                            }, sinks);
	                        }, obj);
	                    });
	                    return acc.concat(remembered);
	                }
	                return acc.slice(0, change);
	            }, [])
	        }),
	        actions$: _xstream2.default.of({
	            submit: submitButton
	        }),
	        render$: _xstream2.default.of(function (alerts, elements, actions, styles) {
	            return (0, _snabbdomJsx.html)(
	                'form',
	                { className: styles.grid },
	                alerts,
	                elements.name,
	                elements.rating,
	                elements.fairwayButton,
	                elements.fairways.map(function (_ref4, idx) {
	                    var name = _ref4.name;
	                    var par = _ref4.par;
	                    var length = _ref4.length;
	                    var relief = _ref4.relief;
	                    return (0, _snabbdomJsx.html)(
	                        'div',
	                        { className: styles.inlineGroup, key: idx },
	                        name,
	                        par,
	                        length,
	                        relief
	                    );
	                }),
	                actions ? (0, _snabbdomJsx.html)(
	                    'div',
	                    { className: styles.actions },
	                    actions.submit
	                ) : ''
	            );
	        }),
	        // HTTP: validatedValuesAfterSubmit$.map(values => {
	        //     return {
	        //         url: '/login',
	        //         method: 'POST',
	        //         send: values,
	        //         category: 'login'
	        //     }
	        // }),
	        submitOn$: submitButton.click$,
	        afterSubmit$: _xstream2.default.never()
	    };
	}
	
	exports.default = function (sources) {
	    return (0, _isolate2.default)((0, _form.Form)(CourseForm))(sources);
	};

/***/ },

/***/ 129:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _xstream = __webpack_require__(2);
	
	var _xstream2 = _interopRequireDefault(_xstream);
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _mergeSinks = __webpack_require__(11);
	
	var _mergeSinks2 = _interopRequireDefault(_mergeSinks);
	
	var _goBackable = __webpack_require__(185);
	
	var _goBackable2 = _interopRequireDefault(_goBackable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function goBackable(Component) {
	    return function (sources) {
	        var component = Component(sources);
	        var click$ = sources.DOM.select('a').events('click');
	        return (0, _mergeSinks2.default)({
	            DOM: component.DOM.map(function (component) {
	                return (0, _snabbdomJsx.html)(
	                    'div',
	                    null,
	                    (0, _snabbdomJsx.html)(
	                        'div',
	                        { className: _goBackable2.default.goBack },
	                        (0, _snabbdomJsx.html)(
	                            'a',
	                            { href: '#' },
	                            (0, _snabbdomJsx.html)('i', { className: 'fa fa-long-arrow-left' })
	                        )
	                    ),
	                    component
	                );
	            })
	        }, component, {
	            router: click$.mapTo({ type: 'goBack' }),
	            preventDefault: click$
	        });
	    };
	}
	
	exports.default = goBackable;

/***/ },

/***/ 131:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var courseRatings = ['AAA1', 'AAA2', 'AAA3', 'AA1', 'AA2', 'AA3', 'A1', 'A2', 'A3', 'BB1', 'BB2', 'BB3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3'];
	
	exports.courseRatings = courseRatings;

/***/ },

/***/ 136:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _mergeSinks = __webpack_require__(11);
	
	var _mergeSinks2 = _interopRequireDefault(_mergeSinks);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function PlainLayout(Page) {
	    return function (sources) {
	        var sinks = Page(sources);
	        sinks.DOM = sinks.DOM.map(function (page) {
	            return (0, _snabbdomJsx.html)(
	                'main',
	                null,
	                page
	            );
	        });
	        return sinks;
	    };
	}
	
	exports.default = PlainLayout;

/***/ },

/***/ 185:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"goBack":"goBack-mqPHeClHjwWtMG3R0b36M"};

/***/ },

/***/ 276:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(40);
	var PairwiseOperator = (function () {
	    function PairwiseOperator(ins) {
	        this.ins = ins;
	        this.type = 'pairwise';
	        this.val = null;
	        this.has = false;
	        this.out = null;
	    }
	    PairwiseOperator.prototype._start = function (out) {
	        this.out = out;
	        this.ins._add(this);
	    };
	    PairwiseOperator.prototype._stop = function () {
	        this.ins._remove(this);
	        this.has = false;
	        this.out = null;
	        this.val = null;
	    };
	    PairwiseOperator.prototype._n = function (t) {
	        var u = this.out;
	        if (!u)
	            return;
	        if (this.has) {
	            var prev = this.val;
	            this.val = t;
	            u._n([prev, t]);
	        }
	        else {
	            this.val = t;
	            this.has = true;
	        }
	    };
	    PairwiseOperator.prototype._e = function (err) {
	        var u = this.out;
	        if (!u)
	            return;
	        u._e(err);
	    };
	    PairwiseOperator.prototype._c = function () {
	        var u = this.out;
	        if (!u)
	            return;
	        u._c();
	    };
	    return PairwiseOperator;
	}());
	/**
	 * Group consecutive pairs of events as arrays. Each array has two items.
	 *
	 * Marble diagram:
	 *
	 * ```text
	 * ---1---2-----3-----4-----5--------|
	 *       pairwise
	 * -------[1,2]-[2,3]-[3,4]-[4,5]----|
	 * ```
	 *
	 * Example:
	 *
	 * ```js
	 * import pairwise from 'xstream/extra/pairwise'
	 *
	 * const stream = xs.of(1, 2, 3, 4, 5, 6).compose(pairwise)
	 *
	 * stream.addListener({
	 *   next: i => console.log(i),
	 *   error: err => console.error(err),
	 *   complete: () => console.log('completed')
	 * })
	 * ```
	 *
	 * ```text
	 * > [1,2]
	 * > [2,3]
	 * > [3,4]
	 * > [4,5]
	 * > [5,6]
	 * > completed
	 * ```
	 *
	 * @return {Stream}
	 */
	function pairwise(ins) {
	    return new core_1.Stream(new PairwiseOperator(ins));
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = pairwise;
	//# sourceMappingURL=pairwise.js.map

/***/ },

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./courses/add/index": 49,
		"./courses/add/index.js": 49,
		"./courses/index": 50,
		"./courses/index.js": 50,
		"./home/index": 51,
		"./home/index.js": 51,
		"./login/index": 52,
		"./login/index.js": 52,
		"./not-found/index": 27,
		"./not-found/index.js": 27
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 277;


/***/ }

});
//# sourceMappingURL=1.js.map