'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var isPromise = function isPromise(action) {
    return action.payload && typeof action.payload.then === 'function';
};
var isInvokable = function isInvokable(action) {
    return isPromise(action) && !action.invoked;
};

exports.default = function (store) {
    return function (next) {
        return function (action) {
            if (!isInvokable(action)) return next(action);

            action.invoked = true;
            store.dispatch(_extends({}, action, { type: action.type + '/pre' }));

            action.payload.then(function (res) {
                action.payload = JSON.parse(res.response);
                store.dispatch(_extends({}, action, { type: action.type + '/success' }));
            }, function (error) {
                action.error = true;
                action.payload = JSON.parse(error.response.body.response);
                if (!action.skipTracking) {
                    store.dispatch(_extends({}, action, { type: action.type + '/fail' }));
                }
            }).catch(function (err) {
                action.error = true;
                action.payload = JSON.parse(error.response.body.response);
                if (!action.skipTracking) {
                    store.dispatch(_extends({}, action, { type: action.type + '/serverError' }));
                }
            });
        };
    };
};

module.exports = exports['default'];