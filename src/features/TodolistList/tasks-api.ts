import { TaskPriorities, TaskStatuses } from "common/enums";
import { instance } from "common/instance/instance";
import { BaseResponseType } from "common/types";

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

export const TasksApi = {
    getTasks (todolistId: string) {
        return instance.get<GetTasksResponse>(`${todolistId}/tasks`)
    },
    createTasks (arg: ArgsAddType) {
        const { todolistId, title } = arg
        return instance.post<BaseResponseType<{ item: TaskType}>>(`${todolistId}/tasks`, {title})
    },
    deleteTasks (todolistId: string, taskId: string) {
        return instance.delete<BaseResponseType>(`${todolistId}/tasks/${taskId}`)
    },
    updateTasks (todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<BaseResponseType>(`${todolistId}/tasks/${taskId}`, model)
    }
}