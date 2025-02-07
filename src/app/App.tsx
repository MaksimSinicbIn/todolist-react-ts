import React, { useEffect } from 'react';
import './App.css';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { selectIsInitialized, selectStatus, selectThemeMode } from 'app/appSlice';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { authThunks } from 'features/auth/model/authSlice';
import { ButtonAppBar, ErrorSnackbar } from 'common/components';
import { Outlet } from 'react-router-dom';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from 'common/theme';

type AppPropsType = {
    demo?: boolean
}

function App({ demo = false }: AppPropsType) {
    
    const theme = useAppSelector(selectThemeMode)
    const status = useAppSelector(selectStatus)
    const isInitialized = useAppSelector(selectIsInitialized)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!demo) {
            dispatch(authThunks.me())
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
            <ThemeProvider theme={getTheme(theme)}>
            <CssBaseline/>
            <ErrorSnackbar />
            <ButtonAppBar />
            {status === 'loading' && <LinearProgress color="secondary" />}
            <Container fixed>
                <Outlet context={demo}/>
            </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;