import React from "react";
import { StyleSheet, View } from "react-native";
import ControlBarIcon from "../ControlBarIcon";
import Icon from "react-native-vector-icons/AntDesign";

const ControlBar = () => {
  return (
    <View style={styles.container}>
      <ControlBarIcon
        title="Search"
        icon={<Icon name="home" color="white" />}
      />
      <ControlBarIcon
        title="Loved"
        icon={<Icon name="hearto" color="white" />}
      />
      <ControlBarIcon
        title="Add"
        icon={<Icon name="pluscircleo" color="white" />}
      />
      <ControlBarIcon
        title="Chats"
        icon={<Icon name="message1" color="white" />}
      />
      <ControlBarIcon
        title="Account"
        icon={<Icon name="team" color="white" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row", // horizontal
    justifyContent: "space-around", // main
    alignItems: "flex-end", // secondary
    width: "100%",
  },
  icon: {},
});

export default ControlBar;
