import { Dispatch } from "redux";
import { appActions } from "app/app-reducer";
import { BaseResponseType } from "common/types";

export const handleServerAppError = <T>(dispatch: Dispatch, data: BaseResponseType<T>) => {
    if (data.messages.length) {
        dispatch(appActions.setAppError({ error: data.messages[0] }))
    } else {
        dispatch(appActions.setAppError({ error: 'Some error occurred' }))
    }
    dispatch(appActions.setAppStatus({ status: 'failed' }))
}