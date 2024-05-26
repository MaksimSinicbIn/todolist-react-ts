import React, { memo, useCallback, useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { FilterValuesType, TodolistDomainType } from '../../../state/todolists-reducer';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm';
import { Task } from './Task/Task';
import { TaskStatuses, TaskType } from '../../../api/tasks-api';
import { useAppDispatch } from '../../../state/store';

type PropsType = {
    todolist: TodolistDomainType
    tasks: TaskType[]
    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string ) => void
    changeTaskStatus: (todolistId: string, id: string , status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, id: string, newTitle: string) => void
    removeTodolist: (id: string) => void
    changeTodolistFilter: (todolistId: string, filter: FilterValuesType) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    demo?: boolean
}

export const Todolist = memo(({demo = false, ...props}: PropsType) => {

    const dispatch = useAppDispatch()

    // useEffect(() => {
    //     if (demo) {
    //         return
    //     }
    //     dispatch(setTasksTC(props.todolist.id))
    // }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolist.id, title)
    }, [props.addTask, props.todolist.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title )
    }, [props.changeTodolistTitle, props.todolist.id])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }

    const onAllClickHandler = useCallback(() => props.changeTodolistFilter(props.todolist.id, "all"), [props.changeTodolistFilter, props.todolist.id])
    const onActiveClickHandler = useCallback(() => props.changeTodolistFilter(props.todolist.id, "active"), [props.changeTodolistFilter, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => props.changeTodolistFilter(props.todolist.id, "completed"), [props.changeTodolistFilter, props.todolist.id])

    
        let tasks = props.tasks;

        tasks = useMemo( () => {
            if (props.todolist.filter === "active") {
                tasks = tasks.filter(t => t.status === TaskStatuses.New);
            }
            if (props.todolist.filter === "completed") {
                tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
            }
            return tasks
        }, [props.todolist.filter, props.tasks])
        

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.todolist.title} onChange={changeTodolistTitle} />
                <IconButton aria-label="delete" onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <div>
                <AddItemForm onClick={addTask} disabled={props.todolist.entityStatus === 'loading'} />
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
                                    todolistId={props.todolist.id}
                                    removeTask={props.removeTask}
                                    changeTaskTitle={props.changeTaskTitle}
                                    changeTaskStatus={props.changeTaskStatus}
                                />
                            )
                        })
                    }
                </ul>
            )}
            <div style={{ display: 'flex', gap: '5px' }}>
                <Button
                    color='error'
                    variant={props.todolist.filter === 'all' ? "outlined" : "contained"}
                    onClick={onAllClickHandler}>
                    All
                </Button>
                <Button
                    color='primary'
                    variant={props.todolist.filter === 'active' ? "outlined" : "contained"}
                    onClick={onActiveClickHandler}>
                    Active
                </Button>
                <Button
                    color='success'
                    variant={props.todolist.filter === 'completed' ? "outlined" : "contained"}
                    onClick={onCompletedClickHandler}>
                    Completed
                </Button>
            </div>
        </div>
    )
});