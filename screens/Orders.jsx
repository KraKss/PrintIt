import React, { useState } from "react";
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

export default function Orders() {
    const allOrders = [
        {
            order_id: 1,
            buyer_id: 101,
            payment_status: "Paid",
            shipping_status: "Shipped",
            order_date: "2025-01-01",
        },
        {
            order_id: 2,
            buyer_id: 102,
            payment_status: "Pending",
            shipping_status: "Not Shipped",
            order_date: "2025-01-02",
        },
        {
            order_id: 3,
            buyer_id: 103,
            payment_status: "Failed",
            shipping_status: "In Transit",
            order_date: "2025-01-03",
        },
        {
            order_id: 4,
            buyer_id: 104,
            payment_status: "Paid",
            shipping_status: "Delivered",
            order_date: "2025-01-04",
        },
    ];

    const [filter, setFilter] = useState("EnCours");
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.mode);
    const colorTheme = theme === "light" ? "black" : "white";
    const themedBackgroundColor = theme === "light" ? "#F9F9F9" : "#2D2D2D";
    const cardTheme = theme === "light" ? "#FFF" : "#424242";

    const handleLogout = () => dispatch(logout());

    const filteredOrders =
        filter === "EnCours"
            ? allOrders.filter((order) => order.shipping_status !== "Delivered")
            : allOrders.filter((order) => order.shipping_status === "Delivered");

    const getStatusBadge = (status) => {
        switch (status) {
            case "Shipped":
                return { text: "En cours de livraison...", color: "#04A68D" };
            case "In Transit":
                return { text: "En cours d'impression...", color: "#FFC403" };
            case "Delivered":
                return { text: "Livré", color: "#000000" };
            case "Not Shipped":
                return { text: "Annulé", color: "#E40D2F" };
            default:
                return { text: "Inconnu", color: "#E40D2F" };
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Shipped":
                return <Icon name="checkmark-circle-outline" color={"#04A68D"} size={30} />;
            case "In Transit":
                return <Icon name="ellipsis-horizontal-outline" color={"#FFC403"} size={30} />;
            case "Delivered":
                return <Icon name="archive-outline" color={"#000000"} size={30} />;
            case "Not Shipped":
                return <Icon name="alert-circle-outline" color={"#E40D2F"} size={30} />;
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
                        Order #{item.order_id}
                    </Text>
                    <Text style={[styles.orderDetail, { color: statusBadge.color }]}>
                        {statusBadge.text}
                    </Text>
                    <Text style={[styles.orderDate, { color: colorTheme }]}>
                        Date: {item.order_date}
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
                    <TouchableOpacity onPress={handleLogout}>
                        <Icon name="search-outline" size={24} color={colorTheme} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionTitle}>Mes commandes</Text>
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
                <FlatList
                    data={filteredOrders}
                    renderItem={renderOrder}
                    keyExtractor={(item) => item.order_id.toString()}
                    contentContainerStyle={styles.orderList}
                    ListEmptyComponent={
                        <Text style={[styles.emptyText, { color: colorTheme }]}>
                            Aucune commande trouvée
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
        justifyContent: "space-between",
        alignItems: "center",
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
        backgroundColor: "#a09b9c",
        borderRadius: 20,
        marginHorizontal: 35,
        marginVertical: 10,
        padding: 5,
    },
    filterButton: {
        paddingVertical: 10,
        paddingHorizontal: 35,
        borderRadius: 20,
        backgroundColor: "transparent",
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
    orderImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    orderDetail: {
        fontSize: 14,
        fontWeight: "bold",
        marginVertical: 2,
    },
    orderDate: {
        fontSize: 12,
        marginTop: 5,
    },
    statusIcon: {
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        marginTop: 20,
    },
});
