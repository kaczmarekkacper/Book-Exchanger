import React, { useState } from "react";
import { Image, View, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

const UploadPhotoElement = (props) => {
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    props.setImage(_image.uri);
  };

  return (
    <View style={imageUploaderStyles.container}>
      <TouchableOpacity
        onPress={addImage}
        style={imageUploaderStyles.uploadBtn}
      >
        {props.image && (
          <Image
            source={{ uri: props.image }}
            style={{ width: 200, height: 200 }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const imageUploaderStyles = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UploadPhotoElement;
