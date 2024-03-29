import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: TaskType[]
}

// export function getFilteredTasks (allTasks: Array<TaskType>, filterValue: FilterValuesType):Array<TaskType> {
//     let tasksForTodolist = allTasks;
//     if (filterValue === "active") {
//         tasksForTodolist = allTasks.filter(t => t.isDone === false);
//     }
//     if (filterValue === "completed") {
//         tasksForTodolist = allTasks.filter(t => t.isDone === true);
//     }
//     return tasksForTodolist
// }

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

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    function changeTaskStatus (id: string, isDone: boolean, todolistId: string) {
        setTasks({...tasks, [todolistId]:tasks[todolistId].map( t => t.id === id ? {...t, isDone} : t)})
    }

    // UI
    
    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let filteredTasks = tasks[tl.id]
                    return <Todolist
                        title="What to learn"
                        tasks={filteredTasks}
                        todolistId={tl.id}
                        filter={filter}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                    />
                })
            }
        </div>
    );
}

export default App;
