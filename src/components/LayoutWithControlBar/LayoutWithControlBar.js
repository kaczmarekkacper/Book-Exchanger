import React from "react";
import { StyleSheet, StatusBar, SafeAreaView } from "react-native";

import ControlBar from "../ControlBar";

const LayoutWithControlBar = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        backgroundColor="#61dafb"
        hidden={false}
      />
      {props.children}
      <ControlBar containerStyle={styles.controlBar} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexShrink: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    height: "70%",
    width: "100%",
  },
  controlBar: {
    flex: 1,
    flexShrink: 1,
    flexDirection: "row", // horizontal
    alignItems: "flex-end", // secondary
    height: "20%",
    width: "100%",
  },
});

export default LayoutWithControlBar;
