import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditableSpan } from 'common/components';
import { TodolistDomainType, todolistsThunks } from 'features/TodolistList/model/todolists/todolistsSlice';
import { useAppDispatch } from 'common/hooks';

type Props = {
    todolist: TodolistDomainType
};

export const TodolistTitle = ({ todolist }: Props) => {

    const { id, title, entityStatus } = todolist

    const dispatch = useAppDispatch()

    const removeTodolistCb = () => {
        dispatch(todolistsThunks.removeTodolist(id))
    }

    const changeTodolistTitleCb = (title: string) => {
        dispatch(todolistsThunks.changeTodolistTitle({ todolistId: id, title }))
    }

    return (
        <h3>
            <EditableSpan oldTitle={title} onChange={changeTodolistTitleCb} />
            <IconButton aria-label="delete" onClick={removeTodolistCb} disabled={entityStatus === 'loading'}>
                <DeleteIcon />
            </IconButton>
        </h3>
    );
};