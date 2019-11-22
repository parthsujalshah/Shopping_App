import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import BoldText from '../components/BoldText';
import CustomButton from '../components/CustomButton';

const Details = props => {
    return (
        <View style={styles.screen}>
            <Header onMenuPressed={() => props.navigation.openDrawer()}>
                {/* <Ionicons name='ios-arrow-back' size={35} color='white' /> */}
            </Header>
            <View style={styles.imageView}>
                <Image style={{ resizeMode: 'center' }} source={require('../assets/images/test.jpg')} />
            </View>
            <View>
                <CustomButton style={styles.cart}>ADD TO CART</CustomButton>
            </View>
            <View style={styles.details}>
                <BoldText>$30</BoldText>
                <View style={{marginBottom: 40}}>
                    <ScrollView>
                        <BoldText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</BoldText>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    imageView: {
        marginVertical: 20,
        height: 300,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    details: {
        marginTop: 30,
        width: '90%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cart: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: '60%',
        marginBottom: 10
    }
});

export default Details;