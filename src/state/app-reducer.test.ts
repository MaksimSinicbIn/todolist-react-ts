import { InitialStateType, appActions, appReducer } from "./app-reducer"

let startState: InitialStateType

beforeEach(() => {
    startState = {
        isInitialized: false,
        error: null,
        status: 'loading'
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, appActions.setAppError({error: 'some error'}))

    expect(endState.error).toBe('some error')
    expect(endState.status).toBe('loading')
})

test('correct status should be changed', () => {

    const endState = appReducer(startState, appActions.setAppStatus({status: 'succeeded'}))

    expect(endState.status).toBe('succeeded')
    expect(endState.error).toBe(null)
})