import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from "react-native";
import { useSelector } from "react-redux";
import { API } from "../utils/API";
import StarRating from "react-native-star-rating-widget";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

export default function ForcedReview() {
    const navigation = useNavigation();
    const user = useSelector((state) => state.user.userInfo);
    const token = useSelector((state) => state.user.token);
    const theme = useSelector((state) => state.theme.mode);

    const colorTheme = theme === "light" ? "black" : "white";
    const themedBackgroundColor = theme === "light" ? "#F9F9F9" : "#2D2D2D";
    const cardTheme = theme === "light" ? "#FFF" : "#424242";

    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const [orderItems, setOrderItems] = useState({});
    const [reviews, setReviews] = useState({});
    const [sellers, setSellers] = useState([]);
    const [toReview, setToReview] = useState([]);
    const [sellerNames, setSellerNames] = useState({});


    const fetchSellerNames = async (sellerId) => {
        if (!sellerId || sellerNames[sellerId]) return;

        try {
            const response = await API.get(`/profile/${sellerId}`);

            setSellerNames((prev) => ({ ...prev, [sellerId]: response.data.name }));
        } catch (error) {
            console.error(`Erreur lors de la récupération du nom du vendeur ${sellerId}:`, error);
            setSellerNames((prev) => ({ ...prev, [sellerId]: "Nom inconnu" }));
        }
    };

    const fetchDeliveredOrders = async () => {
        try {
            if (!user?.id || !token) return;

            const response = await API.get(`/order/buyer/${user.id}`);

            const delivered = response.data.filter((order) => order.shipping_status === "delivered");

            setDeliveredOrders(delivered);
        } catch (error) {
            console.error("Erreur lors de la récupération des commandes livrées :", error);
            setDeliveredOrders([]);
        }
    };

    const fetchOrderItems = async () => {
        if (deliveredOrders.length === 0) return;

        let items = {};
        await Promise.all(
            deliveredOrders.map(async (order) => {
                try {
                    let response = await API.get(`/order/items/${order.id}`);

                    items[order.id] = response.data;
                } catch (error) {
                    console.error("Erreur lors de la récupération des produits des commandes livrées :", error);
                }
            })
        );

        setOrderItems(items);
    };

    const fetchSellerIds = async () => {
        let sellersData = [];
        const productData = Object.entries(orderItems).flatMap(([order_id, items]) =>
            items.map((item) => ({
                order_id: order_id,
                product_id: item.product_id,
            }))
        );

        await Promise.all(
            productData.map(async (product) => {
                try {
                    const response = await API.get(`/product/${product.product_id}`);

                    sellersData.push({
                        product_id: product.product_id,
                        order_id: product.order_id,
                        seller_id: response.data.seller_id,
                    });
                } catch (error) {
                    console.error("Erreur lors de la récupération des seller_id :", error);
                }
            })
        );

        setSellers(sellersData);
    };

    const filterNewReview = async (sellersSource) => {
        let notFoundReviews = [];

        for (const seller of sellersSource) {
            const order_id = seller.order_id;
            const seller_id = seller.seller_id;

            try {
                const response = await API.get(`/review/${user.id}/${seller_id}`);

                if (!response.data || response.data.length === 0) {
                    notFoundReviews.push({ order_id, seller_id });
                }
            } catch (error) {
                console.error(`Erreur avec seller_id ${seller_id}:`, error);
                notFoundReviews.push({ order_id, seller_id });
            }
        }

        setToReview(notFoundReviews);
    };

    useEffect(() => {
        toReview.forEach((review) => {
            fetchSellerNames(review.seller_id);
        });
    }, [toReview]);

    useEffect(() => {
        fetchDeliveredOrders();
    }, [user, token]);

    useEffect(() => {
        if (sellers.length > 0) {
            filterNewReview(sellers);
        }
    }, [sellers]);

    useEffect(() => {
        fetchOrderItems();
    }, [deliveredOrders]);

    useEffect(() => {
        if (Object.keys(orderItems).length > 0) {
            fetchSellerIds();
        }
    }, [orderItems]);

    useFocusEffect(
        useCallback(() => {
            fetchDeliveredOrders();
        }, [user, token])
    );

    const handleReviewSubmit = async (reviewer_id, seller_id, rating) => {
        try {
            await API.post(
                "/review",
                {
                    reviewer_id: reviewer_id,
                    seller_id: seller_id,
                    rating: rating,
                    comment: "Fast review",
                }
            );

            alert("Merci pour votre avis !");
            setToReview((prev) => prev.filter((review) => review.seller_id !== seller_id));
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'avis :", error);
            alert("Erreur lors de l'envoi de votre avis.");
        }
    };

    const renderProduct = ({ item }) => (
        <View style={[styles.card, { backgroundColor: cardTheme }]}>
            <Image
                source={{ uri: item.image || "https://via.placeholder.com/50" }}
                style={styles.productImage}
            />
            <View style={styles.textContainer}>
                <Text style={[styles.productName, { color: colorTheme }]}>{item.name}</Text>
                <Text style={[styles.productPrice, { color: colorTheme }]}>
                    Order ID: {item.order_id} | Product ID: {item.product_id}
                </Text>
                <Text style={[styles.sellerName, { color: colorTheme }]}>
                    Vendeur: {sellerNames[item.seller_id] || "Chargement..."}
                </Text>
                <StarRating
                    rating={reviews[item.product_id] || 0}
                    onChange={(rating) => setReviews({ ...reviews, [item.product_id]: rating })}
                    starSize={25}
                />
                <TouchableOpacity
                    style={styles.reviewButton}
                    onPress={() => handleReviewSubmit(user.id, item.seller_id, reviews[item.product_id] || 5)}
                >
                    <Text style={styles.reviewButtonText}>Envoyer l'avis</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themedBackgroundColor }]}>
            <View style={styles.mainContent}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back-outline" size={24} color={colorTheme} />
                    </TouchableOpacity>
                    <Text style={[styles.sectionTitle, { color: colorTheme }]}>Laisser un avis</Text>
                </View>

                <FlatList
                    data={toReview.map((review) => ({
                        ...sellers.find((s) => s.seller_id === review.seller_id),
                    }))}
                    renderItem={renderProduct}

                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <Text style={[styles.emptyText, { color: colorTheme }]}>
                            Aucun avis à laisser.
                        </Text>
                    }
                />
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
        padding: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 15,
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
    productPrice: {
        fontSize: 16,
        marginVertical: 5,
    },
    reviewButton: {
        backgroundColor: "#E40D2F",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: "center",
    },
    reviewButtonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        marginTop: 20,
    },
});
