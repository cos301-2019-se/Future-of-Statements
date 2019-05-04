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

});

export default createAppContainer(App);