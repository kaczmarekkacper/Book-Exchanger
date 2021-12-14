import React from "react";
import { StyleSheet, View } from "react-native";

import ControlBar from "../ControlBar";

const LayoutWithControlBar = (props) => {
  return (
    <>
      {props.children}
      <ControlBar containerStyle={styles.controlBar} />
    </>
  );
};

const styles = StyleSheet.create({
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
