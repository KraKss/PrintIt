import {View, Image, StyleSheet, ActivityIndicator} from 'react-native';

export default function Loading() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/printit_logo.png')} />
            <ActivityIndicator size="large" color={styles.activityIndicatorColor} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff4c4c',
    },
    activityIndicatorColor: '#ffffff'
});
