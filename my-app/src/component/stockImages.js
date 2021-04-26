import React from 'react';
import { Collapse, Button } from 'react-bootstrap'
import { connect } from "react-redux";
import { actions } from "../redux/stor/action";
import { withRouter } from 'react-router-dom';
import { compose } from "redux";

function mapStateToProps(state) {
    return {
        pictures: state.userReducer.user.pictures,
        user: state.userReducer.user,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeOpen: (i) => { dispatch(actions.changeOpen(i)) }
    }
}
export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(function StockImages(props) {
    function toBack() {
        history.push("/picture");
    }
    const { history, pictures ,changeOpen} = props
    function setOpen(i) {
        changeOpen(i)
    }
    return (
        <>
            <Button className="btn btn-dark m-5" onClick={toBack}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
                    <path  d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    <path  d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                </svg>
            </Button>
            <div className="container-fluid" >
                <div className="row">
                    {pictures.map((keyName, i) => (
                        <div key={i} className="col-3" >
                            <div className="card"   >
                                <div >
                                    {keyName.media_type === 'image' ? (
                                        <img style={{ height: '100%' }, { width: '100%' }} src={keyName.url} alt=""></img>
                                    )
                                        : (
                                            <iframe style={{ height: '300px' }} src={keyName.url} title="My Daily Marathon Tracker" ></iframe>
                                        )}
                                </div>
                                <div className="card-body" >
                                    <h5 className="card-title">The Title: {keyName.title}</h5>
                                    <p style={{ textAlign: "center" }}>The Date: {keyName.date}</p>
                                    <Button className="btn btn-dark"
                                        onClick={() => setOpen(i)}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={keyName.open}
                                    >
                                        To  explanation
                                   </Button>
                                    <Collapse in={keyName.open}>
                                        <div id="example-collapse-text">
                                            {keyName.explanation}
                                        </div>
                                    </Collapse>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
)


