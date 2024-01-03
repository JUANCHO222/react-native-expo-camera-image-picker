import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCameraActive2, setIsCameraActive2] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
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

  // Evento para tomar la foto
  const takePicture = async () => {
    if (hasCameraPermission && cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        setImage(uri); // Aquí se establece la referencia de la imagen
        // Cierra la cámara después de tomar la foto
        setIsCameraActive(false);
        saveImage(uri); //Guardado automatico de la imagen en la galeria
      } catch (error) {
        console.error(error);
      }
    }
  };

  const takeSecondPicture = async () => {
    if (hasCameraPermission && cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        setSecondImage(uri);
        setIsCameraActive2(false);
        saveImage(uri); //Guardado automatico de la imagen en la galeria
      } catch (error) {
        console.error(error);
      }
    }
  };

  const saveImage = async (uri) => {
    try {
      await MediaLibrary.createAssetAsync(uri);
      console.log('Imagen guardada en la galería');
    } catch (error) {
      console.error('Error al guardar la imagen: ', error);
    }
  };

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

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
  };
  const toggleCamera2 = () => {
    setIsCameraActive2(!isCameraActive2);
  };


  // Evento para encender la linterna del telefono
  const switchFlashMode = async () => {
    try {
      const { status } = await Camera.requestPermissionsAsync();
      
      if (status === 'granted') {
        setFlashMode((prevFlashMode) =>
          prevFlashMode === Camera.Constants.FlashMode.off
            ? Camera.Constants.FlashMode.torch
            : Camera.Constants.FlashMode.off
        );
      } else {
        console.log('Permiso de la cámara denegado');
      }
    } catch (error) {
      console.error('Error al cambiar el modo del flash:', error);
    }
  };


  return (
    <View style={styles.container}>
      {!isCameraActive ? (
        <View style={styles.buttonContainer}>

          <TouchableOpacity
            style={styles.button}
            onPress={toggleCamera}
            disabled={!hasCameraPermission}
          >
            <Text style={styles.buttonText}>Abrir Cámara</Text>
          </TouchableOpacity>
          
          
        </View>

      ) : (
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.camera}
            type={type}
            flashMode={flashMode}
            ref={cameraRef}
          />
          <View style={styles.cameraButtons}>
            <TouchableOpacity style={styles.cameraButton} onPress={switchFlashMode}>
              <Text style={styles.buttonText}>
                {flashMode === Camera.Constants.FlashMode.on
                  ? 'Flash: ON'
                  : 'Flash: OFF'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
              <Text style={styles.buttonText}>Tomar Foto</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      )}

{!isCameraActive2 ? (
        <View style={styles.buttonContainer}>

          <TouchableOpacity
            style={styles.button}
            onPress={toggleCamera2}
            disabled={!hasCameraPermission}
          >
            <Text style={styles.buttonText}>Abrir Cámara 2</Text>
          </TouchableOpacity>
          
          
        </View>

      ) : (
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.camera}
            type={type}
            flashMode={flashMode}
            ref={cameraRef}
          />
          <View style={styles.cameraButtons}>
            <TouchableOpacity style={styles.cameraButton} onPress={switchFlashMode}>
              <Text style={styles.buttonText}>
                {flashMode === Camera.Constants.FlashMode.on
                  ? 'Flash: ON'
                  : 'Flash: OFF'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={takeSecondPicture}>
              <Text style={styles.buttonText}>Tomar Foto</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      )}


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
          onPress={pickImageFromGallery2}
          disabled={!hasGalleryPermission}
        >
          <Text style={styles.buttonText}>Abrir Galería2</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.imageContainer}>
  {image && (
    <View style={styles.imageWrapper}>
      <Text style={styles.imageLabel}>Primera Foto</Text>
      <Image source={{ uri: image }} style={styles.image} />
    </View>
  )}
  {secondImage && (
    <View style={styles.imageWrapper}>
      <Text style={styles.imageLabel}>Segunda Foto</Text>
      <Image source={{ uri: secondImage }} style={styles.image} />
      
    </View>
  )}
</View>
    </View>
  );
}


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