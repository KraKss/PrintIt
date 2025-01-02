import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList } from "react-native";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Icon from "react-native-vector-icons/Ionicons";

export default function Purchase() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenue sur l'écran Purchase !</Text>

        </View>
    );

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
                    <Text style={styles.sectionTitle}>Mes achats</Text>
                    {/* Liste des achats */}
                    <FlatList
                        data={purchases}
                        renderItem={renderPurchase}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.list}
                    />

                    {/* Total Amount and Order Button */}
                    <View style={styles.footer}>
                        <Text style={styles.totalText}>Montant total</Text>
                        <Text style={styles.totalAmount}>${totalAmount}</Text>
                        <TouchableOpacity style={styles.orderButton}>
                            <Text style={styles.orderButtonText}>Commander</Text>
                        </TouchableOpacity>
                    </View>
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
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
            backgroundColor: "#fff",
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
            backgroundColor: "#fff",
            padding: 15,
            borderRadius: 10,
            marginBottom: 25,
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
            color: "#555",
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
            borderTopColor: "#eee",
            backgroundColor: "#fff",
            alignItems: "center",
    },
    totalText: {
        fontSize: 18,
            color: "#555",
            marginBottom: 5,
    },
    totalAmount: {
        fontSize: 24,
            fontWeight: "bold",
            color: "#000",
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
            color: "#fff",
            fontWeight: "bold",
    },
});
