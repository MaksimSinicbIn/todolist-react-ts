import { Dispatch } from "redux";
import { setAppError, setAppStatus } from "../state/app-reducer";
import { ResponseType } from "../api/todolist-api";

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
    dispatch(setAppStatus('failed'))
}

export const handleServerNetworkError = <T>(dispatch: Dispatch, e: T) => {
    dispatch(setAppError((e as Error).message))
    dispatch(setAppStatus('failed'))
}