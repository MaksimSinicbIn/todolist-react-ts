import { useEffect } from 'react';
import { TodolistDomainType } from '../../model/todolists/todolistsSlice';
import { tasksThunks } from 'features/TodolistList/model/tasks/tasksSlice';
import { useAppDispatch } from 'common/hooks';
import { AddItemForm } from 'common/components';
import { TaskType } from 'features/TodolistList/api/tasks-api.type';
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons';
import { Tasks } from './Tasks/Tasks';
import { TodolistTitle } from './TodolistTitle/TodolistTitle';

type Props = {
    todolist: TodolistDomainType
    tasks: TaskType[]
    demo?: boolean
}

export const Todolist = ({ demo = false, ...props }: Props) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(tasksThunks.fetchTasks(props.todolist.id))
    }, [])

    const addTaskCb = (title: string) => {
        return dispatch(tasksThunks.addTask({ todolistId: props.todolist.id, title }))
    }

    return (
        <div>
            <TodolistTitle todolist={props.todolist} />
            <div>
                <AddItemForm addItem={addTaskCb} disabled={props.todolist.entityStatus === 'loading'} />
            </div>
            {props.tasks.length === 0 ? (
                <p>Тасок нет!</p>
            ) : (
                <Tasks todolist={props.todolist} />
            )}
            <div style={{ display: 'flex', gap: '5px' }}>
                <FilterTasksButtons todolist={props.todolist} />
            </div>
        </div>
    )
};