/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
//import OCR from './OCR/OCR'
import GPStrack from './GPS/GpsTracker'
import GPSlocation from './GPS/GpsLocationTracker'

const App = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      headerStyle: {backgroundColor: '#8AD32E'},
      headerTintColor: '#ffffff',
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: 'Register',
      headerStyle: { backgroundColor: '#8AD32E' },
      headerTintColor: '#ffffff',
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
      headerStyle: { backgroundColor: '#8AD32E' },
      headerTintColor: '#ffffff',
    },
  },
  // OCR: {
  //   screen: OCR,
  //   navigationOptions: {
  //     title: 'OCR',
  //     headerStyle: { backgroundColor: '#8AD32E' },
  //     headerTintColor: '#ffffff',
  //   },
  // },
  GPStrack: {
    screen: GPStrack,
    navigationOptions: {
      title: 'GPStrack',
      headerStyle: { backgroundColor: '#8AD32E' },
      headerTintColor: '#ffffff',
    },
  },
  GPSlocation: {
    screen: GPSlocation,
    navigationOptions: {
      title: 'GPSlocation',
      headerStyle: { backgroundColor: '#8AD32E' },
      headerTintColor: '#ffffff',
    },
  },


});

export default createAppContainer(App);