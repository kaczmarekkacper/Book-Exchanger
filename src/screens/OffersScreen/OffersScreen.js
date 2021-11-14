import React, { useState } from "react";
import { StyleSheet, ScrollView, View, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";

import LayoutWithControlBar from "../../components/LayoutWithControlBar";
import OfferElement from "../../components/OfferElement";

import data from "./mockElements.json";

const OffersScreen = (props) => {
  const [search, setSearch] = useState("");
  return (
    <LayoutWithControlBar>
      <View style={style.scrollViewContainter}>
        <FlatList
          data={data}
          renderItem={OfferElement}
          keyExtractor={(item) => item.id}
        />
      </View>
    </LayoutWithControlBar>
  );
};

const style = StyleSheet.create({
  scrollableContent: {
    width: "100%",
    height: "100%",
    flexShrink: 1,
  },
  scrollViewContainter: {
    flexDirection: "column",
    height: "85%",
    width: "100%",
  },
});

export default OffersScreen;
