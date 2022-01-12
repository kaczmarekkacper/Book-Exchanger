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
  doc,
  where,
  documentId,
} from "firebase/firestore";
import { auth, database } from "../../../firebase";

import { useNavigation } from "@react-navigation/native";

const UserChatsScreen = () => {
  const me = auth.currentUser.email;
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const collectionRef = collection(database, "user_chats");
    const q = query(collectionRef, where(documentId(), "==", me));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // Powinien być jeden
      querySnapshot.docs.forEach((doc) => {
        let ar = [];
        Object.entries(doc.data()).forEach((e) => {
          ar.push({ mail: e[0], time: e[1] });
          console.log(e);
        });
        setChats(ar);
      });
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
          data={chats}
          renderItem={(props) => {
            return (
              <TouchableHighlight
                onPress={() => {
                  console.log("PRESSED");
                  navigation.navigate("ChatScreen", {
                    to_user: props.item.mail,
                  });
                }}
              >
                <View style={style.container}>
                  <Image
                    style={style.image}
                    source={{
                      uri: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png",
                      width: 200,
                      height: 300,
                    }}
                  ></Image>
                  <View style={style.textContainer}>
                    <Text style={style.title}>{props.item.mail}</Text>
                    <Text
                      style={style.wanted}
                    >{`For: ${props.item.wanted}`}</Text>
                    <View style={style.timestampView}>
                      <Text style={style.timestamp}>
                        {Moment(props.item.time).format("llll")}
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
    //flex: 1,
    width: "30%",
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

export default UserChatsScreen;
