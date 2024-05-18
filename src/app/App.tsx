import React, { useEffect } from 'react';
import './App.css';
import Container from '@mui/material/Container';
import { ButtonAppBar } from '../components/ButtonAppBar/ButtonAppBar';
import { ErrorSnackbars } from '../components/ErrorSnackbar/ErrorSnackbar';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import { useAppDispatch, useAppSelector } from '../state/store';
import { Outlet } from 'react-router-dom';
import { meTC } from '../state/auth-reducer';
import { RequestStatusType } from '../state/app-reducer';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

type AppPropsType = {
    demo?: boolean
}

function App({demo = false}: AppPropsType) {

    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(meTC())
    }, [])

    if (!isInitialized) {
        return (
            <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className="App">
            <ErrorSnackbars />
            <ButtonAppBar />
            {status === 'loading' && <LinearProgress color="secondary" />}
            <Container fixed>
                <Outlet />
            </Container>
        </div>
    );
}

export default App;