import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { fetcher } from "../utils/API";
import useSWR from "swr";
import {removeProductFromFavorites,addProductToFavorites} from "../redux/favoriteSlice";
import {addProductToBasket} from "../redux/basketSlice";
import ProductPopup from './ProductPopup';
import {useState} from "react";
import SearchBar from "./SearchBar";
import {Header} from "../components/Header";
import AllProducts from "./AllProducts";

export default function Home() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.mode);
    const FavoritesIDList = useSelector((state) => state.favorites.idProductsInFavorites);
    const userInfo = useSelector((state) => state.user.userInfo);
    const colorTheme = theme === 'light' ? 'black' : 'white';
    const themedBackgroundColor = theme === 'light' ? '#F0F0F0' : '#2D2D2D';
    const cardTheme = theme === 'light' ? '#FFF' : '#424242';
    const authorColor = theme === 'light' ? '#888' : '#E5E4E4';
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openModal = (product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setModalVisible(false);
    };

    const onOrder = () => {
        if (selectedProduct.seller_id === userInfo.id) {
            Alert.alert("Erreur", "Vous ne pouvez pas acheter vos propres produits")
            return;
        }
        dispatch(addProductToBasket(selectedProduct.id));
        setModalVisible(false);
    }

    const handleToggleFavorite = (productId) => {
        if (FavoritesIDList.includes(productId)) {
            dispatch(removeProductFromFavorites(productId));
        } else {
            dispatch(addProductToFavorites(productId));
        }
    };

    const { data: featuredItems, error: errorFeatured } = useSWR(
        `${process.env.EXPO_PUBLIC_PRODUCT_ROUTE}/recents`,
        fetcher
    );

    const { data: popularPrints, error: errorPopular } = useSWR(
        `${process.env.EXPO_PUBLIC_PRODUCT_ROUTE}/popular`,
        fetcher
    );

    const isLoadingFeatured = !featuredItems && !errorFeatured;
    const isLoadingPopular = !popularPrints && !errorPopular;

    const renderFeaturedItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.featuredItem, { backgroundColor: cardTheme }]}
            onPress={() => openModal(item)}
        >
            <Image style={styles.featuredImage} source={{ uri: `https://picsum.photos/id/${item.id + 3}/200/300` }} />
            <Text style={{ ...styles.featuredTitle, color: colorTheme }}>{item.name}</Text>
            <Text style={{ ...styles.featuredDescription, color: authorColor }}>{item.description}</Text>
            <Text style={styles.featuredPrice}>{`${item.price}$`}</Text>
        </TouchableOpacity>
    );

    const renderPopularItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.popularItem, { backgroundColor: cardTheme }]}
            onPress={() => openModal(item)}
        >
            <Image source={{ uri: `https://picsum.photos/id/${item.id + 3}/200/300` }} style={styles.popularImage} />
            <View style={styles.popularText}>
                <Text style={[styles.itemTitle, { color: colorTheme }]}>{item.name}</Text>
                <Text style={{ color: authorColor }}>Vendu par: {item.seller_name}</Text>
                <Text style={styles.itemPrice}>{`${item.price}$`}</Text>
            </View>
            <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => handleToggleFavorite(item.id)}>
                <Icon
                    name={FavoritesIDList.includes(item.id) ? "heart" : "heart-outline"}
                    size={32}
                    color="red"
                />

            </TouchableOpacity>
        </TouchableOpacity>
    );

    const openDrawer = () => {
        return navigation.openDrawer()
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themedBackgroundColor }]}>
            <View style={styles.mainContent}>
                <Header onOpenDrawer={() => navigation.openDrawer()}/>

                <SearchBar data={featuredItems || []} />
                <View style={styles.featuredSection}>
                    <Text style={[styles.sectionTitle, { color: colorTheme }]}>Nouveaux produits</Text>
                    {isLoadingFeatured ? (
                        <Text style={{ color: colorTheme }}>Chargement...</Text>
                    ) : errorFeatured ? (
                        <Text style={{ color: 'red' }}>Erreur de chargement des produits</Text>
                    ) : (
                        <FlatList
                            data={featuredItems}
                            renderItem={renderFeaturedItem}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colorTheme }]}>Impressions populaires</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AllProducts')}>
                        <Text style={[styles.viewAll, { color: '#FF4C4C' }]}>Voir tout</Text>
                    </TouchableOpacity>
                </View>


                {isLoadingPopular ? (
                    <Text style={{ color: colorTheme }}>Chargement...</Text>
                ) : errorPopular ? (
                    <Text style={{ color: 'red' }}>Erreur de chargement des produits populaires</Text>
                ) : (
                    <FlatList
                        data={popularPrints}
                        renderItem={renderPopularItem}
                        keyExtractor={(item) => item.id.toString()}
                        style={styles.popularList}
                    />
                )}

            </View>
            <ProductPopup
                visible={modalVisible}
                product={selectedProduct}
                onClose={closeModal}
                onOrder={onOrder}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContent: {
        flex: 1,
        width: '100%'
    },
    featuredSection: {
        alignItems: 'center',
        marginVertical: 0,
    },
    featuredItem: {
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 15,
        elevation: 2,
    },
    featuredImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    featuredTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    featuredDescription: {
        color: '#888',
        marginBottom: 10,
    },
    featuredPrice: {
        color: '#FF4C4C',
        fontWeight: 'bold',
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    viewAll: {
        color: '#FF4C4C',
    },
    popularList: {
        paddingHorizontal: 20,
        marginBottom: 0,
    },
    popularItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    popularImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    popularText: {
        flex: 1,
        marginLeft: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        color: '#FF4C4C',
    }
});
