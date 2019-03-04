'use strict';

exports.__esModule = true;

var _superagentPromise = require('superagent-promise');

var _superagentPromise2 = _interopRequireDefault(_superagentPromise);

var _superagent2 = require('superagent');

var _superagent3 = _interopRequireDefault(_superagent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var superagent = (0, _superagentPromise2.default)(_superagent3.default, global.Promise);

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
        return setDefaults(superagent.post(url, body).attach(fileParam, file).on('progress', function (event) {
            progressDispatch(event.percent);
        }));
    }
};

exports.default = {
    encode: encode,
    requests: requests,
    setToken: function setToken(_token) {
        token = _token;
    }
};
module.exports = exports['default'];