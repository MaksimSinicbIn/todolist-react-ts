import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TodolistApi } from '../api/todolist-api'

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistApi.getTodolists()
            .then((res) => {
                setState(res)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'TestTitleCreatePost2'
        TodolistApi.createTodolists(title)
            .then((res) => {
                setState(res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '667142d0-ef0e-4e6d-a65c-0d2a3143d6ad'
        TodolistApi.deleteTodolists(todolistId)
            .then((res) => {
                console.log(res);
                setState(res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '6bad2f45-a8cc-4468-8997-b270726836b4'
        const title = 'NewTestTitle3'
        TodolistApi.updateTodolists(todolistId, title)
            .then((res) => {
                console.log(res);
                setState(res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}