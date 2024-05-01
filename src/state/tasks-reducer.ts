import { v1 } from "uuid"
import { TasksStateType } from "../App"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { TaskPriorities, TaskStatuses } from "../api/tasks-api"

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = 
    RemoveTaskActionType | 
    AddTaskActionType | 
    ChangeTaskStatusActionType | 
    ChangeTaskTitleActionType | 
    AddTodolistActionType |
    RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.todolistId]:state[action.todolistId].filter( t => t.id !== action.id )
            }
        case 'ADD-TASK':
            const newTask = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todolistId,
                description: '',
                priority: TaskPriorities.Low,
                order: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
            return {
                ...state, [action.todolistId]:[newTask, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todolistId]:state[action.todolistId].map( t => t.id === action.id ? {...t, status: action.status} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.todolistId]:state[action.todolistId].map( t => t.id === action.id ? {...t, title: action.title} : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state, [action.todolistId]:[]
            }
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
    default:
        return state
    }
}

export const removeTaskAC = (id: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', id, todolistId} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return { type: 'ADD-TASK',todolistId, title } as const
}

export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string) => {
    return { type: 'CHANGE-TASK-STATUS', id , status, todolistId} as const
}

export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => {
    return { type: 'CHANGE-TASK-TITLE', id, title, todolistId } as const
}