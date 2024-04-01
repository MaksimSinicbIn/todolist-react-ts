import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import {FilterValuesType} from './App';
import { EditableSpan } from './EditableSpan';
import { AddItemForm } from './AddItemForm';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    updateTaskTitle: (todolistId: string, id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    
    const getFilteredTasks = () => {
        let tasksForTodolist = props.tasks;
        if (props.filter === "active") {
            tasksForTodolist = props.tasks.filter(t => t.isDone === false);
        }
        if (props.filter === "completed") {
            tasksForTodolist = props.tasks.filter(t => t.isDone === true);
        }
        return tasksForTodolist
    }

    function addTaskHandler(title: string) {
        props.addTask(title, props.id)
    }

    function updateTaskTitleHandler (taskId: string, newTitle: string) {
        props.updateTaskTitle(props.todolistId, taskId, newTitle)
    }

    function onAllClickHandler () {
        props.changeFilter(props.todolistId, "all")
    }

    function onActiveClickHandler () {
        props.changeFilter(props.todolistId, "active")
    }

    function onCompletedClickHandler () {
        props.changeFilter(props.todolistId, "completed")
    }

    return (
        <div>
            <h3>
                {props.title}
            </h3>
            <div>
                <AddItemForm onClick={addTaskHandler} />
            </div>
            {props.tasks.length === 0 ? (
                <p>Тасок нет!</p>
            ) : (
                <ul>
                    {
                        getFilteredTasks().map(t => {
                            function onClickHandler() {
                                props.removeTask(t.id, props.todolistId)
                            }
                            return (
                                <li key={t.id} >
                                    <input type="checkbox"
                                        checked={t.isDone}
                                        onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)} />
                                    <EditableSpan className={t.isDone ? 'task-done' : ''} oldTitle={t.title} callBack={(newTitle) => { updateTaskTitleHandler(t.id, newTitle) }} />
                                    <button onClick={onClickHandler}>x</button>
                                </li>
                            )
                        })
                    }
                </ul>
            )}
            <div>
                <button className={props.filter === 'all' ? "filter-btn-active" : undefined}
                    onClick={onAllClickHandler}>
                    All
                </button>
                <button className={props.filter === 'active' ? "filter-btn-active" : undefined}
                    onClick={onActiveClickHandler}>
                    Active
                </button>
                <button className={props.filter === 'completed' ? "filter-btn-active" : undefined}
                    onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>
        </div>
    )
}