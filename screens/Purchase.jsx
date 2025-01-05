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
import {clearBasket, removeProductFromBasket} from "../redux/basketSlice";
import {Header} from "../components/Header";

export default function Purchases() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
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

            const productDetails = await Promise.all(
                idProductsInBasket.map(async (productId) => {
                    try {
                        const response = await API.get(`/product/${productId}`);

                        if (!response.data || typeof response.data.price !== "number") {
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

    const createOrder = async () => {
        try {
            if (!idProductsInBasket || idProductsInBasket.length === 0) {
                alert("Votre panier est vide !");
                return;
            }

            const orderResponse = await API.post("/order/create", {
                buyer_id: user.userInfo.id,
                payment_status: "pending",
                shipping_status: "not_shipped"
            });

            const orderId = orderResponse.data.order_id;

            await API.post("/order/items", {
                items: idProductsInBasket.map(productId => ({
                    order_id: orderId,
                    product_id: productId,
                    quantity: 1
                }))
            });

            alert("Commande créée avec succès !");
            dispatch(clearBasket());
        } catch (error) {
            console.error("Erreur lors de la création de la commande :", error);
            alert("Une erreur est survenue lors de la commande.");
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
        <SafeAreaView style={[styles.container, { backgroundColor: themedBackgroundColor }]}>
            <View style={styles.mainContent}>
                <Header onOpenDrawer={() => navigation.openDrawer()}/>

                <Text style={styles.sectionTitle}>Panier</Text>
                {/* Liste des achats */}
                <FlatList
                    data={purchases}
                    renderItem={renderPurchase}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                />


                <View style={[styles.footer, { backgroundColor: cardTheme }]}>
                    <Text style={[styles.totalText, { color: colorTheme }]}>Montant total</Text>
                    <Text style={[styles.totalAmount, { color: colorTheme }]}>${totalAmount}</Text>
                    <TouchableOpacity style={styles.orderButton} onPress={createOrder}>
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
