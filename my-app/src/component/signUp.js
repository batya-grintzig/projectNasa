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
    savePicture: (picture) => { dispatch(actions.savePicture(picture)) },
    savePictures: (pictures) => { dispatch(actions.savePictures(pictures)) },
  }
}
export default compose(withRouter, connect(null, mapDispatchToProps))(function SignUp(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { history, saveUser, savePicture,savePictures ,saveToken} = props

  const handlerSubmit = event => {
    event.preventDefault();
    axios.post("http://localhost:3400/createUser", { firstName, lastName, password, email })
      .then(respons => {
        saveUser(respons.data.user);
        saveToken(respons.data.token)
        savePictures(respons.data.pic)
        savePicture(respons.data.picture);
        history.push("/picture");
      }).catch(err => {
        alert("sign up failed")
      })
  }

  async function toConnect() {
    history.push("/login");
  }

  return (
    <form onSubmit={handlerSubmit} className="auth-inner">
      <h1>Sign In</h1>
      <div className="form-group">
        <label>First name</label>
        <input type="text" className="form-control" placeholder="First name" onChange={(e) => { setFirstName(e.target.value) }} />
      </div>
      <div className="form-group">
        <label>Last name</label>
        <input type="text" className="form-control" placeholder="Last name" onChange={(e) => { setLastName(e.target.value) }} />
      </div>
      <div className="form-group">
        <label>Email address</label>
        <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => { setPassword(e.target.value) }} />
      </div>

      <button type="submit" className="btn btn-dark btn-block">Sign Up</button>
      <button className="btn" onClick={toConnect}>Already registered? To connect</button>
    </form>

  );
}
)
