'use strict';

exports.__esModule = true;
exports.history = undefined;
exports.middleware = middleware;

var _redux = require('redux');

var _connectedReactRouter = require('connected-react-router');

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _promise = require('./promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = exports.history = (0, _createBrowserHistory2.default)();
var myRouterMiddleware = (0, _connectedReactRouter.routerMiddleware)(history);
function middleware(logger) {
    if (logger) {
        return (0, _redux.applyMiddleware)(myRouterMiddleware, _promise2.default, logger);
    }
    return (0, _redux.applyMiddleware)(myRouterMiddleware, _promise2.default);
};