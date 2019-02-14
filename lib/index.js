"use strict";

exports.__esModule = true;
exports.store = exports.agent = exports.PreMounter = exports.history = exports.BaseRouter = exports.combineXhrReducers = exports.attachState = exports.attachReducers = exports.reducers = exports.initialState = undefined;
exports.InitApp = InitApp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _connectedReactRouter = require("connected-react-router");

var _middleware = require("./middleware");

var _agent = require("./agent.js");

var _agent2 = _interopRequireDefault(_agent);

var _styles = require("@material-ui/core/styles");

var _BaseRouter = require("./components/base-router/BaseRouter.js");

var _BaseRouter2 = _interopRequireDefault(_BaseRouter);

var _DefaultComponents = require("./components/default-components/DefaultComponents.js");

var _DefaultComponents2 = _interopRequireDefault(_DefaultComponents);

var _preMounter = require("./pre-mounter.js");

var _preMounter2 = _interopRequireDefault(_preMounter);

var _reducerManagement = require("./reducer-management.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InitApp(opts) {
    var reducer = (0, _reducerManagement.createReducer)(_reducerManagement.initialState, _reducerManagement.reducers);
    exports.store = store = (0, _redux.createStore)((0, _connectedReactRouter.connectRouter)(_middleware.history)(reducer), _reducerManagement.initialState, (0, _middleware.middleware)(opts.logger));

    return function (App, props) {
        var app = _react2.default.createElement(App, props);
        if (opts.theme) app = _react2.default.createElement(_styles.MuiThemeProvider, { theme: opts.theme }, app);

        if (opts.defaultComponents) {
            app = _react2.default.createElement(_DefaultComponents2.default, { components: opts.defaultComponents }, app);
        }
        app = _react2.default.createElement(_connectedReactRouter.ConnectedRouter, { history: _middleware.history }, app);
        app = _react2.default.createElement(_reactRedux.Provider, { store: store }, app);

        return function (handle) {
            _preMounter2.default.mount(_reducerManagement.initialState, store);
            var el = document.getElementById(handle);
            _reactDom2.default.render(app, el);
        };
    };
}

var store = {};

exports.initialState = _reducerManagement.initialState;
exports.reducers = _reducerManagement.reducers;
exports.attachReducers = _reducerManagement.attachReducers;
exports.attachState = _reducerManagement.attachState;
exports.combineXhrReducers = _reducerManagement.combineXhrReducers;
exports.BaseRouter = _BaseRouter2.default;
exports.history = _middleware.history;
exports.PreMounter = _preMounter2.default;
exports.agent = _agent2.default;
exports.store = store;