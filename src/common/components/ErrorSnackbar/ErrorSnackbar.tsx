import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { selectError, appActions } from 'app/appSlice';
import { useAppSelector, useAppDispatch } from 'common/hooks';

export const ErrorSnackbar = () => {

    const error = useAppSelector(selectError)

    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(appActions.setAppError({ error: null }))
    };

    return (
        <div>
            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}
