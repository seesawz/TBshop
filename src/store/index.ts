import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import thunk from 'redux-thunk';
import userSlice from './module/userSlice'
import { persistStore, persistReducer } from 'redux-persist';
// 这个是将状态存储在本地
import storage from 'redux-persist/es/storage';

const persistConfig = {
    key: 'root',
    storage,
};


const reducer = combineReducers({
    user: userSlice
});


const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

