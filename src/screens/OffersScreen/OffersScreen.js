import React, { useState } from "react";
import { StyleSheet } from "react-native";
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
    </LayoutWithControlBar>
  );
};

const style = StyleSheet.create({
  searchBar: {
    width: "100%",
  },
});

export default OffersScreen;
