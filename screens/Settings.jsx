import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

export default function ConfigurationScreen() {
    const theme = useSelector((state) => state.theme.mode);
    const colorTheme = theme === "light" ? "black" : "white";
    const themedBackgroundColor = theme === "light" ? "#F9F9F9" : "#2D2D2D";
    const cardTheme = theme === "light" ? "#FFF" : "#424242";

    const user = {
        user_id: 1,
        name: "Kristin Watson",
        email: "kristin.watson@example.com",
        address: "123 Main St, Cincinnati, OH",
        bank_account: "US123456789012345",
        balance: 1250.75,
    };

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address);
    const [bankAccount, setBankAccount] = useState(user.bank_account);
    const [password, setPassword] = useState("");

    const handleSave = () => {
        alert("Les données ont été modifiées avec succès !");
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themedBackgroundColor }]}>
            {/* Section rouge */}
            <View style={[styles.iconContainer, { backgroundColor: "#E40D2F" }]}>
                <Icon name="settings-outline" size={80} color="#FFFFFF" />
                <Text style={styles.iconTitle}>Configuration</Text>
            </View>

            {/* Configuration Section */}
            <View style={[styles.configSection, { backgroundColor: cardTheme }]}>
                <Text style={[styles.sectionTitle, { color: colorTheme }]}>Modifier les paramètres</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: themedBackgroundColor, color: colorTheme }]}
                    placeholder="Nom complet"
                    placeholderTextColor="#888"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={[styles.input, { backgroundColor: themedBackgroundColor, color: colorTheme }]}
                    placeholder="Adresse email"
                    placeholderTextColor="#888"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={[styles.input, { backgroundColor: themedBackgroundColor, color: colorTheme }]}
                    placeholder="Adresse"
                    placeholderTextColor="#888"
                    value={address}
                    onChangeText={setAddress}
                />
                <TextInput
                    style={[styles.input, { backgroundColor: themedBackgroundColor, color: colorTheme }]}
                    placeholder="Compte bancaire"
                    placeholderTextColor="#888"
                    value={bankAccount}
                    onChangeText={setBankAccount}
                />
                <TextInput
                    style={[styles.input, { backgroundColor: themedBackgroundColor, color: colorTheme }]}
                    placeholder="Mot de passe"
                    placeholderTextColor="#888"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Modifier</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    iconTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginTop: 10,
        textAlign: "center",
    },
    configSection: {
        borderRadius: 15,
        marginHorizontal: 20,
        padding: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 5},
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
        saveButton: {
            backgroundColor: "#E40D2F",
            paddingVertical: 15,
            borderRadius: 10,
            alignItems: "center",
        },
        saveButtonText: {
            color: "#FFF",
            fontSize: 16,
            fontWeight: "bold",
        },
    });
