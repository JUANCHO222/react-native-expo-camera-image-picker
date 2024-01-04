import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Analisis from './MyScreens/Analisis';
import PhotoCam from './MyScreens/PhotoCam';
import PhotoCamSec from './MyScreens/PhotoCamSec';



const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Analisis} />
        <Stack.Screen name="Camara" component={PhotoCam} />
        <Stack.Screen name="CamaraS" component={PhotoCamSec} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}