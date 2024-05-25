import React, { useCallback, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Todolist } from './Todolist/Todolist';
import { AddItemForm } from '../../components/AddItemForm/AddItemForm';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { addTaskTC, removeTaskTC, selectTasks, updateTaskTC } from '../../state/tasks-reducer';
import { FilterValuesType, addTodolistTC, getTodolistsTC, removeTodolistTC, selectTodolists, todolistsActions, updateTodolistTC } from '../../state/todolists-reducer';
import { TaskStatuses } from '../../api/tasks-api';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../state/auth-reducer';

type TodolistListPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistListPropsType> = ({demo = false, ...props}) => {

    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(getTodolistsTC())
    }, [])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, { status }))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todolistId, taskId, { title }))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])

    const changeTodolistFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(todolistsActions.changeTodolistFilter({id: todolistId, newFilter: filter}))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodolistTC(todolistId, title))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }

    return (
        <div>
            <Grid container style={{ padding: '15px' }}>
                <AddItemForm onClick={addTodolist} />
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
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    removeTodolist={removeTodolist}
                                    changeTodolistFilter={changeTodolistFilter}
                                    changeTodolistTitle={changeTodolistTitle}
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