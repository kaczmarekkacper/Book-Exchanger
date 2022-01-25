import React, { useEffect, useState } from "react";

import Moment from "moment";

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
} from "react-native";
import FavouriteIcon from "../FavouriteIcon/FavouriteIcon";

import getDocsId from "../../utils/getDocsId";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

const OfferElement = (props) => {
  const navigation = useNavigation();
  const storage = getStorage();
  const [favData, setFavData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [imageUrl, setImageUrl] = useState(
    "https://bibliotekant.pl/wp-content/uploads/2021/04/placeholder-image-768x576.png"
  );
  useEffect(() => {
    if (!!props.item.imageRef) {
      const reference = ref(storage, props.item.imageRef);
      getDownloadURL(reference)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((e) => console.log("Errors while downloading => ", e));
    }
  }, []);

  useEffect(() => {
    getDocsId(auth.currentUser?.email).then((data) => {
      setFavData(data);
    });
  }, [refresh]);

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
            uri: imageUrl,
            width: 200,
            height: 300,
          }}
        ></Image>
        <View style={style.textContainer}>
          <Text style={style.title}>{props.item.title}</Text>
          <Text style={style.author}>{props.item.author}</Text>
          <Text style={style.wanted}>{`Kat.: ${props.item.wanted}`}</Text>
          <View style={style.timestampView}>
            <FavouriteIcon
              id={props.item.id}
              inDB={
                !!favData.filter((data) => data.offerId == props.item.id).length
              }
              favId={
                !!favData.filter((data) => data.offerId == props.item.id).length
                  ? favData.filter((data) => data.offerId == props.item.id)[0]
                      .id
                  : null
              }
              refresh={refresh}
              setRefresh={setRefresh}
            />
            <Text style={style.timestamp}>
              {Moment(props.item.timestamp).format("llll")}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const style = StyleSheet.create({
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
  author: {
    fontSize: 10,
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
    backgroundColor: "#3b3b3b",
  },
});

export default OfferElement;
