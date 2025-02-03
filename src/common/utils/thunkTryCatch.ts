import { AppDispatch, AppRootStateType } from "app/store";
import { appActions } from "app/appSlice";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { BaseResponseType } from "common/types";
import { handleServerNetworkError } from "./handleServerNetworkError";

// Обертка try/catch
export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    return await logic();
  } catch (e) {
    handleServerNetworkError(dispatch, e);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }));
  }
};
