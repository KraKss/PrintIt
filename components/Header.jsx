import {Image, TouchableOpacity, View, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {useSelector} from "react-redux";

export const Header = ({ onOpenDrawer }) => {
    const theme = useSelector((state) => state.theme.mode);
    const colorTheme = theme === 'light' ? 'black' : 'white';

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onOpenDrawer}>
                <Icon name="menu-outline" size={24} color={colorTheme} />
            </TouchableOpacity>
            <Image style={styles.logo} source={require('../assets/printit_logo.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
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
})