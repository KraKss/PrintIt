import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList } from "react-native";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Icon from "react-native-vector-icons/Ionicons";

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

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [filter, setFilter] = useState("EnCours");

    const filteredOrders =
        filter === "EnCours"
            ? allOrders.filter((order) => order.shipping_status !== "Delivered")
            : allOrders.filter((order) => order.shipping_status === "Delivered");

    const getStatusBadge = (status) => {
        switch (status) {
            case "Shipped":
                return { text: "En cours de livraison..." };
            case "In Transit":
                return { text: "En cours d'impression..." };
            case "Delivered":
                return { text: "Livré" };
            case "Not Shipped":
                return { text: "Annulé" };
            default:
                return { text: status };
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Shipped":
                return <Icon name="checkmark-circle-outline" color={"#04A68D"} size={30}></Icon>;
            case "In Transit":
                return <Icon name="ellipsis-horizontal-outline" color={"#000000"} size={30}></Icon>;
            case "Delivered":
                return <Icon name="archive-outline" color={"#000000"} size={30}></Icon>;
            case "Not Shipped":
                return <Icon name="alert-circle-outline" color={"#FFC403"} size={30}></Icon>;
            default:
                return <Icon name="help-outline" color={"#e92b34"}></Icon>;
        }
    };

    const renderOrder = ({ item }) => {
        const statusBadge = getStatusBadge(item.shipping_status);
        const statusIcon = getStatusIcon(item.shipping_status);

        return (
            <View style={styles.card}>
                <Image source={{ uri: "https://via.placeholder.com/50" }} style={styles.orderImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.orderTitle}>Order #{item.order_id}</Text>
                    <Text style={styles.orderDetail}>{statusBadge.text}</Text>
                    <Text style={styles.orderDate}>Date: {item.order_date}</Text>
                </View>
                <Text style={styles.statusIcon}>{statusIcon}</Text>
            </View>
        );
    };

    if (isSidebarVisible) {
        return (
            <View style={styles.sidebarOverlay}>
                <Sidebar />
                <TouchableOpacity style={styles.closeSidebar} onPress={() => setIsSidebarVisible(false)}>
                    <Icon name="close-outline" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.mainContent}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setIsSidebarVisible(true)}>
                            <Icon name="menu-outline" size={24} color="black" />
                        </TouchableOpacity>
                        <Image source={{ uri: "https://via.placeholder.com/40" }} style={styles.logo} />
                        <Icon name="search-outline" size={24} color="black" />
                    </View>
                    <Text style={styles.sectionTitle}>Mes commandes</Text>
                    {/* Boutons de filtre */}
                    <View style={styles.filterContainer}>
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
                    <FlatList
                        data={filteredOrders}
                        renderItem={renderOrder}
                        keyExtractor={(item) => item.order_id.toString()}
                        contentContainerStyle={styles.orderList}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>Aucune commande trouvée</Text>
                        }
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    sidebarOverlay: {
        flex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: 99,
    },
    closeSidebar: {
        position: "absolute",
        top: 40,
        right: 20,
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
        backgroundColor: "#F5F5F5",
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
        backgroundColor: "#fff",
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
        color: "#E40D2F",
        marginVertical: 2,
    },
    orderDate: {
        fontSize: 12,
        color: "#999",
        marginTop: 5,
    },
    emptyText: {
        textAlign: "center",
        color: "#999",
        fontSize: 16,
        marginTop: 20,
    },
});
