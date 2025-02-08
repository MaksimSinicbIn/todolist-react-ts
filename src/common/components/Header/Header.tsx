import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from "@mui/material/Switch";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppSelector, useAppDispatch } from 'common/hooks';
import { selectIsLoggedIn, authThunks } from 'features/auth/model/authSlice';
import { appActions, selectThemeMode } from 'app/appSlice';
import { MenuButton } from 'common/components/MenuButton/MenuButton'
import { getTheme } from 'common/theme';


type Props = {

};

export const Header = (props: Props) => {

    const dispatch = useAppDispatch()

    const themeMode = useAppSelector(selectThemeMode)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const theme = getTheme(themeMode)

    const changeModeHandler = () => {
        dispatch(appActions.changeTheme({ themeMode: themeMode === "light" ? "dark" : "light" }))
    }

    const logOutHandler = () => {
        dispatch(authThunks.logOut())
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
                    {isLoggedIn && <MenuButton background={theme.palette.primary.dark} onClick={logOutHandler}>Log out</MenuButton>}
                    <Switch color={"default"} onChange={changeModeHandler} />
                </Toolbar>
            </AppBar>
        </Box>
    );
};