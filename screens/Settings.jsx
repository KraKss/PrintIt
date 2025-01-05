import React, {useCallback, useState} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {useDispatch, useSelector} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";
import { API } from "../utils/API";
import { login } from "../redux/userSlice";

export default function ConfigurationScreen() {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.mode);
    const token = useSelector((state) => state.user.token);
    const user = useSelector((state) => state.user.userInfo);
    const colorTheme = theme === "light" ? "black" : "white";
    const themedBackgroundColor = theme === "light" ? "#F9F9F9" : "#2D2D2D";
    const cardTheme = theme === "light" ? "#FFF" : "#424242";

    useFocusEffect(
        useCallback(() => {
        }, [])
    );

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address);
    const [bankAccount, setBankAccount] = useState(user.bank_account);
    const [password, setPassword] = useState("");

    const updateUserInfo = (dispatch, newUserInfo, currentToken) => {
        const updatedUser = {
            userInfo: newUserInfo,
            token: currentToken,
        };

        dispatch(login(updatedUser));
    };

    const handleSave = async () => {
        try {
            let updatedUser = {
                id: user.id,
                name : name === user.name ? undefined : name,
                email : email === user.email ? undefined : email,
                address : address === user.address ? undefined : address,
                bank_account : bankAccount === user.bank_account ? undefined : bankAccount,
                password: password !== "" ? password : undefined,
                image: user.image !== undefined ? user.image : undefined
            };

            const response = await API.patch("/profile", updatedUser);

            if (response.status === 200 || response.status === 204) {
                Alert.alert("Succès", "Les données ont été modifiées avec succès !");

                updatedUser = {
                    id: user.id,
                    name : name === undefined ? user.name : name,
                    email : email === undefined ? user.email : email,
                    address : address === undefined ? user.address : address,
                    bank_account : bankAccount === undefined ? user.bank_account : bankAccount,
                    password: password !== "" ? password : user.password,
                    image: user.image !== undefined ? user.image : undefined
                };
                console.log(updatedUser)
                updateUserInfo(dispatch, updatedUser, token);
            }

        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error.response ? error.response.data : error.message);
            Alert.alert("Erreur", "Une erreur est survenue lors de la mise à jour du profil.");
        }
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
