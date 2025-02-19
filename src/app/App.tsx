import { useEffect } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from "@mui/material/CssBaseline"
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { Routes, Route, Navigate } from 'react-router';
import { selectIsInitialized, selectStatus, selectThemeMode } from 'app/appSlice';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { authThunks } from 'features/auth/model/authSlice';
import { Login } from 'features/auth/ui/Login';
import { Header, ErrorSnackbar, ErrorPage } from 'common/components';
import { TodolistsList } from 'features/TodolistList/ui/TodolistsList';
import { getTheme } from 'common/theme';

export const Path = {
    Login: '/login',
    TodolistsPage: '/todolists',
    ErrorPage: '/404'
} as const

type Props = {
    demo?: boolean
}

function App({ demo = false }: Props) {

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
        <ThemeProvider theme={getTheme(theme)}>
            <CssBaseline />
            <ErrorSnackbar />
            <Header />
            {status === 'loading' && <LinearProgress color="secondary" />}
            <Container fixed>
                <Routes>
                    <Route path={Path.TodolistsPage} element={<TodolistsList demo={demo} />} />
                    <Route path="/" element={<Navigate to={Path.TodolistsPage} />} />
                    <Route path={Path.Login} element={<Login />} />
                    <Route path={Path.ErrorPage} element={<ErrorPage />} />
                    <Route path="*" element={<Navigate to={Path.ErrorPage} />} />
                </Routes>
            </Container>
        </ThemeProvider>
    );
}

export default App;