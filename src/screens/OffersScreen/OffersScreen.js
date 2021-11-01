import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { SearchBar } from "react-native-elements";

import LayoutWithControlBar from "../../components/LayoutWithControlBar";
import OfferElement from "../../components/OfferElement";

import Moment from "moment";

import data from "./mockElements.json";

const OffersScreen = (props) => {
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
        <ScrollView contentContainerStyle={style.scrollableContent}>
          {data.map((el) => {
            return (
              <OfferElement
                title={el.title}
                imageUrl={el.imageUrl}
                wanted={el.wanted}
                timestamp={Moment(el.timestamp).format("llll")}
              ></OfferElement>
            );
          })}
        </ScrollView>
      </View>
    </LayoutWithControlBar>
  );
};

const style = StyleSheet.create({
  searchBar: {
    width: "100%",
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
