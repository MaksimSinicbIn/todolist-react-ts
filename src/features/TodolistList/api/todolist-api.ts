import { BaseResponseType } from "common/types"
import { instance } from "common/instance"


export type TodolistApiType = {
    "id": string
    "title": string
    "addedDate": string
    "order": number
}

export type ArgUpdateTodolistType = {
    todolistId: string
    title: string
}

export const TodolistApi = {
    getTodolists() {
        return instance.get<TodolistApiType[]>('todo-lists')
    },
    createTodolists(title: string) {
        return instance.post<BaseResponseType<{ item: TodolistApiType }>>('todo-lists', { title })
    },
    deleteTodolists(todolistId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolists(arg: ArgUpdateTodolistType) {
        const { todolistId, title } = arg
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, { title })
    }
}