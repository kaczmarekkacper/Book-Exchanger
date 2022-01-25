import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";

const ScannerScreen = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not scanned");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handledBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData: " + data);
  };

  const returnData = () => {
    let setBarcode =
      !!props &&
      !!props.route &&
      !!props.route.params &&
      !!props.route.params.setBarcode
        ? props.route.params.setBarcode
        : undefined;
    if (!!setBarcode) setBarcode(text);
    props.navigation.goBack(null);
  };
  return !!hasPermission ? (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handledBarCodeScanned}
      ></Camera>
      <Text style={styles.scannedText}>
        {scanned ? "ISBN: " + text : "Skanowanie"}
      </Text>
      {scanned && (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.buttonText}>Skanuj ponownie</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={returnData}>
            <Text style={styles.buttonText}>Zatwierdź</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={{ margin: 10 }}>No access to camera</Text>
      <TouchableOpacity style={styles.button} onPress={askForCameraPermission}>
        <Text style={styles.buttonText}>Ask For Permissions</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 0,
    width: "60%",
    height: "40%",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "green",
    width: "60%",
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
  scannedText: {
    marginTop: 40,
    backgroundColor: "brown",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    color: "white",
    fontWeight: "700",
    alignItems: "center",
    fontSize: 25,
    textAlign: "center",
  },
  barcodeBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
});
