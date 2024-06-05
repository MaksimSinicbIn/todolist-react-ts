import axios from "axios";
import {ResponseType} from './todolist-api';

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export enum TaskStatuses {
    New = 0,
    inProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '2d27c019-1d06-4714-83cd-3d363de42b42'
    }
})

export const TasksApi = {
    getTasks (todolistId: string) {
        return instance.get<GetTasksResponse>(`${todolistId}/tasks`)
    },
    createTasks (arg: ArgsAddType) {
        const { todolistId, title } = arg
        return instance.post<ResponseType<{ item: TaskType}>>(`${todolistId}/tasks`, {title})
    },
    deleteTasks (todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`${todolistId}/tasks/${taskId}`)
    },
    updateTasks (todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType>(`${todolistId}/tasks/${taskId}`, model)
    }
}

export type ArgsAddType = {
    todolistId: string,
    title: string
}

export type ArgsUpdateTaskType = {
    taskId: string,
    domainModel: Partial<UpdateTaskModelType>,
    todolistId: string
}

export type ArgsRemoveTaskType = {
    todolistId: string,
    taskId: string
}