import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { ButtonAppBar } from './ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './state/todolists-reducer';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    //BLL

    const dispatch = useDispatch();

    const todolists = useSelector<AppRootStateType, TodolistType[]>( state => state.todolists)

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

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
                            return <Grid item>
                                <Paper elevation={3} style={{ padding: '15px', borderRadius: '5px' }}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
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
