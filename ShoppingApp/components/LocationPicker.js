import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from './MapPreview';

const LocationPicker = props => {
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient Permission',
                'Grant the location permission',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const getUserLocationHandler = async () => {
        const hasPermissions = await verifyPermissions();
        if (!hasPermissions) {
            return;
        }
        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
            setPickedLocation({
                lat: Location.coords.latitude,
                lng: Location.coords.longitude
            });
            ;
        } catch (err) {
            Alert.alert('Could not fetch location', 'Try again Later', [{ text: 'Okay' }]);
        }
        setIsFetching(false);
    };

    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLocation}>
                {isFetching ? (
                    <ActivityIndicator size='large' color={Colors.header} />
                ) : (
                        <Text>No Location Chosen Yet!</Text>
                    )}
            </MapPreview>
            <Button
                title="Get User Location"
                color='black'
                onPress={getUserLocationHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        heigth: 150,
        borderColor: '#ccc',
        borderWidth: 1
    }
});

export default LocationPicker;