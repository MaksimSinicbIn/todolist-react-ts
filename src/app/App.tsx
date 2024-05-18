import React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import { ButtonAppBar } from '../components/ButtonAppBar/ButtonAppBar';
import { TodolistsList } from '../features/TodolistList/TodolistsList';
import { ErrorSnackbars } from '../components/ErrorSnackbar/ErrorSnackbar';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import { useAppSelector } from '../state/store';
import { Outlet } from 'react-router-dom';

type AppPropsType = {
    demo?: boolean
}

function App({demo = false}: AppPropsType) {

    const status = useAppSelector(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbars />
            <ButtonAppBar />
            {status === 'loading' && <LinearProgress color="secondary" />}
            <Container fixed>
                {/* <TodolistsList demo={demo}/> */}
                <Outlet />
            </Container>
        </div>
    );
}

export default App;