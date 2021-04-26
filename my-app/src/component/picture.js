import axios from "axios";
import React from "react";
import { actions } from "../redux/stor/action";
// import firebase from "../firebase/firebase";
import { withRouter } from 'react-router-dom';
import { compose } from "redux";
import { connect } from "react-redux";

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        // url: state.userReducer.url,
        token: state.userReducer.token,
        pictures: state.userReducer.user.pictures,
        picture: state.userReducer.picture
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // saveUrl: (url) => { dispatch(actions.saveUrl(url)) },
        // saveUser: (user) => { dispatch(actions.saveUser(user)) },
        // saveToken: (token) => { dispatch(actions.saveToken(token)) },
        savePictures: (pictures) => { dispatch(actions.savePictures(pictures)) }
    }
}


export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(function Picture(props) {

    const { history, token, savePictures, picture } = props
    // const [file, setFile] = useState(""); // storing the uploaded file    // storing the recived file from backend
    function showYourPictures() {
        history.push("/stockImages");
    }
    async function upLoadImage(e) {
        if (e.target.files && e.target.files[0]) {
            e.preventDefault()
            let reader = new FileReader();
            let file = e.target.files[0]
            // reader.onloadend = () => {
            //     setFile(file);
            // };
            reader.readAsDataURL(file);
            const formData = new FormData();
            formData.append("file", file, file.name);
           
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: token
                }
            };
            axios.post("http://localhost:3400/upLoadImage", formData, config)
                .then(res => {
                    // saveUser(res.data.user);
                    alert('התמונה הועלתה בהצלחה')
                    savePictures(res.data.pictures)
                }).catch(err => {
                    alert("sign up failed")
                })
        }
    }

    return (
        <>
            <div className="row" >
                <div className="col-12">
                    <h2>picture of the day </h2>
                    <div className="d-flex justify-content-center">
                    {/* alt="Card image cap" */}
                        {picture.media_type === 'image' ? (
                            <img src={picture.url} style={{ width: '50px' }, { height: '500px' }} alt=""/>)
                            : (
                                <iframe className="d-flex justify-content-center" style={{ height: '300px' }}  title="" src={picture.url} ></iframe>
                            )}
                    </div>
                </div>
                <br />
                <div className="col-12">
                    <div className="d-flex justify-content-center">
                        <input type="file" className="fileInput btn btn-default btn-file" accept="image/png, image/jpeg" onChange={upLoadImage}></input>
                        <button className="btn btn-dark" onClick={showYourPictures}>לצפיה במאגר התמונות</button>
                    </div>
                </div>
            </div>
        </>
    );
}
)


