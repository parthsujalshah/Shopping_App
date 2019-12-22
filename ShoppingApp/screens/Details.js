import React, {useState} from 'react';
import { 
    ScrollView, 
    View, 
    StyleSheet, 
    Image, 
    TextInput, 
    ToastAndroid, 
    AsyncStorage, 
    Button 
} from 'react-native';
import Header from '../components/Header';
import BoldText from '../components/BoldText';
import BodyText from '../components/BodyText';
import CustomButton from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const AddProduct = props => {
    return (
        <View style={styles.screen}>
            <Header
                title="DETAILS"
                onMenuPressed={() => props.navigation.openDrawer()}
            >
            </Header>
            <ScrollView style={styles.scroll}>
                <View>
                    <View style={styles.imageView}>
                        <Image 
                            style={{ resizeMode: 'center', height: 350, width: 350 }} 
                            source={{uri: props.navigation.state.params.product.image_file}}
                        />
                    </View>
                    <View style={styles.property}>
                        <BoldText>NAME: </BoldText>
                        <BoldText>{props.navigation.state.params.product.name}</BoldText>
                    </View>
                    <View style={styles.property}>
                        <BoldText>COMPANY: </BoldText>
                        <BoldText>{props.navigation.state.params.product.company}</BoldText>
                    </View>
                    <View style={styles.property}>
                        <BoldText>PRICE: </BoldText>
                        <BodyText>{props.navigation.state.params.product.price}</BodyText>
                    </View>
                    <View style={styles.property}>
                        <BoldText>DESCRIPTION: </BoldText>
                        <ScrollView>
                            <BodyText>{props.navigation.state.params.product.description}</BodyText>
                        </ScrollView>
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
        marginBottom: 40,
        marginLeft: '12%'
    },
    property: {
        marginBottom: 10,
        borderBottomColor: '#dbd94d',
        borderBottomWidth: 2,
        marginLeft: 10
    }
});

export default AddProduct;