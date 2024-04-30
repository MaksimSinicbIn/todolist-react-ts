import React, { useEffect, useState } from 'react'
import { TodolistApi, TodolistType } from '../api/todolist-api'

export default {
    title: 'API/Todolists',
}

export const GetTodolists = () => {
    const [state, setState] = useState<TodolistType[]>([])
    useEffect(() => {
        TodolistApi.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    // return <div>{JSON.stringify(state)}</div>
    return <ul>{state.map(t => <li key={t.id}>
            <p>Id: {t.id}</p>
            <p>Title: {t.title}</p>
            <p>AddDate: {t.addedDate}</p>
            <p>Order: {t.order}</p>
        </li>)}
    </ul>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodo = () => {
        TodolistApi.createTodolists(title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <>
    <div>{JSON.stringify(state)}</div>
    <input 
        type="text"
        placeholder='Type title...'
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
    />
    <button onClick={createTodo}>Create Todolist</button>
    </>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodo = () => {
        TodolistApi.deleteTodolists(todolistId)
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
    <button onClick={deleteTodo}>Delete Todolist</button>
    </>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTodo = () => {
        TodolistApi.updateTodolists(todolistId, title)
            .then((res) => {
                console.log(res);
                setState(res)
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
    <button onClick={updateTodo}>Update Todolist</button>
    <div style={{marginTop: '20px'}}>
        <span>Todolist ID for tests: </span>
        <span>6bad2f45-a8cc-4468-8997-b270726836b4</span>
    </div>
    </>
}