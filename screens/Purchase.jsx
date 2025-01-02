import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList } from "react-native";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Icon from "react-native-vector-icons/Ionicons";

export default function Purchases() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const [purchases, setPurchases] = useState([
        {id: 1, name: "Modulateur évier", seller: "Lucie Fer", price: 5.22, image: "https://via.placeholder.com/50"},
        {id: 2, name: "Modulateur évier", seller: "Lucie Fer", price: 5.22, image: "https://via.placeholder.com/50"},
        {id: 3, name: "Modulateur évier", seller: "Lucie Fer", price: 5.22, image: "https://via.placeholder.com/50"},
        {id: 4, name: "Modulateur évier", seller: "Lucie Fer", price: 5.22, image: "https://via.placeholder.com/50"},
        {id: 5, name: "Modulateur évier", seller: "Lucie Fer", price: 5.22, image: "https://via.placeholder.com/50"},
        {id: 6, name: "Modulateur évier", seller: "Lucie Fer", price: 5.22, image: "https://via.placeholder.com/50"},
        {id: 7, name: "Modulateur évier", seller: "Lucie Fer", price: 5.22, image: "https://via.placeholder.com/50"},
        {id: 8, name: "Modulateur évier", seller: "Lucie Fer", price: 5.22, image: "https://via.placeholder.com/50"},
    ]);

    const removeItem = (id) => {
        setPurchases((prevPurchases) => prevPurchases.filter((item) => item.id !== id));
    };

    const totalAmount = purchases.reduce((total, item) => total + item.price, 0).toFixed(2);

    const renderPurchase = ({item}) => (
        <View style={styles.card}>
            <Image source={{uri: item.image}} style={styles.productImage}/>
            <View style={styles.textContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.sellerName}>{item.seller}</Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>
            {/* Bouton pour supprimer l'article */}
            <TouchableOpacity style={styles.cartButton} onPress={() => removeItem(item.id)}>
                <Icon name="close-circle-outline" size={24} color="#E40D2F"/>
            </TouchableOpacity>
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
