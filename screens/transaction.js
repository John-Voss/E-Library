import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

const bgImage = require('../assets/background2.png');
const appIcon =  require('../assets/appIcon.png');
const appName = require('../assets/appName.png');


export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            domState: 'normal',
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',

            bookId: '',
            studentId: ''
        }
    }
    
    getCameraPermission= async (domState)=> {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status==='granted',
            domState: domState,
            scanned: false,
        })
    }
    handleBarCodeScanned=async({type, data})=>{
        const {domState} = this.state;
        if(domState === 'bookId'){
            this.setState({
                bookId: data,
                domState: 'normal',
                scanned: true
            })
        }else if(domState === 'studentId'){
            this.setState({
                studentId: data,
                domState: 'normal',
                scanned: true
            })
        }
    }
    render(){
        const {domState, scanned, bookId, studentId} = this.state;
        if(domState !='normal'){
            return(
                <BarCodeScanner
                    onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            )
        }
        return(
            <View style={styles.container}>
                <ImageBackground source={bgImage} style={styles.bgImage}>
                    <View style={styles.upperContainer}>
                        <Image source={appIcon} style={styles.appIcon}/>
                        <Image source={appName} style={styles.appName}/>
                    </View>
                    <View style={styles.lowerContainer}>
                        <View style={styles.textinputContainer}>
                            <TextInput 
                                style={styles.textinput}
                                placeholder={'Id do livro'} 
                                placeholderTextColor={'white'}
                                value={bookId}
                            />
                            <TouchableOpacity style={styles.scanbutton} onPress={()=>this.getCameraPermission('bookId')}>
                                <Text style={styles.scanbuttonText}>DIGITALIZAR</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.textinputContainer, {marginTop:25}]}>
                        <TextInput 
                                style={styles.textinput}
                                placeholder={'Id do aluno'} 
                                placeholderTextColor={'white'}
                                value={studentId}
                            />
                            <TouchableOpacity style={styles.scanbutton} onPress={()=>this.getCameraPermission('studentId')}>
                                <Text style={styles.scanbuttonText}>DIGITALIZAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF"
    },
    bgImage: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    upperContainer: {
      flex: 0.6,
      justifyContent: "center",
      alignItems: "center"
    },
    appIcon: {
      width: 200,
      height: 200,
      resizeMode: "contain",
      marginTop: 80
    },
    appName: {
      width: 180,
      resizeMode: "contain"
    },
    lowerContainer: {
      flex: 0.4,
      alignItems: "center"
    },
    textinputContainer: {
      borderWidth: 2,
      borderRadius: 10,
      flexDirection: "row",
      backgroundColor: "#9DFD24",
      borderColor: "#FFFFFF"
    },
    textinput: {
      width: "57%",
      height: 50,
      padding: 10,
      borderColor: "#FFFFFF",
      borderRadius: 10,
      borderWidth: 3,
      fontSize: 18,
      backgroundColor: "#5653D4",
      fontFamily: "Rajdhani_600SemiBold",
      color: "#FFFFFF"
    },
    scanbutton: {
      width: 100,
      height: 50,
      backgroundColor: "#9DFD24",
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      justifyContent: "center",
      alignItems: "center"
    },
    scanbuttonText: {
      fontSize: 20,
      color: "#0A0101",
      fontFamily: "Rajdhani_600SemiBold"
    }
  });