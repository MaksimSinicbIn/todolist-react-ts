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