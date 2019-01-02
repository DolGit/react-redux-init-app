"use strict";

exports.__esModule = true;
exports.attachState = attachState;
exports.attachReducers = attachReducers;
exports.combineXhrReducers = combineXhrReducers;
exports.createReducer = createReducer;
var reducers = {};
exports.reducers = reducers;


var initialState = {};
exports.initialState = initialState;
function attachState(state) {
    for (var name in state) {
        initialState[name] = state[name];
    }
}

function attachReducers(defaultReducers) {
    for (var name in defaultReducers) {
        reducers[name] = defaultReducers[name];
    }
}

function combineXhrReducers(subReducers) {
    for (var _iterator = subReducers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var subReducerObject = _ref;

        for (var subReducerName in subReducerObject) {
            var subReducer = subReducerObject[subReducerName];
            for (var name in subReducer) {
                reducers[subReducerName + "/" + name] = subReducer[name];
            }
        }
    }
}

function createReducer(initialState, handlers) {
    return function reducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments[1];

        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
}