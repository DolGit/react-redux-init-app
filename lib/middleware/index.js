'use strict';

exports.__esModule = true;
exports.middleware = exports.history = undefined;

var _redux = require('redux');

var _reduxLogger = require('redux-logger');

var _developmentOnly = require('redux-devtools-extension/developmentOnly');

var _connectedReactRouter = require('connected-react-router');

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _promise = require('./promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = exports.history = (0, _createBrowserHistory2.default)();
var myRouterMiddleware = (0, _connectedReactRouter.routerMiddleware)(history);


var getMiddleware = function getMiddleware() {
    if (process.env.NODE_ENV === 'production') {
        return (0, _redux.applyMiddleware)(myRouterMiddleware, _promise2.default);
    } else {
        return (0, _redux.applyMiddleware)(myRouterMiddleware, _promise2.default, (0, _reduxLogger.createLogger)());
    }
};

var middleware = exports.middleware = (0, _developmentOnly.composeWithDevTools)(getMiddleware());