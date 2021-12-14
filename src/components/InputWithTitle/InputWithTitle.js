import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

const InputWithTitle = (props) => {
  return (
    <View style={style.container}>
      <Text style={style.title}>{props.title}</Text>
      <TextInput
        style={style.input}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
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
    fontSize: 15,
  },
  input: {},
});

export default InputWithTitle;
