/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import OCR from './OCR';
import Output from './Output';


const App = createStackNavigator({
    OCR: {
        screen: OCR,
        navigationOptions: {
            title: 'OCR',
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
