import { useState, useEffect, useCallback  } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import { API } from "../utils/API";
import {removeProductFromBasket} from "../redux/basketSlice";

export default function Purchases() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.mode);
    const colorTheme = theme === 'light' ? 'black' : 'white';
    const themedBackgroundColor = theme === 'light' ? '#F9F9F9' : '#2D2D2D';
    const cardTheme = theme === 'light' ? '#FFF' : '#424242';

    const idProductsInBasket = useSelector(state => state.basket.idProductsInBasket);
    const token = useSelector(state => state.user.token);
    const [purchases, setPurchases] = useState([]);

    const fetchPurchases = async () => {
        try {
            if (!idProductsInBasket || idProductsInBasket.length === 0) {
                setPurchases([]);
                return;
            }
            console.log(idProductsInBasket);

            const productDetails = await Promise.all(
                idProductsInBasket.map(async (productId) => {
                    try {
                        const response = await API.get(`/product/${productId}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        });

                        if (!response.data || typeof response.data.price !== "number") {
                            console.warn(`Produit invalide reçu pour ID ${productId}:`, response.data); //TODO a retirer
                            response.data.price = parseFloat(response.data.price);
                        }

                        return response.data;
                    } catch (error) {
                        return {"description": "Le produit n'existe plus", "filament_type": 0, "id": productId, "name": "Produit Supprimé", "price": 0, "seller_id": 0};
                        //TODO comme pour BI ajouter pour chaque table en id 0 un produit par default
                    }
                })
            );

            setPurchases(productDetails.filter(item => item !== null && item !== undefined));
        } catch (error) {
            console.error("Erreur lors du chargement des achats :", error);
            setPurchases([]);
        }
    };

    useEffect(() => {
        fetchPurchases();
    }, [idProductsInBasket, token]);

    useFocusEffect(
        useCallback(() => {
            fetchPurchases();
        }, [idProductsInBasket])
    );

    const removeItem = (id) => {
        dispatch(removeProductFromBasket(id));
        setPurchases((prevPurchases) => prevPurchases.filter((item) => item.id !== id));
    };

    const totalAmount = purchases.reduce((total, item) => total + item.price, 0).toFixed(2);

    const renderPurchase = ({ item }) => (
        <View style={[styles.card, { backgroundColor: cardTheme }]}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.textContainer}>
                <Text style={[styles.productName, { color: colorTheme }]}>{item.name}</Text>
                <Text style={[styles.sellerName, { color: colorTheme }]}>{item.seller}</Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.cartButton} onPress={() => removeItem(item.id)}>
                <Icon name="close-circle-outline" size={24} color="#E40D2F" />
            </TouchableOpacity>
        </View>
    );

    return (
        // TODO revoir ou mettre le paragraphe ci dessous
        <SafeAreaView style={[styles.container, { backgroundColor: themedBackgroundColor }]}>
            <View style={styles.mainContent}>
                <View style={[styles.header, { backgroundColor: themedBackgroundColor }]}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon name="menu-outline" size={24} color={colorTheme} />
                    </TouchableOpacity>
                    <Image style={styles.logo} source={require('../assets/printit_logo.png')} />
                    <TouchableOpacity onPress={() => dispatch(logout())}>
                        <Icon name="search-outline" size={24} color={colorTheme} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Mes achats</Text>
                {/* Liste des achats */}
                <FlatList
                    data={purchases}
                    renderItem={renderPurchase}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                />

                {/* Total Amount and Order Button */}
                <View style={[styles.footer, { backgroundColor: cardTheme }]}>
                    <Text style={[styles.totalText, { color: colorTheme }]}>Montant total</Text>
                    <Text style={[styles.totalAmount, { color: colorTheme }]}>${totalAmount}</Text>
                    <TouchableOpacity style={styles.orderButton}>
                        <Text style={styles.orderButtonText}>Commander</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContent: {
        flex: 1,
        width: "100%",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
    },
    logo: {
        width: 40,
        height: 40,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#E40D2F",
        marginHorizontal: 20,
        marginTop: 10,
    },
    list: {
        padding: 20,
    },
    card: {
        flexDirection: "row",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    sellerName: {
        fontSize: 14,
        marginVertical: 5,
    },
    productPrice: {
        fontSize: 16,
        color: "#E40D2F",
        fontWeight: "bold",
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: "#EEE",
        alignItems: "center",
    },
    totalText: {
        fontSize: 18,
        marginBottom: 5,
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
    },
    orderButton: {
        backgroundColor: "#E40D2F",
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 25,
    },
    orderButtonText: {
        fontSize: 18,
        color: "#FFF",
        fontWeight: "bold",
    },
});
