import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { API } from "../utils/API";

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (!email) {
            Alert.alert("Erreur", "Veuillez remplir l'email");
            return;
        }

        if (!password) {
            Alert.alert("Erreur", "Veuillez entrer votre mot de passe");
            return;
        }

        setIsLoading(true);

        try {
            const response = await API.post(`${process.env.EXPO_PUBLIC_LOGIN_ROUTE}`, { email, password });
            const token = response.data;

            const userProfileResponse = await API.get(`${process.env.EXPO_PUBLIC_PROFILE_ROUTE}?email=${email}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const userInfo = userProfileResponse.data;

            dispatch(login({ token, userInfo }));
        } catch (error) {
            Alert.alert("Erreur", "La connexion a échoué. Veuillez vérifier vos identifiants.");
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.inner}>
                    <Image style={styles.logo} source={require('../assets/printit_logo.png')} />
                    <Text style={styles.logoTitle}>Print It</Text>

                    <TextInput
                        placeholder="Adresse mail"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        placeholder="Mot de passe"
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
                        <Text style={styles.buttonText}>{isLoading ? 'Connexion...' : 'Se connecter'}</Text>
                    </TouchableOpacity>

                    <Text style={{color: "#fff"}}>Pas encore de compte ? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.link}>Inscrivez-vous</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff4c4c',
        padding: 20,
    },
    inner: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 300,
        height: 300,
        marginTop: 20,
        marginBottom: -40,
    },
    logoTitle: {
        fontSize: 44,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 40,
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
        width: '50%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 60,
    },
    buttonText: {
        color: '#ff4c4c',
        fontWeight: 'bold',
    },
    link: {
        color: '#fff',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        marginTop: 10,
    },
});