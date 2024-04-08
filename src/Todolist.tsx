import React from 'react';
import {FilterValuesType} from './App';
import { EditableSpan } from './EditableSpan';
import { AddItemForm } from './AddItemForm';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './state/todolists-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const dispatch = useDispatch();

    const tasks = useSelector<AppRootStateType, TaskType[]>( state => state.tasks[props.id])
    
    const getFilteredTasks = () => {
        let tasksForTodolist = tasks;
        if (props.filter === "active") {
            tasksForTodolist = tasks.filter(t => t.isDone === false);
        }
        if (props.filter === "completed") {
            tasksForTodolist = tasks.filter(t => t.isDone === true);
        }
        return tasksForTodolist
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.id))
    }

    const removeTask = (taskId: string) => {
        dispatch(removeTaskAC(taskId, props.id))
    }

    const updateTaskTitle = (taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, props.id))
    }

    const updateTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(props.id, title))
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(props.id))
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(props.id, "all"))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(props.id, "active"))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(props.id, "completed"))

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title} callBack={updateTodolistTitle} />
                <IconButton aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon  />
            </IconButton>
            </h3>
            <div>
                <AddItemForm onClick={addTask} />
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет!</p>
            ) : (
                <ul>
                    {
                        getFilteredTasks().map(t => {
                            // const removeTask = () => {
                            //     dispatch(removeTaskAC(t.id, props.id))
                            // }
                            return (
                                <li key={t.id} >
                                    <input type="checkbox"
                                        checked={t.isDone}
                                        onChange={(e) => dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.id))} />
                                    <EditableSpan className={t.isDone ? 'task-done' : ''} oldTitle={t.title} callBack={(newTitle) => { updateTaskTitle(t.id, newTitle) }} />
                                    <IconButton aria-label="delete" >
                                        <DeleteIcon onClick={()=>removeTask(t.id)} />
                                    </IconButton>
                                </li>
                            )
                        })
                    }
                </ul>
            )}
            <div>
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