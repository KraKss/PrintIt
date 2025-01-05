import React, {useState, useEffect, useCallback} from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../utils/API";
import { removeProductFromFavorites } from "../redux/favoriteSlice";
import { addProductToBasket } from "../redux/basketSlice";
import {useFocusEffect} from "@react-navigation/native";

export default function Favorites() {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.mode);
    const colorTheme = theme === "light" ? "black" : "white";
    const themedBackgroundColor = theme === "light" ? "#F0F0F0" : "#2D2D2D";
    const cardTheme = theme === "light" ? "#FFF" : "#424242";

    const idFavorites = useSelector((state) => state.favorites.idProductsInFavorites);
    const token = useSelector((state) => state.user.token);
    const [favoriteProducts, setFavoriteProducts] = useState([]);

    const fetchFavoriteProducts = async () => {
        try {
            if (!idFavorites || idFavorites.length === 0) {
                setFavoriteProducts([]);
                return;
            }

            const productDetails = await Promise.all(
                idFavorites.map(async (productId) => {
                    try {
                        const response = await API.get(`/product/${productId}`);

                        response.data.price = parseFloat(response.data.price);

                        return response.data;
                    } catch (error) {
                        console.error(`Erreur lors du chargement du produit ${productId} :`, error);
                        return null;
                    }
                })
            );

            setFavoriteProducts(productDetails.filter(item => item !== null && item !== undefined));
        } catch (error) {
            console.error("Erreur lors du chargement des favoris :", error);
            setFavoriteProducts([]);
        }
    };

    useEffect(() => {
        fetchFavoriteProducts();
    }, [idFavorites, token]);

    useFocusEffect(
        useCallback(() => {
            fetchFavoriteProducts();
        }, [idFavorites])
    );

    const removeFavorite = (id) => {
        dispatch(removeProductFromFavorites(id));
        setFavoriteProducts(prevFavorites => prevFavorites.filter(item => item.id !== id));
    };

    const addToBasket = (id) => {
        dispatch(addProductToBasket(id));
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themedBackgroundColor }]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerCenter}>
                    <Icon name="heart-outline" size={50} color="#FFFFFF" />
                    <Text style={styles.headerTitle}>Favoris</Text>
                </View>
            </View>

            {/* Liste des produits favoris */}
            <FlatList
                data={favoriteProducts}
                renderItem={({ item }) => (
                    <View style={[styles.card, { backgroundColor: cardTheme }]}>
                        <Image source={{ uri: item.image || "https://via.placeholder.com/50" }} style={styles.cardImage} />
                        <View style={styles.cardTextContainer}>
                            <Text style={[styles.cardTitle, { color: colorTheme }]}>{item.name}</Text>
                            <Text style={[styles.cardSubtitle, { color: colorTheme }]}>Prix: ${item.price.toFixed(2)}</Text>
                        </View>


                        <TouchableOpacity style={styles.cartButton} onPress={() => addToBasket(item.id)}>
                            <Icon name="cart-outline" size={24} color="#FFFFFF" />
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.removeButton} onPress={() => removeFavorite(item.id)}>
                            <Icon name="trash-outline" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#E40D2F",
    },
    headerCenter: {
        alignItems: "center",
        flex: 1,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginTop: 5,
    },
    listContainer: {
        padding: 20,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 15,
    },
    cardTextContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    cardSubtitle: {
        fontSize: 14,
        marginVertical: 5,
    },
    cartButton: {
        backgroundColor: "#E40D2F",
        padding: 10,
        borderRadius: 25,
        marginRight: 10,
    },
    removeButton: {
        backgroundColor: "#D32F2F",
        padding: 10,
        borderRadius: 25,
    },
});
