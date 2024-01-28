import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    data: null,
    isLoggedIn: false
};

export const authSlice = createSlice({
    name: 'authApi',
    initialState,
    reducers: {
        setAuthState: (state, action) => {
            state.data = action.payload;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        logout: (state) => {
            state.data = null;
            state.isLoggedIn = false
        },
        // getProfile: (state, action) => {
        //     state.data = action.payload;
        //     state.isLoggedIn = action.payload.isLoggedIn;
        // }
    },
    
});

export const { setAuthState } = authSlice.actions;
export const { logout } = authSlice.actions;

export default authSlice.reducer