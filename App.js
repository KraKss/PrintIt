import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import {getUserFromStorage} from './redux/userSlice';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import Loading from './screens/Loading';

const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    );
}

function AppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
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
        }
        setTimeout(loadUserFromStorage, 800); // todo animation
    }, [dispatch]);


    if (isLoading) {
        return <Loading />;
    }

    return (
        <NavigationContainer>
            {isAuthenticated ? <AppStack /> : <AuthStack />}
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
