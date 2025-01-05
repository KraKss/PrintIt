import {useCallback, useState} from "react";
import { API } from "../utils/API";
import {Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Alert, Linking} from "react-native";
import StarRating from 'react-native-star-rating-widget';
import { useSelector, useDispatch } from "react-redux";
import {logout, updateUserImage} from "../redux/userSlice";
import {useFocusEffect} from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

export default function Profile({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userInfo);
    const token = useSelector((state) => state.user.token);
    const theme = useSelector((state) => state.theme.mode);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const colorTheme = theme === "light" ? "black" : "white";
    const themedBackgroundColor = theme === "light" ? "#F9F9F9" : "#2D2D2D";
    const cardTheme = theme === "light" ? "#FFF" : "#424242";

    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);

    useFocusEffect(
        useCallback(() => {
            if (user?.id && token) {
                fetchReviews(user.id, token);
                fetchProducts(user.id, token);
            }
        }, [user, token])
    );

    const fetchReviews = async (userId, token) => {
        try {
            const response = await API.get(`/review/${userId}`);
            setReviews(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des reviews:", error);
            setReviews([]);
        }
    };

    const fetchProducts = async (userId, token) => {
        try {
            const response = await API.get(`/product/seller/${userId}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des produits:", error);
            setProducts([]);
        }
    };

    const calculateAverageRating = () => {
        if (!reviews || reviews.length === 0) return 0;
        const totalRatings = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
        const average = totalRatings / reviews.length;
        return isNaN(average) ? 0 : Math.round(average);
    };

    const countReviews = () => reviews.length;

    const handleLogout = () => {
        dispatch(logout());
    };

    const uploadImage = async (uri) => {
        const formData = new FormData();
        formData.append('userId', user.id)
        formData.append('image', {
            uri,
            name: 'profile.jpg',
            type: 'image/jpeg',
        });

        try {
            const response = await API.post(
                `${process.env.EXPO_PUBLIC_PROFILE_ROUTE}/upload-image`,
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const newImagePath = response.data.imageCreated.image;
            dispatch(updateUserImage(newImagePath));
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handlePermissionBlocked = (type) => {
        Alert.alert(
            "Permission bloquée",
            `Vous avez refusé l'accès à la ${type}. Veuillez activer la permission dans les paramètres.`,
            [
                { text: "Annuler", style: "cancel" },
                { text: "Ouvrir les paramètres", onPress: () => Linking.openSettings() },
            ]
        );
    };

    const pickImage = async () => {
        const { status, canAskAgain } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status === "denied" && !canAskAgain) {
            return handlePermissionBlocked("galerie");
        }

        if (status !== "granted") {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                return;
            }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            await uploadImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status, canAskAgain } = await ImagePicker.getCameraPermissionsAsync();
        if (status === "denied" && !canAskAgain) {
            return handlePermissionBlocked("caméra");
        }

        if (status !== "granted") {
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
            if (!permissionResult.granted) {
                return;
            }
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            await uploadImage(result.assets[0].uri);
        }
    };

    const handleProfileImagePress = () => {
        Alert.alert(
            "Modifier la photo de profil",
            "Choisissez une option",
            [
                { text: "Prendre une photo", onPress: takePhoto },
                { text: "Choisir depuis la galerie", onPress: pickImage },
                { text: "Annuler", style: "cancel" },
            ]
        );
    };

    const renderProduct = ({ item }) => (
        <View style={[styles.productCard, { backgroundColor: cardTheme }]}>
            <Image source={{ uri: item.image || "https://via.placeholder.com/50" }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={[styles.productName, { color: colorTheme }]}>{item.name}</Text>
                <Text style={[styles.productDate, { color: colorTheme }]}>Prix : {item.price}€</Text>
            </View>
        </View>
    );

    if (!isAuthenticated || !user) {
        return (
            <View style={[styles.centered, { backgroundColor: themedBackgroundColor }]}>
                <Text style={[styles.errorText, { color: colorTheme }]}>Vous devez être connecté pour voir votre profil.</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Se connecter</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themedBackgroundColor }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: cardTheme }]}>
                <Image source={require('../assets/printit_logo.png')} style={styles.logo} />
            </View>

            {/* Profile Section */}
            <View style={[styles.profileSection, { backgroundColor: cardTheme }]}>
                <TouchableOpacity onPress={handleProfileImagePress}>
                    <Image source={{ uri: user.image ? `${process.env.EXPO_PUBLIC_BASE_IMAGE_ROUTE}/${user.image}` : "https://via.placeholder.com/100" }} style={styles.profileImage} />
                </TouchableOpacity>
                <Text style={[styles.profileName, { color: colorTheme }]}>{user.name}</Text>
                <Text style={[styles.profileLocation, { color: colorTheme }]}>{user.address || "Adresse non renseignée"}</Text>
                <View style={styles.ratingContainer}>
                    <Text style={[styles.impressionsText, { color: colorTheme }]}>{countReviews()} évaluations</Text>
                    <StarRating
                        rating={calculateAverageRating()}
                        onChange={() => {}}
                        starSize={30}
                        color="#FFD700"
                        style={styles.starRating}
                    />
                </View>

                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>Se Déconnecter</Text>
                </TouchableOpacity>
            </View>

            {/* Models Section */}
            <Text style={[styles.sectionTitle, { color: colorTheme }]}>Modèles</Text>
            <FlatList
                data={products}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                renderItem={renderProduct}
                contentContainerStyle={styles.productList}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#EAEAEA",
    },
    logo: {
        width: 40,
        height: 40,
    },
    profileSection: {
        alignItems: "center",
        padding: 20,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 22,
        fontWeight: "bold",
    },
    profileLocation: {
        fontSize: 14,
        marginBottom: 10,
    },
    ratingContainer: {
        alignItems: "center",
        marginVertical: 10,
    },
    impressionsText: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: "bold",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        margin: 20,
    },
    productList: {
        paddingHorizontal: 10,
    },
    productCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    productDate: {
        fontSize: 12,
    },
    logoutButton: {
        backgroundColor: "#E40D2F",
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
    },
    logoutButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});
