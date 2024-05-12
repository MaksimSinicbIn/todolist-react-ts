import React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import { ButtonAppBar } from '../components/ButtonAppBar/ButtonAppBar';
import { TodolistsList } from '../features/TodolistList/TodolistsList';
import { ErrorSnackbars } from '../components/ErrorSnackbar/ErrorSnackbar';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import { useAppSelector } from '../state/store';



function App() {

    const status = useAppSelector(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbars />
            <ButtonAppBar />
            {status === 'loading' && <LinearProgress color="secondary" />}
            <Container fixed>
                <TodolistsList />
            </Container>
        </div>
    );
}

export default App;