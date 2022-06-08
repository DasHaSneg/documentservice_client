import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './reducers/user';
import contractReducer from './reducers/contract';
import alertReducer from './reducers/alert';

export default configureStore({
    reducer: {
        user: userReducer, 
        contract: contractReducer,
        alert: alertReducer
    },
    middleware: [thunk]
});

















