import React from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import Header from '../components/Header';
import BoldText from '../components/BoldText';
import BodyText from '../components/BodyText';
import itemList from '../constants/ItemList';

const Cart = props => {
    return (
        <View style={styles.screen}>
            <Header title="CART" onMenuPressed={() => props.navigation.openDrawer()}></Header>
            <View style={styles.headingContainer}>
                <BoldText style={styles.heading}>Items in the Cart</BoldText>
            </View>
            <FlatList
                data={itemList}
                renderItem={({ item }) => (
                    <View style={styles.list}>
                        <TouchableOpacity 
                            activeOpacity={0.5}
                            style={styles.list}
                            onPress={() => props.navigation.navigate('Details')}
                        >
                            <View style={styles.imageView}>
                                <Image style={{ resizeMode: 'center', height: 100, width: 100 }} source={require('../assets/images/test.jpg')} />
                            </View>
                            <View>
                                <BoldText>Item1</BoldText>
                                <BodyText>$30</BodyText>
                                <BodyText>Qty: 2</BodyText>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    headingContainer: {
        marginLeft: 20,
        marginTop: 50,
        marginBottom: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 3
    },
    heading: {
        fontSize: 30,
    },
    imageView: {
        height: 100,
        width: 100,
        marginRight: 30
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingStart: 10,
        borderBottomColor: '#dbd94d',
        borderBottomWidth: 2,
        width: '100%',
        padding: 5
    }
});

export default Cart;