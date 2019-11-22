import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const CustomButton = props => {
    return (
        <TouchableOpacity style={{...styles.button, ...props.style}} onPress={props.onPress}>
            <Text>{props.children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.accent,
        padding: 5,
        borderRadius: 5
    }
});

export default CustomButton;