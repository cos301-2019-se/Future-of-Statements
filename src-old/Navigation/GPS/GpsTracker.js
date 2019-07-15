import React, {Component} from 'react';
import {
  Platform, StyleSheet, Text, View,
  Button, PermissionsAndroid, Alert,
  ActivityIndicator, TouchableHighlight,
} from 'react-native';
import GetLocation from 'react-native-geolocation-service';



class GpsTracker extends Component {
    constructor(){
        super();
        this.state = {
            //watchId: null ,
            loading: false ,
            location: null ,
            text: "START" ,
            Distance: 0 ,
            Cost: 0 ,
        };
        console.log("----------- Called: constructor (End) ------------");
    }
    //let 
    watchId = null ;
    _requestLocation = () => {
        console.log("----------- Called: _requestLocation (Start) ------------");
        this.setState({ loading: true  });

        //GetLocation.getCurrentPosition
        watchId = GetLocation.watchPosition({
            enableHighAccuracy: true,
            timeout: 150000,
            distanceFilter: 200,
            useSignificantChanges: false ,
        })
        .then(location => {
            this.setState( state => ({
                location: [...state.location, location],
            }));
            console.log("----------- Called: watchPosition ------------");
        })
        .catch(ex => {
            const { code, message } = ex;
            console.warn(code, message);
            if (code === 'CANCELLED') {
                Alert.alert('Location cancelled by user or by another request');
            }
            if (code === 'UNAVAILABLE') {
                Alert.alert('Location service is disabled or unavailable');
            }
            if (code === 'TIMEOUT') {
                Alert.alert('Location request timed out');
            }
            if (code === 'UNAUTHORIZED') {
                Alert.alert('Authorization denied');
            }
            this.setState({
                location: null ,
                loading: false,
                text: "Start" ,
            });
        });
        //this.setState({ watchId: idno , });
        console.log("----------- Called: _requestLocation (End) ------------");
    }

    start = () => {
        //State tracking the device using time interval between getlocations
        console.log("----------- Called: start (Start) ------------");
        this.setState({
            loading: true,
            text: "End" ,  
        });
        this._requestLocation() ;
        console.log("----------- Called: start (End) ------------");
    }
  
    end = () => {
        //Stops the interval and clear
        console.log("----------- Called: End (Start) ------------");
        GetLocation.clearWatch(this.watchId) ;
        GetLocation.stopObserving() ;
        this.calculateRate ;
        this.setState({
            loading: false,
            text: "Start" ,
        });
        console.log("----------- Called: End (End) ------------");
        //return this.state.location ;
    }
    
    degreesToRadians = (degrees) => {
        return degrees * Math.PI / 180;
    }


    getDistanceKm = (lat1, lon1, lat2, lon2) => {
        var earthRadiusKm = 6371;

        var dLat = degreesToRadians(lat2-lat1);
        var dLon = degreesToRadians(lon2-lon1);
      
        lat1 = degreesToRadians(lat1);
        lat2 = degreesToRadians(lat2);
      
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return earthRadiusKm * c;
    }

    calculateDistance = () => {
        var dist = 0 ;
        var locArr = this.state.location ;
        var prev = locArr[0];
        for( a in locArr ){
            dist += this.getDistanceKm( a.latitude , a.longitude , prev.latitude , prev.longitude );
            prev = a ;
        }

        this.setState({
            Distance: dist,
        });
        return dist ;
    }


    calculateRate = () => {
        rate = 0.90 ; //R0.90 per kilometer
        rate *= ( this.state.Distance ) ? this.state.Distance : this.calculateDistance() ;
        this.setState({
            Cost: rate,
        });
        return rate ;
    }
    

    render() {
        return(
            <View>
                <Text style={styles.instructions}>To get location, press the button:</Text>
                {!this.state.loading ? (
                        <TouchableHighlight 
                            style={[styles.buttonContainer, styles.FuelClaim]} 
                            onPress={this.start}
                        >
                            <Text style={styles.FuelClaimText}>{this.state.text}</Text>
                        </TouchableHighlight>
                    ): 
                        <TouchableHighlight 
                            style={[styles.buttonContainer, styles.FuelClaim]} 
                            onPress={this.end}
                        >
                            <Text style={styles.FuelClaimText}>{this.state.text}</Text>
                        </TouchableHighlight>
                }

                <View>
                    {this.state.loading ? (
                        <ActivityIndicator />
                    ) : null}
                    {this.state.location ? (
                        <Text style={styles.location}>
                            {JSON.stringify(this.state.location, 0, 2)}
                            <Text style={styles.costPerDist}>Distance:{this.state.Distance} </Text>
                            <Text style={styles.costPerDist}>Cost: R{this.state.Cost} </Text>
                        </Text>
                    ) : null}
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
      backgroundColor: '#DCDCDC',
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    FuelClaim: {
      backgroundColor: "#8AD32E",
    },
    FuelClaimText: {
      color: 'white',
    },
    location: {
      color: '#333333',
      marginBottom: 5,
    },
    costPerDist: {
        color: '#239B56',
        marginBottom: 5,
    }

});

export default GpsTracker;