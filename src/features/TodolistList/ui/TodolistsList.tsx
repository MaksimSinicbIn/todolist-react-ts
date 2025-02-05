import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Navigate, useOutletContext } from 'react-router-dom';
import { Todolist } from './Todolist/Todolist';
import { AddItemForm } from 'common/components';
import { selectTasks } from '../model/tasks/tasksSlice';
import { selectIsLoggedIn } from '../../auth/model/authSlice';
import { selectTodolists, todolistsThunks } from '../model/todolists/todolistsSlice';
import { useAppDispatch, useAppSelector } from 'common/hooks';

type TodolistListPropsType = {
    //demo?: boolean
}

export const TodolistsList = ({ ...props }: TodolistListPropsType) => {

    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    let demo = useOutletContext<boolean | undefined>()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(todolistsThunks.fetchTodolists())
    }, [])

    const addTodolistCb = (title: string) => {
        return dispatch(todolistsThunks.addTodolist({ title }))
    }

    if (!isLoggedIn) {
        return <Navigate to='/login' />
    }

    return (
        <div>
            <Grid container style={{ padding: '15px' }}>
                <AddItemForm addItem={addTodolistCb} />
            </Grid>
            <Grid container spacing={4}>
                {
                    todolists.map(tl => {
                        return <Grid key={tl.id} item>
                            <Paper elevation={3} style={{ padding: '15px', borderRadius: '5px' }}>
                                <Todolist
                                    key={tl.id}
                                    todolist={tl}
                                    tasks={tasks[tl.id]}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </div>
    );
};