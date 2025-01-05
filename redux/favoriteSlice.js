import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: {
        idProductsInFavorites: [],
    },
    reducers: {
        addProductToFavorites: (state, action) => {
            const productId = action.payload;
            if (!state.idProductsInFavorites.includes(productId)) {
                state.idProductsInFavorites.push(productId);
                AsyncStorage.setItem("idProductsInFavorites", JSON.stringify(state.idProductsInFavorites));
            }
        },
        removeProductFromFavorites: (state, action) => {
            state.idProductsInFavorites = state.idProductsInFavorites.filter(id => id !== action.payload);
            AsyncStorage.setItem("idProductsInFavorites", JSON.stringify(state.idProductsInFavorites));
        },
        clearFavorites: (state) => {
            state.idProductsInFavorites = [];
            AsyncStorage.removeItem("idProductsInFavorites");
        },
        setFavoritesFromStorage: (state, action) => {
            state.idProductsInFavorites = action.payload;
        }
    },
});

export const { addProductToFavorites, removeProductFromFavorites, clearFavorites, setFavoritesFromStorage } = favoriteSlice.actions;

export const getFavoritesFromStorage = () => async (dispatch) => {
    try {
        const storedFavorites = await AsyncStorage.getItem("idProductsInFavorites");
        if (storedFavorites) {
            dispatch(setFavoritesFromStorage(JSON.parse(storedFavorites)));
        }
    } catch (error) {
        console.error("Erreur lors du chargement des favoris :", error);
    }
};

export default favoriteSlice.reducer;
