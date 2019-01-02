const isPromise = (action) => action.payload && typeof action.payload.then === 'function'
const isInvokable = (action) => isPromise(action) && !action.invoked

export default store => next => action => {
    if (!isInvokable(action)) return next(action)

    action.invoked = true
    store.dispatch({ ...action, type: `${action.type}/pre` });

    action.payload.then(
        res => {
            action.payload = JSON.parse(res.response);
            store.dispatch({ ...action, type: `${action.type}/success` });
        },
        error => {
            action.error = true;
            action.payload = JSON.parse(error.response.body.response);
            if (!action.skipTracking) {
                store.dispatch({ ...action, type: `${action.type}/fail` });
            }
        },
    ).catch(err => {
        console.log('something went wrong')
        // action.error = true;
        // action.payload = JSON.parse(error.response.body.response);
        // if (!action.skipTracking) {
        //     store.dispatch({ ...action, type: `${action.type}/fail` });
        // }
    });
};
