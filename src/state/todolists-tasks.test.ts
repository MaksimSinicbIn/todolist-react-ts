import { TaskPriorities, TaskStatuses } from "../api/tasks-api";
import { TodolistApiType } from "../api/todolist-api";
import { TasksStateType, tasksReducer } from "./tasks-reducer"
import { TodolistDomainType, addTodolistAC, removeTodolistAC, todolistsReducer } from "./todolists-reducer"

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    let todolist: TodolistApiType = {
        id: 'any id',
        title: 'New Todolist',
        addedDate: '',
        order: 0
    }

    const action = addTodolistAC(todolist)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
});

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                description: '',
                priority: TaskPriorities.Low,
                order: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                description: '',
                priority: TaskPriorities.Low,
                order: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                description: '',
                priority: TaskPriorities.Low,
                order: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                description: '',
                priority: TaskPriorities.Low,
                order: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                description: '',
                priority: TaskPriorities.Low,
                order: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                description: '',
                priority: TaskPriorities.Low,
                order: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})