import React, { Component } from 'react';
import {
    Button,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
    TouchableHighlight
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export default class App extends Component {
    watchId = null;
    dist = 0 ;
    prev = { 
        lat:0.0,
        long:0.0
    };

    state = {
        loading: false,
        updatesEnabled: false,
        Distance: 0.0,
        Cost: 0.0,
        location: {}
    };

    hasLocationPermission = async () => {
        if (Platform.OS === 'ios' ||
            (Platform.OS === 'android' && Platform.Version < 23)) {
        return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (hasPermission) return true;

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
        }

        return false;
    }

    getLocation = async () => {
        const hasLocationPermission = await this.hasLocationPermission();

        if (!hasLocationPermission) return;

        this.setState({ loading: true }, () => {
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({ location: position, loading: false });
                console.log(position);
            },
            (error) => {
                this.setState({ location: error, loading: false });
                console.log(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50 }
        );
        });
    }

    
    getLocationUpdates = async () => {
        const hasLocationPermission = await this.hasLocationPermission();

        if (!hasLocationPermission) return;

        this.setState({ updatesEnabled: true }, () => {
        this.watchId = Geolocation.watchPosition(
            (position) => {
                this.setState({ location: position });
                this.calculateDistance(position.coords);
                this.calculateRate();
                console.log(position);
            },
            (error) => {
                this.setState({ location: error });
                console.log(error);
            },
            { enableHighAccuracy: true, distanceFilter: 0, interval: 5000, fastestInterval: 2000 }
        );
        });
    }

    removeLocationUpdates = () => {
        if (this.watchId !== null) {
            Geolocation.clearWatch(this.watchId);
            this.setState({ updatesEnabled: false })
        }
    }

    degreesToRadians = (degrees) => {
        return degrees * Math.PI / 180;
    }

    getDistanceKm = (lat1, lon1, lat2, lon2) => {
        var earthRadiusKm = 6371;

        var dLat = this.degreesToRadians(lat2-lat1);
        var dLon = this.degreesToRadians(lon2-lon1);
      
        lat1 = this.degreesToRadians(lat1);
        lat2 = this.degreesToRadians(lat2);
      
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return earthRadiusKm * c;
    }

    calculateDistance = (coords) => {
        //var locArr = this.state.location ;
        if(this.prev.lat !== 0.0 && this.prev.long !== 0.0 )
            this.dist += this.getDistanceKm( coords.latitude , coords.longitude , this.prev.lat , this.prev.long );
        this.prev = {
            lat: coords.latitude ,
            long: coords.longitude
        };

        this.setState({
            Distance: this.dist,
        });
        //return dist ;
    }

    calculateRate = () => {
        rate = 0.90 ; //R0.90 per kilometer
        rate *= ( this.state.Distance !== 0 ) ? this.state.Distance : this.calculateDistance() ;
        this.setState({
            Cost: rate,
        });
        return rate ;
    }

    render() {
        const { loading, location, updatesEnabled } = this.state;
        return (
            <View>
               
                <View style={styles.buttons}>
                    <TouchableHighlight 
                        style={[styles.buttonContainer, styles.FuelClaim]}
                        //title='Start Observing' 
                        onPress={this.getLocationUpdates} 
                        disabled={updatesEnabled} 
                    >
                        <Text style={styles.FuelClaimText}>Start Observing</Text> 
                    </TouchableHighlight>
                    
                    <TouchableHighlight 
                        style={[styles.buttonContainer, styles.FuelClaim]}
                        //title='Stop Observing' 
                        onPress={this.removeLocationUpdates} 
                        disabled={!updatesEnabled} 
                    >
                        <Text style={styles.FuelClaimText}>Stop Observing</Text>
                    </TouchableHighlight>
                </View>

                <View style={styles.result}>
                    <Text>{JSON.stringify(location, null, 4)}</Text>
                </View>

                <View style={styles.costPerDist}>
                    <Text > Distance:{this.state.Distance} (km) </Text>
                    <Text > Cost: R{this.state.Cost} </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingHorizontal: 12
    },
    result: {
        borderWidth: 1,
        borderColor: '#666',
        width: '100%',
        paddingHorizontal: 16
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 12,
        width: '100%'
    },
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:150,
        borderRadius:30,
    },
    FuelClaim: {
        backgroundColor: "#8AD32E",
    },
    FuelClaimText: {
        color: 'white',
    },
    costPerDist: {
        color: '#239B56',
        borderWidth: 1,
        borderColor: '#6C3483'
    }
});