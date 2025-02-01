import { TaskPriorities, TaskStatuses } from "common/enums"

export type GetTasksResponse = {
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