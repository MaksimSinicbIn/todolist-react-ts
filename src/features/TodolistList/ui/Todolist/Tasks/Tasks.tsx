import { TaskStatuses } from 'common/enums';
import { useAppSelector } from 'common/hooks';
import { selectTasks } from 'features/TodolistList/model/tasks/tasksSlice';
import { TodolistDomainType } from 'features/TodolistList/model/todolists/todolistsSlice';
import { Task } from './Task/Task';

type Props = {
    todolist: TodolistDomainType
};

export const Tasks = ({ todolist }: Props) => {

    const tasks = useAppSelector(selectTasks)

    let tasksForTodolist = tasks[todolist.id]

    if (todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }

    return (
        <>
            {tasksForTodolist.map(t => (
                <Task key={t.id} task={t}/>
            ))}
        </>
    );
};