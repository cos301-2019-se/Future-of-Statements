/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import HOME from './pages/home' ;
import FUELCLAIM from './pages/fuelClaim' ;
import MISCCLAIM from './pages/miscClaim' ;
import OCR from './ocr/OCR';
import Output from './ocr/Output';


const App = createStackNavigator({
    HOME: {
        screen: HOME,
        navigationOptions: {
            title: 'HOME',
            headerStyle: {backgroundColor: '#8AD32E'},
            headerTintColor: '#ffffff',
        }
    },

    MISCCLAIM: {
        screen: MISCCLAIM,
        navigationOptions: {
            title: 'miscellaneous',
            headerStyle: {backgroundColor: '#8AD32E'},
            headerTintColor: '#ffffff',
        }
    },

    FUELCLAIM: {
        screen: FUELCLAIM,
        navigationOptions: {
            title: 'FUELCLAIM',
            headerStyle: {backgroundColor: '#8AD32E'},
            headerTintColor: '#ffffff',
        }
    },

    OCR: {
        screen: OCR,
        navigationOptions: {
            title: 'OCR',
            headerStyle: {backgroundColor: '#8AD32E'},
            headerTintColor: '#ffffff',
        },
    },

    Output: {
        screen: Output,
        navigationOptions: {
            title: 'Output',
            headerStyle: {backgroundColor: '#8AD32E'},
            headerTintColor: '#ffffff',
        },
    },
});

export default createAppContainer(App);
