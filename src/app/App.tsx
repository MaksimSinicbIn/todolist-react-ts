import React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import { ButtonAppBar } from '../components/ButtonAppBar/ButtonAppBar';
import { TodolistsList } from '../features/TodolistList/TodolistsList';


function App() {
    return (
        <div className="App">
            <ButtonAppBar />
            <Container fixed>
                <TodolistsList />
            </Container>
        </div>
    );
}

export default App;