import React, { useState } from 'react'
import { TasksApi } from './tasks-api'

export default {
    title: 'API/Tasks',
}

// const todolistId = '6bad2f45-a8cc-4468-8997-b270726836b4'

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTask = () => {
        TasksApi.getTasks(todolistId)
        .then((res) => {
            setState(res.data)
        })
    }

    return <>
    <div>{JSON.stringify(state)}</div>
    <input 
        type="text"
        placeholder='Type todolistID...'
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
    />
    <button onClick={getTask}>Get Task</button>
    <div style={{marginTop: '20px'}}>
        <span>Todolist ID for tests: </span>
        <span>6bad2f45-a8cc-4468-8997-b270726836b4</span>
    </div>
    </>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTask = () => {
        TasksApi.createTasks({todolistId, title})
            .then((res) => {
                setState(res.data)
            })
    }

    return <>
    <div>{JSON.stringify(state)}</div>
    <input 
        type="text"
        placeholder='Type todolistID...'
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
    />
    <input
        type="text"
        placeholder='Type title...'
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
    />
    <button onClick={createTask}>Create Task</button>
    <div style={{marginTop: '20px'}}>
        <span>Todolist ID for tests: </span>
        <span>6bad2f45-a8cc-4468-8997-b270726836b4</span>
    </div>
    </>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        TasksApi.deleteTasks(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <>
    <div>{JSON.stringify(state)}</div>
    <input 
        type="text"
        placeholder='Type todolistID...'
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
    />
    <input
        type="text"
        placeholder='Type taskID...'
        value={taskId}
        onChange={(e) => setTaskId(e.currentTarget.value)}
    />
    <button onClick={deleteTask}>Delete Task</button>
    <div style={{marginTop: '20px'}}>
        <span>Todolist ID for tests: </span>
        <span>6bad2f45-a8cc-4468-8997-b270726836b4</span>
    </div>
    </>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTask = () => {
        const model = {
            title: title,
            description: '',
            completed: false,
            status: 0,
            priority: 1,
            startDate: '',
            deadline: ''
        }
        TasksApi.updateTasks(todolistId, taskId, model)
            .then((res) => {
                setState(res.data)
            })
    }

    return <>
    <div>{JSON.stringify(state)}</div>
    <input 
        type="text"
        placeholder='Type todolistID...'
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
    />
    <input
        type="text"
        placeholder='Type taskID...'
        value={taskId}
        onChange={(e) => setTaskId(e.currentTarget.value)}
    />
    <input
        type="text"
        placeholder='Type title...'
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
    />
    <button onClick={updateTask}>Update Task</button>
    <div style={{marginTop: '20px'}}>
        <span>Todolist ID for tests: </span>
        <span>6bad2f45-a8cc-4468-8997-b270726836b4</span>
    </div>
    <div style={{marginTop: '20px'}}>
        <span>Task ID for tests: </span>
        <span>035a35d8-3805-4e52-8699-0f8197eb7fec</span>
    </div>
    </>
}