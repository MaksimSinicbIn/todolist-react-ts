export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    error: null as null | string,
    status: 'loading' as RequestStatusType,
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export type SetStatusActionType = ReturnType<typeof setStatus>
export type SetErrorActionType = ReturnType<typeof setError>

type ActionsType = SetStatusActionType | SetErrorActionType

export const setStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const) 
export const setError = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const) 