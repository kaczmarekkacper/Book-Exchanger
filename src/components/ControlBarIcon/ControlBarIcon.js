import { Button } from "react-native-elements";
import React from "react";
import { StyleSheet, View } from "react-native";

const ControlBarIcon = (props) => {
  return (
    <View style={style.container}>
      <Button
        buttonStyle={style.button}
        icon={props.icon}
        iconPosition="top"
        title={props.title}
        onPress={props.onPress}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexShrink: 1,
  },
  button: {
    backgroundColor: "#3b3b3b",
  },
});

export default ControlBarIcon;
