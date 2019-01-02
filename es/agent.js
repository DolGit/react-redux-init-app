import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

var superagent = superagentPromise(_superagent, global.Promise);

var API_ROOT = process.env.NODE_ENV === 'production' ? 'https://eduian-audio-staging.herokuapp.com' : 'http://localhost:5000';
// const API_ROOT = process.env.NODE_ENV === 'production' ? 'https://eduian.com' : 'http://192.168.1.249:5000';

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
        return setDefaults(superagent.del('' + API_ROOT + url));
    },
    get: function get(url, body) {
        return setDefaults(superagent.get('' + API_ROOT + url).query(body));
    },
    put: function put(url, body) {
        return setDefaults(superagent.put('' + API_ROOT + url, body));
    },
    post: function post(url, body) {
        return setDefaults(superagent.post('' + API_ROOT + url, body));
    },
    fileUpload: function fileUpload(url, body, fileParam, file, progressDispatch) {
        return setDefaults(superagent.post('' + API_ROOT + url).attach(fileParam, file).on('progress', function (event) {
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

// const Auth = {
//     current: () =>
//         requests.get('/user'),
//     login: (email, password) =>
//         requests.post('/users/login', { user: { email, password } }),
//     register: (username, email, password) =>
//         requests.post('/users', { user: { username, email, password } }),
//     save: user =>
//         requests.put('/user', { user })
// };
//
// const Tags = {
//     getAll: () => requests.get('/tags')
// };
//
// const Tracks = {
//     create: (type) => requests.post('/track', {type})
// }
//
// const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
// const omitSlug = article => Object.assign({}, article, { slug: undefined })
// const Articles = {
//     all: page =>
//         requests.get(`/articles?${limit(10, page)}`),
//     byAuthor: (author, page) =>
//         requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
//     byTag: (tag, page) =>
//         requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
//     del: slug =>
//         requests.del(`/articles/${slug}`),
//     favorite: slug =>
//         requests.post(`/articles/${slug}/favorite`),
//     favoritedBy: (author, page) =>
//         requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
//     feed: () =>
//         requests.get('/articles/feed?limit=10&offset=0'),
//     get: slug =>
//         requests.get(`/articles/${slug}`),
//     unfavorite: slug =>
//         requests.del(`/articles/${slug}/favorite`),
//     update: article =>
//         requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
//     create: article =>
//         requests.post('/articles', { article })
// };
//
// const Comments = {
//     create: (slug, comment) =>
//         requests.post(`/articles/${slug}/comments`, { comment }),
//     delete: (slug, commentId) =>
//         requests.del(`/articles/${slug}/comments/${commentId}`),
//     forArticle: slug =>
//         requests.get(`/articles/${slug}/comments`)
// };
//
// const Profile = {
//     follow: username =>
//         requests.post(`/profiles/${username}/follow`),
//     get: username =>
//         requests.get(`/profiles/${username}`),
//     unfollow: username =>
//         requests.del(`/profiles/${username}/follow`)
// };
//
// export default {
//     Tracks,
//     Articles,
//     Auth,
//     Comments,
//     Profile,
//     Tags,
//     setToken: _token => { token = _token; }
// };