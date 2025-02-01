import { instance } from "common/instance"
import { BaseResponseType } from "common/types"
import { TodolistApiType, ArgUpdateTodolistType } from "./todolists-api.type"

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