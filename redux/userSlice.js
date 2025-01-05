import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthToken } from '../utils/API';



const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: false,
        userInfo: null,
        token: null,
        modeSellerActivated: false,
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.userInfo = action.payload.userInfo;
            state.token = action.payload.token;
            AsyncStorage.setItem('user', JSON.stringify(action.payload.userInfo));
            AsyncStorage.setItem('token', action.payload.token);
            setAuthToken(action.payload.token);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userInfo = null;
            state.token = null;
            AsyncStorage.removeItem('user');
            AsyncStorage.removeItem('token');
            setAuthToken(null);
        },
        setUserFromStorage: (state, action) => {
            state.isAuthenticated = true;
            state.userInfo = action.payload.userInfo;
            state.token = action.payload.token;
            setAuthToken(action.payload.token);
        },
        toggleModeSeller: (state) => {
            state.modeSellerActivated = !state.modeSellerActivated;
        },
        updateUserImage: (state, action) => {
            if (state.userInfo) {
                state.userInfo.image = action.payload;
            }
        }
    },
});

export const { login, logout, setUserFromStorage,toggleModeSeller, updateUserImage} = userSlice.actions;

export const getUserFromStorage = () => async (dispatch) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                const parsedUser = JSON.parse(user);
                dispatch(setUserFromStorage({ userInfo: parsedUser, token }));
            }
        }
    } catch (error) {
        console.error('Error loading user from storage:', error);
    }
};

export default userSlice.reducer;
