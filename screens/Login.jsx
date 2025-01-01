import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Login({ navigation }) {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/printit_logo.png')} />
            <Text style={styles.logoTitle}>Print It</Text>
            <Text style={styles.title}>Connexion</Text>

            <TextInput placeholder="Adresse mail" style={styles.input} />
            <TextInput placeholder="Mot de passe" style={styles.input} secureTextEntry />

            <TouchableOpacity style={styles.button} onPress={() => console.log('Login')}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.link}>Pas encore de compte ? Inscrivez-vous</Text>
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
    logo : {

    },
    logoTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 15,
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
    },
    link: {
        color: '#fff',
        textDecorationLine: 'underline',
    },
});