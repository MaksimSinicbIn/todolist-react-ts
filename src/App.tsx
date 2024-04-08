import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { ButtonAppBar } from './ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

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

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
            {id: v1(), title: "Beer", isDone: false}
        ]
    });

    const removeTask = (id: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]:tasks[todolistId].filter(t => t.id !== id)})
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask: TaskType ={id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]:[newTask, ...tasks[todolistId]]})
    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map( tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]:tasks[todolistId].map( t => t.id === id ? {...t, isDone} : t)})
    }

    const updateTaskTitle = (todolistId: string, id: string, title: string) => {
        setTasks({...tasks, [todolistId]:tasks[todolistId].map( t => t.id === id ? {...t, title}: t)})
    }

    const updateTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map( tl => tl.id === todolistId ? {...tl, title}: tl))
    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1();
        const newTodo: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: 'all'
        }
        setTodolists([newTodo, ...todolists])
        setTasks({[newTodolistId]: [], ...tasks})
    }

    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
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
                                        tasks={tasks[tl.id]}
                                        filter={tl.filter}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        updateTaskTitle={updateTaskTitle}
                                        updateTodolistTitle={updateTodolistTitle}
                                        removeTodolist={removeTodolist}
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
