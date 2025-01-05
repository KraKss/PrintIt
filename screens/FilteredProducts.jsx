import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductPopup from './ProductPopup';
import { useSelector } from 'react-redux';

export default function FilteredProducts({ route, navigation }) {
    const { name, data } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const theme = useSelector((state) => state.theme.mode);
    const colorTheme = theme === 'light' ? 'black' : 'white';
    const themedBackgroundColor = theme === 'light' ? '#F0F0F0' : '#2D2D2D';
    const cardTheme = theme === 'light' ? '#FFF' : '#424242';
    const authorColor = theme === 'light' ? '#888' : '#E5E4E4';

    const filteredProducts = data.filter((product) =>
        product.name.toLowerCase() === name.toLowerCase()
    );

    const openModal = (product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setModalVisible(false);
    };

    const handleOrder = (product) => {
        console.log('Produit commandé :', product);
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themedBackgroundColor }]}>
            {/* En-tête */}
            <View style={[styles.header, { backgroundColor: cardTheme }]}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name="menu-outline" size={28} color={colorTheme} />
                </TouchableOpacity>
                <Image
                    style={styles.logo}
                    source={require('../assets/printit_logo.png')}
                />
            </View>

            {/* Contenu principal */}
            <View style={styles.mainContent}>
                <Text style={[styles.title, { color: colorTheme }]}>
                    Produits pour "{name}"
                </Text>
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.item, { backgroundColor: cardTheme }]}
                            onPress={() => openModal(item)} // Ouvrir le popup au clic
                        >
                            <Text style={[styles.itemName, { color: colorTheme }]}>{item.name}</Text>
                            <Text style={[styles.itemDescription, { color: authorColor }]}>
                                {item.description}
                            </Text>
                            <Text style={styles.itemPrice}>{item.price}$</Text>
                        </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            {/* Popup produit */}
            {selectedProduct && (
                <ProductPopup
                    visible={modalVisible}
                    product={selectedProduct}
                    onClose={closeModal}
                    onOrder={handleOrder}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    mainContent: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 14,
        marginTop: 5,
    },
    itemPrice: {
        fontSize: 16,
        color: '#FF4C4C',
        marginTop: 10,
    },
});
