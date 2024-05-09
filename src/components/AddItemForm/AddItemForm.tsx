import * as React from 'react';
import { useState, KeyboardEvent, ChangeEvent, memo } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType  = {
    onClick: (title: string) => void
};

export const AddItemForm = memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    
    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.onClick(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    function onChangeSetTitle (e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    function onKeyDownAddTaskHandler (e: KeyboardEvent<HTMLInputElement>) {
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
                error={!!error}
                id="outlined-basic"
                label={error ? error : "Type something"}
                variant="outlined"
                size='small'
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTaskHandler}
            />
            <Button sx={buttonStyles} variant="contained" onClick={addTask}>+</Button>
        </div>
    );
});