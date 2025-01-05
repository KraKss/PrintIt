import React, { useEffect, useState, useCallback } from "react";
import {
    Text, View, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../utils/API";
import { useFocusEffect } from "@react-navigation/native";
import { toggleModeSeller } from "../redux/userSlice";
import { Alert } from 'react-native';

export default function Projects({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userInfo);
    const token = useSelector((state) => state.user.token);
    const theme = useSelector((state) => state.theme.mode);
    const modeSellerActivated = useSelector((state) => state.user.modeSellerActivated);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProductId, setSelectedProductId] = useState(null); // Suivi du produit sélectionné

    const colorTheme = theme === "light" ? "black" : "white";
    const themedBackgroundColor = theme === "light" ? "#F9F9F9" : "#2D2D2D";
    const cardTheme = theme === "light" ? "#FFF" : "#424242";

    const fetchProducts = async () => {
        if (!user?.id || !token) return;

        try {
            setLoading(true);
            const response = await API.get(`/product/seller/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des produits :", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [user, token]);

    useFocusEffect(
        useCallback(() => {
            fetchProducts();
        }, [user, token])
    );

    // Fonction pour supprimer un produit
    const deleteProduct = async (productId) => {
        try {
            await API.delete(`/product/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(products.filter(product => product.id !== productId)); // Mise à jour locale
        } catch (error) {
            console.error("Erreur lors de la suppression du produit :", error);
        }
    };

    const showAlertNotImplemented = () => {
        Alert.alert(
            "Oops",
            "Ne fonctionne pas encore pour le moment",
            [
                { text: "OK", onPress: () => {} }
            ],
            { cancelable: true }
        );
    };


    if (!modeSellerActivated) {
        return (
            <View style={[styles.centered, { backgroundColor: themedBackgroundColor }]}>
                <TouchableOpacity
                    style={[styles.toggleButton, { backgroundColor: "#4CAF50" }]}
                    onPress={() => dispatch(toggleModeSeller())}
                >
                    <Text style={styles.toggleButtonText}>Activer le mode vendeur</Text>
                </TouchableOpacity>
                <Text style={[styles.warningText, { color: colorTheme }]}>Activez le mode vendeur pour voir vos produits.</Text>
            </View>
        );
    }

    const renderProduct = ({ item }) => {
        const isSelected = selectedProductId === item.id;

        return (
            <TouchableOpacity
                onPress={() => setSelectedProductId(isSelected ? null : item.id)} // Toggle sélection
                style={[styles.productCard, { backgroundColor: cardTheme, height: isSelected ? 200 : 100 }]}
            >
                <Image source={{ uri: item.image || "https://via.placeholder.com/100" }} style={styles.productImage} />
                <View style={styles.productInfo}>
                    <Text style={[styles.productName, { color: colorTheme }]}>{item.name}</Text>
                    <Text style={[styles.productPrice, { color: colorTheme }]}>Prix : {item.price}€</Text>

                    {isSelected && (
                        <>
                            <Text style={[styles.productDescription, { color: colorTheme }]}>{item.description}</Text>
                            <Text style={[styles.productFilament, { color: colorTheme }]}>Type de filament : {item.filament_type}</Text>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.editButton}
                                    onPress={() => showAlertNotImplemented()}
                                >
                                    <Text style={styles.editButtonText}>Modifier</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => showAlertNotImplemented()}
                                >
                                    <Text style={styles.deleteButtonText}>Supprimer</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themedBackgroundColor }]}>
            <TouchableOpacity
                style={[styles.addButtonText, { backgroundColor: modeSellerActivated ? "#E40D2F" : "#4CAF50" }]}
                onPress={() => dispatch(toggleModeSeller())}
            >
                <Text style={styles.addButtonText}>
                    {modeSellerActivated ? "Désactiver le mode vendeur" : "Activer le mode vendeur"}
                </Text>
            </TouchableOpacity>

            <Text style={[styles.headerTitle, { color: colorTheme }]}>Mes Produits</Text>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => showAlertNotImplemented()}
            >
                <Text style={styles.addButtonText}>+ Ajouter un produit</Text>
            </TouchableOpacity>

            {loading ? (
                <Text style={[styles.loadingText, { color: colorTheme }]}>Chargement...</Text>
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderProduct}
                    contentContainerStyle={styles.productList}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    warningText: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    loadingText: {
        fontSize: 18,
        textAlign: "center",
    },
    productList: {
        paddingHorizontal: 10,
    },
    productCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 15,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    productDescription: {
        fontSize: 14,
        marginVertical: 5,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: "bold",
    },
    productFilament: {
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    editButton: {
        backgroundColor: "#FFA500",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: "center",
    },
    editButtonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
    deleteButton: {
        backgroundColor: "#E40D2F",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: "center",
    },
    deleteButtonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
    addButton: {
        backgroundColor: "#4CAF50",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        margin: 10,
    },
    addButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});
