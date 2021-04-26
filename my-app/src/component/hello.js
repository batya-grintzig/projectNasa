import React from "react";
import { withRouter } from 'react-router-dom';
import { compose } from "redux";
import { connect } from "react-redux";

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
    }
}

export default compose(withRouter, connect(mapStateToProps))(function Hello(props) {

    const { user } = props
    return (
        <>
            <div className="d-flex justify-content-start" >
                <h4  style={{margin:"30px"}} className="hello"> {user.firstName} {user.lastName}</h4>
            </div>
        </>
    );
}
)

