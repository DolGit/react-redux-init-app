#### Regarding promise middleware
There's 3 dispatches that happen on every request given the appropriate property:
1. pre is before the request is made, mainly for loading things
2. success is for after the request is made and is successful
3. fail is for after the request if unsuccessful

Each of these actions are namespaced to the original action. They are set up using a function called combineXhrReducers.