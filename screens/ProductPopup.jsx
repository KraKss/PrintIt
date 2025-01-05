import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function ProductPopup({ visible, product, onClose, onOrder }) {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    {product && (
                        <>
                            <Image
                                source={{ uri: `https://picsum.photos/id/${product.id + 3}/200/300` }}
                                style={styles.productImage}
                            />
                            <Text style={styles.modalTitle}>{product.name}</Text>
                            <Text style={styles.modalDescription}>{product.description}</Text>
                            <Text style={styles.modalDetail}>
                                <Text style={styles.modalLabel}>Prix:</Text> {product.price}$
                            </Text>
                            <Text style={styles.modalDetail}>
                                <Text style={styles.modalLabel}>Filament:</Text> {product.filament_type || "Inconnu"}
                            </Text>
                            <Text style={styles.modalDetail}>
                                <Text style={styles.modalLabel}>Vendeur:</Text> {product.seller_name || "Inconnu"}
                            </Text>
                            <TouchableOpacity
                                style={styles.orderButton}
                                onPress={() => onOrder(product)}
                            >
                                <Icon name="cart-outline" size={20} color="#FFF" />
                                <Text style={styles.orderButtonText}>Commander</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#FFF",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
        alignItems: "center",
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 20,
        color: "#000000",
        fontWeight: "bold",
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
        textAlign: "center",
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 15,
        color: "#555",
        textAlign: "center",
    },
    modalDetail: {
        fontSize: 14,
        marginBottom: 10,
        color: "#333",
        alignSelf: "flex-start",
    },
    modalLabel: {
        fontWeight: "bold",
        color: "#E40D2F",
    },
    productImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    orderButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E40D2F",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    orderButtonText: {
        color: "#FFF",
        fontWeight: "bold",
        marginLeft: 10,
        fontSize: 16,
    },
});