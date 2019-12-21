import React, {useState, useEffect} from 'react';
import { View, FlatList, StyleSheet, Image, AsyncStorage, BackHandler, ToastAndroid, ActivityIndicator } from 'react-native';
import Card from '../components/Card';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import itemList from '../constants/ItemList';
import BoldText from '../components/BoldText';
import BodyText from '../components/BodyText';
import axios from 'axios';

const Shop = props => {

    const [onHome, setOnHome] = useState(false);
    const [itemList, setItemList] = useState([]);
    const [token, setToken] = useState();
    const serverUrl = 'http://192.168.137.1:5000';
    const http = axios.create({
        baseURL: serverUrl,
        headers: {
            'x-access-token': token
        }
    });

    useEffect(() => {
        setOnHome(true);
        const getToken = async () => {
            tkn = await AsyncStorage.getItem("auth_token");
            setToken(tkn);
            const serverUrl = 'http://192.168.137.1:5000';
            const http = axios.create({
                baseURL: serverUrl,
                headers: {
                    'x-access-token': tkn
                }
            });
            http
                .post('/home', {onHome})
                .then(res => {
                    setItemList(res.data);
                })
                .catch(err => console.log(err))
            };
        getToken();
    }, []);

        let listOrLoader = (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );

        if(itemList.length != 0) {
            listOrLoader = (
                <FlatList
                    data={itemList}
                    renderItem={({ item }) => (
                        <Card style={styles.card}>
                            <View style={styles.image}>
                                <Image 
                                    style={{ width: '100%', height: '100%' }} 
                                    source={{uri: `data:image/gif;base64,${item.image_file.slice(2)}`}}
                                />
                            </View>
                            <BoldText style={{marginVertical: 2}}>{item.name}</BoldText>
                            <BodyText style={{marginVertical: 2}}>{item.price}</BodyText>
                            <View style={styles.buttonContainer}>
                                <CustomButton 
                                    onPress={() => props.navigation.navigate('Details')}
                                >
                                VIEW DETAILS
                                </CustomButton>
                                <CustomButton onPress={() => {
                                    product_id = item.id;
                                    http
                                        .post('/home/cart', {product_id})
                                        .then(res => {
                                            if(res.data.added_to_cart){
                                                ToastAndroid.show('Added to cart!', ToastAndroid.SHORT);
                                            }
                                        })
                                        .catch(err => console.log(err))
                                }}>
                                    TO CART
                                </CustomButton>
                            </View>
                        </Card>
                    )}
                    extraData={itemList}
                    keyExtractor={(item, index) => index.toString()}
                />
            );
        }

    return (
        <View style={styles.screen}>
            <Header
                title="ALL PRODUCTS"
                onButtonPressed={() => props.navigation.navigate('Cart')}
                onMenuPressed={() => props.navigation.openDrawer()}
            >
                <Ionicons name='ios-cart' size={35} color='white' />
            </Header>
            <View style={styles.list}>
                {listOrLoader}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    list: {
        marginVertical: 20,
        flex: 1,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: 250,
        height: 250,
        padding: '5%'
    },
    card: {
        marginVertical: 20
    }
});

export default Shop;
