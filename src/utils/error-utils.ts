import { Dispatch } from "redux";
import { appActions } from "../state/app-reducer";
import { ResponseType } from "../api/todolist-api";

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(appActions.setAppError({error: data.messages[0]}))
    } else {
        dispatch(appActions.setAppError({error: 'Some error occurred'}))
    }
    dispatch(appActions.setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = <T>(dispatch: Dispatch, e: T) => {
    dispatch(appActions.setAppError({error: (e as Error).message}))
    dispatch(appActions.setAppStatus({status: 'failed'}))
}