import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import Icon from "react-native-vector-icons/AntDesign";
import { auth } from "../../../firebase";
import database from "firebase/database";
import uuid from "react-native-uuid";

import UploadPhotoElement from "../../components/UploadPhotoElement";
import InputWithTitle from "../../components/InputWithTitle";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import BookInfo from "../../components/BookInfo";

import getBooksFromApi from "../../utils/getBooksFromApi";
import LayoutWithControlBar from "../../components/LayoutWithControlBar";

const AddOfferScreen = (props) => {
  const db = getFirestore();
  const navigation = useNavigation();
  const [id] = useState(uuid.v1());
  const [offerTitle, setOfferTitle] = useState("");
  const [offerDesc, setOfferDesc] = useState("");
  const [barcode, setBarcode] = useState("");
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerCorr, setMarkerCorr] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [bookData, setBookData] = useState({});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={uploadOffer} title="Upload" />,
    });
  }, [navigation]);

  const uploadOffer = () => {
    const offerData = {
      title: offerTitle,
      description: offerDesc,
      location: region,
      isbn: barcode,
      user: auth.currentUser?.email,
    };
    console.log("Offer data: " + JSON.stringify(offerData));
    console.log("Book data: " + JSON.stringify(bookData));
    setDoc(doc(db, "offers", id), offerData);
  };

  useEffect(() => {
    if (!!barcode) {
      data = getBooksFromApi(barcode);
      console.log("Data: " + JSON.stringify(data));
      setBookData(data);
    }
  }, [barcode]);

  const handleScanner = () => {
    navigation.navigate("ScannerScreen", { setBarcode: setBarcode });
  };

  return (
    <LayoutWithControlBar>
      <ScrollView>
        <>
          <Text style={styles.addOfferText}>Dodawanie ogłoszenia</Text>
          <TouchableOpacity style={styles.button} onPress={handleScanner}>
            <Icon name="barcode" color="white" />
          </TouchableOpacity>
        </>
        <UploadPhotoElement />
        <InputWithTitle
          title="Tytuł"
          onChangeText={setOfferTitle}
          value={offerTitle}
          placeholder="Tytuł ogłoszenia"
          keyboardType="text"
          multiline={true}
        />
        <InputWithTitle
          title="Opis"
          onChangeText={setOfferDesc}
          value={offerDesc}
          placeholder="Opis ogłoszenia"
          keyboardType="text"
          multiline={true}
        />
        <Text style={styles.addOfferText}>
          {!!barcode ? barcode : "nie ma"}
        </Text>
        <Text style={styles.addOfferText}>Lokalizacja</Text>
        <MapView
          provider={PROVIDER_GOOGLE}
          region={region}
          style={styles.map}
          // onRegionChange={setRegion}
        >
          <Marker coordinate={markerCorr} />
        </MapView>
        {!!bookData ? <BookInfo {...bookData} /> : null}
      </ScrollView>
    </LayoutWithControlBar>
  );
};

const styles = StyleSheet.create({
  addOfferText: {
    fontSize: 30,
  },
  map: {
    width: 200,
    height: 200,
  },
  button: {
    backgroundColor: "green",
    width: "10%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});
export default AddOfferScreen;
