import { useEffect, useState } from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import {getUserFromStorage} from './redux/userSlice';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import Loading from './screens/Loading';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Purchase from "./screens/Purchase";
import Orders from "./screens/Orders";
import Projects from "./screens/Projects";
import Icon from "react-native-vector-icons/Ionicons";
import {createDrawerNavigator, DrawerItemList} from "@react-navigation/drawer";
import {SafeAreaView, TouchableOpacity} from "react-native";

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
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: 'transparent',
                drawerActiveTintColor: 'black',
                drawerStyle: {
                    backgroundColor: '#fff',
                },
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
                component={SignUp}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="person-outline" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

function CustomDrawerContent(props) {
    const { navigation } = props;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <SafeAreaView style={{ padding: 20, flexDirection: 'row', justifyContent: 'flex-end', marginRight:10}}>
                <TouchableOpacity onPress={() => (
                    navigation.navigate('AppStack')
                )}>
                    <Icon name="close" size={30} color="black" />
                </TouchableOpacity>
            </SafeAreaView>

            <DrawerItemList {...props} />
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
                name="Mes Achats"
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUserFromStorage = async () => {
            dispatch(getUserFromStorage()).finally(() => {
                setIsLoading(false);
            });
        };
        setTimeout(loadUserFromStorage, 800); // todo animation
    }, [dispatch]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <NavigationContainer>
            {/* Si l'utilisateur est authentifié, afficher le DrawerNavigator */}
            {isAuthenticated ? <DrawerNavigator /> : <AuthStack />}
        </NavigationContainer>
    );
}

// const Profile = () => {
//     const {data, error, isLoading} = useSWR("http://192.168.1.7:3001/api/v1/profile/38", fetcher);
//
//     if (error) {
//         return (
//             <View style={styles.container}>
//                 <Text >Echec du chargement {error.message}</Text>
//             </View>
//         )
//     }
//     if (isLoading) {
//         return <Loading />;
//     }
//     return (
//         <View style={styles.container}>
//             <Text> Salut {data.name}!</Text>
//             <Text> {data.id}</Text>
//             <Text> {data.email}</Text>
//             <Text> {data.password}</Text>
//             <Text> {data.balance}</Text>
//             <Text> {data.address}</Text>
//             <Text> {data.bank_account}</Text>
//         </View>
//     );
// }

export default function App() {
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    //
    //
    //
    // useEffect(() => {
    //     getApi();
    // }, [])
    //
    // const getApi = async () => {
    //     // https://pokeapi.co/api/v2/pokemon?limit=50&offset=0
    //     await API.post(`http://192.168.1.7:3001/api/v1/login`, {
    //         email: "john@mail.com",
    //         password: "password"
    //     })
    //         .then((response) => {
    //             setData(response.data);
    //         })
    //         .catch((error) => {
    //             console.error(error.message);
    //         })
    //         .finally(() => {
    //             setLoading(false)
    //         })
    // }
    //
    // if (loading) {
    //     return <Loading />;
    // } else {
    // }
    return (
        <Provider store={store}>
            <RootNavigator />
        </Provider>
    );
}
