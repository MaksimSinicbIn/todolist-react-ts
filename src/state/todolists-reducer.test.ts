import { ActionForTest } from 'components/types/ActionForTest'
import { TodolistApiType } from '../api/todolist-api'
import { RequestStatusType } from './app-reducer'
import { FilterValuesType, TodolistDomainType, todolistsActions, todolistsReducer, todolistsThunks } from './todolists-reducer'
import { v1 } from 'uuid'

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0 },
        { id: todolistId2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0 }
    ]
})

test('correct todolist should be removed', () => {

    const action: ActionForTest<typeof todolistsThunks.removeTodolist.fulfilled> = {
        type: todolistsThunks.removeTodolist.fulfilled.type,
        payload: {
            id: todolistId1
        }
    }

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    let newTodolist: TodolistApiType = {
        id: 'any id',
        title: 'New Todolist',
        addedDate: '',
        order: 0
    }

    const action: ActionForTest<typeof todolistsThunks.addTodolist.fulfilled> = {
        type: todolistsThunks.addTodolist.fulfilled.type,
        payload: { todolist: newTodolist }
    }

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolist.title)
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const action: ActionForTest<typeof todolistsThunks.changeTodolistTitle.fulfilled> = {
        type: todolistsThunks.changeTodolistTitle.fulfilled.type,
        payload: { todolistId: todolistId2, title: newTodolistTitle }
    }

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed'

    const endState = todolistsReducer(startState, todolistsActions.changeTodolistFilter({ id: todolistId2, newFilter }))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('todolists should be set to the state', () => {

    const action: ActionForTest<typeof todolistsThunks.fetchTodolists.fulfilled> = {
        type: todolistsThunks.fetchTodolists.fulfilled.type,
        payload: { todolists: startState }
    }

    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})

test('correct entity status of todolist should be changed', () => {

    let newStatus: RequestStatusType = 'loading'

    const endState = todolistsReducer(startState, todolistsActions.changeTodolistEntityStatus({ id: todolistId2, entityStatus: newStatus }))

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe(newStatus)
})