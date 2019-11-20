import React from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import itemList from '../constants/ItemList'; //Just for Testing UI
import BoldText from '../components/BoldText';
import BodyText from '../components/BodyText';

const Orders = props => {
    return (
        <View style={styles.screen}>
            <Header title="YOUR ORDERS"></Header>
            <View style={styles.listContiner}>
                <FlatList
                    data={itemList}
                    renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={0.5} style={styles.list}>
                            <View style={styles.imageView}>
                                <Image style={{ resizeMode: 'center', height: 100, width: 100 }} source={require('../assets/images/test.jpg')} />
                            </View>
                            <View>
                                <BoldText>Item1</BoldText>
                                <BodyText>$30</BodyText>
                                <BodyText>Qty: 2</BodyText>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'flex-start'
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingStart: 10,
        borderBottomColor: '#dbd94d',
        borderBottomWidth: 2,
        width: '100%'

    },
    imageView: {
        height: 100,
        width: 100,
        marginRight: 30
    },
    listContiner: {
        width: '100%'
    }
});

export default Orders;