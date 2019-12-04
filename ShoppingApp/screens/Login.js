import React, {useState, useEffect} from 'react';
import {View, StatusBar, TextInput, AsyncStorage, ActivityIndicator, StyleSheet} from 'react-native';
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

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Token, setToken] = useState("");
    const [loading, setLoading] = useState(true);
    const getToken = async () => {
        tkn = await AsyncStorage.getItem("auth_token");
        return tkn
    };

    useEffect(() => {
        tkn = getToken();
        http
            .post('/login-check', {
                tkn
            })
            .then(res => {
                setLoading(false);
                if(res.data.logged_in){
                    props.navigation.navigate('Shop');
                }
            })
    },[]);

    const logIn = () => {
        http
            .post('/login', {
                email,
                password
            })
            .then(res => {
                SetToken(res.data.token, props);
            })
            .catch(err => 
                console.log(err)
            );
    };

    const SetToken = async (token, props) => {
        await AsyncStorage.setItem("auth_token", token);
        props.navigation.navigate('Shop')
    };

    // let loader = (
    //     <View style={[styles.container, styles.horizontal]}>
    //         <ActivityIndicator size="large" color="#0000ff" />
    //     </View>
    // );
    // if(!loading){
    //     loader = null
    // }
    
    return(
        <View style={{flex: 1, alignItems: 'center', paddingTop: StatusBar.currentHeight }}>
            <BoldText style={{fontSize: 40, padding: 50, color: '#e3c139'}}>Shop Here!</BoldText>
            <Card style={{alignItems: 'flex-start'}}>
                <BoldText style={{fontSize: 30}}>Log In</BoldText>
                <View style={{margin: 10}}>
                    <BodyText style={{fontSize: 20}} keyboardType="email-address">Email</BodyText>
                    <TextInput 
                        style={{paddingLeft: 5, width: 300, borderColor: '#474242', borderWidth: 1, borderRadius: 3}}
                        onChangeText={email => setEmail(email)}
                        value={email}
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
