import * as React from 'react';
import { useState, KeyboardEvent, ChangeEvent } from 'react';

type AddItemFormPropsType  = {
    onClick: (title: string) => void
};

export const AddItemForm = (props: AddItemFormPropsType) => {
    
    const [title, setTitle] = useState("")
    const [error, setError] = useState("")

    
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
        if (e.key === "Enter") {
            addTask()
        }
    }

    return (
        <div>
            <input
                value={title}
                className={error ? 'error' : ''}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTaskHandler} />
            <button onClick={addTask}>+</button>
            { error && <div className='error-message'>{error}</div>}
        </div>
    );
};