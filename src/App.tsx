import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
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

    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: string, todolistId: string) {
        setTasks({...tasks, [todolistId]:tasks[todolistId].filter(t => t.id !== id)})
    }

    function addTask(title: string, todolistId: string) {
        const newTask: TaskType ={id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]:[newTask, ...tasks[todolistId]]})
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map( tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }

    function changeTaskStatus (id: string, isDone: boolean, todolistId: string) {
        setTasks({...tasks, [todolistId]:tasks[todolistId].map( t => t.id === id ? {...t, isDone} : t)})
    }

    function updateTaskTitle (todolistId: string, id: string, title: string,) {
        setTasks({...tasks, [todolistId]:tasks[todolistId].map( t => t.id === id ? {...t, title}: t)})
    }

    function addTodolist (title: string) {
        const newTodolistId = v1();
        const newTodo: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: 'all'
        }
        setTodolists([newTodo, ...todolists])
        setTasks({[newTodolistId]: [], ...tasks})
    }

    // UI
    
    return (
        <div className="App">
            <AddItemForm onClick={addTodolist}/>
            {
                todolists.map(tl => {
                    return <Todolist
                        key={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        id={tl.id}
                        todolistId={tl.id}
                        filter={tl.filter}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        updateTaskTitle={updateTaskTitle}
                        />
                })
            }
        </div>
    );
}

export default App;
