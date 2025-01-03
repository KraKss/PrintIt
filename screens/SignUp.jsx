import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Platform,
    Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { API } from '../utils/API';

export default function SignUp({ navigation }) {
    const [firstname, setFirstname] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const handleSignUp = async () => {
        if (!firstname.trim() || !email.trim() || !password.trim()) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires");
            return;
        }

        if (password.trim().length < 8) {
            Alert.alert("Erreur", "Le mot de passe doit contenir 8 caracteres")
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            Alert.alert("Erreur", "Veuillez entrer un email valide");
            return;
        }

        setIsLoading(true);

        try {
            const formattedName = `${firstname} ${name}`
            const response = await API.post(`${process.env.EXPO_PUBLIC_BASE_API_ROUTE}${process.env.EXPO_PUBLIC_CREATE_USER_ROUTE}`, {
                name: formattedName,
                email,
                password,
                address
            });

            const { token, user } = response.data;

            dispatch(login({ token, userInfo: user }));

        } catch (error) {
            Alert.alert("Erreur", "L'inscription a échoué. Veuillez réessayer.");
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
                    <Text style={styles.title}>Créer un compte</Text>

                    <TextInput
                        placeholder="Prénom"
                        style={styles.input}
                        value={firstname}
                        onChangeText={setFirstname}
                    />
                    <TextInput
                        placeholder="Nom (facultatif)"
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        placeholder="Adresse email"
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
                    <TextInput
                        placeholder="Adresse (facultatif)"
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
                        <Text style={styles.buttonText}>
                            {isLoading ? "Création...": "Créer mon compte"}
                        </Text>
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
        backgroundColor: '#fff',
        padding: 20,
    },
    inner: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: 0,
        marginBottom: -40,
    },
    logoTitle: {
        fontSize: 44,
        fontWeight: 'bold',
        color: '#E40D2F',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#F5F4F4',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    button: {
        width: '50%',
        height: 50,
        backgroundColor: '#E50E2F',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});
