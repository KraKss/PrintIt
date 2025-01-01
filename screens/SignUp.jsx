import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function SignUp({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.logo}>Print It</Text>
            <Text style={styles.title}>Nouveau compte</Text>

            <TextInput placeholder="Nom" style={styles.input} />
            <TextInput placeholder="Prénom" style={styles.input} />
            <TextInput placeholder="Adresse mail" style={styles.input} />
            <TextInput placeholder="Confirmer l'adresse mail" style={styles.input} />
            <TextInput placeholder="Numéro de téléphone" style={styles.input} />
            <TextInput placeholder="Rue et numéro" style={styles.input} />
            <TextInput placeholder="Code postale" style={styles.input} />
            <TextInput placeholder="Ville" style={styles.input} />
            <TextInput placeholder="Mot de passe" style={styles.input} secureTextEntry={true} />
            <TextInput placeholder="Confirmer mot de passe" style={styles.input} secureTextEntry={true} />

            <TouchableOpacity style={styles.button} onPress={() => console.log('Sign Up')}>
                <Text style={styles.buttonText}>Créer mon compte</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.link}>Retour à la connexion</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    logo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ff4c4c',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        color: '#ff4c4c',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#f5f5f5',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#ff4c4c',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    link: {
        color: '#ff4c4c',
        textDecorationLine: 'underline',
    },
});