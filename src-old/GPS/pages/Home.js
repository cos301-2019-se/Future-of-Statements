import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
//import GpsTracker from '../gps/GpsTracker';
import GpsLocationTracker from '../gps/GpsLocationTracker';

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
    }
  }

  onFuelClaimClickListener = (login) => {
    this.props.navigation.navigate('Home')
    //this.props.navigation.navigate('getlocation')
  }

  render() {
    return (
      <View style={styles.container}>
        <GpsLocationTracker/>
        <TouchableHighlight 
          style={[styles.buttonContainer, styles.FuelClaim]}
        >
          <Text style={styles.FuelClaimText}>Other Claim</Text>
        </TouchableHighlight>
        
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