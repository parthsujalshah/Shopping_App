import React from 'react';
import { Text } from 'react-native';

const BoldText = props => {
    return (
        <Text style={{fontFamily: 'open-sans-regular'}}>{props.children}</Text>
    );
};

export default BoldText;