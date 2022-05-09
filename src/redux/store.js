import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './reducers/user';
import contractReducer from './reducers/contract';

export default configureStore({
    reducer: {
        user: userReducer, 
        contract: contractReducer
    },
    middleware: [thunk]
});

















