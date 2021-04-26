import produce from 'immer'
import createReducer from "./ReducerUtil";

const initialState={
    user:{
        _id:"",
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        pictures:[{}],
    },
    token:"",
    picture:{}
 
}
const user={
    saveUser(state,action){
        state.user=action.payload
    },
    saveToken(state,action){
        
        state.token=action.payload
    },
    savePictures(state,action){
        
        state.user.pictures=action.payload
    },
    savePicture(state,action){
        
        state.picture=action.payload
    },
    changeOpen(state,action){
        
        state.user.pictures[action.payload].open=!state.user.pictures[action.payload].open
    }
}

export default produce((state, action) => createReducer(state, action, user), initialState);
