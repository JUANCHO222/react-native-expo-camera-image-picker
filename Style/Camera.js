import React from 'react';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    buttonContainer: {
      marginVertical: 10,
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
    },
    imageContainer: {
      marginTop: 20,
    },
    image: {
      width: 200,
      height: 200,
    },
    cameraContainer: {
      flex: 1,
      width: '100%',
    },
    camera: {
      flex: 1,
      width: '100%',
    },
    cameraButtons: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cameraButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
  });
  