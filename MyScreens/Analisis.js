import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
export default function Analisis() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [showImage, setShowImage] = useState(true);
  const [showSecondImage, setShowSecondImage] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCameraActive2, setIsCameraActive2] = useState(false);
  const cameraRef = useRef(null);


  // Permisos para el acceso a la camara y galeria
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);
  
  // Evento para tomar la foto de la galeria
  const pickImageFromGallery = async () => {
    if (hasGalleryPermission) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri); // si no se cancela la imagen toma esta referencia
      }
    }
  };


  const pickImageFromGallery2 = async () => {
    if (hasGalleryPermission) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSecondImage(result.uri); // si no se cancela la imagen toma esta referencia
      }
    }
  };

  const handleDeleteImage = () => {
    setShowImage(false);
    setImage(null); // Limpia la referencia de la imagen
  };
  
  const handleDeleteSecondImage = () => {
    setShowSecondImage(false);
    setSecondImage(null); // Limpia la referencia de la segunda imagen
  };
  

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
  };
  const toggleCamera2 = () => {
    setIsCameraActive2(!isCameraActive2);
  };



  return (
    <View style={styles.container}>

      <View style={styles.containerLeft}>

        <View style={styles.imageContainer}>

        {showImage && image && (
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>Primera Foto</Text>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        )}

        </View>

        <View style={styles.buttonContainer}>

          <TouchableOpacity
            style={styles.button}
            onPress={pickImageFromGallery}
            disabled={!hasGalleryPermission}
          >
            <Text style={styles.buttonText}>Abrir Galería</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={null}
          >
            <Text style={styles.buttonText}>Abrir camara</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleDeleteImage}
            disabled={!showImage}
          >
            <Text style={styles.buttonText}>Borrar Imagen</Text>
          </TouchableOpacity>
        </View>

      </View>


      <View style={styles.containerRight}>

        <View style={styles.imageContainer}>
        {showSecondImage && secondImage && (
          <View style={styles.imageWrapper}>
            <Text style={styles.imageLabel}>Segunda Foto</Text>
            <Image source={{ uri: secondImage }} style={styles.image} />
          </View>
        )}
        </View>
        

        <View style={styles.buttonContainer}>

          <TouchableOpacity
            style={styles.button}
            onPress={pickImageFromGallery2}
            disabled={!hasGalleryPermission}
          >
            <Text style={styles.buttonText}>Abrir Galería</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={null}
          >
            <Text style={styles.buttonText}>Abrir camara</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleDeleteSecondImage}
            disabled={!showSecondImage}
          >
            <Text style={styles.buttonText}>Borrar Imagen</Text>
          </TouchableOpacity>
        </View>

      </View>


      <View style={styles.containerNavigation}>

          <TouchableOpacity
            style={styles.button}
            onPress={null}
          >
            <Text style={styles.buttonText}>Historial</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={null}
          >
            <Text style={styles.buttonText}>Ver PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={null}
          >
            <Text style={styles.buttonText}>Guardar y Analizar</Text>
          </TouchableOpacity>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLeft:{
    flexDirection:'row',
    margin:10
  },
  containerRight:{
    flexDirection:'row',
    margin:10
  },
  containerNavigation:{
    flexDirection:'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin:10
  },
  buttonContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4D82BC',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderRadius:45
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
});