class PreMounter {
    constructor() {
        this.fns = []
    }

    add(name, fn) {
        this.fns[name] = fn
    }

    mount(initialState, store) {
        Object.values(this.fns).map((fn) => {
            fn(initialState, store)
        })
    }
}

const preMounter = new PreMounter

export default preMounter