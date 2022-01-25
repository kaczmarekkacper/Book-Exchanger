import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import LayoutWithControlBar from "../../components/LayoutWithControlBar";
import OfferElement from "../../components/OfferElement";
import { SearchBar } from "react-native-elements";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { database } from "../../../firebase";

const OffersScreen = () => {
  const [search, setSearch] = useState("");
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const collectionRef = collection(database, "offers");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setOffers(
        querySnapshot.docs.map((doc) => ({
          title: doc.data().title,
          id: doc.id,
          user: doc.data().user,
          author: doc.data().authors,
          location: doc.data().location,
          imageRef: doc.data().imageRef,
          timestamp: doc.data().timestamp.toDate(),
        }))
      );
      console.log("Updated");
    });

    return unsubscribe;
  }, []);

  return (
    <LayoutWithControlBar>
      <View style={style.scrollViewContainter}>
        <FlatList
          data={offers}
          renderItem={(props) => {
            return <OfferElement {...props} />;
          }}
          keyExtractor={(item) => item.timestamp}
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
    height: "95%",
    width: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
    height: "60%",
    flexDirection: "row",
    backgroundColor: "lightgrey",
  },
  image: {
    flex: 1,
    width: "10%",
    height: "100%",
  },
  title: {
    fontSize: 20,
  },
  wanted: {
    fontSize: 15,
    alignItems: "flex-start",
  },
  timestampView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  timestamp: {
    fontSize: 10,
    fontStyle: "italic",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    width: "80%",
  },
  button: {
    backgroundColor: "green",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});

export default OffersScreen;
