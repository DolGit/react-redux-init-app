import React from 'react'
import PropTypes from 'prop-types';

import {connect} from "react-redux";
import { push } from 'connected-react-router'

import { attachReducers } from '../../reducer-management.js'
import redirectCleanup from '../../reducers/redirect-cleanup'
attachReducers({'REDIRECT_CLEANUP': redirectCleanup})

const mapStateToProps = state => {
    return {
        redirect: state.redirect
    }
};

const mapDispatchToProps = dispatch => ({
    redirectTo: (url) => {
        dispatch(push(url))
        dispatch({ type: 'REDIRECT_CLEANUP' })
    },
});

class BaseRouter extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.redirect) {
            this.props.redirectTo(nextProps.redirect)
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                {this.props.children}
            </div>
        )
    }
}

BaseRouter.propTypes = {
    redirect: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseRouter);