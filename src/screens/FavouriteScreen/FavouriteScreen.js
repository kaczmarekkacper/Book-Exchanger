import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import LayoutWithControlBar from "../../components/LayoutWithControlBar";
import OfferElement from "../../components/OfferElement";
import { SearchBar } from "react-native-elements";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { database } from "../../../firebase";
import getDocsId from "../../utils/getDocsId";
import { auth } from "../../../firebase";

const FavouriteScreen = (props) => {
  const [search, setSearch] = useState("");
  const [offers, setOffers] = useState([]);
  const [ids, setIds] = useState([]);

  useEffect(async () => {
    const idsArray = [];
    await getDocsId(auth.currentUser?.email).then((data) => {
      data.forEach((doc) => idsArray.push(doc.offerId));
    });
    setIds(idsArray);
  }, []);

  useEffect(() => {
    const collectionRef = collection(database, "offers");
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
      {/* <SearchBar
        containerStyle={style.searchBar}
        placeholder="Type here"
        onChangeText={setSearch}
        value={search}
      ></SearchBar> */}
      <View style={style.scrollViewContainter}>
        <FlatList
          data={offers.filter((doc) => ids.includes(doc.id))}
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

export default FavouriteScreen;
