import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc, getFirestore, Timestamp } from "firebase/firestore";
import Icon from "react-native-vector-icons/AntDesign";
import { auth } from "../../../firebase";
import uuid from "react-native-uuid";

import UploadPhotoElement from "../../components/UploadPhotoElement";
import InputWithTitle from "../../components/InputWithTitle";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import getBooksFromApi from "../../utils/getBooksFromApi";
import LayoutWithControlBar from "../../components/LayoutWithControlBar";

import * as Location from "expo-location";

const AddOfferScreen = (props) => {
  const db = getFirestore();
  const navigation = useNavigation();
  const [id] = useState(uuid.v1());
  const [offerTitle, setOfferTitle] = useState("");
  const [offerAuthors, setOfferAuthors] = useState("");
  const [offerDesc, setOfferDesc] = useState("");
  const [barcode, setBarcode] = useState("");
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={uploadOffer} title="Upload" />,
    });
  }, [navigation]);

  const uploadOffer = () => {
    console.log("Uploading");
    const offerData = {
      title: offerTitle,
      authors: offerAuthors,
      description: offerDesc,
      location: region,
      isbn: barcode,
      user: auth.currentUser?.email,
      timestamp: Timestamp.now().toDate(),
    };
    console.log("Offer data: " + JSON.stringify(offerData));
    setDoc(doc(db, "offers", id), offerData);
    navigation.navigate("OffersScreen");
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  useEffect(() => {
    if (!!barcode) {
      console.log(barcode);
      getBooksFromApi(barcode).then((d) => {
        try {
          setOfferTitle(d["volumeInfo"]["title"]);
        } catch (e) {
          console.log(e);
        }
        try {
          setOfferAuthors(
            d["volumeInfo"]["authors"].map((item) => item).join(", ")
          );
        } catch (e) {
          console.log(e);
        }
      });
    }
  }, [barcode]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={uploadOffer} title="Upload" />,
    });
  }, [offerTitle, offerAuthors, offerDesc, region, barcode]);

  const handleScanner = () => {
    setBarcode("");
    navigation.navigate("ScannerScreen", { setBarcode: setBarcode });
  };

  return (
    <LayoutWithControlBar>
      <ScrollView>
        <>
          <Text style={styles.addOfferText}>Dodawanie ogłoszenia</Text>
          <TouchableOpacity style={styles.button} onPress={handleScanner}>
            <Icon name="barcode" color="white" style={styles.icon} />
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
          title="Autorzy"
          onChangeText={setOfferAuthors}
          value={offerAuthors}
          placeholder="Autorzy"
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
        <InputWithTitle
          title="ISBN"
          onChangeText={setBarcode}
          value={!!barcode ? barcode : "nie ma"}
          placeholder="Numer ISBN"
          keyboardType="text"
          multiline={false}
        />
        <Text style={styles.addOfferText}>Lokalizacja</Text>
        <MapView
          provider={PROVIDER_GOOGLE}
          region={region}
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          // onRegionChange={setRegion}
        ></MapView>
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
  icon: {
    flex: 1,
    fontSize: 40,
  },
  button: {
    backgroundColor: "green",
    width: "50%",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});
export default AddOfferScreen;
