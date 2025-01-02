import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList } from "react-native";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Icon from "react-native-vector-icons/Ionicons";

export default function Orders() {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenue sur l'écran Orders !</Text>
        </View>
    );

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
