import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn : false,
    username : '',
    token : '',
}

const authSlice = createSlice({
    name : 'auth',
    initialState ,
    reducers :{
        login : (state, action)=>{
            state.isLoggedIn = true;
            state.username = action.payload.username;
            state.token = action.payload.token;
        },
        logout : (state) =>{
            state.isLoggedIn = false;
            state.username = '';
            state.token = '';
        }
    }
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
