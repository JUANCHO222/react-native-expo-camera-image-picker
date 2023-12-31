import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';


export default function Navar(){
    return(
        <View style={styles.container}>
            <Text style={styles.Text}>Iriving Daniel Ventura Hernandez</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width:'90%',
        height:'7%',
        marginTop:150,
        justifyContent: 'center',
        alignItems: 'center',
        padding:'',
        backgroundColor: '#2E86C1'
    },
    Text: {
        fontSize: 20,
        padding: 'auto'
    }
    });