import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

const data = [
    { id: 1, name: "Projet 1", user: "Jane Cooper", date: "20/11/2024", image: "https://via.placeholder.com/50" },
    { id: 2, name: "Projet 1", user: "Jane Cooper", date: "20/11/2024", image: "https://via.placeholder.com/50" },
    { id: 3, name: "Projet 1", user: "Jane Cooper", date: "20/11/2024", image: "https://via.placeholder.com/50" },
];

export default function History() {
    const theme = useSelector((state) => state.theme.mode);
    const colorTheme = theme === "light" ? "black" : "white";
    const themedBackgroundColor = theme === "light" ? "#F0F0F0" : "#2D2D2D";
    const cardTheme = theme === "light" ? "#FFF" : "#424242";

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themedBackgroundColor }]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerCenter}>
                    <Icon name="time-outline" size={50} color="#FFFFFF" />
                    <Text style={styles.headerTitle}>Historique</Text>
                </View>
            </View>

            {/* Liste des projets */}
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={[styles.card, { backgroundColor: cardTheme }]}>
                        <Image source={{ uri: item.image }} style={styles.cardImage} />
                        <View style={styles.cardTextContainer}>
                            <Text style={[styles.cardTitle, { color: colorTheme }]}>{item.name}</Text>
                            <Text style={[styles.cardSubtitle, { color: colorTheme }]}>{item.user}</Text>
                            <Text style={[styles.cardDate, { color: colorTheme }]}>Commandé : {item.date}</Text>
                        </View>
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
    },
    cardSubtitle: {
        fontSize: 14,
        marginVertical: 5,
    },
    cardDate: {
        fontSize: 12,
    },
});
