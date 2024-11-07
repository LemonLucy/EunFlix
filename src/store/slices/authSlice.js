//상태와 리듀서, 액션을 하나의 Slice로 묶어 관리
//상태와 액션을 정의
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    password: '',
    isAuthenticated: false,
    error: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEmail: (state, action) => {
        state.email = action.payload;
        },
        setPassword: (state, action) => {
        state.password = action.payload;
        },
        setError: (state, action) => {
        state.error = action.payload;
        },
        loginSuccess: (state) => {
        state.isAuthenticated = true;
        state.error = '';
        },
        logout: (state) => {
        state.isAuthenticated = false;
        state.email = '';
        state.password = '';
        },
    },
});

export const { setEmail, setPassword, setError, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;