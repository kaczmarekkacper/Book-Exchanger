import React from "react";

import Moment from "moment";

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
} from "react-native";

const OfferElement = (props) => {
  console.log(props);
  return (
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
        <Text style={style.wanted}>{`For: ${props.item.wanted}`}</Text>
        <View style={style.timestampView}>
          <Text style={style.timestamp}>
            {Moment(props.item.timestamp).format("llll")}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ActualOfferElement = (props) => {
  console.log(props);
  return (
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
        <Text style={style.title}>{props.item.author}</Text>
        <Text style={style.wanted}>{`ISBN: ${props.item.isbn}`}</Text>
        <View style={style.timestampView}>
          <Text style={style.timestamp}>
            {Moment(props.item.timestamp).format("llll")}
          </Text>
        </View>
      </View>
    </View>
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
});

export { OfferElement, ActualOfferElement };
