import React from "react"
import ReactDOM from "react-dom"
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter, connectRouter } from 'connected-react-router'

import { middleware, history } from './middleware'
import agent from './agent.js'

import { MuiThemeProvider } from '@material-ui/core/styles'
import BaseRouter from './components/base-router/BaseRouter.jsx'
import DefaultComponents from './components/default-components/DefaultComponents.jsx'

import PreMounter from './pre-mounter.js'

import { initialState, reducers, attachReducers, combineXhrReducers, attachState, createReducer } from './reducer-management.js'

export function InitApp(opts) {
    const reducer = createReducer(initialState, reducers)
    store = createStore(connectRouter(history)(reducer), initialState, middleware(opts.logger))

    return function(App, props) {
        let app = React.createElement(App, props)
        if (opts.theme) app = React.createElement(MuiThemeProvider, {theme: opts.theme}, app)

        if (opts.defaultComponents) {
            app = React.createElement(DefaultComponents, {components: opts.defaultComponents}, app)
        }
        app = React.createElement(ConnectedRouter, {history}, app)
        app = React.createElement(Provider, {store}, app)

        return function(handle) {
            PreMounter.mount(initialState, store)
            const el = document.getElementById(handle)
            ReactDOM.render(app, el)
        }
    }

}

export {
    initialState,
    reducers,
    attachReducers,
    attachState,
    combineXhrReducers,
    BaseRouter,
    history,
    PreMounter,
    agent
}
export var store
