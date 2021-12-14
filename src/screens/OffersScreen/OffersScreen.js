import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import LayoutWithControlBar from "../../components/LayoutWithControlBar";
import OfferElement from "../../components/OfferElement";
import { SearchBar } from "react-native-elements";

import data from "./mockElements.json";

const OffersScreen = () => {
  const [search, setSearch] = useState("");
  return (
    <LayoutWithControlBar>
      <SearchBar
        containerStyle={style.searchBar}
        placeholder="Type here"
        onChangeText={setSearch}
        value={search}
      ></SearchBar>
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
  searchBar: {
    width: "100%",
    height: "10%",
  },
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

