import React from 'react';
import {SafeAreaView, ScrollView, Dimensions, View} from 'react-native';
import {createAppContainer} from 'react-navigation'
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack';

import ShopScreen from '../screens/Shop';
import CartScreen from '../screens/Cart';
import DetailsScreen from '../screens/Details';
import EditProductsScreen from '../screens/EditProduct';
import OrdersScreen from '../screens/Orders';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import { Text, Image, AsyncStorage } from 'react-native';
import { Button } from 'native-base';
import axios from 'axios';

const serverUrl = 'http://192.168.137.1:5000';
const http = axios.create({
    baseURL: serverUrl
});

let isLoggedIn = true; //if initialized null it is considered to be false in if statement

const DrawerStyle = (props) => (
    <SafeAreaView style={{flex: 1, marginTop: 100}}>
        <ScrollView>
            <View style={{alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row'}}>
                <Image 
                    style={{height: 70, width: 70, borderRadius: 200, marginRight: 10}} 
                    source={require('../assets/images/default.jpg')}
                />
                <Text style={{fontSize: 20}}>Username</Text>
            </View>
            <DrawerItems 
                labelStyle={{
                    width: 2000
                }}
                itemsContainerStyle={{
                    marginTop: 100
                }}
                {...props}
            />
            <Button style={{
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginVertical: 30
                }}
                onPress={() => {
                    http
                        .post('/logout')
                        .then(res => {
                                isLoggedIn = res.data.logged_in;
                            }
                        )
                        if(!isLoggedIn){
                            props.navigation.navigate('Login');
                        }
                    }
                }
            >
                <Text style={{color: '#fcba03'}}>Log Out</Text>
            </Button>
        </ScrollView>
    </SafeAreaView>
);

const LoginRegisterNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            drawerLockMode: 'locked-closed'
        }
    },
    Register: {screen: RegisterScreen},
    Shop: {screen: ShopScreen},
    Details: {screen: DetailsScreen}
}, {
    headerMode: 'none',
    initialRouteName: 'Login'
});

const ShopNavigator = createDrawerNavigator({
    Login: {
        screen: LoginRegisterNavigator,
        navigationOptions: {
            drawerLabel: () => null
        }
    },
    Shop: {
        screen: ShopScreen,
        navigationOptions: {
            drawerLabel: 'Home'
        }
    },
    Cart: {
        screen: CartScreen,
        navigationOptions: {
            drawerLabel: 'Cart'
        }
    },
    EditProducts: {
        screen: EditProductsScreen,
        navigationOptions: {
            drawerLabel: 'Edit Products'
        }
    },
    Orders: {screen: OrdersScreen},
}, {
    headerMode: 'none',
    initialRouteName: 'Login',// temporary
    // initialRouteName: 'Shop',
    contentOptions: {
        activeTintColor: '#fcba03'
    },
    contentComponent: DrawerStyle
});

export default createAppContainer(ShopNavigator);