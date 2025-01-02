import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Sidebar({ closeSidebar }) {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <SafeAreaView style={[styles.sidebarContainer, darkMode && styles.darkMode]}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/80' }}
                    style={styles.profileImage}
                />
                <Text style={[styles.profileName, darkMode && styles.textDark]}>
                    Floyd Miles
                </Text>
                <TouchableOpacity onPress={closeSidebar}>
                    <Icon name="chevron-forward-outline" size={24} color={darkMode ? "#fff" : "#000"} />
                </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Menu Items */}
            <View style={styles.menu}>
                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="person-outline" size={24} color={darkMode ? "#fff" : "#000"} />
                    <Text style={[styles.menuText, darkMode && styles.textDark]}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="heart-outline" size={24} color={darkMode ? "#fff" : "#000"} />
                    <Text style={[styles.menuText, darkMode && styles.textDark]}>Favoris</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="time-outline" size={24} color={darkMode ? "#fff" : "#000"} />
                    <Text style={[styles.menuText, darkMode && styles.textDark]}>Historique</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="settings-outline" size={24} color={darkMode ? "#fff" : "#000"} />
                    <Text style={[styles.menuText, darkMode && styles.textDark]}>Configuration</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => setDarkMode(!darkMode)}>
                    <Icon name={darkMode ? "sunny-outline" : "moon-outline"} size={24} color={darkMode ? "#fff" : "#000"} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sidebarContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    darkMode: {
        backgroundColor: '#333',
    },
    profileSection: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
    },
    menu: {
        marginVertical: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    menuText: {
        fontSize: 16,
        marginLeft: 10,
        color: '#000',
    },
    footer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    textDark: {
        color: '#fff',
    },
});
