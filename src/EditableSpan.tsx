import * as React from 'react';
import { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
    oldTitle: string
    className?: string
    callBack: (newTitle: string) => void
};

export const EditableSpan = ({oldTitle, className, callBack}: EditableSpanPropsType) => {

    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(oldTitle)

    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            addTaskTitle()
        }
    }

    const addTaskTitle = () => {
        callBack(newTitle)
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
};