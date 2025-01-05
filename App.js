import { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import {getUserFromStorage} from './redux/userSlice';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import Loading from './components/Loading';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Purchase from "./screens/Purchase";
import Orders from "./screens/Orders";
import Projects from "./screens/Projects";
import Icon from "react-native-vector-icons/Ionicons";
import {createDrawerNavigator, DrawerItemList} from "@react-navigation/drawer";
import {Image, SafeAreaView, StatusBar, Text, TouchableOpacity, useColorScheme} from "react-native";
import Profile from "./screens/Profile";
import Favorites from "./screens/Favorites";
import Settings from "./screens/Settings";
import {getThemeFromStorage, toggleTheme} from "./redux/themeSlice";
import {getBasketFromStorage} from "./redux/basketSlice";
import {getFavoritesFromStorage} from "./redux/favoriteSlice";
import ForcedReview from "./screens/ForcedReview";
import AllProducts from "./screens/AllProducts";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    );
}

function DrawerNavigator() {
    const theme = useSelector((state) => state.theme.mode);
    const themeColor = theme === 'light' ? 'black' : 'white'

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: 'transparent',
                drawerActiveTintColor: 'transparent',
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="AppStack"
                component={AppStack}
                options={{
                    drawerItemStyle: {
                        opacity:0
                    }
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={Profile}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="person-outline" size={size} color={themeColor} />
                    ),
                    drawerLabelStyle: {
                        color: themeColor,
                    }
                }}
            />
            <Drawer.Screen
                name="Favoris"
                component={Favorites}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="heart-circle-outline" size={size} color={themeColor} />
                    ),
                    drawerLabelStyle: {
                        color: themeColor,
                    }
                }}
            />
            <Drawer.Screen
                name="Avis"
                component={ForcedReview}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="sync" size={size} color={themeColor} />
                    ),
                    drawerLabelStyle: {
                        color: themeColor,
                    }
                }}
            />
            <Drawer.Screen
                name="Paramètres"
                component={Settings}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="settings-outline" size={size} color={themeColor} />
                    ),
                    drawerLabelStyle: {
                        color: themeColor,
                    }
                }}
            />
            <Drawer.Screen
                name="AllProducts"
                component={AllProducts}
                options={{
                    drawerItemStyle: {
                        opacity:0
                    }
                }}
            />
        </Drawer.Navigator>
    );
}

function CustomDrawerContent(props) {
    const { navigation } = props;
    const userInfo = useSelector((state) => state.user.userInfo);
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.mode);
    const themeColor = theme === 'light' ? 'black' : 'white';
    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: theme === 'light' ? '#ffffff' : '#5e5e5e',
        }}>
            <SafeAreaView style={{
                flexDirection: 'row',
                justifyContent:'space-between',
                alignItems: 'center',
                marginRight:20
            }}>
                <Image style={{
                    width: 50,
                    height: 50,
                    borderRadius:180,
                    marginLeft: 20
                }}
                       source={{ uri: userInfo.image ? `${process.env.EXPO_PUBLIC_BASE_IMAGE_ROUTE}/${userInfo.image}` : "https://via.placeholder.com/100" }} />
                <TouchableOpacity onPress={() => (
                    navigation.navigate('AppStack')
                )}>
                    <Icon name="close" size={30} color={themeColor} />
                </TouchableOpacity>
            </SafeAreaView>
            <Text style={{
                marginLeft: 20,
                marginTop: 20,
                fontSize: 14,
                fontWeight: 'bold',
                color: theme === 'light' ? '#000' : '#fff',
            }}>{userInfo.name}</Text>

            <DrawerItemList {...props} />

            <SafeAreaView style={{
                flex: 1,
                marginLeft: 10,
                marginTop: 20,
                flexDirection:'column',
                justifyContent:'flex-end'
            }}>
                <TouchableOpacity onPress={handleThemeToggle}>
                    <Icon name={theme === 'light' ? 'moon-outline' : 'sunny-outline'} size={30} color={themeColor} />
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
    );
}

function AppStack() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'black',
            }}
        >
            <Tab.Screen
                name="Accueil"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Mon Panier"
                component={Purchase}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="cart-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Mes Commandes"
                component={Orders}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="bag-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Mes produits"
                component={Projects}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="create-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

function RootNavigator() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const theme = useSelector((state) => state.theme.mode);
    const [isLoading, setIsLoading] = useState(true);
    const systemTheme = useColorScheme();

    useEffect(() => {
        const loadData = async () => {
            await dispatch(getUserFromStorage());
            await dispatch(getThemeFromStorage(systemTheme));
            await dispatch(getBasketFromStorage());
            await dispatch(getFavoritesFromStorage());

            setIsLoading(false);
        };
        setTimeout(loadData, 800); // todo animation
    }, [dispatch, systemTheme]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <StatusBar
                barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
                backgroundColor={theme === 'light' ? '#ffffff' : '#000000'}
            />
            <NavigationContainer>
                {isAuthenticated ? <DrawerNavigator /> : <AuthStack />}
            </NavigationContainer>
        </>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <RootNavigator />
        </Provider>
    );
}
