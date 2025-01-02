import { useState } from 'react';
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
import Sidebar from './Sidebar';

export default function Home() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const popularPrints = [
        { id: 1, name: 'Modulateur évier', author: 'Lucie Fer', price: '$5.22', liked: false },
        { id: 2, name: 'Modulateur évier', author: 'Lucie Fer', price: '$5.22', liked: false },
        { id: 3, name: 'Modulateur évier', author: 'Lucie Fer', price: '$5.22', liked: true },
        { id: 4, name: 'Modulateur évier', author: 'Lucie Fer', price: '$5.22', liked: true },
        { id: 5, name: 'Modulateur évier', author: 'Lucie Fer', price: '$5.22', liked: false },
        { id: 6, name: 'Modulateur évier', author: 'Lucie Fer', price: '$5.22', liked: false },
    ];

    const featuredItems = [
        { id: 1, image: 'https://via.placeholder.com/200', title: 'MapMonde', author: 'Annette Black', price: '$5.22' },
        { id: 2, image: 'https://via.placeholder.com/200', title: 'Eclipse', author: 'John Doe', price: '$8.99' },
        { id: 3, image: 'https://via.placeholder.com/200', title: 'Stellar', author: 'Jane Doe', price: '$12.50' },
        { id: 4, image: 'https://via.placeholder.com/200', title: 'Nebula', author: 'Alice Smith', price: '$7.30' },
    ];

    const renderPopularItem = ({ item }) => (
        <View style={styles.popularItem}>
            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.popularImage} />
            <View style={styles.popularText}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemAuthor}>{item.author}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
            <TouchableOpacity>
                <Icon name={item.liked ? 'heart' : 'heart-outline'} size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name="cart-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );

    if (isSidebarVisible) {
        return (
            <View style={styles.sidebarOverlay}>
            <Sidebar />
            <TouchableOpacity
                style={styles.closeSidebar}
                onPress={() => setIsSidebarVisible(false)}
            >
                <Icon name="close-outline" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>
                {isSidebarVisible && (
                    <View style={styles.sidebarOverlay}>
                        <Sidebar />
                        <TouchableOpacity
                            style={styles.closeSidebar}
                            onPress={() => setIsSidebarVisible(false)}
                        >
                            <Icon name="close-outline" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                )}

                {/* Main Content */}
                <View style={styles.mainContent}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setIsSidebarVisible(true)}>
                            <Icon name="menu-outline" size={24} color="black" />
                        </TouchableOpacity>
                        <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.logo} />
                        <Icon name="search-outline" size={24} color="black" />
                    </View>

                    {/* Featured Section */}
                    <View style={styles.featuredSection}>
                        <Text style={styles.sectionTitle}>Nouveaux produits</Text>
                        <FlatList
                            data={featuredItems}
                            renderItem={({ item }) => (
                                <View style={styles.featuredItem}>
                                    <Image source={{ uri: item.image }} style={styles.featuredImage} />
                                    <Text style={styles.featuredTitle}>{item.title}</Text>
                                    <Text style={styles.featuredAuthor}>{item.author}</Text>
                                    <Text style={styles.featuredPrice}>{item.price}</Text>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    {/* Popular Prints Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Impressions populaires</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAll}>Voir tout</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={popularPrints}
                        renderItem={renderPopularItem}
                        keyExtractor={(item) => item.id.toString()}
                        style={styles.popularList}
                    />

                    {/* Bottom Navigation */}
                    <SafeAreaView style={styles.bottomNav}>
                        <TouchableOpacity style={styles.navItem}>
                            <Icon name="storefront-outline" size={24} color="red" />
                            <Text style={styles.navTextActive}>Modèles</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem}>
                            <Icon name="cart-outline" size={24} color="black" />
                            <Text style={styles.navTextInactive}>Mes achats</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem}>
                            <Icon name="clipboard-outline" size={24} color="black" />
                            <Text style={styles.navTextInactive}>Mes commandes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem}>
                            <Icon name="print-outline" size={24} color="black" />
                            <Text style={styles.navTextInactive}>Mes impressions</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    sidebarOverlay: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 99,
    },
    closeSidebar: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
    mainContent: {
        flex: 1,
        width: '100%'
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
    featuredSection: {
        alignItems: 'center',
        marginVertical: 20,
        borderWidth: 3,
        borderColor: '#0233ff',
    },
    featuredItem: {
        alignItems: 'center',
        marginHorizontal: 10,
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
    featuredAuthor: {
        color: '#888',
    },
    featuredPrice: {
        color: '#ff4c4c',
        fontWeight: 'bold',
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    viewAll: {
        color: '#ff4c4c',
    },
    popularList: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    popularItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#fff',
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
    itemAuthor: {
        color: '#888',
    },
    itemPrice: {
        color: '#ff4c4c',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        // paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ff0000',
        height: 60,
        zIndex: 5,
    },
    navItem: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0233ff',
    },
    navTextActive: {
        color: 'red',
        fontSize: 12,
    },
    navTextInactive: {
        color: '#888',
        fontSize: 12,
    },
});
