import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Card = props => {
    return (
        <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        backgroundColor: 'white',
        elevation: 8,
        padding: 20,
        borderRadius: 10,
    }
});

export default Card;