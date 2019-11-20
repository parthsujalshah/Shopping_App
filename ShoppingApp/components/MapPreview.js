import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

const MapPreview = props => {
    let imagePreviewUrl;
    if (props.location) {
        imagePreviewUrl = `copy the url, replace coordinate with ${props.location.lat},${props.location.lng} add the API key`;
    }
    return (
        <View style={{...styles.mapPreview, ...props.style}}>
            {props.location ? <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} /> : props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    }
});

export default MapPreview;