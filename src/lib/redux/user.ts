import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state,action) =>{
            state.user =  action.payload
        }
    }
})

export const {setUser} = userSlice.actions

export const selectUser = (stae:RootState) => stae.user.value

export default userSlice.reducer