import React from 'react';
import { ScrollView, View, StyleSheet, Image, TextInput } from 'react-native';
import Header from '../components/Header';
import BoldText from '../components/BoldText';
import { Ionicons } from '@expo/vector-icons';

const EditProduct = props => {
    return (
        <View style={styles.screen}>
            <Header
            title="EDIT PRODUCT" 
            onButtonPressed={() => props.navigation.navigate('Shop')}
            onMenuPressed={() => props.navigation.openDrawer()}
        >
                <Ionicons name='ios-checkmark-circle' size={35} color='white' />
            </Header>
            <ScrollView style={styles.scroll}>
                <View>
                    <View style={styles.imageView}>
                        <Image style={{ resizeMode: 'center', height: 350, width: 350 }} source={require('../assets/images/test.jpg')} />
                    </View>
                    <View style={styles.property}>
                        <BoldText>IMAGE SOURCE: </BoldText>
                        <TextInput defaultValue="Prefilled Value" />
                    </View>
                    <View style={styles.property}>
                        <BoldText>NAME: </BoldText>
                        <TextInput defaultValue="Prefilled Value" />
                    </View>
                    <View style={styles.property}>
                        <BoldText>PRICE: </BoldText>
                        <TextInput defaultValue="Prefilled Value" />
                    </View>
                    <View style={styles.property}>
                        <BoldText>DESCRIPTION: </BoldText>
                        <TextInput multiline={true} defaultValue="Lorem hv;wjjjVBASL;VJB;EBEOVIPOER IEWROJ;h;oofjbhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhdsvnepkvbn proh oewghwe ehipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    imageView: {
        height: 300,
        width: 300,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginLeft: '12%'
    },
    property: {
        marginBottom: 10,
        borderBottomColor: '#dbd94d',
        borderBottomWidth: 2,
        marginLeft: 10
    }
});

export default EditProduct;