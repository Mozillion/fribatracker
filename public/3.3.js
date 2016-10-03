webpackJsonp([3],{

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _mergeSinks = __webpack_require__(12);
	
	var _mergeSinks2 = _interopRequireDefault(_mergeSinks);
	
	var _ramda = __webpack_require__(9);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	var _routes = __webpack_require__(16);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function requireLogin(Component) {
	    return function (sources) {
	        var user$ = sources.user$.take(1);
	        var sinks = {
	            router: user$.filter(function (user) {
	                return !user;
	            }).mapTo(_routes2.default.login)
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

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _snabbdomJsx = __webpack_require__(3);
	
	var _main = __webpack_require__(54);
	
	var _main2 = _interopRequireDefault(_main);
	
	var _mergeSinks = __webpack_require__(12);
	
	var _mergeSinks2 = _interopRequireDefault(_mergeSinks);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function PlainLayout(Page) {
	    return function (sources) {
	        var sinks = Page(sources);
	        sinks.DOM = sinks.DOM.map(function (page) {
	            return (0, _snabbdomJsx.html)(
	                'main',
	                { className: _main2.default.main },
	                page
	            );
	        });
	        return sinks;
	    };
	}
	
	exports.default = PlainLayout;

/***/ },

/***/ 126:
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
	
	var _mainLayout = __webpack_require__(45);
	
	var _mainLayout2 = _interopRequireDefault(_mainLayout);
	
	var _requireLogin = __webpack_require__(44);
	
	var _requireLogin2 = _interopRequireDefault(_requireLogin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Courses(sources) {
	    var vdom$ = _xstream2.default.of((0, _snabbdomJsx.html)(
	        'div',
	        null,
	        'asd'
	    ));
	    return {
	        DOM: vdom$
	    };
	}
	
	exports.default = function (sources) {
	    return (0, _requireLogin2.default)((0, _isolate2.default)((0, _mainLayout2.default)(Courses)))(sources);
	};

/***/ },

/***/ 127:
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
	
	var _mainLayout = __webpack_require__(45);
	
	var _mainLayout2 = _interopRequireDefault(_mainLayout);
	
	var _requireLogin = __webpack_require__(44);
	
	var _requireLogin2 = _interopRequireDefault(_requireLogin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Home(sources) {
	    var vdom$ = _xstream2.default.of((0, _snabbdomJsx.html)(
	        'div',
	        null,
	        'fr'
	    ));
	    return {
	        DOM: vdom$
	    };
	}
	
	exports.default = function (sources) {
	    return (0, _requireLogin2.default)((0, _isolate2.default)((0, _mainLayout2.default)(Home)))(sources);
	};

/***/ },

/***/ 128:
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
	
	var _plainLayout = __webpack_require__(46);
	
	var _plainLayout2 = _interopRequireDefault(_plainLayout);
	
	var _loginForm = __webpack_require__(43);
	
	var _loginForm2 = _interopRequireDefault(_loginForm);
	
	var _mergeSinks = __webpack_require__(12);
	
	var _mergeSinks2 = _interopRequireDefault(_mergeSinks);
	
	var _routes = __webpack_require__(16);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Login(sources) {
	    var loginForm = (0, _loginForm2.default)(sources);
	    var router = _xstream2.default.merge(sources.user$.take(1).filter(function (user) {
	        return user;
	    }).mapTo(_routes2.default.home), loginForm.afterSubmit$.filter(function (_ref) {
	        var response = _ref.response;
	        return response.ok;
	    }).mapTo(_routes2.default.home));
	    return (0, _mergeSinks2.default)({
	        router: router
	    }, loginForm);
	}
	
	exports.default = function (sources) {
	    return (0, _isolate2.default)((0, _plainLayout2.default)(Login))(sources);
	};

/***/ },

/***/ 264:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./courses/index.js": 126,
		"./home/index.js": 127,
		"./login/index.js": 128,
		"./not-found/index.js": 129
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
	webpackContext.id = 264;


/***/ }

});
//# sourceMappingURL=3.js.map