webpackJsonp([1],{

/***/ 28:
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

/***/ 53:
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
	
	var _mainLayout = __webpack_require__(20);
	
	var _mainLayout2 = _interopRequireDefault(_mainLayout);
	
	var _requireLogin = __webpack_require__(28);
	
	var _requireLogin2 = _interopRequireDefault(_requireLogin);
	
	var _goBackable = __webpack_require__(131);
	
	var _goBackable2 = _interopRequireDefault(_goBackable);
	
	var _courseForm = __webpack_require__(119);
	
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

/***/ 54:
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
	
	var _mainLayout = __webpack_require__(20);
	
	var _mainLayout2 = _interopRequireDefault(_mainLayout);
	
	var _requireLogin = __webpack_require__(28);
	
	var _requireLogin2 = _interopRequireDefault(_requireLogin);
	
	var _routes = __webpack_require__(12);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _course = __webpack_require__(30);
	
	var _course2 = _interopRequireDefault(_course);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Courses(_ref) {
	    var DOM = _ref.DOM;
	    var db = _ref.db;
	
	    var vdom$ = db.select('getCourses').flatten().startWith(null).map(function (courses) {
	        return (0, _snabbdomJsx.html)(
	            'div',
	            null,
	            Array.isArray(courses) ? '' : '',
	            (0, _snabbdomJsx.html)(
	                'a',
	                { href: _routes2.default.courses.add },
	                'Lisää'
	            )
	        );
	    });
	    var click$ = DOM.select('a').events('click');
	    var query = _xstream2.default.of(_course2.default.query('getCourses').findAll());
	    return {
	        DOM: vdom$,
	        router: click$.map(function (event) {
	            return event.target.getAttribute('href');
	        }),
	        preventDefault: click$,
	        db: query
	    };
	}
	
	exports.default = function (sources) {
	    return (0, _requireLogin2.default)((0, _isolate2.default)((0, _mainLayout2.default)(Courses)))(sources);
	};

/***/ },

/***/ 55:
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
	
	var _mainLayout = __webpack_require__(20);
	
	var _mainLayout2 = _interopRequireDefault(_mainLayout);
	
	var _requireLogin = __webpack_require__(28);
	
	var _requireLogin2 = _interopRequireDefault(_requireLogin);
	
	var _grid = __webpack_require__(29);
	
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

/***/ 56:
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
	
	var _plainLayout = __webpack_require__(139);
	
	var _plainLayout2 = _interopRequireDefault(_plainLayout);
	
	var _loginForm = __webpack_require__(50);
	
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
	        return response && response.ok;
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

/***/ 119:
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
	
	var _form = __webpack_require__(52);
	
	var _constants = __webpack_require__(133);
	
	var _button = __webpack_require__(19);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _ramda = __webpack_require__(5);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	var _grid = __webpack_require__(29);
	
	var _pairwise = __webpack_require__(282);
	
	var _pairwise2 = _interopRequireDefault(_pairwise);
	
	var _dropRepeats = __webpack_require__(44);
	
	var _dropRepeats2 = _interopRequireDefault(_dropRepeats);
	
	var _courseForm = __webpack_require__(185);
	
	var _courseForm2 = _interopRequireDefault(_courseForm);
	
	var _course = __webpack_require__(30);
	
	var _course2 = _interopRequireDefault(_course);
	
	var _alert = __webpack_require__(51);
	
	var _alert2 = _interopRequireDefault(_alert);
	
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
	    var par = FormComponent(_form.AddDecField, {
	        layout$: _xstream2.default.of('none'),
	        label$: _xstream2.default.of('Par'),
	        props$: _xstream2.default.of({
	            style: { width: '3.2rem' },
	            value: 3
	        }),
	        min$: _xstream2.default.of(1),
	        max$: _xstream2.default.of(8)
	    });
	    var length = FormComponent(_form.TextField, {
	        layout$: _xstream2.default.of('none'),
	        append$: _xstream2.default.of('m'),
	        props$: _xstream2.default.of({
	            type: 'number'
	        }),
	        validators$: _xstream2.default.of([['int', { min: 1, max: 1000 }]])
	    });
	    var relief = FormComponent(_form.TextField, {
	        layout$: _xstream2.default.of('none'),
	        append$: _xstream2.default.of('m'),
	        props$: _xstream2.default.of({
	            type: 'number',
	            step: 0.1
	        }),
	        validators$: _xstream2.default.of([['float', { min: -1000, max: 1000 }]])
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
	    var fairwayCount = FormComponent(_form.AddDecField, {
	        label$: _xstream2.default.of('Väyliä'),
	        props$: _xstream2.default.of({
	            style: { width: '3.2rem' },
	            value: 18
	        }),
	        min$: _xstream2.default.of(1),
	        max$: _xstream2.default.of(100)
	    });
	
	    var change$ = fairwayCount.value$.compose(_pairwise2.default).map(function (_ref2) {
	        var _ref3 = _slicedToArray(_ref2, 2);
	
	        var prev = _ref3[0];
	        var next = _ref3[1];
	        return next - prev;
	    }).startWith(0);
	    var response$ = sources.db.select('courseForm').flatten();
	
	    var alert = response$.map(function (response) {
	        return (0, _alert2.default)({
	            DOM: DOM,
	            content$: _xstream2.default.of('Rata tallennettu'),
	            type$: _xstream2.default.of('success'),
	            close$: submitButton.click$
	        }).DOM;
	    }).flatten().startWith('');
	
	    return {
	        reset$: response$,
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
	            fairways: fairwayCount.value$.compose((0, _dropRepeats2.default)()).fold(function (acc, value) {
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
	        render$: _xstream2.default.combine(alert, fairwayCount.DOM).map(function (_ref4) {
	            var _ref5 = _slicedToArray(_ref4, 2);
	
	            var alert = _ref5[0];
	            var fairwayButton = _ref5[1];
	            return _xstream2.default.of(function (alerts, elements, actions, formStyles) {
	                return (0, _snabbdomJsx.html)(
	                    'form',
	                    { className: formStyles.grid },
	                    alert,
	                    alerts,
	                    elements.name,
	                    elements.rating,
	                    fairwayButton,
	                    elements.fairways.map(function (_ref6, idx) {
	                        var name = _ref6.name;
	                        var par = _ref6.par;
	                        var length = _ref6.length;
	                        var relief = _ref6.relief;
	                        return (0, _snabbdomJsx.html)(
	                            'div',
	                            { className: _courseForm2.default.fairway, key: idx },
	                            (0, _snabbdomJsx.html)(
	                                _grid.Row,
	                                null,
	                                (0, _snabbdomJsx.html)(
	                                    _grid.Column,
	                                    { col: 4 },
	                                    name
	                                ),
	                                (0, _snabbdomJsx.html)(
	                                    _grid.Column,
	                                    { col: 8 },
	                                    par
	                                )
	                            ),
	                            (0, _snabbdomJsx.html)(
	                                _grid.Row,
	                                null,
	                                (0, _snabbdomJsx.html)(
	                                    _grid.Column,
	                                    { col: 4 },
	                                    (0, _snabbdomJsx.html)(
	                                        'label',
	                                        null,
	                                        'Pituus'
	                                    )
	                                ),
	                                (0, _snabbdomJsx.html)(
	                                    _grid.Column,
	                                    { col: 8 },
	                                    length
	                                )
	                            ),
	                            (0, _snabbdomJsx.html)(
	                                _grid.Row,
	                                null,
	                                (0, _snabbdomJsx.html)(
	                                    _grid.Column,
	                                    { col: 4 },
	                                    (0, _snabbdomJsx.html)(
	                                        'label',
	                                        null,
	                                        'Korkeusero'
	                                    )
	                                ),
	                                (0, _snabbdomJsx.html)(
	                                    _grid.Column,
	                                    { col: 8 },
	                                    relief
	                                )
	                            )
	                        );
	                    }),
	                    actions ? (0, _snabbdomJsx.html)(
	                        'div',
	                        { className: formStyles.actions },
	                        actions.submit
	                    ) : ''
	                );
	            });
	        }).flatten(),
	        db: validatedValuesAfterSubmit$.map(function (values) {
	            return {
	                category: 'courseForm',
	                table: 'courses',
	                add: new _course2.default(values)
	            };
	        }),
	        submitOn$: submitButton.click$,
	        afterSubmit$: response$
	    };
	}
	
	exports.default = function (sources) {
	    return (0, _isolate2.default)((0, _form.Form)(CourseForm))(sources);
	};

/***/ },

/***/ 131:
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
	
	var _goBackable = __webpack_require__(190);
	
	var _goBackable2 = _interopRequireDefault(_goBackable);
	
	var _icon = __webpack_require__(14);
	
	var _icon2 = _interopRequireDefault(_icon);
	
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
	                            (0, _snabbdomJsx.html)(_icon2.default, { glyph: 'long-arrow-left' })
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

/***/ 133:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var courseRatings = ['AAA1', 'AAA2', 'AAA3', 'AA1', 'AA2', 'AA3', 'A1', 'A2', 'A3', 'BB1', 'BB2', 'BB3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3'];
	
	exports.courseRatings = courseRatings;

/***/ },

/***/ 139:
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
	module.exports = {"menu-item":"menu-item-1kFurCYeEM2h2RvJEvIRLk","open":"open-5AIl_2GU_Y03LYvpejX8O","button-dropdown":"button-dropdown-1Ai6Uvld42efQ86Z9wgxjp","dismiss-modal":"dismiss-modal-3z3KZHLIRFL9E3lB179p9k","errors":"errors-1z6hlDsQi_l2SJEay74vvY","warnings":"warnings-1za7YLh0s-3dLsxIisIzAQ","successes":"successes-j0o1gOduPIApFKAEYiRh","error":"error-346-waS-4PW5TU_FDmKLy5","warning":"warning-3hHdeymVFaIMfKh9N9ESMe","success":"success-YcRClaWjhCcqTyufd8i3V","growl_container":"growl_container-j_gA9ZJddeLknXy7jgEA0","growl":"growl-2MItNktw4tmJPq39s0ObBU","show":"show-3gFj3WWByhYE7WAzOEsFWs","hide":"hide-vXBd7Z7781eln4jvBSdLP","fadeInDown":"fadeInDown-1F4qQrcJQs8vJSX8sWdljX","status_bar":"status_bar-2ErhyTzj_wTbqs8si2NC5Y","status_bar-status":"status_bar-status-3FDSq07yMWQMN9n7-vO0ej","tooltip":"tooltip-19iZV4i52ypLApcMSH5KyN","tooltip-bottom":"tooltip-bottom-1KBtw1ENmFk-tQxE3ASGSV","tooltip-left":"tooltip-left-3Jk_rZ1DgiGzV15c2w97Hi","tooltip-right":"tooltip-right-3hutum2LpkdVgDqgprZGGr","tooltip-red":"tooltip-red-1zI-d-5cuSNrtWf0bM1WHe","tooltip-orange":"tooltip-orange-2-53Ut9DmIRZziej2SX4HR","tooltip-yellow":"tooltip-yellow-vHF5AmCWW7ItmCwv9KeXP","tooltip-green":"tooltip-green-zmlFxXZPITwRhNJFG6zO9","tooltip-blue":"tooltip-blue-2-_Z9ZhxWOhhTkDZVVIZzP","tooltip-violet":"tooltip-violet-3aav51W6dKxJNY8FhM23Ax","tooltip-primary":"tooltip-primary-2FsrpMrVLILM8TeucXGuKQ","tooltip-secondary":"tooltip-secondary-HTFw7kcaqX7D6cmf9lyQW","fairway":"fairway-15Tb-xp29qtLF36ok3fIgu"};

/***/ },

/***/ 190:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"goBack":"goBack-mqPHeClHjwWtMG3R0b36M"};

/***/ },

/***/ 282:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(25);
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

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./courses/add/index": 53,
		"./courses/add/index.js": 53,
		"./courses/index": 54,
		"./courses/index.js": 54,
		"./home/index": 55,
		"./home/index.js": 55,
		"./login/index": 56,
		"./login/index.js": 56,
		"./not-found/index": 31,
		"./not-found/index.js": 31
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
	webpackContext.id = 283;


/***/ }

});
//# sourceMappingURL=1.js.map