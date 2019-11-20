import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import BoldText from './BoldText';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './IconButton';
//import ShopNavigator from '../navigation/ShopNavigator';

const Header = props => {
    return (
        <View style={styles.header}>
            <IconButton>
                <Ionicons name="ios-menu" size={35} color='#d4bc0d' />
            </IconButton>
            <BoldText style={{ color: '#d4bc0d' }}>{props.title}</BoldText>
            <View style={styles.rightButton}>
                <IconButton onIconPressed={props.onButtonPressed}>{props.children}</IconButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 30,
        backgroundColor: Colors.header,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        height: "13%",
        flexDirection: "row"
    },
    rightButton: {
        marginLeft: '40%'
    }
});

export default Header;