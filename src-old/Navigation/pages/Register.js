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
            name:'',
            surname:'',
            email   : '',
            password: '',
            cPassword: '',
        }
    }

    onLoginClickListener = (login) => {
        this.props.navigation.navigate('Home')
    }
    onRegisterClickListener = (register) => {
        this.props.navigation.navigate('Register')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Name"
                               keyboardType="name"
                               underlineColorAndroid='transparent'
                               onChangeText={(name) => this.setState({name})}/>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Surname"
                               keyboardType="Surname"
                               underlineColorAndroid='transparent'
                               onChangeText={(surname) => this.setState({surname})}/>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Email"
                               keyboardType="email-address"
                               underlineColorAndroid='transparent'
                               onChangeText={(email) => this.setState({email})}/>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Password"
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(password) => this.setState({password})}/>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Confirm Password"
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(cPassword) => this.setState({cPassword})}/>
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onLoginClickListener('login')}>
                    <Text style={styles.loginText}>Register</Text>
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
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
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
    loginButton: {
        backgroundColor: "#8AD32E",
    },
    loginText: {
        color: 'white',
    }
});