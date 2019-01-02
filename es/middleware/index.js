import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { routerMiddleware } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';

export var history = createHistory();
var myRouterMiddleware = routerMiddleware(history);
import promiseMiddleware from './promise';

var getMiddleware = function getMiddleware() {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(myRouterMiddleware, promiseMiddleware);
    } else {
        return applyMiddleware(myRouterMiddleware, promiseMiddleware, createLogger());
    }
};

export var middleware = composeWithDevTools(getMiddleware());