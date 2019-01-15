function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { push } from 'connected-react-router';

import { attachReducers } from '../../reducer-management.js';
import redirectCleanup from '../../reducers/redirect-cleanup';
attachReducers({ 'REDIRECT_CLEANUP': redirectCleanup });

var mapStateToProps = function mapStateToProps(state) {
    return {
        redirect: state.redirect
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        redirectTo: function redirectTo(url) {
            dispatch(push(url));
            dispatch({ type: 'REDIRECT_CLEANUP' });
        }
    };
};

var BaseRouter = function (_React$Component) {
    _inherits(BaseRouter, _React$Component);

    function BaseRouter() {
        _classCallCheck(this, BaseRouter);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    BaseRouter.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.redirect) {
            this.props.redirectTo(nextProps.redirect);
        }
    };

    BaseRouter.prototype.render = function render() {
        return React.createElement(
            'div',
            { className: this.props.className },
            this.props.children
        );
    };

    return BaseRouter;
}(React.Component);

BaseRouter.propTypes = process.env.NODE_ENV !== "production" ? {
    redirect: PropTypes.string
} : {};

export default connect(mapStateToProps, mapDispatchToProps)(BaseRouter);