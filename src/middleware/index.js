import { applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();
const myRouterMiddleware = routerMiddleware(history);
import promiseMiddleware from './promise'

export function middleware(logger) {
    if (logger) {
        return applyMiddleware(myRouterMiddleware, promiseMiddleware, logger)
    }
    return applyMiddleware(myRouterMiddleware, promiseMiddleware)
};