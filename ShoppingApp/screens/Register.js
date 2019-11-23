import React, {useState} from 'react';
import {View, StatusBar, TextInput} from 'react-native';
import BoldText from '../components/BoldText';
import BodyText from '../components/BodyText';
import Card from '../components/Card';
import {Button} from 'native-base';
import axios from "axios";

const serverUrl = 'http://192.168.137.1:5000';
const http = axios.create({
    baseURL: serverUrl
});

const Register = props => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = () => {
        http.post('/register', {
            username,
            email,
            password
        });
        props.navigation.navigate('Login')
    };

    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <BoldText style={{fontSize: 40, padding: 30, color: '#e3c139'}}>Shop Here!</BoldText>
            <Card style={{alignItems: 'flex-start'}}>
                <BoldText style={{fontSize: 30}}>Sign Up</BoldText>
                <View style={{margin: 10}}>
                    <BodyText style={{fontSize: 20}} keyboardType="email-address">Username</BodyText>
                    <TextInput 
                        style={{paddingLeft: 5, width: 300, borderColor: '#474242', borderWidth: 1, borderRadius: 3}} 
                        onChangeText={username => setUsername(username)}
                        value={username}
                    />
                </View>
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
                    onPress={signUp}
                >
                    <BoldText>Sign Up</BoldText>
                </Button>
                <BodyText style={{marginLeft: 15, marginTop: 20}}>Already have an account? Sign In</BodyText>
                <Button 
                    style={{backgroundColor: '#b5b1aa', width: 300, alignItems: 'center', justifyContent: 'center', marginLeft: 10, marginVertical: 20, borderRadius: 3}}
                    onPress={() => props.navigation.navigate('Login')}
                >
                    <BoldText>Sign In</BoldText>
                </Button>
            </Card>
        </View>
    );
};

export default Register