import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    FlatList,
    SafeAreaView,
} from "react-native";

const products = [
    {
        product_id: 1,
        seller_id: 101,
        name: "Modulateur Évier",
        description: "Un produit incroyable pour votre évier.",
        price: "$5.22",
        filament: "PLA",
        file_3D: "modulateur_evier.stl",
    },
    {
        product_id: 2,
        seller_id: 102,
        name: "Porte-savon",
        description: "Design minimaliste pour votre salle de bain.",
        price: "$3.50",
        filament: "ABS",
        file_3D: "porte_savon.stl",
    },
];

export default function ProductPopup() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = (product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setModalVisible(false);
    };

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => openModal(item)}
        >
            <Image
                source={{ uri: "https://via.placeholder.com/50" }}
                style={styles.productImage}
            />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.product_id.toString()}
                contentContainerStyle={styles.listContainer}
            />

            {/* Modéle */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        {selectedProduct && (
                            <>
                                <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                                <Text style={styles.modalDescription}>
                                    {selectedProduct.description}
                                </Text>
                                <Text style={styles.modalDetail}>
                                    <Text style={styles.modalLabel}>Prix:</Text>{" "}
                                    {selectedProduct.price}
                                </Text>
                                <Text style={styles.modalDetail}>
                                    <Text style={styles.modalLabel}>Filament:</Text>{" "}
                                    {selectedProduct.filament}
                                </Text>
                                <Text style={styles.modalDetail}>
                                    <Text style={styles.modalLabel}>Fichier 3D:</Text>{" "}
                                    {selectedProduct.file_3D}
                                </Text>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F9F9",
        padding: 10,
    },
    listContainer: {
        paddingBottom: 20,
    },
    productCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    productPrice: {
        fontSize: 14,
        color: "#E40D2F",
        marginTop: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    closeButton: {
        alignSelf: "flex-end",
    },
    closeButtonText: {
        fontSize: 18,
        color: "#E40D2F",
        fontWeight: "bold",
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 10,
        color: "#555",
    },
    modalDetail: {
        fontSize: 14,
        marginBottom: 5,
        color: "#333",
    },
    modalLabel: {
        fontWeight: "bold",
        color: "#E40D2F",
    },
});
