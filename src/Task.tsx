import * as React from 'react';
import { ChangeEvent, memo } from 'react';
import { EditableSpan } from './EditableSpan';
import Checkbox from '@mui/material/Checkbox/Checkbox'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskStatuses, TaskType } from './api/tasks-api';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (todolistId: string, newTitle: string, id: string) => void
    changeTaskStatus: (todolistId: string, status: TaskStatuses, id: string ) => void
};

export const Task = memo((props: TaskPropsType) => {
    
    const removeTaskHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }

    const onTitleChangeHandler = React.useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
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