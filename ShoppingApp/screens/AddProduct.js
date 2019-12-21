import React, {useState, useEffect} from 'react';
import { ScrollView, View, StyleSheet, Image, TextInput, ToastAndroid, AsyncStorage } from 'react-native';
import Header from '../components/Header';
import BoldText from '../components/BoldText';
import CustomButton from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import ImgToBase64 from 'react-native-image-base64';
// import ImagePicker from 'react-native-image-picker';

const AddProduct = props => {

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState(require('../assets/images/test.jpg'));

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
                                "image_file": base64.encode(image)
                            })
                            .then(res => {
                                if(res.data.uploaded) {
                                    ToastAndroid.show("Uploaded!", ToastAndroid.SHORT);
                                }else{
                                    ToastAndroid.show("Fill all the details", ToastAndroid.SHORT);
                                }
                            })
                            .catch(err => console.log(err))
                        };
                    getToken();
                    props.navigation.navigate('Shop')
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
                            source={image}
                        />
                    </View>
                    <View style={styles.property}>
                        <BoldText>NAME: </BoldText>
                        <TextInput 
                            placeholder="Name" 
                            onChangeText={name => setName(name)}
                            value={name}
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
                    <CustomButton>
                        UPLOAD
                    </CustomButton>
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