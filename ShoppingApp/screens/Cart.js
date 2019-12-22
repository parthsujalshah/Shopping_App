import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, TouchableOpacity, FlatList, ActivityIndicator, AsyncStorage } from 'react-native';
import axios from 'axios';
import Header from '../components/Header';
import BoldText from '../components/BoldText';
import BodyText from '../components/BodyText';

const Cart = props => {

    const [cart, setCart] = useState();

    useEffect(() => {
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
                .post('/cart')
                .then(res => {
                    setCart(res.data.cart_of_user);
                })
                .catch(err => console.log(err))
            };
        getToken();
    }, [props.navigation.state.params.itemsInCart]);
    let listOrLoader = (
        <View>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
    if(cart){
        listOrLoader = (
            <FlatList
                data={cart}
                renderItem={({ item }) => (
                    <View style={styles.list}>
                        <TouchableOpacity 
                            activeOpacity={0.5}
                            style={styles.list}
                            onPress={() => {
                                product_id = item.id;
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
                                        .post('/details', {product_id})
                                        .then(res => {
                                            props.navigation.navigate('Details', {product: res.data.product})
                                        })
                                        .catch(err => console.log(err))
                                    };
                                getToken();
                            }}
                        >
                            <View style={styles.imageView}>
                                <Image 
                                    style={{ resizeMode: 'center', height: 100, width: 100 }} 
                                    source={{uri: item.image_file}}
                                />
                            </View>
                            <View>
                                <BoldText>{item.name}</BoldText>
                                <BodyText>{item.price}</BodyText>
                                {/* <BodyText>Qty: 2</BodyText> */}
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />
        )
    }
    return (
        <View style={styles.screen}>
            <Header title="CART" onMenuPressed={() => props.navigation.openDrawer()}></Header>
            <View style={styles.headingContainer}>
                <BoldText style={styles.heading}>Items in the Cart</BoldText>
            </View>
            {listOrLoader}
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