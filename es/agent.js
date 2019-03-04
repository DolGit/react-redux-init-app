import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

var superagent = superagentPromise(_superagent, global.Promise);

var encode = encodeURIComponent;
var responseBody = function responseBody(res) {
    return res.body;
};

var token = null;
var tokenPlugin = function tokenPlugin(req) {
    if (token) {
        req.set('authorization', 'Token ' + token);
    }
};

var csrfToken = document.head.querySelector('meta[name=csrf-token]').content;

var setDefaults = function setDefaults(req) {
    return req.set('X-CSRF-Token', csrfToken).use(tokenPlugin).then(responseBody);
};

var requests = {
    del: function del(url) {
        return setDefaults(superagent.del(url));
    },
    get: function get(url, body) {
        return setDefaults(superagent.get(url).query(body));
    },
    put: function put(url, body) {
        return setDefaults(superagent.put(url, body));
    },
    post: function post(url, body) {
        return setDefaults(superagent.post(url, body));
    },
    fileUpload: function fileUpload(url, body, fileParam, file, progressDispatch) {
        return setDefaults(superagent.post(url).field("body", JSON.stringify(body)).attach(fileParam, file).on('progress', function (event) {
            progressDispatch(event.percent);
        }));
    }
};

export default {
    encode: encode,
    requests: requests,
    setToken: function setToken(_token) {
        token = _token;
    }
};