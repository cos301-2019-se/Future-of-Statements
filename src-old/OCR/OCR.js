/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, TouchableOpacity, ImageBackground, Text, TouchableHighlight, StyleSheet} from 'react-native';
import style, {screenHeight, screenWidth} from "./styles";
import {RNCamera as Camera} from "react-native-camera";
import RNTextDetector from "react-native-text-detector";

type Props = {};
var textString = "";

const PICTURE_OPTIONS = {
    quality: 1,
    fixOrientation: true,
    forceUpOrientation: true
};

export default class OCR extends Component<Props> {

    state = {
        loading: false,
        image: null,
        error: null,
        visionResp: [],
    };


    onLoginClickListener = (out) => {
        this.props.navigation.navigate('Output')
    }

    // takePicture


    takePicture = async camera => {
        this.setState({
            loading: true
        });
        try {
            const data = await camera.takePictureAsync(PICTURE_OPTIONS);
            if (!data.uri) {
                throw "OTHER";
            }
            this.setState(
                {
                    image: data.uri
                },
                () => {
                    this.processImage(data.uri, {
                        height: data.height,
                        width: data.width
                    });
                });
        } catch (e) {
            console.warn(e);
            this.reset(e);
        }
    };

    //Handles errors through-out the process

    reset(error = "OTHER") {
        this.setState(
            {
                loading: false,
                image: null,
                error
            },
            () => {
                // setTimeout(() => this.camera.startPreview(), 500);
            }
        );
    }


    // processImage
    // Gets image from react-native-camera to start the processing

    processImage = async (uri, imageProperties) => {
        try {
            const visionResp = await RNTextDetector.detectFromUri(uri);
            var resp = Object.values(visionResp);
            var textRecieved = JSON.stringify(resp);
            var fol = textRecieved.concat("\"text\"");

            var textR = fol.replace(/(?="bounding")(.*?)(?="text")/g,"");


                textR = textR.replace(/text/g, "");
                textR = textR.replace(/,/g, "\n");
                textR = textR.replace(/:/g, "");
                textR = textR.replace(/\[/g, "");
                textR = textR.replace(/{/g, "");
                textR = textR.replace(/"/g, "");
                textR = textR.replace(/\\n/g, "\n");

           console.log(textR);

           textString = textR;

            if (!(visionResp && visionResp.length > 0)) {
                throw "UNMATCHED";
            }
            this.setState({
                visionResp: this.mapVisionRespToScreen(visionResp, imageProperties)
            });
        } catch (e) {
            console.error(e);
        }
    };

    // mapVisionRespToScreen
    // Shows where text is being detected

    mapVisionRespToScreen = (visionResp, imageProperties) => {
        const IMAGE_TO_SCREEN_Y = screenHeight / (imageProperties.height);
        const IMAGE_TO_SCREEN_X =  screenWidth / (imageProperties.width/1.7) ;
        const leftX = screenWidth /  (imageProperties.width );
        console.log(textString);

        return visionResp.map(item => {
            return {
                ...item,
                position: {
                    width: item.bounding.width * IMAGE_TO_SCREEN_X,
                    left: item.bounding.left * leftX,
                    height: item.bounding.height * IMAGE_TO_SCREEN_Y,
                    top: item.bounding.top * IMAGE_TO_SCREEN_Y
                }
            };
        });
    };

    onLoginClickListener = (out) => {

        this.props.navigation.navigate('Output', {text: textString})
    }


    render() {
        return (
            <View style={style.screen}>
                {!this.state.image ? (
                    <Camera
                        ref={cam => {
                            this.camera = cam;
                        }}
                        key="camera"
                        style={style.camera}
                        notAuthorizedView={null}
                        playSoundOnCapture
                    >
                        {({camera, status}) => {
                            if (status !== "READY") {
                                return null;
                            }
                            return (
                                <View style={style.buttonContainer}>
                                    <TouchableOpacity
                                        onPress={() => this.takePicture(camera)}
                                        style={style.button}
                                    />
                                </View>
                            );
                        }}
                    </Camera>
                ) : null}
                {this.state.image ? (
                    <ImageBackground
                        source={{uri: this.state.image}}
                        style={style.imageBackground}
                        key="image"
                        resizeMode="cover"
                    >
                        {this.state.visionResp.map(item => {
                            return (
                                <TouchableOpacity
                                    style={[style.boundingRect, item.position]}
                                    key={item.text}
                                />
                            );
                        })}
                    </ImageBackground>
                ) : null}
                {this.state.image ?(

                    <TouchableHighlight
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => this.onLoginClickListener('out')}
                    >

                        <Text style={styles.loginText}>Output</Text>
                    </TouchableHighlight>
                ) :null}



                    {/*{ Object.entries(textRecieved).map((item, key)=>(*/}
                        {/*<Text key={key} style={styles.loginText} > { item } </Text>)*/}
                    {/*)}*/}



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
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        marginBottom:20,
        width:250,
        borderRadius:30,

        position: "absolute",
        bottom: 36,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    loginButton: {
        backgroundColor: "#8AD32E",
    },
    loginText: {
        color: 'white',
    }
});