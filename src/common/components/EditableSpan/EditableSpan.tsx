import * as React from 'react';
import { ChangeEvent, memo, useState } from 'react';

type Props = {
    oldTitle: string
    className?: string
    onChange: (newTitle: string) => void
};

export const EditableSpan = memo(({ oldTitle, className, onChange }: Props) => {

    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(oldTitle)

    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            addTaskTitle()
        }
    }

    const addTaskTitle = () => {
        onChange(newTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        edit
            ? <input
                type='text'
                value={newTitle}
                autoFocus
                onChange={onChangeHandler}
                onBlur={editHandler}
            />
            : <span className={className} onDoubleClick={editHandler}>{oldTitle}</span>
    );
});