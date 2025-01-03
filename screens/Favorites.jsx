import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const data = [
    { id: 1, name: "Projet 1", user: "Jane Cooper", date: "20/11/2024", image: "https://via.placeholder.com/50" },
    { id: 2, name: "Projet 1", user: "Jane Cooper", date: "20/11/2024", image: "https://via.placeholder.com/50" },
    { id: 3, name: "Projet 1", user: "Jane Cooper", date: "20/11/2024", image: "https://via.placeholder.com/50" },
];

export default function Favorites() {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Icon name="heart-outline" size={50} color="#FFFFFF" />
                    <Text style={styles.headerTitle}>Favoris</Text>
                </View>
            </View>

            {/* Liste des projets */}
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.cardImage} />
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.cardTitle}>{item.name}</Text>
                            <Text style={styles.cardSubtitle}>{item.user}</Text>
                            <Text style={styles.cardDate}>Commandé : {item.date}</Text>
                        </View>
                        <TouchableOpacity style={styles.cartButton}>
                            <Icon name="cart-outline" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F0F0",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#E40D2F",
    },
    headerCenter: {
        alignItems: "center",
        flex: 1,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginTop: 5,
    },
    listContainer: {
        padding: 20,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 15,
    },
    cardTextContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#E40D2F",
    },
    cardSubtitle: {
        fontSize: 14,
        color: "#555",
        marginVertical: 5,
    },
    cardDate: {
        fontSize: 12,
        color: "#999",
    },
    cartButton: {
        backgroundColor: "#E40D2F",
        padding: 10,
        borderRadius: 25,
    },
});
