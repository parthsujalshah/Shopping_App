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
import CustomButton from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const AddProduct = props => {

    const [name, setName] = useState();
    const [company, setCompany] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState(); // require('../assets/images/test.jpg')
    const [responseImage, setResponseImage] = useState();

    const addImage = async type => {
        if (type==="gallery") {
            const response = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1]
            })
            if(!response.cancelled) {
                setImage(response.uri);
            }
        }else if (type==="camera"){
            const response = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });
            if (!response.cancelled){
                setImage(response.uri);
            }
        }
    };

    return (
        <View style={styles.screen}>
            <Header
                title="ADD PRODUCT" 
                onButtonPressed={() => {
                    const getToken = async () => {
                        tkn = await AsyncStorage.getItem("auth_token");
                        const serverUrl = 'http://192.168.137.1:5000';
                        const http = axios.create({
                            baseURL: serverUrl,
                            headers: {
                                'x-access-token': tkn
                            }
                        });
                        http
                            .post('/upload', {
                                "image_file": image,
                                "name": name,
                                "company": company,
                                "price": price,
                                "description": description
                            })
                            .then(res => {
                                if(res.data.uploaded) {
                                    ToastAndroid.show("Uploaded!", ToastAndroid.SHORT);
                                    setResponseImage (
                                        <Image 
                                            style={{ resizeMode: 'center', height: 350, width: 350 }}
                                            source={{uri: res.data.image}}
                                        />
                                    );
                                }else{
                                    ToastAndroid.show("Fill all the details", ToastAndroid.SHORT);
                                }
                            })
                            .catch(err => console.log(err))
                        };
                    getToken();
                    // props.navigation.navigate('Shop')
                }}
                onMenuPressed={() => props.navigation.openDrawer()}
            >
                <Ionicons name='ios-checkmark-circle' size={35} color='white' />
            </Header>
            <ScrollView style={styles.scroll}>
                <View>
                    <View style={styles.imageView}>
                        <Image 
                            style={{ resizeMode: 'center', height: 350, width: 350 }} 
                            source={{uri: image}}
                        />
                        {responseImage}
                    </View>
                    <View style={styles.property}>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <CustomButton 
                                style={{margin: 20}} 
                                onPress={() => {addImage("camera")}}
                            >
                                Camera
                            </CustomButton>
                            <CustomButton 
                                style={{margin: 20}} 
                                onPress={() => {props.navigation.navigate('Home')}}
                            >
                                Cancel
                            </CustomButton>
                            <CustomButton 
                                style={{margin: 20}} 
                                onPress={() => {addImage("gallery")}}
                            >
                                Gallery
                            </CustomButton>
                        </View>
                        <BoldText>NAME: </BoldText>
                        <TextInput 
                            placeholder="Name" 
                            onChangeText={name => setName(name)}
                            value={name}
                        />
                    </View>
                    <View style={styles.property}>
                        <BoldText>COMPANY: </BoldText>
                        <TextInput 
                            placeholder="Company" 
                            onChangeText={company => setCompany(company)}
                            value={company}
                        />
                    </View>
                    <View style={styles.property}>
                        <BoldText>PRICE: </BoldText>
                        <TextInput 
                            placeholder="Price" 
                            onChangeText={price => setPrice(price)}
                            value={price}
                        />
                    </View>
                    <View style={styles.property}>
                        <BoldText>DESCRIPTION: </BoldText>
                        <TextInput 
                            multiline={true} 
                            placeholder="Description" 
                            onChangeText={description => setDescription(description)}
                            value={description}
                        />
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

export default AddProduct;