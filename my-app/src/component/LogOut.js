import React from 'react';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { compose } from "redux";
import { actions } from "../redux/stor/action";
import {  Button } from 'react-bootstrap'

const mapDispatchToProps = (dispatch) => {
    return {
        saveUser: (user) => { dispatch(actions.saveUser(user)) }
    }
}

export default compose(withRouter, connect(null, mapDispatchToProps))(function LogOut(props) {
    const { history, saveUser } = (props)
    const logOutUser = () => {
        localStorage.clear()
        saveUser({})
        history.push('/sign-up')
    };
    return (
    <>
        <div className="d-flex justify-content-end" style={{ margin: "30px" }}>
            <Button className="btn btn-dark" onClick={logOutUser}>
                Log Out
            </Button>
        </div>
    </>)
})