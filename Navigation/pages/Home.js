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
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={[styles.buttonContainer, styles.FuelClaim]} onPress={() => this.onFuelClaimClickListener('Fuel Claim')}>
          <Text style={styles.FuelClaimText}>Fuel Claim</Text>
        </TouchableHighlight>

       <TouchableHighlight style={[styles.buttonContainer, styles.FuelClaim]}>
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
  }
});