var reducers = {}
export {reducers}

var initialState = {}
export {initialState}

export function attachState(state) {
    for (var name in state) {
        initialState[name] = state[name]
    }
}

export function attachReducers(defaultReducers) {
    for (var name in defaultReducers) {
        reducers[name] = defaultReducers[name]
    }
}

export function combineXhrReducers(subReducers) {
    for (let subReducerObject of subReducers) {
        for (let subReducerName in subReducerObject) {
            let subReducer = subReducerObject[subReducerName]
            for (let name in subReducer) {
                reducers[`${subReducerName}/${name}`] = subReducer[name]
            }
        }
    }

}

export function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}