import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

const InputWithTitle = (props) => {
  return (
    <View style={style.container}>
      <Text style={style.title}>{props.title}</Text>
      <TextInput
        style={style.input}
        onChangeText={(text) => {
          console.log(text);
          props.onChangeText(text);
        }}
        value={props.value}
        placeholder={props.placeholder}
        // keyboardType={props.keyboardType}
        multiline={props.multiline}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "grey",
  },
});

export default InputWithTitle;
