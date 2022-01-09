import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LayoutWithControlBar from "../../components/LayoutWithControlBar";

const OfferDetailsScreen = (props) => {
  const item = props.route.params.item;
  const navigation = useNavigation();

  const handledOpenChat = () => {
    console.log("Opening chat with user " + item.user);
    navigation.navigate("ChatScreen", { to_user: item.user });
  };
  return (
    <LayoutWithControlBar>
      <View style={styles.container}>
        <Text>{`Autor: ${item.author}`}</Text>
        <Text>{`Tytuł: ${item.title}`}</Text>
        <TouchableOpacity style={styles.button} onPress={handledOpenChat}>
          <Text style={styles.buttonText}>Otwórz czat</Text>
        </TouchableOpacity>
      </View>
    </LayoutWithControlBar>
  );
};

export default OfferDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "green",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "green",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
  buttonOutlineText: {
    color: "green",
    fontWeight: "700",
    fontSize: 15,
  },
});