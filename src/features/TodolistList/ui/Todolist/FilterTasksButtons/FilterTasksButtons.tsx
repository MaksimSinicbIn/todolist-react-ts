import Button from '@mui/material/Button'
import { useAppDispatch } from 'common/hooks';
import { FilterValuesType, TodolistDomainType, todolistsActions } from 'features/TodolistList/model/todolists/todolistsSlice';

type Props = {
    todolist: TodolistDomainType
};

export const FilterTasksButtons = ({ todolist }: Props) => {

    const { filter, id } = todolist

    const dispatch = useAppDispatch()

    const filterTasksHandler = (filter: FilterValuesType) => {
        dispatch(todolistsActions.changeTodolistFilter({ id, newFilter: filter }))
    }

    return (
        <>
            <Button
                color='error'
                variant={filter === 'all' ? "outlined" : "contained"}
                onClick={() => filterTasksHandler('all')}>
                All
            </Button>
            <Button
                color='secondary'
                variant={filter === 'active' ? "outlined" : "contained"}
                onClick={() => filterTasksHandler('active')}>
                Active
            </Button>
            <Button
                color='success'
                variant={filter === 'completed' ? "outlined" : "contained"}
                onClick={() => filterTasksHandler('completed')}>
                Completed
            </Button>
        </>
    );
};