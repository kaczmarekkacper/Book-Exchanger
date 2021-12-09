import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import LayoutWithControlBar from "../../components/LayoutWithControlBar";
import UploadPhotoElement from "../../components/UploadPhotoElement";
import InputWithTitle from "../../components/InputWithTitle";

const AddOfferScreen = (props) => {
  const [offerTitle, setOfferTitle] = useState("");
  const [offerDesc, setOfferDesc] = useState("");
  return (
    <LayoutWithControlBar>
      <Text style={style.addOfferText}>Dodawanie ogłoszenia</Text>
      <UploadPhotoElement />
      <InputWithTitle
        title="Tytuł książki"
        onChangeText={setOfferTitle}
        value={offerTitle}
        placeholder="np. Harry Potter i Komnata Tajemnic"
        keyboardType="text"
        multiline={false}
      />
      <InputWithTitle
        title="Opis"
        onChangeText={setOfferDesc}
        value={offerDesc}
        placeholder="Opis ogłoszenia"
        keyboardType="text"
        multiline={true}
      />
    </LayoutWithControlBar>
  );
};

const style = StyleSheet.create({
  addOfferText: {
    fontSize: 30,
  },
});
export default AddOfferScreen;
