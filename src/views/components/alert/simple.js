import {Snackbar, Alert} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlert } from '../../../redux/reducers/alert';

export const SimpleAlert = (props) => {

    const dispatch = useDispatch();
    const { status, message, open } = useSelector(st => st.alert)
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        dispatch(closeAlert());
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={open}
            autoHideDuration={6000} 
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    )
};
