import React, { useState } from 'react';
import {
    View,
    TextInput,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SearchBar = ({ data = [] }) => {
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);

    const navigation = useNavigation();

    const handleSearch = (text) => {
        setSearchText(text);

        if (text.trim() === '') {
            setFilteredData([]);
        } else {
            const newData = data.filter(
                (item) => item.name && item.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredData(newData);
        }
    };

    const handleOpenSearch = () => {
        setIsSearchActive(true);
    };

    const handleCloseSearch = () => {
        setSearchText('');
        setFilteredData([]);
        setIsSearchActive(false);
    };

    const handleSelectName = (name) => {
        navigation.navigate('FilteredProducts', { name, data });
    };
    return (
        <View style={styles.container}>
            {!isSearchActive ? (
                <TouchableOpacity onPress={handleOpenSearch} style={styles.iconContainer}>
                    <Icon name="search-outline" size={24} color="#666" />
                </TouchableOpacity>
            ) : (
                <View style={styles.searchContainer}>
                    <Icon name="search-outline" size={20} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Rechercher..."
                        value={searchText}
                        onChangeText={handleSearch}
                        autoFocus={true}
                    />
                    <TouchableOpacity onPress={handleCloseSearch} style={styles.closeButton}>
                        <Icon name="close-outline" size={24} color="#666" />
                    </TouchableOpacity>
                </View>
            )}

            {searchText.length > 0 && (
                <FlatList
                    data={filteredData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleSelectName(item.name)}
                            style={styles.resultItem}
                        >
                            <Text style={styles.item}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.resultList}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10,
        position: 'relative',
    },
    iconContainer: {
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
        elevation: 2,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        elevation: 2,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchBar: {
        flex: 1,
        height: 40,
    },
    closeButton: {
        marginLeft: 10,
    },
    resultList: {
        marginTop: 5,
        borderRadius: 8,
        backgroundColor: '#fff',
        maxHeight: 150,
        elevation: 3,
    },
    resultItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    item: {
        fontSize: 16,
    },
});

export default SearchBar;
