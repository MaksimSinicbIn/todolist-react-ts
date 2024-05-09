import axios from "axios"

export type TodolistApiType = {
    "id": string
    "title": string
    "addedDate": string
    "order": number
}

type ResponseType<T = {}> = {
    fieldErrors: string[]
    resultCode: number
    messages: string[],
    data: T
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '166e7c49-1746-4879-b147-67bd3a0c0a4a'
    }
})

export const TodolistApi = {
    getTodolists () {
        return instance.get<TodolistApiType[]>('todo-lists')
    },
    createTodolists (title: string) {
        return instance.post<ResponseType<{item: TodolistApiType}>>('todo-lists', {title})
    },
    deleteTodolists (todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolists (todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    }
}