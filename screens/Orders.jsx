import React, { useState, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { API } from "../utils/API";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";


export default function Orders() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userInfo);
    const token = useSelector((state) => state.user.token);
    const theme = useSelector((state) => state.theme.mode);
    const colorTheme = theme === "light" ? "black" : "white";
    const themedBackgroundColor = theme === "light" ? "#F9F9F9" : "#2D2D2D";
    const cardTheme = theme === "light" ? "#FFF" : "#424242";

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("EnCours");

    // Fonction pour récupérer les commandes de l'utilisateur
    const fetchOrders = async () => {
        try {
            if (!user?.id || !token) return;

            setLoading(true);
            const response = await API.get(`/order/buyer/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setOrders(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des commandes :", error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchOrders();
        }, [user, token])
    );


    useEffect(() => {
        fetchOrders();
    }, [user, token]);

    // Filtrer les commandes en fonction de leur statut
    const filteredOrders =
        filter === "EnCours"
            ? orders.filter((order) => order.shipping_status !== "delivered")
            : orders.filter((order) => order.shipping_status === "delivered");

    const getStatusBadge = (status) => {
        switch (status) {
            case "shipped":
                return { text: "En cours de livraison...", color: "#04A68D" };
            case "in_transit":
                return { text: "En cours d'impression...", color: "#FFC403" };
            case "delivered":
                return { text: "Livré", color: "#787878" };
            case "not_shipped":
                return { text: "En attente de traitement", color: "#e3b64d" };
            default:
                return { text: "Inconnu", color: "#E40D2F" };
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "shipped":
                return <Icon name="checkmark-circle-outline" color={"#04A68D"} size={30} />;
            case "in_transit":
                return <Icon name="ellipsis-horizontal-outline" color={"#FFC403"} size={30} />;
            case "delivered":
                return <Icon name="archive-outline" color={"#787878"} size={30} />;
            case "not_shipped":
                return <Icon name="alert-circle-outline" color={"#e3b64d"} size={30} />;
            default:
                return <Icon name="help-outline" color={"#E40D2F"} size={30} />;
        }
    };

    const renderOrder = ({ item }) => {
        const statusBadge = getStatusBadge(item.shipping_status);
        const statusIcon = getStatusIcon(item.shipping_status);

        return (
            <View style={[styles.card, { backgroundColor: cardTheme }]}>
                <Image source={{ uri: "https://via.placeholder.com/50" }} style={styles.orderImage} />
                <View style={styles.textContainer}>
                    <Text style={[styles.orderTitle, { color: colorTheme }]}>
                        Commande #{item.id}
                    </Text>
                    <Text style={[styles.orderDetail, { color: statusBadge.color }]}>
                        {statusBadge.text}
                    </Text>
                    <Text style={[styles.orderDate, { color: colorTheme }]}>
                        Date: {new Date(item.order_date).toLocaleString("fr-FR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                        timeZone: "Europe/Paris",
                    })}
                    </Text>

                </View>
                <View style={styles.statusIcon}>{statusIcon}</View>
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themedBackgroundColor }]}>
            <View style={styles.mainContent}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon name="menu-outline" size={24} color={colorTheme} />
                    </TouchableOpacity>
                    <Image style={styles.logo} source={require("../assets/printit_logo.png")} />
                    <TouchableOpacity onPress={() => dispatch(logout())}>
                        <Icon name="search-outline" size={24} color={colorTheme} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionTitle}>Mes commandes</Text>

                {/* Boutons de filtrage */}
                <View style={[styles.filterContainer, { backgroundColor: cardTheme }]}>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            filter === "EnCours" && styles.activeFilterButton,
                        ]}
                        onPress={() => setFilter("EnCours")}
                    >
                        <Text
                            style={[
                                styles.filterButtonText,
                                filter === "EnCours" && styles.activeFilterButtonText,
                            ]}
                        >
                            En cours
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            filter === "Historique" && styles.activeFilterButton,
                        ]}
                        onPress={() => setFilter("Historique")}
                    >
                        <Text
                            style={[
                                styles.filterButtonText,
                                filter === "Historique" && styles.activeFilterButtonText,
                            ]}
                        >
                            Historique
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Liste des commandes */}
                {loading ? (
                    <Text style={{ textAlign: "center", color: colorTheme }}>Chargement...</Text>
                ) : (
                    <FlatList
                        data={filteredOrders}
                        renderItem={renderOrder}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.orderList}
                        ListEmptyComponent={
                            <Text style={[styles.emptyText, { color: colorTheme }]}>
                                Aucune commande trouvée
                            </Text>
                        }
                    />
                )}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    filterContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginHorizontal: 35,
        marginVertical: 10,
        padding: 5,
    },
    filterButton: {
        paddingVertical: 10,
        paddingHorizontal: 35,
        borderRadius: 20,
        marginHorizontal: 25,
    },
    activeFilterButton: {
        backgroundColor: "#E40D2F",
    },
    filterButtonText: {
        fontWeight: "bold",
        color: "#000",
    },
    activeFilterButtonText: {
        color: "#FFF",
    },
    orderList: {
        padding: 20,
    },
    card: {
        flexDirection: "row",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        marginTop: 20,
    },
});