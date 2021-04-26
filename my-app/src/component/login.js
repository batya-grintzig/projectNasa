import axios from "axios";
import React, { useState } from "react";
import { actions } from "../redux/stor/action";
import { withRouter } from 'react-router-dom';
import { compose } from "redux";
import { connect } from "react-redux";


const mapDispatchToProps = (dispatch) => {
    return {
        saveUser: (user) => { dispatch(actions.saveUser(user)) },
        saveToken: (token) => { dispatch(actions.saveToken(token)) },
        savePictures: (pictures) => { dispatch(actions.savePictures(pictures)) },
        savePicture: (picture) => { dispatch(actions.savePicture(picture)) }
    }
}

export default compose(withRouter, connect(null, mapDispatchToProps))(function Login(props) {
    const { history, savePicture, saveUser, saveToken, savePictures } = props
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlerSubmit = event => {
        event.preventDefault();
        axios.post("http://localhost:3400/loginUser", { password, email })
            .then(respons => {
            //     if(respons.data.err)
            //    alert(respons.data.err);
          
                saveUser(respons.data.user);
                saveToken(respons.data.token)
                savePicture(respons.data.picture);
                savePictures(respons.data.pic)
                history.push("/picture");
            }).catch(err => {
                alert("Incorrect username and password")
                history.push("/")
            })
    }
    return (
        <>
            <form onSubmit={handlerSubmit}id="loginForm" className="auth-inner">
                <h1>Sign In</h1>
                <div className="form-group">
                    <label >Email address</label>
                    <input type="email" className="form-control" onChange={(e) => { setEmail(e.target.value) }}  placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="form-control"  placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-dark btn-block">Submit</button>
            </form>
        </>
    );
})

