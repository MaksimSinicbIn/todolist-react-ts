import * as React from 'react';
import { useState, KeyboardEvent, ChangeEvent, memo } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { unwrapResult } from '@reduxjs/toolkit';
import { BaseResponseType } from 'common/types';

type Props = {
    addItem: (title: string) => Promise<any>
    disabled?: boolean
};

export const AddItemForm = memo(({ addItem, disabled = false }: Props) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            addItem(newTitle)
                .then(unwrapResult)
                .then(() => {
                    setTitle("");
                })
                .catch((err: BaseResponseType) => {
                    if (err?.resultCode) {
                        setError(err.messages[0]);
                    }
                })
        } else {
            setError('Title is required')
        }
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.key === "Enter") {
            addTask()
        }
    }

    const buttonStyles = {
        maxWidth: '39px',
        maxHeight: '39px',
        minWidth: '39px',
        minHeight: '39px'
    }

    return (
        <div>
            <TextField
                variant="outlined"
                error={!!error}
                disabled={disabled}
                value={title}
                size='small'
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTaskHandler}
                label={"Title"}
                helperText={error}
            />
            <Button sx={buttonStyles} variant="contained" onClick={addTask} disabled={disabled}>+</Button>
        </div>
    );
});