import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import accountReducer from '../features/account/accountSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    auth: authReducer,
    account: accountReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: ['user', 'accessToken', 'refreshToken'],

};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});

export default store;
