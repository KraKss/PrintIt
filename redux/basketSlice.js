import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        idProductsInBasket: [1,3,8,100],
    },
    reducers: {
        addProductToBasket: (state, action) => {
            const productId = action.payload;
            if (!state.idProductsInBasket.includes(productId)) {
                state.idProductsInBasket.push(productId);
                AsyncStorage.setItem("idProductsInBasket", JSON.stringify(state.idProductsInBasket));
            }
        },
        removeProductFromBasket: (state, action) => {
            state.idProductsInBasket = state.idProductsInBasket.filter(id => id !== action.payload);
            AsyncStorage.setItem("idProductsInBasket", JSON.stringify(state.idProductsInBasket));
        },
        clearBasket: (state) => {
            state.idProductsInBasket = [];
            AsyncStorage.removeItem("idProductsInBasket");
        },
        setBasketFromStorage: (state, action) => {
            state.idProductsInBasket = action.payload;
        }
    },
});

export const { addProductToBasket, removeProductFromBasket, clearBasket, setBasketFromStorage } = basketSlice.actions;

export const getBasketFromStorage = () => async (dispatch) => {
    try {
        const storedBasket = await AsyncStorage.getItem("idProductsInBasket");
        if (storedBasket) {
            dispatch(setBasketFromStorage(JSON.parse(storedBasket)));
        }
    } catch (error) {
        console.error("Erreur lors du chargement du panier :", error);
    }
};

export default basketSlice.reducer;
