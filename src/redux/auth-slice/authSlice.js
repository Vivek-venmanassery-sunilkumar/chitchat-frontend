import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    username: '',
    authorized: false
}


const authSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers:{
        loggedIn : (state, action) =>{
            state.username = action.payload.username;
            state.authorized = true
        },
        loggedOut: (state) =>{
            state.username = '';
            state.authorized = false
        }
    }
})


export const {loggedIn, loggedOut} = authSlice.actions;
export default authSlice.reducer;