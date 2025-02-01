import { instance } from "common/instance";
import { BaseResponseType } from "common/types";
import { GetTasksResponse, ArgsAddType, TaskType, UpdateTaskModelType } from "./tasks-api.type";

export const TasksApi = {
    getTasks (todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTasks (arg: ArgsAddType) {
        const { todolistId, title } = arg
        return instance.post<BaseResponseType<{ item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTasks (todolistId: string, taskId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTasks (todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}