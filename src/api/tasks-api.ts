import axios from "axios";

type ResponseType<T = {}> = {
    fieldErrors: string[]
    resultCode: number
    messages: string[],
    data: T
}

type TaskType = {
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

type UpdateTaskModel = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true
})

export const TaskstApi = {
    getTasks (todolistId: string) {
        return instance.get<GetTasksResponse>(`${todolistId}/tasks`)
    },
    createTasks (todolistId: string, title: string) {
        return instance.post(`${todolistId}/tasks`, {title})
    },
    deleteTasks (todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`${todolistId}/tasks/${taskId}`)
    },
    updateTasks (todolistId: string, taskId: string, title: string) {
        return instance.put(`${todolistId}/tasks/${taskId}`, {title})
    }
}