import React, { useState } from 'react';
import {
    View,
    TextInput,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductPopup from './ProductPopup'; // Assurez-vous d'importer le popup
import { API } from "../utils/API";
import {addProductToBasket} from "../redux/basketSlice";
import {useDispatch, useSelector} from "react-redux";

const SearchBar = () => {
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false); // État pour le modal
    const [selectedProduct, setSelectedProduct] = useState(null); // État pour le produit sélectionné
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.userInfo);

    const handleSearch = async (text) => {
        setSearchText(text);
        if (text.trim() === '') {
            setFilteredData([]);
            return;
        }

        setLoading(true);

        try {
            const response = await API.get(`${process.env.EXPO_PUBLIC_PRODUCT_ROUTE}/search?query=${text}`);
            setFilteredData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenSearch = () => {
        setIsSearchActive(true);
    };

    const handleCloseSearch = () => {
        setSearchText('');
        setFilteredData([]);
        setIsSearchActive(false);
    };

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedProduct(null);
    };

    const onOrder = () => {
        if (selectedProduct.seller_id === userInfo.id) {
            Alert.alert("Erreur", "Vous ne pouvez pas acheter vos propres produits")
            return;
        }
        dispatch(addProductToBasket(selectedProduct.id));
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
            {!isSearchActive ? (
                <TouchableOpacity onPress={handleOpenSearch} style={styles.iconContainer}>
                    <Icon name="search-outline" size={24} color="#666" />
                </TouchableOpacity>
            ) : (
                <View style={styles.searchContainer}>
                    <Icon name="search-outline" size={20} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Rechercher..."
                        value={searchText}
                        onChangeText={handleSearch}
                        autoFocus={true}
                    />
                    <TouchableOpacity onPress={handleCloseSearch} style={styles.closeButton}>
                        <Icon name="close-outline" size={24} color="#666" />
                    </TouchableOpacity>
                </View>
            )}

            {loading && <Text style={styles.loadingText}>Chargement...</Text>}

            {searchText.length > 0 && !loading && (
                <FlatList
                    data={filteredData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleSelectProduct(item)} // Affiche le produit sélectionné dans le modal
                            style={styles.resultItem}
                        >
                            <Text style={styles.item}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.resultList}
                />
            )}

            {/* Popup produit */}
            {selectedProduct && (
                <ProductPopup
                    visible={modalVisible}
                    product={selectedProduct}
                    onClose={closeModal}
                    onOrder={onOrder}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10,
        position: 'relative',
    },
    iconContainer: {
        alignSelf: 'flex-end',
        padding: 10,
        marginRight: 20,
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
        elevation: 2,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        elevation: 2,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchBar: {
        flex: 1,
        height: 40,
    },
    closeButton: {
        marginLeft: 10,
    },
    resultList: {
        marginTop: 5,
        borderRadius: 8,
        backgroundColor: '#fff',
        maxHeight: 150,
        elevation: 3,
    },
    resultItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    item: {
        fontSize: 16,
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
        paddingLeft: 15,
    },
});

export default SearchBar;
