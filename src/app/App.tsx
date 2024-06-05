import React, { useEffect } from 'react';
import './App.css';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { ButtonAppBar } from 'components/ButtonAppBar/ButtonAppBar';
import { ErrorSnackbar } from 'components/ErrorSnackbar/ErrorSnackbar';
import { meTC } from 'state/auth-reducer';
import { useAppDispatch, useAppSelector } from 'state/store';
import { selectIsInitialized, selectStatus } from 'state/app-reducer';
import { Outlet } from 'react-router-dom';

type AppPropsType = {
    demo?: boolean
}

function App({ demo = false }: AppPropsType) {

    const status = useAppSelector(selectStatus)
    const isInitialized = useAppSelector(selectIsInitialized)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!demo) {
            dispatch(meTC())
        }
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
            <ErrorSnackbar />
            <ButtonAppBar />
            {status === 'loading' && <LinearProgress color="secondary" />}
            <Container fixed>
                <Outlet />
            </Container>
        </div>
    );
}

export default App;