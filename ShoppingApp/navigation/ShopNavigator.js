import React from 'react';
import {SafeAreaView, ScrollView, AsyncStorage, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import ShopScreen from '../screens/Shop';
import CartScreen from '../screens/Cart';
import DetailsScreen from '../screens/Details';
import EditProductsScreen from '../screens/AddProduct';
import OrdersScreen from '../screens/Orders';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import { Text, Image } from 'react-native';
import { Button } from 'native-base';
import axios from 'axios';

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
                    const removeToken = async () => {
                        token = await AsyncStorage.getItem("auth_token");
                        const serverUrl = 'http://192.168.137.1:5000';
                        const http = axios.create({
                            baseURL: serverUrl,
                            headers: {
                                'x-access-token': token
                            }
                        });
                        await AsyncStorage.setItem("auth_token", "");
                        http
                            .post('/logout')
                            .then(res => {
                                    isLoggedIn = res.data.logged_in;
                                }
                            )
                            props.navigation.navigate('Login');
                        }
                        removeToken();
                    }
                }
            >
                <Text style={{color: '#fcba03'}}>Log Out</Text>
            </Button>
        </ScrollView>
    </SafeAreaView>
);

const LoginRegisterNavigator = createSwitchNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            drawerLockMode: 'locked-closed'
        }
    },
    Register: {screen: RegisterScreen}
}, {
    headerMode: 'none',
    initialRouteName: 'Login'
});

const ShopDetailsNavigator = createStackNavigator({
    Shop: {screen: ShopScreen},
    Details: {screen: DetailsScreen}
}, {
    headerMode: 'none',
    initialRouteName: 'Shop'
});

const ShopNavigator = createDrawerNavigator({
    Login: {
        screen: LoginRegisterNavigator,
        navigationOptions: {
            drawerLabel: () => null,
            drawerLockMode: 'locked-closed'
        }
    },
    Shop: {
        screen: ShopDetailsNavigator,
        navigationOptions: {
            drawerLabel: 'Home',
        }
    },
    Details: {
        screen: DetailsScreen,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerLabel: () => null
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
            drawerLabel: 'Add Products'
        }
    },
    Orders: {screen: OrdersScreen},
}, {
    headerMode: 'none',
    initialRouteName: 'Login',
    contentOptions: {
        activeTintColor: '#fcba03'
    },
    contentComponent: DrawerStyle,
    backBehavior: 'none'
});

export default createAppContainer(ShopNavigator);