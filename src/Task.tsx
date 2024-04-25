import * as React from 'react';
import { ChangeEvent, memo } from 'react';
import { TaskType } from './Todolist';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (todolistId: string, newTitle: string, id: string) => void
    changeTaskStatus: (todolistId: string, isDone: boolean, id: string ) => void
};

export const Task = memo((props: TaskPropsType) => {
    console.log('task');
    
    const removeTaskHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId)
    }

    const onTitleChangeHandler = React.useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])
    
    return (
        <li key={props.task.id} >
            <input type="checkbox"
                checked={props.task.isDone}
                onChange={onChange}
            />
            <EditableSpan
                className={props.task.isDone ? 'task-done' : ''}
                oldTitle={props.task.title}
                onChange={onTitleChangeHandler} />
            <IconButton aria-label="delete" >
                <DeleteIcon onClick={removeTaskHandler} />
            </IconButton>
        </li>
    )
});