import { TodolistApi, TodolistApiType } from "../api/todolist-api";
import { Dispatch } from "redux";
import { RequestStatusType, SetErrorActionType, SetStatusActionType, setAppStatus } from "./app-reducer";
import { handleServerNetworkError } from "../utils/error-utils";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
    | ChangeTodolistEntityStatusActionType
    | SetStatusActionType
    | SetErrorActionType


export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistApiType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{ ...action.todolist, filter: 'all', entityStatus: 'idle' }, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl)]
        case 'CHANGE-TODOLIST-FILTER':
            return [...state.map(tl => tl.id === action.id ? { ...tl, filter: action.newFilter } : tl)]
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return [...state.map(tl => tl.id === action.id ? { ...tl, entityStatus: action.entityStatus } : tl)]
        case 'SET-TODOLIST':
            return action.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
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

export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
    return { type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus} as const
}

// Thunk Creators
export const getTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))
    TodolistApi.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatus('succeeded'))
            })
            .catch(e => {
                handleServerNetworkError(dispatch, e)
            })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))
    TodolistApi.createTodolists(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatus('succeeded'))
            })
            .catch(e => {
                handleServerNetworkError(dispatch, e)
            })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    TodolistApi.deleteTodolists(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatus('succeeded'))
            })
            .catch(e => {
                handleServerNetworkError(dispatch, e)
            })
}

export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    TodolistApi.updateTodolists(todolistId, title)
            .then(res => {
                dispatch(changeTodolistTitleAC(todolistId, title))
            })
            .catch(e => {
                handleServerNetworkError(dispatch, e)
            })
}