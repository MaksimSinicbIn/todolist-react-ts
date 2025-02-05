import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppSelector, useAppDispatch } from 'common/hooks';
import { selectIsLoggedIn, authThunks } from 'features/auth/model/authSlice';

type Props = {

};

export const ButtonAppBar = (props: Props) => {

    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const dispatch = useAppDispatch()

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
                    {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log out</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
};