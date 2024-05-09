import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { FilterValuesType } from './state/todolists-reducer';
import { EditableSpan } from './EditableSpan';
import { AddItemForm } from './AddItemForm';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Task } from './Task';
import { TaskStatuses, TaskType } from './api/tasks-api';
import { useAppDispatch } from './state/store';
import { setTasksTC } from './state/tasks-reducer';

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: TaskType[]
    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string ) => void
    changeTaskStatus: (todolistId: string, id: string , status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, id: string, newTitle: string) => void
    removeTodolist: (id: string) => void
    changeTodolistFilter: (todolistId: string, filter: FilterValuesType) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = memo((props: PropsType) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTasksTC(props.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title )
    }, [props.changeTodolistTitle, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const onAllClickHandler = useCallback(() => props.changeTodolistFilter(props.id, "all"), [props.changeTodolistFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeTodolistFilter(props.id, "active"), [props.changeTodolistFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeTodolistFilter(props.id, "completed"), [props.changeTodolistFilter, props.id])

    
        let tasks = props.tasks;

        tasks = useMemo( () => {
            if (props.filter === "active") {
                tasks = tasks.filter(t => t.status === TaskStatuses.New);
            }
            if (props.filter === "completed") {
                tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
            }
            return tasks
        }, [props.filter, props.tasks])
        

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title} onChange={changeTodolistTitle} />
                <IconButton aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon  />
            </IconButton>
            </h3>
            <div>
                <AddItemForm onClick={addTask} />
            </div>
            {props.tasks.length === 0 ? (
                <p>Тасок нет!</p>
            ) : (
                <ul>
                    {
                        tasks.map(t => {
                            return (
                                <Task
                                    key={t.id}
                                    task={t}
                                    todolistId={props.id}
                                    removeTask={props.removeTask}
                                    changeTaskTitle={props.changeTaskTitle}
                                    changeTaskStatus={props.changeTaskStatus}
                                />
                            )
                        })
                    }
                </ul>
            )}
            <div style={{display: 'flex', gap: '5px'}}>
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
});