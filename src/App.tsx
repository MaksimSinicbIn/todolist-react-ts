import React, { useCallback, useEffect } from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Todolist} from './Todolist';
import { AddItemForm } from './AddItemForm';
import { ButtonAppBar } from './ButtonAppBar';
import { useSelector } from 'react-redux';
import { AppRootStateType, useAppDispatch } from './state/store';
import { FilterValuesType, TodolistDomainType, addTodolistTC, changeTodolistFilterAC, changeTodolistTitleAC, getTodolistsTC, removeTodolistAC, removeTodolistTC, updateTodolistTC} from './state/todolists-reducer';
import { addTaskTC, removeTaskTC, updateTaskTC } from './state/tasks-reducer';
import { TaskStatuses, TaskType } from './api/tasks-api';

export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    //BLL

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title}))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])

    const changeTodolistFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodolistTC(todolistId, title))
    }, [dispatch])

    // UI
    
    return (
        <div className="App">
            <ButtonAppBar />
            <Container fixed>
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
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        tasks={tasks[tl.id]}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        removeTodolist={removeTodolist}
                                        changeTodolistFilter={changeTodolistFilter}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;