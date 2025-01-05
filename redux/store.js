import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import userReducer from './userSlice';
import basketReducer from './basketSlice';
import favoriteReducer from './favoriteSlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer,
        basket: basketReducer,
        favorites: favoriteReducer,
    },
});

export default store;
