import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from "@react-native-async-storage/async-storage";

const themeSlice = createSlice({
    name: 'theme',
    initialState: { mode: 'light' },
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            AsyncStorage.setItem('printit_theme', state.mode);
        },
        setThemeFromStorage: (state, action) => {
            state.mode = action.payload;
        }
    },
});

export const { toggleTheme, setThemeFromStorage } = themeSlice.actions;

export const getThemeFromStorage = (systemTheme) => async (dispatch) => {
    try {
        const storedTheme = await AsyncStorage.getItem('printit_theme');

        if (storedTheme) {
            dispatch(setThemeFromStorage(storedTheme));
        } else {
            dispatch(setThemeFromStorage(systemTheme || 'light'));
        }
    } catch (error) {
        console.error('Error loading theme from storage:', error);
        dispatch(setThemeFromStorage('light'));
    }
};

export default themeSlice.reducer;
