import axios from "axios"
import {ResponseType} from './todolist-api';
import { LoginType } from "../features/Login/Login";

type UserType = {
    id: number,
    email: string
    login: string
}

const instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        headers: {
            'API-KEY': '2d27c019-1d06-4714-83cd-3d363de42b42'
        }
    })

export const AuthApi = {
    me() {
        return instance.get<ResponseType<UserType>>('auth/me')
    },
    login(data: LoginType) {
        return instance.post<ResponseType<{userId: number}>>('auth/login', data)
    },
    logOut() {
        return instance.delete<ResponseType>('auth/login')
    }
}