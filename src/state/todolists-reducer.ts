import { v1 } from "uuid";
import { TodolistApi, TodolistApiType } from "../api/todolist-api";
import { Dispatch } from "redux";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistApiType & {
    filter: FilterValuesType
}

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)]
        case 'CHANGE-TODOLIST-FILTER':
            return [...state.map(tl => tl.id === action.id ? {...tl, filter: action.newFilter} : tl)]
        case 'SET-TODOLIST':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
    default:
        return state;
    }
}

// Action Creators
export const removeTodolistAC = (id: string) => {
    return { type: 'REMOVE-TODOLIST', id} as const
}

export const addTodolistAC = (todolist: TodolistApiType) => {
    return { type: 'ADD-TODOLIST', todolist} as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}

export const changeTodolistFilterAC = (id: string, newFilter: FilterValuesType) => {
    return { type: 'CHANGE-TODOLIST-FILTER', id, newFilter} as const
}

export const setTodolistsAC = (todolists: TodolistApiType[]) => {
    return { type: 'SET-TODOLIST', todolists} as const
}

// Thunk Creators
export const getTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    TodolistApi.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    TodolistApi.createTodolists(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    TodolistApi.deleteTodolists(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
            })
}

export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    TodolistApi.updateTodolists(todolistId, title)
            .then(res => {
                dispatch(changeTodolistTitleAC(todolistId, title))
            })
}