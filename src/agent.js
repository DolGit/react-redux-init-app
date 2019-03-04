import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
    if (token) {
        req.set('authorization', `Token ${token}`);
    }
}

const csrfToken = document.head.querySelector('meta[name=csrf-token]').content

const setDefaults = (req) => req.set('X-CSRF-Token', csrfToken).use(tokenPlugin).then(responseBody)

const requests = {
    del: url => setDefaults(superagent.del(url)),
    get: (url, body) => setDefaults(superagent.get(url).query(body)),
    put: (url, body) => setDefaults(superagent.put(url, body)),
    post: (url, body) => setDefaults(superagent.post(url, body)),
    fileUpload: (url, body, fileParam, file, progressDispatch) => {
        return setDefaults(superagent.post(url).field("body", JSON.stringify(body)).attach(fileParam, file).on( 'progress', ( event ) => { progressDispatch(event.percent) }))
    }
};

export default {
    encode,
    requests,
    setToken: _token => { token = _token; }
};