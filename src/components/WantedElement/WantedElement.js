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

const WantedElement = (props) => {
  const navigation = useNavigation();
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
  const clr = props.item.highlight ? "#83DCB0" : "#F05A7A";

  return (
    <TouchableHighlight
      onPress={() => {
        console.log("PRESSED");
      }}
    >
      <View style={[style.container, { backgroundColor: clr }]}>
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
          <Text style={style.wanted}>{`For: ${props.item.wanted}`}</Text>
          <View style={style.timestampView}>
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

export default WantedElement;
