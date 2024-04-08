import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import {FilterValuesType} from './App';
import { EditableSpan } from './EditableSpan';
import { AddItemForm } from './AddItemForm';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

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
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    updateTaskTitle: (todolistId: string, id: string, newTitle: string) => void
    updateTodolistTitle: (todolistId: string, title: string) => void
    removeTodolist: (id: string) => void
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

    const addTaskHandler = (title: string) => {
        props.addTask(props.id, title)
    }

    const updateTaskTitleHandler = (taskId: string, newTitle: string) => {
        props.updateTaskTitle(props.id, taskId, newTitle)
    }

    const updateTodolistTitleHandler = (title: string) => {
        props.updateTodolistTitle(props.id, title )
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const onAllClickHandler = () => {
        props.changeFilter(props.id, "all")
    }

    const onActiveClickHandler = () => {
        props.changeFilter(props.id, "active")
    }

    const onCompletedClickHandler = () => {
        props.changeFilter(props.id, "completed")
    }

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title} callBack={updateTodolistTitleHandler} />
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                <DeleteIcon  />
            </IconButton>
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
                                props.removeTask(t.id, props.id)
                            }
                            return (
                                <li key={t.id} >
                                    <input type="checkbox"
                                        checked={t.isDone}
                                        onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)} />
                                    <EditableSpan className={t.isDone ? 'task-done' : ''} oldTitle={t.title} callBack={(newTitle) => { updateTaskTitleHandler(t.id, newTitle) }} />
                                    <IconButton aria-label="delete" >
                                        <DeleteIcon onClick={onClickHandler} />
                                    </IconButton>
                                </li>
                            )
                        })
                    }
                </ul>
            )}
            <div>
                {/* <button className={props.filter === 'all' ? "filter-btn-active" : undefined}
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
                </button> */}
                <Button
                color='error'
                variant={props.filter === 'all' ? "outlined" : "contained"}
                onClick={onAllClickHandler}>
                All
                </Button>
                <Button
                    color='primary'
                    variant={props.filter === 'active' ? "outlined" : "contained"}
                    onClick={onActiveClickHandler}>
                    Active
                </Button>
                <Button
                    color='success'
                    variant={props.filter === 'completed' ? "outlined" : "contained"}
                    onClick={onCompletedClickHandler}>
                    Completed
                </Button>
            </div>
        </div>
    )
}