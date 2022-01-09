import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import LayoutWithControlBar from "../../components/LayoutWithControlBar";
import {
  OfferElement,
  ActualOfferElement,
} from "../../components/OfferElement";
import { SearchBar } from "react-native-elements";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { database } from "../../../firebase";

import data from "./mockElements.json";

const OffersScreen = () => {
  const [search, setSearch] = useState("");
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const collectionRef = collection(database, "test_offers");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setOffers(
        querySnapshot.docs.map((doc) => ({
          title: doc.data().title,
          id: doc.id,
          user: doc.data().user,
          author: doc.data().author,
          timestamp: doc.data().timestamp.toDate(),
          imageUrl: doc.data().imageUrl,
        }))
      );
      console.log("Updated");
    });

    return unsubscribe;
  }, []);

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
          data={offers}
          renderItem={ActualOfferElement}
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
