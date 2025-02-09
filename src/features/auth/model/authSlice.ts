import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { appActions } from "app/appSlice";
import { AuthApi } from "../api/auth-api";
import { LoginType } from "../api/auth-api.types";
import { todolistsActions } from "features/TodolistList/model/todolists/todolistsSlice";
import { createAppAsyncThunk } from "common/utils";
import { ResultCode } from "common/enums";


const initialState = {
    isLoggedIn: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isAnyOf(authThunks.login.fulfilled, authThunks.logOut.fulfilled, authThunks.me.fulfilled),
                (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
                    state.isLoggedIn = action.payload.isLoggedIn;
                })
    },
    selectors: {
        selectIsLoggedIn: (state) => state.isLoggedIn
    }
})

// Thunk
const me = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${authSlice.name}/me`, async (_, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    const res = await AuthApi.me().finally(() => {
        dispatch(appActions.setInitialized({ isInitialized: true }))
    })
    if (res.data.resultCode === ResultCode.success) {
        return { isLoggedIn: true }
    } else {
        return rejectWithValue(res.data)
    }
}
)

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginType>(`${authSlice.name}/login`, async (arg, thunkApi) => {
    const { rejectWithValue } = thunkApi
    const res = await AuthApi.login(arg)
    if (res.data.resultCode === ResultCode.success) {
        return { isLoggedIn: true }
    } else {
        return rejectWithValue(res.data)
    }
})

const logOut = createAppAsyncThunk<{ isLoggedIn: false }, void>(`${authSlice.name}/logOut`, async (_, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    const res = await AuthApi.logOut()
    if (res.data.resultCode === ResultCode.success) {
        dispatch(todolistsActions.clearData())
        return { isLoggedIn: false }
    } else {
        return rejectWithValue(res.data)
    }
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
export const { selectIsLoggedIn } = authSlice.selectors
export const authThunks = { me, login, logOut }