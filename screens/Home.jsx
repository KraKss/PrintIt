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
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/userSlice";
import {useNavigation} from "@react-navigation/native";

export default function Home() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.mode);
    const colorTheme = theme === 'light' ? 'black' : 'white';
    const themedBackgroundColor = theme === 'light' ? '#f9f9f9' : '#5e5e5e';
    const authorColor = theme === 'light' ? '#888' : '#e5e4e4'
    const handleLogout = () => dispatch(logout());

    const popularPrints = [
        { id: 1, name: 'Modulateur évier', author: 'Lucie Fer', price: '$5.22', liked: false },
        { id: 2, name: 'Modulateur évier', author: 'Lucie Fer', price: '$5.22', liked: false },
        { id: 3, name: 'Modulateur évier', author: 'Lucie Fer', price: '$5.22', liked: true },
        { id: 4, name: 'Modulateur évier', author: 'Lucie Fer', price: '$5.22', liked: true },
        { id: 5, name: 'Modulateur évier', author: 'Lucie Fer', price: '$5.22', liked: false },
        { id: 6, name: 'Modulateur évier', author: 'Lucie Fer', price: '$5.22', liked: false },
    ];

    const featuredItems = [
        { id: 1, image: require('../assets/printit_logo.png'), title: 'MapMonde', author: 'Annette Black', price: '$5.22' },
        { id: 2, image: require('../assets/printit_logo.png'), title: 'Eclipse', author: 'John Doe', price: '$8.99' },
        { id: 3, image: require('../assets/printit_logo.png'), title: 'Stellar', author: 'Jane Doe', price: '$12.50' },
        { id: 4, image: require('../assets/printit_logo.png'), title: 'Nebula', author: 'Alice Smith', price: '$7.30' },
    ];

    const renderPopularItem = ({ item }) => (
        <View style={{...styles.popularItem, backgroundColor: themedBackgroundColor}}>
            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.popularImage} />
            <View style={{...styles.popularText, color:colorTheme}}>
                <Text style={{...styles.itemTitle, color:colorTheme}} >{item.name}</Text>
                <Text style={{color: authorColor}}>{item.author}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
            <TouchableOpacity style={{marginRight: 10}}>
                <Icon name={item.liked ? 'heart' : 'heart-outline'} size={24} color="red" />
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
                    <Icon name="search-outline" size={24} color={colorTheme} />
                    <TouchableOpacity onPress={handleLogout}>
                        <Icon name="search-outline" size={24} color={colorTheme} />
                    </TouchableOpacity>
                </View>

                <View style={styles.featuredSection}>
                    <Text style={{...styles.sectionTitle, color:colorTheme}}>Nouveaux produits</Text>
                    <FlatList
                        data={featuredItems}
                        renderItem={({ item }) => (
                            <View style={styles.featuredItem}>
                                <Image style={styles.featuredImage} source={item.image} />
                                <Text style={{...styles.featuredTitle, color:colorTheme}}>{item.title}</Text>
                                <Text style={{...styles.featuredAuthor, color:authorColor}}>{item.author}</Text>
                                <Text style={styles.featuredPrice}>{item.price}</Text>
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={{...styles.sectionTitle, color:colorTheme}}>Impressions populaires</Text>
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

            </View>
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
        alignItems: 'center',
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
        color: '#ff4c4c',
    }
});
