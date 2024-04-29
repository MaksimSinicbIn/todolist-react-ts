import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const TodolistApi = {
    getTodolists () {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolists (title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodolists (todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolists (todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
}

type TodolistType = {
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