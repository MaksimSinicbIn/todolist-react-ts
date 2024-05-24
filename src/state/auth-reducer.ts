import { Dispatch } from 'redux'
import { appActions } from './app-reducer'
import { AuthApi } from '../api/auth-api'
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils'
import { LoginType } from '../features/Login/Login'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppThunk } from './store'

const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer
export const authActions = slice.actions

// Thunk Creators
export const meTC = (): AppThunk => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await AuthApi.me()
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    } finally {
        dispatch(appActions.setInitialized({isInitialized: true}))
    }
}

export const loginTC = (data: LoginType): AppThunk => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await AuthApi.login(data)
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }
}

export const logOutTC = (): AppThunk => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await AuthApi.logOut()
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }
}

