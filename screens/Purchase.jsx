import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {logout} from "../redux/userSlice";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";

export default function Purchases() {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.mode);
    const colorTheme = theme === 'light' ? 'black' : 'white';
    const themedBackgroundColor = theme === 'light' ? '#f9f9f9' : '#5e5e5e';
    const authorColor = theme === 'light' ? '#888' : '#e5e4e4'
    const handleLogout = () => dispatch(logout());

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

    return (
    <SafeAreaView style={{...styles.container, backgroundColor: themedBackgroundColor}}>
        <View style={styles.mainContent}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name="menu-outline" size={24} color={colorTheme} />
                    {/*    todo avatar */}
                </TouchableOpacity>
                <Image style={styles.logo} source={require('../assets/printit_logo.png')} />
                <TouchableOpacity onPress={handleLogout}>
                    <Icon name="search-outline" size={24} color={colorTheme} />
                </TouchableOpacity>
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
    logo: {
        width: 40,
        height: 40,
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
