import { InitialStateType, appReducer, setError, setStatus } from "./app-reducer"

let startState: InitialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: 'loading'
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, setError('some error'))

    expect(endState.error).toBe('some error')
    expect(endState.status).toBe('loading')
})

test('correct status should be changed', () => {

    const endState = appReducer(startState, setStatus('succeeded'))

    expect(endState.status).toBe('succeeded')
    expect(endState.error).toBe(null)
})