import React, { useCallback, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Navigate, useOutletContext } from 'react-router-dom';
import { Todolist } from './Todolist/Todolist';
import { AddItemForm } from 'common/components';
import { selectTasks, tasksThunks } from '../model/tasks/tasks-reducer';
import { selectIsLoggedIn } from '../../auth/model/auth-reducer';
import { FilterValuesType, selectTodolists, todolistsActions, todolistsThunks } from '../model/todolists/todolists-reducer';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { TaskStatuses } from 'common/enums';


type TodolistListPropsType = {
    //demo?: boolean
}

export const TodolistsList: React.FC<TodolistListPropsType> = ({...props }) => {

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

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(tasksThunks.addTask({ todolistId, title }))
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(tasksThunks.removeTask({ todolistId, taskId }))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(tasksThunks.updateTask({ todolistId, taskId, domainModel: { status } }))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(tasksThunks.updateTask({ todolistId, taskId, domainModel: { title } }))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(todolistsThunks.addTodolist({ title }))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(todolistsThunks.removeTodolist(todolistId))
    }, [dispatch])

    const changeTodolistFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(todolistsActions.changeTodolistFilter({ id: todolistId, newFilter: filter }))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(todolistsThunks.changeTodolistTitle({ todolistId, title }))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to='/login' />
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