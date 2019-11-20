import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { getAppLoadingLifecycleEmitter } from 'expo/build/launch/AppLoading';

const IconButton = props => {
    return (
        <TouchableOpacity>
            <View style={styles.button}>
                <Text>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: 40,
        alignItems: 'center',
        marginRight: 10
    }
});

export default IconButton;