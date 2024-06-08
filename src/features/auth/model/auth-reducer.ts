import { createSlice } from "@reduxjs/toolkit";
import { appActions } from "app/app-reducer";
import { AuthApi } from "../api/auth-api";
import { LoginType } from "../api/auth-api.types";
import { todolistsActions } from "features/TodolistList/todolists-reducer";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils";
import { ResultCode } from "common/enums";

const initialState = {
    isLoggedIn: false,
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authThunks.me.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(authThunks.login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(authThunks.logOut.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
    },
    selectors: {
        selectIsLoggedIn: (state) => state.isLoggedIn
    }
})

// Thunk
const me = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/me`, async (_, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await AuthApi.me()
        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setInitialized({isInitialized: true}))
    }
})

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginType>(`${slice.name}/login`, async (arg, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await AuthApi.login(arg)
        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

const logOut = createAppAsyncThunk<{ isLoggedIn: false }, void>(`${slice.name}/logOut`, async (_, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await AuthApi.logOut()
        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            dispatch(todolistsActions.clearData())
            return {isLoggedIn: false}
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const { selectIsLoggedIn } = slice.selectors
export const authThunks = { me, login, logOut }