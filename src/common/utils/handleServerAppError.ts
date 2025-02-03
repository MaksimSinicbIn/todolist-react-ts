import { Dispatch } from "redux";
import { appActions } from "app/appSlice";
import { BaseResponseType } from "common/types";

export const handleServerAppError = <D>(
    dispatch: Dispatch,
    data: BaseResponseType<D>,
    showError: boolean = true,
): void => {
    if (showError) {
        dispatch(appActions.setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }));
    }
};