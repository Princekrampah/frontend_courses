import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: {},
    isAuthenticated: false,
    sessionID: ""
}

const authSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.sessionID = localStorage.getItem("session_id")

            localStorage.setItem("account_id", action.payload.id)
        }
    }
})


export const { setUser } = authSlice.actions;

export default authSlice.reducer;

export const userSelector = (state) => state.user