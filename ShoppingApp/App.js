import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import Shop from './screens/Shop';
import Details from './screens/Details';
import Orders from './screens/Orders';
import EditProducts from './screens/EditProduct';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Register from './screens/Register';
import ShopNavigator from './navigation/ShopNavigator';
import LoginRegisterNavigator from './navigation/LoginRegisterNavigator';

const fetchFont = () => {
  return Font.loadAsync({
    'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  return (
    // <Shop/>
    //<Details name="PRODUCT DETAILS" />
    // <Orders />
    // <EditProducts/>
    // <Cart />
    // <ShopNavigator />
    // <Login />
    // <Register />
    <LoginRegisterNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
