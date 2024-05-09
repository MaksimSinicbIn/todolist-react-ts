import { addTaskAC, removeTaskAC, setTasksAC, tasksReducer, updateTaskAC } from './tasks-reducer'
import { TasksStateType } from '../App'
import { addTodolistAC, removeTodolistAC, setTodolistsAC } from './todolists-reducer';
import { TaskPriorities, TaskStatuses } from '../api/tasks-api';

let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
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
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('todolistId2', '2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every( t => t.id !== '2')).toBeTruthy();
});

test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        id: '3',
        title: 'juice',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        priority: TaskPriorities.Low,
        order: 0,
        startDate: '',
        deadline: '',
        addedDate: ''
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juice');
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

test('status of specified task should be changed', () => {

    const action = updateTaskAC('todolistId2', '2', {status: TaskStatuses.New} )

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
});

test('title of specified task should be changed', () => {

    const action = updateTaskAC('todolistId2', '2', { title: 'beer'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId2'][1].title).toBe('beer')
});

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({
        id: '1',
        title: 'What to learn',
        addedDate: '',
        order: 0
    })

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('empty arrays should be added when we set todolists', () => {

    const action = setTodolistsAC([
        {id: '1', title: 'What to learn', addedDate: '', order: 0},
        {id: '2', title: 'What to buy', addedDate: '', order: 0}
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toBeDefined()
    expect(endState['2']).toBeDefined()
})

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('tasks should be added for todolist', () => {
    const action = setTasksAC('todolistId3', [
        { id: '1', title: 'REACT', status: TaskStatuses.New, priority: TaskPriorities.Low, description: '', order: 0, deadline: '', startDate: '', addedDate: '', todoListId: 'todolistId1' },
        { id: '2', title: 'REDUX', status: TaskStatuses.New, priority: TaskPriorities.Low, description: '', order: 0, deadline: '', startDate: '', addedDate: '', todoListId: 'todolistId1' }
    ])

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(3)
    expect(endState['todolistId3'].length).toBe(2)
    expect(endState['todolistId3'][0].title).toBe('REACT')
    expect(endState['todolistId3'][1].title).toBe('REDUX')
});