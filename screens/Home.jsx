import { useDispatch } from 'react-redux';
import {logout} from '../redux/userSlice';
import {TouchableOpacity, Text, View, StyleSheet} from "react-native";

export default function Home() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenue sur l'écran Home!</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Déconnexion</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff4c4c',
        padding: 20,
    },
    text: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 20,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#ff4c4c',
        fontWeight: 'bold',
    }
});