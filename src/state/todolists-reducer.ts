import { v1 } from "uuid";
import { TodolistType } from "../App";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType = 
    RemoveTodolistActionType | 
    AddTodolistActionType | 
    ChangeTodolistTitleActionType | 
    ChangeTodolistFilterActionType

export const todolistsReducer = (state: TodolistType[], action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter( tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, { id: action.todolistId, title: action.title, filter: 'all' }]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map( tl => tl.id === action.id ? {...tl, title: action.title} : tl)]
        case 'CHANGE-TODOLIST-FILTER':
            return [...state.map( tl => tl.id === action.id ? {...tl, filter: action.newFilter} : tl)]
    default:
        return state;
    }
}

export const removeTodolistAC = (id: string) => {
    return { type: 'REMOVE-TODOLIST', id} as const
}

export const addTodolistAC = (title: string) => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}

export const changeTodolistFilterAC = (id: string, newFilter: string) => {
    return { type: 'CHANGE-TODOLIST-FILTER', id, newFilter} as const
}