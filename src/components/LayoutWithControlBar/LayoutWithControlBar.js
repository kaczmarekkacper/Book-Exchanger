import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";

import ControlBar from "../ControlBar";

const LayoutWithControlBar = (props) => {
  const [search, setSearch] = useState("");
  return (
    <>
      <SearchBar
        containerStyle={styles.searchBar}
        placeholder="Type here"
        onChangeText={setSearch}
        value={search}
      ></SearchBar>
      {props.children}
      <ControlBar containerStyle={styles.controlBar} />
    </>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: "100%",
    height: "10%",
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
