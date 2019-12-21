import React, {useState} from 'react';
import {View, StatusBar, TextInput, AsyncStorage, ActivityIndicator, StyleSheet, ToastAndroid} from 'react-native';
import {Button} from 'native-base';
import BoldText from '../components/BoldText';
import BodyText from '../components/BodyText';
import Card from '../components/Card';
import axios from "axios";

const serverUrl = 'http://192.168.137.1:5000';
const http = axios.create({
    baseURL: serverUrl
});

const LoginRegister = props => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const logIn = () => {
        http
            .post('/login', {
                username,
                password
            })
            .then(res => {
                if(res.data.token){
                    SetToken(res.data.token, props);
                    props.navigation.navigate('Shop');
                }
                else {
                    ToastAndroid.show('Please use a valid username & password', ToastAndroid.SHORT);
                }
            })
            .catch(err => 
                console.log(err)
            );
    };

    const SetToken = async (token, props) => {
        await AsyncStorage.setItem("auth_token", token);
    };

    return(
        <View style={{flex: 1, alignItems: 'center', paddingTop: StatusBar.currentHeight }}>
            <BoldText style={{fontSize: 40, padding: 50, color: '#e3c139'}}>Shop Here!</BoldText>
            <Card style={{alignItems: 'flex-start'}}>
                <BoldText style={{fontSize: 30}}>Log In</BoldText>
                <View style={{margin: 10}}>
                    <BodyText style={{fontSize: 20}} keyboardType="email-address">Username</BodyText>
                    <TextInput 
                        style={{paddingLeft: 5, width: 300, borderColor: '#474242', borderWidth: 1, borderRadius: 3}}
                        onChangeText={username => setUsername(username)}
                        value={username}
                    />
                </View>
                <View style={{margin: 10}}>
                    <BodyText style={{fontSize: 20}}>Password</BodyText>
                    <TextInput 
                        secureTextEntry={true}
                        style={{paddingLeft: 5, width: 300, borderColor: '#474242', borderWidth: 1, borderRadius: 3}}
                        onChangeText={password => setPassword(password)}
                        value={password}
                    />
                </View>
                <Button 
                    style={{backgroundColor: '#e3a532', width: 300, alignItems: 'center', justifyContent: 'center', marginLeft: 10, marginVertical: 20, borderRadius: 3}}
                    onPress={logIn}
                >
                    <BoldText>Log In</BoldText>
                </Button>
                {/* {loader} */}
                <BodyText style={{marginLeft: 15, marginTop: 20}}>Not having an account? Sign Up</BodyText>
                <Button 
                    style={{backgroundColor: '#b5b1aa', width: 300, alignItems: 'center', justifyContent: 'center', marginLeft: 10, marginVertical: 20, borderRadius: 3}}
                    onPress={() => props.navigation.navigate('Register')}
                >
                    <BoldText>Sign Up</BoldText>
                </Button>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '35%'
    },  
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})

export default LoginRegister;