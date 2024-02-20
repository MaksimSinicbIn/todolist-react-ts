import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export function getFilteredTasks (allTasks: Array<TaskType>, filterValue: FilterValuesType):Array<TaskType> {
    let tasksForTodolist = allTasks;
    if (filterValue === "active") {
        tasksForTodolist = allTasks.filter(t => t.isDone === false);
    }
    if (filterValue === "completed") {
        tasksForTodolist = allTasks.filter(t => t.isDone === true);
    }
    return tasksForTodolist
}

function App() {
    //BLL
    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        const newTask: TaskType ={
            id: v1(),
            title: title,
            isDone: false
        }
        const nextState = [newTask, ...tasks]
        setTasks(nextState)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    function changeTaskStatus (id: string, newIsDone: boolean) {
        // const task = tasks.find( t => t.id === id) // TaskType || undefined
        // if (task) {
        //     task.isDone = !task.isDone // меняем статус мутабельно
        //     setTasks([...tasks])
        // }
        const nextState = tasks.map(t => t.id === id ? {...t, isDone: newIsDone} : t)
        setTasks(nextState)
    }

    // UI
    const filteredTasks = getFilteredTasks(tasks, filter)
    
    return (
        <div className="App">
            <Todolist title="What to learn"
                        tasks={filteredTasks}
                        filter={filter}
                        removeTask={removeTask}
                        changeFilter={changeFilter} 
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
