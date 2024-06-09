import * as React from 'react';
import { ChangeEvent, memo } from 'react';
import Checkbox from '@mui/material/Checkbox/Checkbox'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditableSpan } from 'common/components';
import { TaskStatuses } from 'common/enums';
import { TaskType } from 'features/TodolistList/api/tasks-api';


type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (todolistId: string, taskId: string ) => void
    changeTaskTitle: (todolistId: string, id: string, newTitle: string) => void
    changeTaskStatus: (todolistId: string, id: string , status: TaskStatuses) => void
};

export const Task = memo((props: TaskPropsType) => {
    
    const removeTaskHandler = () => {
        props.removeTask(props.todolistId, props.task.id)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.todolistId, props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
    }

    const onTitleChangeHandler = React.useCallback((newTitle: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newTitle)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])
    
    return (
        <li key={props.task.id} style={{listStyleType: 'none'}}>
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                color="primary"
                onChange={onChangeHandler}
            />
            <EditableSpan
                className={props.task.status === TaskStatuses.Completed ? 'task-done' : ''}
                oldTitle={props.task.title}
                onChange={onTitleChangeHandler} />
            <IconButton aria-label="delete" >
                <DeleteIcon onClick={removeTaskHandler} />
            </IconButton>
        </li>
    )
});