import { BaseResponseType } from "common/types";
import { LoginType, UserType } from "./auth-api.types";
import { instance } from "common/instance";

export const AuthApi = {
    me() {
        return instance.get<BaseResponseType<UserType>>('auth/me')
    },
    login(data: LoginType) {
        return instance.post<BaseResponseType<{ userId: number }>>('auth/login', data)
    },
    logOut() {
        return instance.delete<BaseResponseType>('auth/login')
    }
}