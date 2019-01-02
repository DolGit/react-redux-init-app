import React from 'react';

class DefaultComponents extends React.Component {
    render() {
        const Components = this.props.components
        return(
            <div>
                {this.props.children}
                <Components />
            </div>
        )
    }

}

export default DefaultComponents