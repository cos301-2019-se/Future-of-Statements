import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text } from 'react-native';
//import all the components we are going to use.

export default class SecondPage extends Component {



    render() {
        const date = this.props.navigation.getParam('date', 'error: not found');
        const total = this.props.navigation.getParam('total', 'error: not found');
        //const text =  this.props.navigation.getParam('text', 'nothing sent');
        return (
            <View style={styles.container}>

                <Text>--------------------------</Text>
                <Text>Date:{date}</Text>
                <Text>Total:{total}</Text>
                <Text>--------------------------</Text>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextStyle: {
        fontSize: 23,
        textAlign: 'center',
        color: '#f00',
    },
});