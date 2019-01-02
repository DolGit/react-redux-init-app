"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PreMounter = function () {
    function PreMounter() {
        _classCallCheck(this, PreMounter);

        this.fns = [];
    }

    PreMounter.prototype.add = function add(name, fn) {
        this.fns[name] = fn;
    };

    PreMounter.prototype.mount = function mount(initialState, store) {
        Object.values(this.fns).map(function (fn) {
            fn(initialState, store);
        });
    };

    return PreMounter;
}();

var preMounter = new PreMounter();

exports.default = preMounter;
module.exports = exports["default"];