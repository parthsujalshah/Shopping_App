import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import ShopNavigator from './navigation/ShopNavigator';

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
    <ShopNavigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
