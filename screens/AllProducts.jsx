import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { fetcher } from "../utils/API";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../components/Header";
import useSWR from "swr";
import {useSelector} from "react-redux";

export default function AllProducts() {
    const navigation = useNavigation();
    const theme = useSelector((state) => state.theme.mode);
    const colorTheme = theme === 'light' ? 'black' : 'white';
    const themedBackgroundColor = theme === 'light' ? '#F0F0F0' : '#2D2D2D';
    const greyColor  = theme === 'light' ? '#ffffff' : '#656363';

    const { data, error } = useSWR(`${process.env.EXPO_PUBLIC_PRODUCT_ROUTE}/all`, fetcher);

    if (error) {
        return (
            <Text style={{padding: 30, marginTop: 50}}>Une erreur est survenue</Text>
        )
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={[styles.productItem, {backgroundColor: greyColor, borderColor: greyColor}]}>
            <Text style={[styles.productName, {color: colorTheme}]}>{item.name}</Text>
            <Text style={{color: colorTheme}}>Description : {item.description ? item.description : "Aucune"}</Text>
            <Text style={{color: colorTheme}}>Prix : {`${item.price}$`}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, {backgroundColor: themedBackgroundColor}]}>
            <Header onOpenDrawer={() => navigation.openDrawer()} />
            <FlatList
                data={data ? [].concat(...data) : []}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    productItem: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
    },
    productName: {
        fontWeight: "bold",
        fontSize: 16,
    },
});
