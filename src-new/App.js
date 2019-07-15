/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import FUELCLAIM from './fuelClaim' ;
import OCR from './OCR';
import Output from './Output';


const App = createStackNavigator({
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
