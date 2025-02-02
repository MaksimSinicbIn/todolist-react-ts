import s from './Task.module.css'
import { ChangeEvent } from 'react';
import Checkbox from '@mui/material/Checkbox/Checkbox'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditableSpan } from 'common/components';
import { TaskStatuses } from 'common/enums';
import { TaskType } from 'features/TodolistList/api/tasks-api.type';
import { useAppDispatch } from 'common/hooks';
import { tasksThunks } from 'features/TodolistList/model/tasks/tasksSlice';

type Props = {
    task: TaskType
};

export const Task = ({ task }: Props) => {

    const { id: taskId, todoListId: todolistId, title } = task

    const dispatch = useAppDispatch()
    
    const removeTaskHandler = () => {
        dispatch(tasksThunks.removeTask({ todolistId, taskId}))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(tasksThunks.updateTask({ todolistId, taskId, domainModel: { status: status } }))
    }

    const changeTaskTitleHandler = (newTitle: string) => {
        dispatch(tasksThunks.updateTask({ todolistId, taskId, domainModel: { title: newTitle } }))
    }

    const isTaskCompleted = task.status === TaskStatuses.Completed
    
    return (
        <li key={taskId} style={{listStyleType: 'none'}}>
            <Checkbox
                checked={isTaskCompleted}
                color="primary"
                onChange={changeTaskStatusHandler}
            />
            <EditableSpan
                className={isTaskCompleted ? s.isDone : ''}
                oldTitle={title}
                onChange={changeTaskTitleHandler} />
            <IconButton aria-label="delete" >
                <DeleteIcon onClick={removeTaskHandler} />
            </IconButton>
        </li>
    )
};