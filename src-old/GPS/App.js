import React from 'react';
//For React Navigation Version 2+
//import {createStackNavigator} from 'react-navigation';
//For React Navigation Version 3+
import {createStackNavigator,createAppContainer} from 'react-navigation';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import GenerateFuel from './pages/GenerateFuel';
//import GetLocation from './gps/GetLocation';

 
const App = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Login',
            headerStyle: { backgroundColor: '#8AD32E' },
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
    GenerateFuel: {
        screen: GenerateFuel,
        navigationOptions: {
            title: 'GenerateFuel',
            headerStyle: { backgroundColor: '#8AD32E' },
            headerTintColor: '#ffffff',
        },
    },
    
});
//For React Navigation Version 2+
//export default App;
//For React Navigation Version 3+
export default createAppContainer(App);