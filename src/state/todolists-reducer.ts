import { TodolistApi, TodolistApiType } from "../api/todolist-api";
import { Dispatch } from "redux";
import { RequestStatusType, SetAppErrorActionType, SetAppInitializedActionType, SetAppStatusActionType, setAppStatus } from "./app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";

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
    | SetAppStatusActionType
    | SetAppErrorActionType
    | SetAppInitializedActionType


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
export const getTodolistsTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await TodolistApi.getTodolists()
        dispatch(setTodolistsAC(res.data))
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }
}

export const addTodolistTC = (title: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await TodolistApi.createTodolists(title)
        if (res.data.resultCode === 0) {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }
}

export const removeTodolistTC = (todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatus('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    try {
        const res = await TodolistApi.deleteTodolists(todolistId)
        if (res.data.resultCode === 0) {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }
}

export const updateTodolistTC = (todolistId: string, title: string) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        const res = await TodolistApi.updateTodolists(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(changeTodolistTitleAC(todolistId, title))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }
}