import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import {FilterValuesType, getFilteredTasks} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, newIsDone: boolean) => void
}

export function Todolist(props: PropsType) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [taskTitle, setTaskTitle] = useState("")
    const [taskInputError, setTaskInputError] = useState(false)

    function addTask() {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            props.addTask(taskTitle)
        } else {
            setTaskInputError(true)
        }
        setTaskTitle("")
    }

    function onChangeSetTitle (e: ChangeEvent<HTMLInputElement>) {
        setTaskTitle(e.currentTarget.value)
        e.currentTarget.value.length > 15 && setTaskInputError(true)
        if (taskInputError) {
            e.currentTarget.value.length <= 15 && setTaskInputError(false)
        }
    }

    function onKeyDownAddTaskHandler (e: KeyboardEvent<HTMLInputElement>) {
        if (taskInputError) {
            e.key === "Enter" && addTask()
    }
    }

    const isAddTaskBtnDisabled = taskTitle.length === 0 || taskTitle.length > 15
    const taskTitleInputError = taskInputError
        ? "taskTitleInputError"
        : ""

    const activeTasksCounter = getFilteredTasks(props.tasks, "active").length

    function onAllClickHandler () {
        props.changeFilter("all")
    }

    function onActiveClickHandler () {
        props.changeFilter("active")
    }

    function onCompletedClickHandler () {
        props.changeFilter("completed")
    }

    return (
        <div>
            <h3>{props.title}
                {isCollapsed && <span className='task-counter'>active: {activeTasksCounter}</span>}
                <button onClick={() => setIsCollapsed(!isCollapsed)}>{isCollapsed ? "Open" : "Close"}</button>
            </h3>
            {
                isCollapsed
                ? null
                : <>
                    <div>
                        <input
                            value={taskTitle}
                            className={taskTitleInputError}
                            onChange={onChangeSetTitle}
                            onKeyDown={onKeyDownAddTaskHandler} />
                        <button disabled={isAddTaskBtnDisabled}
                                onClick={addTask}>+</button>
                        {taskInputError && <div style={{ color: "red" }}>Enter correct title!</div>}
                    </div>
                        <ul>
                            {
                                props.tasks.map(t => {
                                    let taskClasses = ["task"]
                                    if (t.isDone) {
                                        taskClasses = taskClasses.concat("task-done")
                                    }
                                    function onClickHandler () {
                                        props.removeTask(t.id)
                                    }
                                    return (
                                        <li key={t.id} >
                                            <input type="checkbox"
                                                    checked={t.isDone}
                                                    onChange={ (e) => props.changeTaskStatus(t.id, e.currentTarget.checked) }/>
                                            <span className={taskClasses.join(" ")}>{t.title}</span>
                                            <button onClick={onClickHandler}>x</button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    <div>
                        <button className={props.filter === 'all' ? "filter-btn-active" : undefined}
                                onClick={onAllClickHandler}>
                            All
                        </button>
                        <button className={props.filter === 'active' ? "filter-btn-active" : undefined}
                                onClick={onActiveClickHandler}>
                            Active
                        </button>
                        <button className={props.filter === 'completed' ? "filter-btn-active" : undefined}
                                onClick={onCompletedClickHandler}>
                            Completed
                        </button>
                    </div>
                </>
            }
        </div>
    )
}