import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  Text,
} from "react-native";
import Moment from "moment";

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

import { useNavigation } from "@react-navigation/native";

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

  const navigation = useNavigation();

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
          renderItem={(props) => {
            return (
              <TouchableHighlight
                onPress={() => {
                  console.log("PRESSED");
                  navigation.navigate("OfferDetailsScreen", {
                    item: props.item,
                  });
                }}
              >
                <View style={style.container}>
                  <Image
                    style={style.image}
                    source={{
                      uri: props.item.imageUrl,
                      width: 200,
                      height: 300,
                    }}
                  ></Image>
                  <View style={style.textContainer}>
                    <Text style={style.title}>{props.item.title}</Text>
                    <Text
                      style={style.wanted}
                    >{`For: ${props.item.wanted}`}</Text>
                    <View style={style.timestampView}>
                      <Text style={style.timestamp}>
                        {Moment(props.item.timestamp).format("llll")}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            );
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
    height: "85%",
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
