import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const ScannerScreen = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not scanned");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
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
    setScanned(false);
    props.navigation.goBack();
  };

  return !!hasPermission ? (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handledBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      ></BarCodeScanner>
      <Text style={styles.scannedText}>{text}</Text>
      {scanned && (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.buttonText}>Rescan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={returnData}>
            <Text style={styles.buttonText}>Return data</Text>
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
